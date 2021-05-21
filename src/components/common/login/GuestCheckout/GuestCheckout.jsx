import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

//components
import GuestCheckoutForm from "./GuestCheckoutForm/GuestCheckoutForm";
import JoinCottageForm from "./JoinCottageForm/JoinCottageForm";
import CenterDivider from "./CenterDivider/CenterDivider";

//actions
import {
  createGuestConsumer,
  createConsumerAddress,
  clearProductOrdersInCart,
  createOrders,
} from "./../../../..//store/actions";

//actionTypes
import {
  ConsumerActionType,
  AddressActionType,
  OrderItemActionType,
} from "./../../../../store/actiontypes/index";

//consants
import { ScheduleType } from "./../../../../constants";
import { cleanedPhoneInput } from "../../../../utils";

//styles
import "./GuestCheckout.scss";

export class GuestCheckout extends Component {
  state = {
    showGuestForm: false,
    isLoading: false,
    errorMessages: [],
  };

  toggleForms = () => {
    this.setState({ showGuestForm: !this.state.showGuestForm });
  };

  onSubmit = (form) => {
    const fileds = [
      { name: "firstName" },
      { name: "lastName" },
      { name: "email" },
      { name: "phoneNumber" },
      { name: "street" },
      { name: "city" },
      { name: "stateOrProvince" },
      { name: "postalCode" },
    ];
    let data = {};
    fileds.forEach((fieldName) => {
      data[fieldName.name] = form.getFieldValue(fieldName.name);
    });
    this.setState({ data, isLoading: true, errorMessages: [] });
    const { email, firstName, lastName, phoneNumber } = data;
    this.props.createGuestConsumer({
      firstName,
      lastName,
      email,
      phoneNumber: cleanedPhoneInput(phoneNumber),
      acceptedTerms: true,
    });
  };
  componentDidUpdate(prevProps, prevState) {
    const { cart } = this.props;
    const businessSchedule = cart.value.businessSchedules[0];
    const transportationType = businessSchedule?.transportationType;
    const isCheckoutTypePickUp = transportationType === ScheduleType.PICK_UP;
    if (
      prevProps.account.guestConsumerStatus !== this.props.account.guestConsumerStatus &&
      this.props.account.guestConsumerStatus === ConsumerActionType.CREATE_GUEST_CONSUMER_SUCCESS &&
      //create address only if transportation type is not pickup i.e, delivery
      !isCheckoutTypePickUp
    ) {
      const { street, city, postalCode, stateOrProvince } = this.state.data;
      this.props.createConsumerAddress({
        consumerId: this.props.account.value.id,
        street,
        city,
        postalCode,
        stateOrProvince,
        country: "US",
      });
    }
    //create orders if the address is created successfully
    if (
      isCheckoutTypePickUp &&
      prevProps.account.guestConsumerStatus !== this.props.account.guestConsumerStatus &&
      this.props.account.guestConsumerStatus === ConsumerActionType.CREATE_GUEST_CONSUMER_SUCCESS
    ) {
      this.createOrders();
    } else {
      if (
        prevProps.address.status !== this.props.address.status &&
        this.props.address.status === AddressActionType.CREATE_ADDRESS_SUCCESS
      ) {
        this.createOrders();
      }
    }

    if (
      prevProps.cart.status !== this.props.cart.status &&
      this.props.cart.status === OrderItemActionType.CREATE_ORDER_ITEM_ERROR
    ) {
      const { errorMessages } = this.state;
      this.setState({
        isLoading: false,
        errorMessages: [...errorMessages, this.props.cart.error.message],
      });
    }
    if (
      prevProps.address.status !== this.props.address.status &&
      this.props.address.status === AddressActionType.CREATE_ADDRESS_ERROR
    ) {
      const { errorMessages } = this.state;
      this.setState({
        isLoading: false,
        errorMessages: [...errorMessages, this.props.address.error.message],
      });
    }
    if (
      prevProps.account.guestConsumerStatus !== this.props.account.guestConsumerStatus &&
      this.props.account.guestConsumerStatus === ConsumerActionType.CREATE_GUEST_CONSUMER_ERROR
    ) {
      const { errorMessages } = this.state;
      this.setState({
        isLoading: false,
        errorMessages: [...errorMessages, this.props.account.error.message],
      });
    }
  }
  getBusinessSchedules = () => {
    const { business, cart } = this.props;

    const businessId = business.value.id;
    const businessSchedules = cart.value.businessSchedules.find((b) => b.id === businessId);
    return businessSchedules;
  };

