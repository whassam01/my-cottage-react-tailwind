import React, { Component } from "react";
import { connect } from "react-redux";

// Redux
import { OrderItemActionType } from "../../../store/actiontypes";
import { CurrencyValue } from "../../common";
//icons
import OrderQuantity from "./OrderQuantity/OrderQuantity";

class OrderContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailsVisible: false,
      isShowOrderDetail: false,
      isTextAreaEnable: false,
      note: props.order.note,
    };
  }

  componentDidUpdate(prevProps) {
    const { cart } = this.props;
    if (cart.status !== prevProps.cart.status) {
      if (cart.status === OrderItemActionType.UPDATE_ORDER_ITEM_REQUESTED) {
        const order = cart.value.orders.find((o) => o.id === this.props.order.id);
        const orderItem = order.orderItems.find((oi) => oi.id === this.props.item.id);
        if (orderItem.cartStatus === cart.status) {
          this.setState({ isLoading: true, errorMessage: null });
        }
      } else if (cart.status === OrderItemActionType.UPDATE_ORDER_ITEM_SUCCESS) {
        const order = cart.value.orders.find((o) => o.id === this.props.order.id);
        const orderItem = order.orderItems.find((oi) => oi.id === this.props.item.id);
        if (orderItem.cartStatus === cart.status) {
          this.setState({ isLoading: false, errorMessage: null });
        }
      } else if (cart.status === OrderItemActionType.UPDATE_ORDER_ITEM_ERROR) {
        const order = cart.value.orders.find((o) => o.id === this.props.order.id);
        const orderItem = order.orderItems.find((oi) => oi.id === this.props.item.id);
        if (orderItem.cartStatus === cart.status) {
          const { message } = orderItem.error;
          this.setState({
            errorMessage: message,
            isLoading: false,
            errors: {},
          });
        }
      }
    }
  }

  getTotalCost = (price, quantity) => {
    return {
      amount: price.amount * quantity,
      currency: price.currency,
    };
  };

  render() {
    const { item, OrderStatusSuccessful } = this.props;
    const { errorMessage } = this.state;
    return (
      <div
        className={errorMessage ? "checkout-orders-data-row error" : "checkout-orders-data-row"}
        key={item.id}>
        <div>{item.title}</div>
        <div className="checkout-orders-row-wrapper">
          <OrderQuantity
            value={item.quantity}
            OrderStatusSuccessful={OrderStatusSuccessful}
            error={this.state.errorMessage}
            isMobileView={this.props.isMobileView}
            isOrderLoading={this.props.isOrderLoading}
            isOrderItemLoading={this.state.isLoading}
            updateOrderItem={(quantity) => {
              this.props.updateOrderItem(quantity);
            }}
            deleteOrderItem={() => this.props.deleteOrderItem()}
          />
        </div>
        <div>
          <CurrencyValue value={this.getTotalCost(item.price, item.quantity)} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    isMobileView: state.mobileView.isMobileView,
  };
};

export default connect(mapStateToProps)(OrderContent);
