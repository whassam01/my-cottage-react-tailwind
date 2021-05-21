import React from "react";
import { connect } from "react-redux";

// Components
import { Container } from "./../../../components/common";
import AllOrders from "./../../../components/checkout/order/AllOrders";
import CheckoutAddress from "./../../../components/checkout/CheckoutAddress/CheckoutAddress";
import CheckoutCard from "./../../../components/checkout/CheckoutCard/CheckoutCard";

import OrderSummary from "./../../../components/checkout/OrderSummary/OrderSummary";
import OrderCheckout from "./../../../components/checkout/order/OrderCheckout";
import CheckoutDivider from "./../../../components/checkout/CheckoutDivider/CheckoutDivider";

//scss
import "./OrderCheckoutContainer.scss";
import GuestAddCardForm from "./GuestAddCardForm/GuestAddCardForm";

//actions
import { createCardPaymentMethod, createConsumerCard } from "../../../store/actions";

//constant
import { ConsumerRoles } from "../../../constants";

class OrderCheckoutContainer extends React.Component {
  render() {
    const { consumer } = this.props;
    const isGuest = consumer?.role === ConsumerRoles.GUEST_CONSUMER;
    let step = 0;
    return (
      <div className="checkout-content-wrapper">
        <Container style={{ marginTop: "2rem" }}>
          {isGuest && (
            <>
              <div className="address-info-step">
                <div className="address-info-step-head">
                  <div className="address-info-step-head-info">Step {++step}: Contact Info</div>
                </div>
                <div className="address-info-step-body">
                  <div>
                    {consumer.firstName} {consumer.lastName}
                  </div>
                  <div>{consumer.phoneNumber}</div>
                  <div>{consumer.email}</div>
                </div>
              </div>
              <CheckoutDivider style={{ margin: "2rem 0rem" }} />
            </>
          )}
          <CheckoutAddress
            applyAddress={this.props.applyAddress}
            showAddAddress={this.props.showAddAddress}
            selectedAddressId={this.props.selectedAddressId}
            orderHasAddress={this.props.orderHasAddress}
            stepNumber={++step}
          />
          <CheckoutDivider style={{ margin: "2rem 0rem" }} />
          <AllOrders
            calculateOrder={this.props.calculateOrder}
            deleteOrder={this.props.deleteOrder}
            updateOrder={this.props.updateOrder}
            getOrder={this.props.getOrder}
            updateOrderItem={this.props.updateOrderItem}
            deleteOrderItem={this.props.deleteOrderItem}
            stepNumber={++step}
          />
          <CheckoutDivider style={{ margin: "2rem 0rem" }} />
          {isGuest && (
            <div className="guest-checkout-payment-step">
              <div className="guest-checkout-payment-step-head">
                <div>Step {++step}: Payment</div>
                <div>* If there are multiple orders, we will process each order individually.</div>
              </div>
              <GuestAddCardForm
                guestAddCardFormInputChange={this.props.guestAddCardFormInputChange}
              />
            </div>
          )}
          {!isGuest && (
            <>
              <CheckoutCard
                applyCard={this.props.applyCard}
                showAddCard={this.props.showAddCard}
                selectedCardId={this.props.selectedCardId}
                orderHasCard={this.props.orderHasCard}
                stepNumber={++step}
              />
            </>
          )}
          <CheckoutDivider style={{ margin: "2rem 0rem" }} />
          <div className="checkout-step-4">
            <div className="step-4-title">Step {++step}: Discount Code</div>
            <OrderCheckout applyCoupon={this.props.applyCoupon} />
          </div>
          <div className="mobileview-order-checkout-fixed">
            <OrderCheckout
              purchaseOrders={this.props.purchaseOrders}
              isCheckoutLoading={this.props.isCheckoutLoading}
              visible={this.props.isCheckoutAnimationVisible}
              checkoutEnabled={this.props.checkoutEnabled}
            />
          </div>
        </Container>
        <OrderSummary
          purchaseOrders={this.props.purchaseOrders}
          isCheckoutLoading={this.props.isCheckoutLoading}
          visible={this.props.isCheckoutAnimationVisible}
          checkoutEnabled={this.props.checkoutEnabled}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    card: state.consumer.card,
    isMobileView: state.mobileView.isMobileView,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createConsumerCard: (input) => dispatch(createConsumerCard(input)),
    createCardPaymentMethod: (stripe, input) => dispatch(createCardPaymentMethod(stripe, input)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderCheckoutContainer);
