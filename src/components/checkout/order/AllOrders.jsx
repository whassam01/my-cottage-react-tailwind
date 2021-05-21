import React, { Component } from "react";
import { connect } from "react-redux";

// Components
import OrderContent from "./OrderContent";

// Redux
import { OrderActionType } from "../../../store/actiontypes";
//scss
import "./AllOrders.scss";
class AllOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    const { cart } = this.props;
    if (
      cart.status === OrderActionType.GET_CONSUMER_ORDERS_SUCCESS ||
      cart.status === OrderActionType.GET_CONSUMER_ORDERS_ERROR
    ) {
      this.setState({ isLoading: false });
    }
  }

  componentDidUpdate(prevProps) {
    const { cart } = this.props;
    if (cart.status !== prevProps.cart.status) {
      if (
        cart.status === OrderActionType.GET_CONSUMER_ORDERS_SUCCESS ||
        cart.status === OrderActionType.GET_CONSUMER_ORDERS_ERROR
      ) {
        this.setState({ isLoading: false });
      }
    }
  }

  render() {
    const { orders } = this.props.cart.value;
    return (
      <div className="checkout-all-orders-wrapper">
        <div className="checkout-all-orders-count">
          Step {this.props.stepNumber}: Order Details
          {/* You have <span>{orders.length}</span> pending orders */}
        </div>
        <div className="checkout-all-orders">
          {orders.map((o) => (
            <OrderContent
              key={o.id}
              order={o}
              getOrder={() => this.props.getOrder(o.id)}
              calculateOrder={() => this.props.calculateOrder(o.id)}
              deleteOrder={() => this.props.deleteOrder(o.id)}
              updateOrder={(params) =>
                this.props.updateOrder({
                  ...params,
                  orderId: o.id,
                })
              }
              updateOrderItem={this.props.updateOrderItem}
              deleteOrderItem={this.props.deleteOrderItem}
            />
          ))}
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

export default connect(mapStateToProps)(AllOrders);