  createOrders = () => {
    const { cart, business } = this.props;
    const businessId = business.value.id;
    const businessSchedules = this.getBusinessSchedules();
    const schedules = businessSchedules ? businessSchedules.schedules : [];
    const scheduleIds = schedules.map((s) => s.id);
    const businessSchedule = cart.value.businessSchedules[0];
    //set the addressId based on the transportation type, because both type need addressId from different reducers
    const addressId =
      businessSchedules.transportationType === ScheduleType.PICK_UP
        ? businessSchedule?.selectedAddressId
        : this.props.address.value?.edges[0]?.node.id;

    const input = {
      consumerId: this.props.account.value.id,
      businessId,
      scheduleIds,
      type: businessSchedules.transportationType,
      addressId: addressId,
    };
    this.props.clearProductOrdersInCart();
    this.props.createOrders(input);
  };

  render() {
    const { isMobileView, cart } = this.props;
    const businessSchedule = cart.value.businessSchedules[0];
    const transportationType = businessSchedule?.transportationType;
    const selectedAddressId = businessSchedule?.selectedAddressId;
    const selectedAddress = businessSchedule?.schedules[0]?.pickupAddresses?.find(
      (address) => address.id === selectedAddressId
    );
    return (
      <div className="guest-checkout-wrapper">
        <div className="guest-checkout" style={isMobileView ? { flexDirection: "column" } : {}}>
          {isMobileView ? (
            <>
              {this.state.showGuestForm ? (
                <>
                  <GuestCheckoutForm
                    checkoutType={transportationType}
                    selectedAddress={selectedAddress}
                    onSubmit={this.onSubmit}
                    isLoading={this.state.isLoading}
                    errorMessages={this.state.errorMessages}
                  />
                  <CenterDivider type={isMobileView ? "horizontal" : "vertical"} />
                  <div onClick={this.toggleForms} className="checkout-bottom-info-text">
                    Sign up for faster checkout
                  </div>
                </>
              ) : (
                <>
                  <JoinCottageForm
                    goToSignIn={this.props.goToSignIn}
                    goToSignUp={this.props.goToSignUp}
                  />
                  <CenterDivider type={isMobileView ? "horizontal" : "vertical"} />
                  <div onClick={this.toggleForms} className="checkout-bottom-info-text">
                    Checkout as a guest
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <JoinCottageForm
                goToSignIn={this.props.goToSignIn}
                goToSignUp={this.props.goToSignUp}
              />
              <CenterDivider type={isMobileView ? "horizontal" : "vertical"} />
              <GuestCheckoutForm
                checkoutType={transportationType}
                selectedAddress={selectedAddress}
                onSubmit={this.onSubmit}
                isLoading={this.state.isLoading}
                errorMessages={this.state.errorMessages}
              />
            </>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isMobileView: state.mobileView.isMobileView,
    cart: state.cart,
    account: state.consumer.account,
    address: state.consumer.address,
    business: state.business.id,
    subscription: state.consumer.subscription,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    createGuestConsumer: (input) => dispatch(createGuestConsumer(input)),
    createConsumerAddress: (input) => dispatch(createConsumerAddress(input)),
    createOrders: (input) => dispatch(createOrders(input)),
    clearProductOrdersInCart: () => dispatch(clearProductOrdersInCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(GuestCheckout));
