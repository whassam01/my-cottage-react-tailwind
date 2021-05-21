import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Row, Col, Statistic } from "antd";

class OrderDetailLineItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: this.props.orderItem.quantity,
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

  removeItemClick = () => {
    this.setState({ isLoading: true }, () => {
      this.props.deleteOrderItem();
    });
  };

  render() {
    const {
      orderItem: { quantity, price, title },
    } = this.props;

    const orderItemTitleContainer = <Statistic value={title} />;

    const orderItemQuantityContainer = <Statistic value={quantity} />;

    const orderItemPriceContainer = (
      <Statistic value={`${price.currency.symbol} ${price.amount * quantity}`} />
    );

    const decrementQuantityContainer = (
      <Button onClick={() => this.adjustItemQuantityClick(quantity - 1)}>-</Button>
    );

    const incrementQuantityContainer = (
      <Button onClick={() => this.adjustItemQuantityClick(quantity + 1)}>+</Button>
    );

    const removeItemContainer = <Button onClick={() => this.removeItemClick()}>Remove</Button>;

    return (
      <div>
        <Row>
          <Col>{orderItemTitleContainer}</Col>
          <Col>
            {orderItemQuantityContainer}
            {decrementQuantityContainer}
            {incrementQuantityContainer}
            {removeItemContainer}
          </Col>
          <Col>{orderItemPriceContainer}</Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isMobileView: state.mobileView.isMobileView,
  };
};

export default connect(mapStateToProps)(OrderDetailLineItem);
