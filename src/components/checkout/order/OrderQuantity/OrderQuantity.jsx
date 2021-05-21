import React, { Component } from "react";
import { LoadingOutlined } from "@ant-design/icons";

//scss
import "./OrderQuantity.scss";

class OrderQuantity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
    };
  }

  adjustItemQuantityClick = (requestedQuantity) => {
    this.setState({ isLoading: true, quantity: requestedQuantity }, () => {
      if (requestedQuantity === 0) {
        this.props.deleteOrderItem();
      } else {
        this.props.updateOrderItem(requestedQuantity);
      }
    });
  };

  incrementValue = () => {
    let { value } = this.state;
    value++;
    this.setState({ value });
    this.props.updateOrderItem(value);
  };

  decrementValue = () => {
    let { value } = this.state;
    --value;
    if (value <= 0) {
      this.setState({ isLoading: true }, () => this.props.deleteOrderItem());
      return;
    }
    this.setState({ value, isLoading: true }, () => this.props.updateOrderItem(value));
  };

  render() {
    const { error, isMobileView, OrderStatusSuccessful } = this.props;
    const { value } = this.state;
    return (
      <div className="order-quantity-detail">
        <div className={`order-quantity-wrapper ${!OrderStatusSuccessful ? "border" : ""}`}>
          {this.props.isOrderLoading || this.props.isOrderItemLoading ? (
            <LoadingOutlined />
          ) : (
            <>
              {!OrderStatusSuccessful ? (
                <div className="order-quantity">
                  <div onClick={this.decrementValue}>
                    <img src={require("./../../../../assets/common/minusOrange.svg")} alt="" />
                  </div>
                  <div>x{value}</div>
                  <div onClick={this.incrementValue}>
                    <img src={require("./../../../../assets/common/plusOrange.svg")} alt="" />
                  </div>
                </div>
              ) : (
                <div> x{value}</div>
              )}
            </>
          )}
        </div>

        {error && !isMobileView && <div className="error-message">{error}</div>}
      </div>
    );
  }
}

export default OrderQuantity;
