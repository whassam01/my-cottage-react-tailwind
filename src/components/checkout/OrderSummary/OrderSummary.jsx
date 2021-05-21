import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

//components
import { CurrencyValue } from "../../common";
import OrderCheckout from "../order/OrderCheckout";
import CheckoutDivider from "../CheckoutDivider/CheckoutDivider";

//constants
import { TransportationType, ScheduleDisplayType } from "./../../../constants";

//scss
import "./OrderSummary.scss";

export class OrderSummary extends Component {
  render() {
    const { checkoutEnabled, isCheckoutLoading, purchaseOrders, visible, cart } = this.props;
    const { orders } = cart.value;

    let addressMessage, address;

    if (orders.length > 0 && orders[0]?.type === TransportationType.DELIVERY) {
      address = orders[0].consumerAddress;
      addressMessage = `Deliver to ${address.street}, ${address.city}, ${address.postalCode}`;
    } else if (orders.length > 0 && orders[0]?.type === TransportationType.PICK_UP) {
      address = orders[0].pickupAddress;
      addressMessage = `Pickup from ${address.street}, ${address.city}, ${address.postalCode}`;
    }

    let subtotal = 0,
      taxAndServiceFees = 0,
      deliveryFee = 0,
      couponAmount = 0,
      subscriptionAmount = 0,
      totalAmount = 0,
      currency;

    orders.forEach((o) => {
      subtotal += o.cost.subtotal.amount;
      taxAndServiceFees += o.cost.estimatedTax.amount + o.cost.serviceFee.amount;
      deliveryFee += o.cost.deliveryFee.amount;
      couponAmount += o.cost.couponAmount.amount;
      subscriptionAmount += o.cost.subscriptionAmount.amount;
      totalAmount += o.cost.total.amount;
      currency = o.cost.total.currency;
    });

    const subtotalContainer = (
      <div className="checkout-orders-subtotal-data-row">
        <div>Subtotal</div>
        {subtotal > 0 && (
          <div>
            <CurrencyValue
              value={{
                amount: subtotal,
                currency,
              }}
            />
          </div>
        )}
      </div>
    );

    const taxAndServiceFeesContainer = (
      <div className="checkout-orders-subtotal-data-row">
        <div>Tax + Fees</div>
        {taxAndServiceFees > 0 && (
          <div>
            <CurrencyValue
              value={{
                amount: taxAndServiceFees,
                currency,
              }}
            />
          </div>
        )}
      </div>
    );

    const deliveryFeeContainer = (
      <div className="checkout-orders-subtotal-data-row">
        <div>Delivery Fee</div>
        {deliveryFee > 0 && (
          <div>
            <CurrencyValue
              value={{
                amount: deliveryFee,
                currency,
              }}
            />
          </div>
        )}
      </div>
    );

    const couponAmountContainer = (
      <div className="checkout-orders-subtotal-data-row checkout-orders-subtotal-data-row-green">
        <div>Discount</div>
        {couponAmount < 0 && (
          <div>
            <CurrencyValue
              value={{
                amount: couponAmount,
                currency,
              }}
            />
          </div>
        )}
      </div>
    );

    const subscriptionAmountContainer = (
      <div className="checkout-orders-subtotal-data-row checkout-orders-subtotal-data-row-green">
        <div>Subscription</div>
        {subscriptionAmount < 0 && (
          <div>
            <CurrencyValue
              value={{
                amount: subscriptionAmount,
                currency,
              }}
            />
          </div>
        )}
      </div>
    );

    const totalAmountContainer = (
      <div className="checkout-orders-subtotal-data-row">
        <div>Total</div>
        {totalAmount > 0 && (
          <div>
            <CurrencyValue
              value={{
                amount: totalAmount,
                currency,
              }}
            />
          </div>
        )}
      </div>
    );

    return (
      <div className="order-summary-wrapper">
        <div className="order-summary">
          <div className="order-summary-content">
            <div className="order-summary-title">Order Summary</div>
            <div className="order-summary-address">{addressMessage}</div>
            <div className="order-summaries-list-scrollable">
              <div className="order-summaries-list">
                {orders.map((order) => {
                  return (
                    <React.Fragment key={order.id}>
                      <div className="order-summary">
                        <div className="order-summary-delivery-date">
                          {moment(order.schedule.orderReadyStart).format("dddd, MMM D")}
                        </div>
                        <div className="order-summary-delivery-duration">
                          Estimated {ScheduleDisplayType[order.type]} between{" "}
                          {moment(order.schedule.orderReadyStart).format("h:mm a [-] ")}
                          {moment(order.schedule.orderReadyEnd).format("h:mm a")}
                        </div>
                        {order.orderItems.map((item) => {
                          return (
                            <div className={"order-summary-product"} key={item.id}>
                              <div>x{item.quantity}</div>
                              <div>{item.title}</div>
                              <div>
                                <CurrencyValue value={item.price} />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <CheckoutDivider style={{ margin: "1.0rem 0rem" }} />
                    </React.Fragment>
                  );
                })}
              </div>
              {subtotalContainer}
              {taxAndServiceFeesContainer}
              {deliveryFee > 0 && deliveryFeeContainer}
              {couponAmount < 0 && couponAmountContainer}
              {subscriptionAmount < 0 && subscriptionAmountContainer}
              {totalAmountContainer}
            </div>
            <div className="order-summary-checkout-footer">
              <OrderCheckout
                purchaseOrders={purchaseOrders}
                isCheckoutLoading={isCheckoutLoading}
                visible={visible}
                checkoutEnabled={checkoutEnabled}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

export default connect(mapStateToProps)(OrderSummary);
