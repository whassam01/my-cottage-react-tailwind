import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Elements, injectStripe } from "react-stripe-elements";

// Components
import { Toolbar, AlertModal } from "../components/common";
import CardForm from "../components/account/card/CardForm";
import AddressForm from "../components/account/address/AddressForm";
import OrderCheckoutContainer from "./../components/checkout/OrderCheckoutContainer/OrderCheckoutContainer";
import SubscriptionCheckoutContainer from "../components/checkout/SubscriptionCheckoutContainer/SubscriptionCheckoutContainer";

// Redux
import {
  AuthenticationActionType,
  BusinessActionType,
  CartActionType,
  ConsumerActionType,
  OrderActionType,
  SubscriptionActionType,
  CardActionType,
  AddressActionType,
} from "../store/actiontypes";

//actions
import {
  signOut,
  getUserCredentials,
  getCheckoutType,
  getConsumer,
  getBusinessesByDomain,
  getActiveOrders,
  getActivePlanOrders,
  createSubscription,
  applyCardToOrder,
  applyDeliveryAddressToOrder,
  applyCouponToOrder,
  transitionOrder,
  calculateOrder,
  deleteOrder,
  getOrder,
  updateOrder,
  updateOrderItem,
  deleteOrderItem,
  getTaxRates,
  clearBusinessScheduleInCart,
  clearProductOrdersInCart,
  createCardPaymentMethod,
  createConsumerCard,
} from "../store/actions";

