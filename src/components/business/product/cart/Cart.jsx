import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Typography, Card } from "antd";
// Components
import ScheduleItem from "./schedule/ScheduleItem";

// Redux
import {
  clearProductOrdersInCart,
  createOrders,
  createOrderItem,
  transitionOrder,
  getActiveSchedulesInCart,
} from "../../../../store/actions";
import { OrderActionType, OrderItemActionType } from "../../../../store/actiontypes";

// Utils
import {
  OrderStatus,
  ErrorMessage,
  ErrorCode,
  PageRoute,
  TransportationType,
} from "../../../../constants";
import { isEmpty, isEmptyObject } from "../../../../utils";
import { ErrorBox, PrimaryButton } from "../../../common";
import "./Cart.scss";
const { Title } = Typography;

const initialState = {
  isLoading: false,
  transitionToCheckout: false,
  errorMessage: "",
  errors: {},
  rect: {
    position: "static",
    width: "100%",
  },
};

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.cardRef = React.createRef();
  }

  componentDidMount = () => {
    this.props.getActiveSchedulesInCart();

    this.scrollEventListener = window.addEventListener("scroll", (e) => {
      if (!this.cardRef.current) return;
      const { width, top } = this.cardRef.current.getBoundingClientRect();

      if (top < 70) {
        this.setState({
          rect: {
            width: width,
            position: "fixed",
            top: 70,
          },
        });
      } else {
        this.setState({
          rect: {
            position: "static",
          },
        });
      }
    });
  };

  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollEventListener);
  }

  componentDidUpdate = (prevProps) => {
    const { cart } = this.props;

    if (cart.status !== prevProps.cart.status) {
      if (cart.status === OrderActionType.CREATE_ORDERS_SUCCESS) {
        this.createOrderItems();
      } else if (cart.status === OrderActionType.CREATE_ORDERS_ERROR) {
        const { message } = cart.error;
        this.setState({
          isLoading: false,
          errorMessage: message,
        });
      } else if (
        cart.status === OrderActionType.TRANSITION_ORDER_ERROR ||
        cart.status === OrderItemActionType.CREATE_ORDER_ITEM_ERROR
      ) {
        const { message } = cart.error;
        this.setState({
          isLoading: false,
          errorMessage: message,
        });
      }
    }

    if (cart.status === OrderActionType.TRANSITION_ORDER_SUCCESS) {
      const areAllTransitioned = cart.value.orders.every((o) => o.status === OrderStatus.IN_REVIEW);
      if (areAllTransitioned) {
        this.setState({
          isLoading: false,
          transitionToCheckout: true,
        });
      }
    }

    if (
      cart.status === OrderItemActionType.CREATE_ORDER_ITEM_SUCCESS &&
      cart.value !== prevProps.cart.value
    ) {
      this.transitionToInReview();
    }
  };

  validateOrderInput = () => {
    const { business, cart, transportation, address } = this.props;
    const businessId = business.value.id;
    const businessSchedules = cart.value.businessSchedules.find((b) => b.id === businessId);

    const schedules = businessSchedules ? businessSchedules.schedules : [];
    const today = new Date();
    const errors = {};

    // Check if schedules are expired
    const expiredSchedules = schedules.filter((s) => s.orderCutoff < today.getTime());
    if (expiredSchedules.length > 0) {
      errors[ErrorCode.SCHEDULE_EXPIRED_ERROR] = ErrorMessage[ErrorCode.SCHEDULE_EXPIRED_ERROR];
    }

    // Check if there is a delivery rule for the selected address
    const { transportationType, selectedAddressId, deliveries } = transportation.value;
    const consumerAddresses = address.value.edges;
    if (transportationType === TransportationType.DELIVERY) {
      const foundAddress = consumerAddresses.find((a) => a.node.id === selectedAddressId);
      if (foundAddress) {
        const deliveryRules = deliveries.edges.filter((d) =>
          d.node.postalCodes.includes(foundAddress.node.postalCode)
        );
        if (deliveryRules.length === 0) {
          errors[ErrorCode.DELIVERY_OUT_OF_RANGE_ERROR] =
            ErrorMessage[ErrorCode.DELIVERY_OUT_OF_RANGE_ERROR];
        }
      }
    }

    return { errors };
  };

  createOrders = () => {
    const { authentication, business, transportation, subscription } = this.props;
    const { selectedAddressId } = transportation.value;

    if (!authentication.value.isAuthenticated) {
      this.props.onShowLogin("GUEST_CHECKOUT");
      return;
    }

    const { errors } = this.validateOrderInput();
    if (!selectedAddressId) {
      errors.addressId = "No address found, please add an address";
    }

    this.setState({
      errors,
      errorMessage: initialState.errorMessage,
    });

    if (!isEmptyObject(errors)) {
      return;
    }

    const consumerId = authentication.value.id;
    const businessId = business.value.id;
    const consumerSubscription = subscription.value.subscriptions.find(
      (s) => s.business.id === businessId
    );
    const businessSchedules = this.getBusinessSchedules();
    const schedules = businessSchedules ? businessSchedules.schedules : [];
    const scheduleIds = schedules.map((s) => s.id);
    const addressId = businessSchedules.selectedAddressId;

    if (!addressId) {
      errors.addressId = "No address found, please add an address";
    }

    this.setState({
      errors,
      errorMessage: initialState.errorMessage,
    });

    if (!isEmptyObject(errors)) {
      return;
    }

    const input = {
      consumerId,
      businessId,
      scheduleIds,
      type: businessSchedules.transportationType,
      addressId,
    };

    if (consumerSubscription) {
      input.subscriptionId = consumerSubscription.id;
    }

    this.setState(
      {
        isLoading: true,
      },
      () => {
        this.props.clearProductOrdersInCart();
        this.props.createOrders(input);
      }
    );
  };

  createOrderItems = () => {
    const { cart, business } = this.props;
    const { orders } = cart.value;
    const businessId = business.value.id;

    const createOrderItemsInput = [];
    const businessSchedules = this.getBusinessSchedules();
    const schedules = businessSchedules ? businessSchedules.schedules : [];

    orders.forEach((o) => {
      const { offers } = schedules.find((s) => s.id === o.schedule.id);

      offers.forEach((offer) => {
        const i = {
          input: {
            offerId: offer.id,
            orderId: o.id,
            quantity: offer.quantity,
          },
          additionalInfo: {
            businessId,
            scheduleId: o.schedule.id,
          },
        };

        createOrderItemsInput.push(i);
      });
    });

    createOrderItemsInput.forEach((i) => this.props.createOrderItem(i.input, i.additionalInfo));
  };

  transitionToInReview = () => {
    const { cart } = this.props;
    const { orders } = cart.value;
    const businessSchedules = this.getBusinessSchedules();
    const schedules = businessSchedules ? businessSchedules.schedules : [];

    const updatedOrders = orders.filter(
      (o) =>
        o.orderItems &&
        o.orderItems.length === schedules.find((s) => s.id === o.schedule.id).offers.length
    );

    // All order items are created, transition orders to in review
    if (updatedOrders.length === orders.length) {
      updatedOrders.forEach((o) =>
        this.props.transitionOrder({
          orderId: o.id,
          businessId: this.props.business.value.id,
          status: OrderStatus.IN_REVIEW,
        })
      );
    }
  };

  getBusinessSchedules = () => {
    const { business, cart } = this.props;

    const businessId = business.value.id;
    const businessSchedules = cart.value.businessSchedules.find((b) => b.id === businessId);
    return businessSchedules;
  };

  getTotalCost = () => {
    const {
      business,
      cart: {
        value: { businessSchedules },
      },
    } = this.props;
    let totalCost = 0;

    const businessId = business.value.id;
    const businessInCart = businessSchedules.find((b) => b.id === businessId);

    if (businessInCart) {
      businessInCart.schedules.forEach((schedule) => {
        schedule.offers.forEach((offer) => {
          const { product, quantity } = offer;
          totalCost += product.price.amount * quantity;
        });
      });
    }

    return (totalCost / 100).toFixed(2);
  };

  render() {
    const { business, cart, subscription, address, transportation } = this.props;
    const businessId = business.value.id;
    const businessSchedules = cart.value.businessSchedules.find((b) => b.id === businessId);

    const schedules = businessSchedules ? businessSchedules.schedules : [];
    let selectedAddress = null;

    if (businessSchedules && businessSchedules.transportationType === TransportationType.DELIVERY) {
      selectedAddress = address.value.edges.find(
        (e) => e.node.id === businessSchedules.selectedAddressId
      );
    } else if (
      businessSchedules &&
      businessSchedules.transportationType === TransportationType.PICK_UP
    ) {
      selectedAddress = transportation.value.pickupAddresses.edges.find(
        (e) => e.node.id === businessSchedules.selectedAddressId
      );
    }

    // sort schedules by orderReadystart
    schedules.sort((s1, s2) => s1.orderReadyStart - s2.orderReadyStart);

    const { transitionToCheckout, isLoading } = this.state;

    const consumerSubscription = subscription.value.subscriptions.find(
      (s) => s.business.id === businessId
    );

    if (transitionToCheckout) {
      const {
        selectedBusiness: { urlDomain, urlSubdomain },
      } = this.props.location.value;
      return <Redirect to={`/${urlDomain}/${urlSubdomain}${PageRoute.CHECKOUT}`} />;
    }

    const errorPayload =
      this.state.errorMessage !== initialState.errorMessage
        ? [this.state.errorMessage]
        : Object.values(this.state.errors);
    const errorBoxContainer = <ErrorBox messages={errorPayload} />;
    const { top, width, position } = this.state.rect;
    return (
      <div ref={this.cardRef}>
        <Card className="product-card" style={{ width, top, position }}>
          <Title className={"cottage-large-title"}>My Cart </Title>
          {businessSchedules && schedules.length > 0 && (
            <div className="product-card-header">
              <div className="Plans-cart-header-items">
                <span className="cart-header-address">
                  {selectedAddress && (
                    <p>
                      {businessSchedules.transportationType === TransportationType.DELIVERY
                        ? `Delivery to `
                        : `Pickup at `}{" "}
                      {selectedAddress.node.title ? `${selectedAddress.node.title},` : null}{" "}
                      {selectedAddress.node.street}
                    </p>
                  )}
                </span>
              </div>
            </div>
          )}
          {schedules.length > 0 ? (
            schedules.map((schedule) => (
              <ScheduleItem
                key={schedule.id}
                schedule={schedule}
                isCheckoutDisabled={this.props.isCheckoutDisabled}
              />
            ))
          ) : (
            <div className="empty-business-cart-box">Add a product to your cart</div>
          )}
          <div className="product-card-footer">
            <div className="Plans-cart-total flex">
              <p>Subtotal </p> <p>${this.getTotalCost()}</p>
            </div>
            <PrimaryButton
              loading={isLoading}
              eventHandler={this.createOrders}
              disabled={schedules.length === 0}
              text="Proceed to checkout"
            />
            {consumerSubscription && (
              <div className="payment-note">
                We will apply your {consumerSubscription.plan.title} subscription at checkout.
              </div>
            )}
            {/* <div className="payment-note">
            We accept every payment method.
          </div> */}
            {(!isEmpty(this.state.errorMessage) || !isEmptyObject(this.state.errors)) &&
              errorBoxContainer}
          </div>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    address: state.consumer.address,
    authentication: state.authentication,
    business: state.business.id,
    location: state.business.location,
    cart: state.cart,
    transportation: state.business.transportation,
    subscription: state.consumer.subscription,
    product: state.business.product,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createOrders: (input) => dispatch(createOrders(input)),
    createOrderItem: (input, additionalInfo) => dispatch(createOrderItem(input, additionalInfo)),
    clearProductOrdersInCart: () => dispatch(clearProductOrdersInCart()),
    transitionOrder: (input) => dispatch(transitionOrder(input)),
    getActiveSchedulesInCart: () => dispatch(getActiveSchedulesInCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