// Utils
import {
  BusinessStatus,
  OrderStatus,
  CheckoutType,
  PageRoute,
  TransportationType,
  ErrorCode,
  ConsumerRoles,
} from "../constants";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: "",
      isLoading: true,
      isCheckoutLoading: false,
      isPickUpBasedOrderCheckout: false,
      isDeliveryBasedOrderCheckout: false,
      successfulOrdersPlaced: false,
      successfulPlanPurchasePlaced: false,
      addAddressVisible: false,
      addCardVisible: false,
      alertBoxVisible: false,
      redirectToBusinessProfile: false,
      checkoutHasAddressSelection: false,
      checkoutHasCardSelection: false,
      checkoutEnabled: true,
      selectedCardId: null,
      selectedAddressId: null,
      visible: false,
    };
  }

  componentDidMount() {
    const { urlDomain, urlSubdomain } = this.props.match.params;
    this.props.getBusinessesByDomain(urlDomain, urlSubdomain);
    this.props.getUserCredentials();
    this.props.getCheckoutType();
  }

  componentDidUpdate(prevProps) {
    const {
      business,
      authentication,
      cart,
      card,
      businessLocation: {
        value: { selectedBusiness },
      },
    } = this.props;

    if (cart.status !== prevProps.cart.status) {
      const isGuest = this.props?.account?.value?.role === ConsumerRoles.GUEST_CONSUMER;
      if (cart.status === OrderActionType.APPLY_CARD_TO_ORDER_SUCCESS && isGuest) {
        const { orders } = this.props.cart.value;
        orders.forEach((o) => {
          if (o.status === OrderStatus.IN_REVIEW) {
            this.props.transitionOrderToPurchased({
              orderId: o.id,
              businessId: this.props.business.value.id,
              status: OrderStatus.PURCHASED,
            });
          }
        });
      }
    }

    if (card.status !== prevProps.card.status) {
      if (card.status === CardActionType.CREATE_CARD_PAYMENT_METHOD_SUCCESS) {
        this.props.createConsumerCard({
          consumerId: card.value.id,
          cardId: card.value.paymentMethod.id,
        });
      } else if (card.status === CardActionType.CREATE_CONSUMER_CARD_SUCCESS) {
        this.applyCardToOrder(card.value.edges[card.value.edges.length - 1].node.id);
      }
    }
    if (
      cart.status !== prevProps.cart.status &&
      this.props.cart.status === OrderActionType.APPLY_CARD_TO_ORDER_ERROR
    ) {
      this.setState({ isCheckoutLoading: false, visible: false });
    }

    if (business.status !== prevProps.business.status) {
      if (business.status === BusinessActionType.GET_BUSINESSES_BY_DOMAIN_SUCCESS) {
        if (cart.value.checkoutType === CheckoutType.ORDER && cart.value.orders.length === 0) {
          this.setState({ redirectToBusinessProfile: true });
        } else {
          this.setState({ isLoading: false }, () => this.getTaxRates());
        }
      }
    }

    if (authentication.status !== prevProps.authentication.status) {
      if (
        authentication.status === AuthenticationActionType.GET_USER_CREDENTIALS_SUCCESS &&
        authentication.value.isAuthenticated
      ) {
        const consumerId = authentication.value.id;
        const isGuest = this.props?.account?.value?.role === ConsumerRoles.GUEST_CONSUMER;
        if (isGuest) return;
        this.props.getConsumer(consumerId);
      }
    }

    if (cart.status === OrderActionType.TRANSITION_ORDER_SUCCESS) {
      const allOrdersSuccessful = cart.value.orders.every(
        (o) => o.status === OrderStatus.PURCHASED
      );

      const allOrdersAccountedFor = cart.value.orders.every(
        (o) =>
          (o.status === OrderStatus.IN_REVIEW &&
            o.cartStatus === OrderActionType.TRANSITION_ORDER_ERROR) ||
          (o.status === OrderStatus.PURCHASED &&
            o.cartStatus === OrderActionType.TRANSITION_ORDER_SUCCESS)
      );

      if (allOrdersSuccessful) {
        this.setState(
          {
            isLoading: false,
            isCheckoutLoading: false,
            visible: false,
            successfulOrdersPlaced: true,
          },
          () => {
            this.props.clearBusinessScheduleInCart(this.props.business.value.id);
            this.props.clearProductOrdersInCart();
          }
        );
      } else if (allOrdersAccountedFor && this.state.isCheckoutLoading === true) {
        this.setState({
          isLoading: false,
          isCheckoutLoading: false,
          visible: false,
          successfulOrdersPlaced: false,
        });
      }
    }

    if (
      cart.status === OrderActionType.TRANSITION_ORDER_ERROR ||
      cart.status === OrderActionType.CALCULATE_ORDER_ERROR ||
      cart.status === OrderActionType.CALCULATE_ORDER_SUCCESS
    ) {
      const allOrdersAccountedFor = cart.value.orders.every(
        (o) =>
          (o.status === OrderStatus.IN_REVIEW && o.cartStatus === cart.status) ||
          o.status === OrderStatus.PURCHASED
      );
      if (allOrdersAccountedFor && this.state.isCheckoutLoading === true) {
        this.setState({
          isLoading: false,
          visible: false,
          isCheckoutLoading: false,
          successfulOrdersPlaced: false,
        });
      }
    }

    if (cart.status !== prevProps.cart.status) {
      if (
        cart.status === OrderActionType.APPLY_COUPON_TO_ORDER_REQUESTED ||
        cart.status === OrderActionType.APPLY_DELIVERY_ADDRESS_TO_ORDER_REQUESTED ||
        cart.status === OrderActionType.APPLY_CARD_TO_ORDER_REQUESTED ||
        cart.status === OrderActionType.GET_ORDER_REQUESTED ||
        cart.status === OrderActionType.TRANSITION_ORDER_REQUESTED ||
        cart.status === OrderActionType.CALCULATE_ORDER_REQUESTED
      ) {
        this.setState({ isLoading: true });
      } else if (
        cart.status === CartActionType.GET_ACTIVE_ORDERS ||
        cart.status === CartActionType.GET_ACTIVE_PLAN_ORDERS ||
        cart.status === OrderActionType.APPLY_COUPON_TO_ORDER_SUCCESS ||
        cart.status === OrderActionType.APPLY_DELIVERY_ADDRESS_TO_ORDER_SUCCESS ||
        cart.status === OrderActionType.APPLY_CARD_TO_ORDER_SUCCESS ||
        cart.status === OrderActionType.GET_ORDER_SUCCESS ||
        cart.status === OrderActionType.TRANSITION_ORDER_SUCCESS ||
        cart.status === OrderActionType.CALCULATE_ORDER_SUCCESS
      ) {
        this.setState({ isLoading: false });
      } else if (
        cart.status === OrderActionType.APPLY_COUPON_TO_ORDER_ERROR ||
        cart.status === OrderActionType.APPLY_DELIVERY_ADDRESS_TO_ORDER_ERROR ||
        cart.status === OrderActionType.APPLY_CARD_TO_ORDER_ERROR ||
        cart.status === OrderActionType.GET_ORDER_ERROR ||
        cart.status === OrderActionType.TRANSITION_ORDER_ERROR ||
        cart.status === OrderActionType.CALCULATE_ORDER_ERROR ||
        cart.status === SubscriptionActionType.CREATE_SUBSCRIPTION_ERROR
      ) {
        const { message, code } = cart.error;
        if (code === ErrorCode.CARD_EXPIRED_ERROR) {
          this.setState({
            alertBoxVisible: true,
            errorMessage: message,
            isLoading: false,
          });
        } else {
          this.setState({ isLoading: false, isCheckoutLoading: false });
        }
      } else if (cart.status === CartActionType.GET_CHECKOUT_TYPE) {
        const { checkoutType } = cart.value;
        if (checkoutType === CheckoutType.ORDER) {
          this.props.getActiveOrders();
        } else {
          this.props.getActivePlanOrders();
        }
      } else if (cart.status === SubscriptionActionType.CREATE_SUBSCRIPTION_SUCCESS) {
        this.setState({
          isLoading: false,
          successfulPlanPurchasePlaced: true,
        });
      }

      if (
        selectedBusiness &&
        cart.value.checkoutType === CheckoutType.ORDER &&
        cart.value.orders.length === 0
      ) {
        this.setState({ redirectToBusinessProfile: true });
      }
    }
    //if its a guest user checking out, then query the guest consumer data
    if (
      this.props.account.guestConsumerStatus === ConsumerActionType.CREATE_GUEST_CONSUMER_SUCCESS &&
      this.props.address.status === AddressActionType.CREATE_ADDRESS_SUCCESS
    ) {
      this.props.getConsumer(this.props.account.value.id);
    }
  }

  selectedCardId = (cardId) => {
    this.setState({ selectedCardId: cardId });
    const { checkoutType } = this.props.cart.value;
    if (checkoutType === CheckoutType.ORDER) {
      this.applyCardToOrder(cardId);
    }
  };

  selectedAddressId = (addressId) => {
    this.setState({ selectedAddressId: addressId });
  };

  applyCardToOrder = (cardId) => {
    const { orders } = this.props.cart.value;
    if (orders.length !== 0) {
      orders.forEach((o) => {
        if (o.status === OrderStatus.IN_REVIEW) {
          this.props.applyCardToOrder({
            orderId: o.id,
            cardId,
          });
        }
      });
    }
  };

  applyCardToPlanOrder = (cardId) => {
    this.setState({ cardId });
  };

  applyDeliveryAddressToOrder = (addressId) => {
    const { orders } = this.props.cart.value;
    orders.forEach((o) => {
      if (o.status === OrderStatus.IN_REVIEW) {
        this.props.applyDeliveryAddressToOrder({
          orderId: o.id,
          addressId,
        });
      }
    });
  };

  applyCouponToOrder = (code) => {
    const { orders } = this.props.cart.value;
    orders.forEach((o) => {
      if (o.status === OrderStatus.IN_REVIEW) {
        this.props.applyCouponToOrder({
          orderId: o.id,
          couponName: code,
        });
      }
    });
  };

  validateOrders = (orders) => {
    let orderHasAddress = true,
      orderHasCard = true;
    orders.forEach((o) => {
      const { selectedCardId, selectedAddressId } = this.state;
      if (o.status === OrderStatus.IN_REVIEW) {
        if (o.type === TransportationType.DELIVERY) {
          if (o.consumerAddress === null || selectedAddressId === null) {
            orderHasAddress = false;
          }
        } else {
          if (o.pickupAddress === null || selectedAddressId === null) {
            orderHasAddress = false;
          }
        }
        if (o.cardLastFour === undefined || selectedCardId === null) {
          orderHasCard = false;
        }
      }
    });

    const checkoutEnabled = orders.every(
      (o) =>
        (o.status === OrderStatus.IN_REVIEW &&
          o.error === undefined &&
          o.orderItems.every((oi) => oi.error === undefined)) ||
        o.status === OrderStatus.PURCHASED
    );

    return {
      checkoutHasAddressSelection: orderHasAddress,
      checkoutHasCardSelection: orderHasCard,
      checkoutEnabled: checkoutEnabled && orderHasAddress && orderHasCard,
    };
  };

  transitionOrdersToPurchased = () => {
    const { orders } = this.props.cart.value;
    const { checkoutEnabled } = this.validateOrders(orders);
    const isGuest = this.props?.account?.value?.role === ConsumerRoles.GUEST_CONSUMER;

    if (isGuest) {
      const cardNumberElement = this.props.elements.getElement("cardNumber");
      this.props.createCardPaymentMethod(this.props.stripe, { cardNumber: cardNumberElement });
      this.setState({ isCheckoutLoading: true, visible: true });
    }
    if (checkoutEnabled) {
      this.setState({ isCheckoutLoading: true, visible: true });
      orders.forEach((o) => {
        if (o.status === OrderStatus.IN_REVIEW) {
          this.props.transitionOrderToPurchased({
            orderId: o.id,
            businessId: this.props.business.value.id,
            status: OrderStatus.PURCHASED,
          });
        }
      });
    }
  };

  calculateOrder = (orderId) => {
    this.props.calculateOrder({
      businessId: this.props.business.value.id,
      orderId,
    });
  };

  deleteOrder = (orderId) => {
    this.props.deleteOrder({
      businessId: this.props.business.value.id,
      orderId,
    });
  };

  getOrder = (orderId) => {
    this.props.getOrder({
      businessId: this.props.business.value.id,
      orderId,
    });
  };

  updateOrder = (params) => {
    const { orderId, note } = params;
    this.props.updateOrder({
      businessId: this.props.business.value.id,
      orderId,
      note,
    });
  };

  updateOrderItem = (params) => {
    const { orderItemId, orderId, quantity } = params;
    this.props.updateOrderItem({
      orderItemId,
      orderId,
      quantity,
    });
  };

  deleteOrderItem = (params) => {
    const { orderItemId, orderId } = params;
    this.props.deleteOrderItem({
      orderItemId,
      orderId,
    });
  };

  getTaxRates = () => {
    this.props.getTaxRates({
      id: this.props.business.value.id,
    });
  };

  showAddAddress = () => {
    this.setState({ addAddressVisible: true });
  };

  hideAddAddress = () => {
    this.setState({ addAddressVisible: false });
  };

  showAddCard = () => {
    this.setState({ addCardVisible: true });
  };

  hideAddCard = () => {
    this.setState({ addCardVisible: false });
  };

  hideCheckoutAlertBox = () => {
    this.setState({ alertBoxVisible: false, redirectToBusinessProfile: true });
  };

  completePlanPurchase = () => {
    this.setState({ isCheckoutLoading: true }, () =>
      this.props.createSubscription({
        consumerId: this.props.account.value.id,
        businessId: this.props.business.value.id,
        planId: this.props.cart.value.plans[0].plan.id,
        cardId: this.state.selectedCardId,
      })
    );
  };

  guestAddCardFormInputChange = (e) => {
    const { elementType, complete, error } = e;
    if (error) {
      this.setState({ checkoutEnabled: false });
      return;
    }
    this.setState({
      checkoutEnabled: true,
      [elementType]: {
        complete,
      },
    });
  };

  render() {
    const {
      authentication,
      cart,
      businessLocation: {
        value: { selectedBusiness, edges },
      },
    } = this.props;
    const { checkoutType } = cart.value;
    let checkoutHasAddressSelection = false,
      checkoutHasCardSelection = false,
      checkoutEnabled = true;
    if (checkoutType === CheckoutType.ORDER) {
      const validations = this.validateOrders(cart.value.orders);
      checkoutHasAddressSelection = validations.checkoutHasAddressSelection;
      checkoutHasCardSelection = validations.checkoutHasCardSelection;
      checkoutEnabled = validations.checkoutEnabled;
    }
    if (this.props.account?.value?.role === ConsumerRoles.GUEST_CONSUMER) {
      if (
        this.state.cardCvc?.complete &&
        this.state.cardExpiry?.complete &&
        this.state.cardNumber?.complete
      ) {
        checkoutEnabled = true && this.state.checkoutEnabled;
      }
    }
    // we should clean correctly in cognito so we stay on the same page as amplify, but until then do the additional check
    const isGuest = this.props.account.value?.role === ConsumerRoles.GUEST_CONSUMER;

    if (
      !authentication.value.id &&
      (authentication.status === AuthenticationActionType.GET_USER_CREDENTIALS_SUCCESS ||
        authentication.status === AuthenticationActionType.GET_USER_CREDENTIALS_ERROR ||
        authentication.status === ConsumerActionType.GET_CONSUMER_SUCCESS ||
        authentication.status === ConsumerActionType.GET_CONSUMER_ERROR)
      // || (cart.value.orders.length === 0 && cart.value.plans.length === 0)
    ) {
      // TODO redirect them back to the login
      return <Redirect to="/login" />;
    } else if (this.state.successfulOrdersPlaced && isGuest) {
      this.props.signOut();
      return <Redirect to={`/${selectedBusiness.urlDomain}/${selectedBusiness.urlSubdomain}`} />;
    } else if (this.state.successfulOrdersPlaced) {
      return <Redirect to={PageRoute.PURCHASES} />;
    } else if (this.state.successfulPlanPurchasePlaced) {
      return <Redirect to={PageRoute.PURCHASES} />;
    } else if (
      this.state.redirectToBusinessProfile ||
      authentication.status === AuthenticationActionType.SIGN_OUT_SUCCESS
    ) {
      return <Redirect to={`/${selectedBusiness.urlDomain}/${selectedBusiness.urlSubdomain}`} />;
    }
    return (
      <div>
        <div className="body-wrapper">
          <Toolbar
            selectedBusiness={selectedBusiness}
            businesses={edges}
            onSignOut={this.props.signOut}
          />
        </div>
        {checkoutType === CheckoutType.ORDER && (
          <OrderCheckoutContainer
            showAddAddress={this.showAddAddress}
            showAddCard={this.showAddCard}
            applyAddress={this.applyDeliveryAddressToOrder}
            selectedAddressId={this.selectedAddressId}
            orderHasAddress={checkoutHasAddressSelection}
            calculateOrder={this.calculateOrder}
            deleteOrder={this.deleteOrder}
            updateOrder={this.updateOrder}
            getOrder={this.getOrder}
            updateOrderItem={this.updateOrderItem}
            deleteOrderItem={this.deleteOrderItem}
            applyCard={this.applyCardToOrder}
            selectedCardId={this.selectedCardId}
            orderHasCard={checkoutHasCardSelection}
            applyCoupon={this.applyCouponToOrder}
            purchaseOrders={this.transitionOrdersToPurchased}
            isCheckoutLoading={this.state.isCheckoutLoading}
            isCheckoutAnimationVisible={this.state.visible}
            checkoutEnabled={checkoutEnabled}
            consumer={this.props.account?.value}
            guestAddCardFormInputChange={this.guestAddCardFormInputChange}
          />
        )}
        <div>
          {checkoutType === CheckoutType.SUBSCRIPTION && (
            <SubscriptionCheckoutContainer
              showAddCard={this.showAddCard}
              hideAddCard={this.hideAddCard}
              selectedCardId={this.selectedCardId}
              plan={this.props.cart.value?.plans[0]?.plan}
              completePurchase={this.completePlanPurchase}
              isCheckoutLoading={this.state.isCheckoutLoading}
            />
          )}
        </div>
        {this.state.addAddressVisible && (
          <AddressForm visible={this.state.addAddressVisible} onCancel={this.hideAddAddress} />
        )}
        {this.state.addCardVisible && (
          <Elements>
            <CardForm visible={this.state.addCardVisible} onCancel={this.hideAddCard} />
          </Elements>
        )}
        {this.state.alertBoxVisible && (
          <AlertModal
            visible={this.state.alertBoxVisible}
            onCancel={this.hideCheckoutAlertBox}
            description={this.state.errorMessage}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authentication: state.authentication,
    account: state.consumer.account,
    cart: state.cart,
    business: state.business.id,
    businessLocation: state.business.location,
    isMobileView: state.mobileView.isMobileView,
    address: state.consumer.address,
    card: state.consumer.card,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createConsumerCard: (input) => dispatch(createConsumerCard(input)),
    createCardPaymentMethod: (stripe, input) => dispatch(createCardPaymentMethod(stripe, input)),
    signOut: () => dispatch(signOut()),
    getUserCredentials: () => dispatch(getUserCredentials()),
    getCheckoutType: () => dispatch(getCheckoutType()),
    getConsumer: (id) => dispatch(getConsumer({ id })),
    getActiveOrders: () => dispatch(getActiveOrders()),
    getActivePlanOrders: () => dispatch(getActivePlanOrders()),
    createSubscription: (input) => dispatch(createSubscription(input)),
    applyCardToOrder: (input) => dispatch(applyCardToOrder(input)),
    applyDeliveryAddressToOrder: (input) => dispatch(applyDeliveryAddressToOrder(input)),
    applyCouponToOrder: (input) => dispatch(applyCouponToOrder(input)),
    transitionOrderToPurchased: (input) => dispatch(transitionOrder(input)),
    calculateOrder: (input) => dispatch(calculateOrder(input)),
    updateOrder: (input) => dispatch(updateOrder(input)),
    deleteOrder: (input) => dispatch(deleteOrder(input)),
    getOrder: (input) => dispatch(getOrder(input)),
    updateOrderItem: (input) => dispatch(updateOrderItem(input)),
    deleteOrderItem: (input) => dispatch(deleteOrderItem(input)),
    clearProductOrdersInCart: () => dispatch(clearProductOrdersInCart()),
    clearBusinessScheduleInCart: (businessId) =>
      dispatch(clearBusinessScheduleInCart({ businessId })),
    getTaxRates: (input) => dispatch(getTaxRates(input)),
    getBusinessesByDomain: (urlDomain, urlSubdomain) =>
      dispatch(
        getBusinessesByDomain({
          urlDomain,
          urlSubdomain,
          statuses: [BusinessStatus.ACTIVE],
        })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(injectStripe(Checkout));
