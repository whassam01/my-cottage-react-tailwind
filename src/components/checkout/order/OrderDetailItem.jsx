import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Typography, Row, Col, Statistic } from "antd";

// Components
import OrderDetailLineItem from "./OrderDetailLineItem";
import OrderDetailNoteForm from "./OrderDetailNoteForm";

const { Paragraph } = Typography;

class OrderDetailItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailsVisible: false,
      editNoteVisible: false,
      note: null,
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  editNoteClick = () => {
    this.setState({ editNoteVisible: true });
  };

  hideOrderDetailNoteForm = () => {
    this.setState({ editNoteVisible: false });
  };

  render() {
    const { orderId, items, cost, note } = this.props;
    const {
      subtotal,
      estimatedTax,
      serviceFee,
      deliveryFee,
      couponAmount,
      subscriptionAmount,
      total,
    } = cost;

    const orderSubtotalContainer = (
      <Row>
        <Col>
          <Statistic value="Subtotal" />
        </Col>
        <Col>
          <Statistic value={`${subtotal.currency.symbol} ${subtotal.amount}`} />
        </Col>
      </Row>
    );

    const orderTaxContainer = (
      <Row>
        <Col>
          <Statistic value="Tax" />
        </Col>
        <Col>
          <Statistic value={`${estimatedTax.currency.symbol} ${estimatedTax.amount}`} />
        </Col>
      </Row>
    );

    const orderServiceFeeContainer = (
      <Row>
        <Col>
          <Statistic value="Service Fee" />
        </Col>
        <Col>
          <Statistic value={`${serviceFee.currency.symbol} ${serviceFee.amount}`} />
        </Col>
      </Row>
    );

    const orderDeliveryFeeContainer = (
      <Row>
        <Col>
          <Statistic value="Delivery Fee" />
        </Col>
        <Col>
          <Statistic value={`${deliveryFee.currency.symbol} ${deliveryFee.amount}`} />
        </Col>
      </Row>
    );

    const orderCouponContainer = (
      <Row>
        <Col>
          <Statistic value="Coupon Amount" />
        </Col>
        <Col>
          <Statistic value={`${couponAmount.currency.symbol} ${couponAmount.amount}`} />
        </Col>
      </Row>
    );

    const orderSubscriptionContainer = (
      <Row>
        <Col>
          <Statistic value="Subscription Amount" />
        </Col>
        <Col>
          <Statistic value={`${subscriptionAmount.currency.symbol} ${subscriptionAmount.amount}`} />
        </Col>
      </Row>
    );

    const orderTotalContainer = (
      <Row>
        <Col>
          <Statistic value="Total" />
        </Col>
        <Col>
          <Statistic value={`${total.currency.symbol} ${total.amount}`} />
        </Col>
      </Row>
    );

    const orderNoteViewContainer = (
      <Row>
        <Col>
          <Statistic value="Additional Notes" />
          <Paragraph>{note}</Paragraph>
        </Col>
        <Button onClick={this.editNoteClick}>Edit Note</Button>
      </Row>
    );

    return (
      <div>
        <Row>
          {items.map((item, key) => (
            <OrderDetailLineItem
              key={key}
              orderItem={item}
              updateOrderItem={(quantity) =>
                this.props.updateOrderItem({
                  orderId,
                  orderItemId: item.id,
                  quantity,
                })
              }
              deleteOrderItem={() =>
                this.props.deleteOrderItem({
                  orderId,
                  orderItemId: item.id,
                })
              }
            />
          ))}
          {orderSubtotalContainer}
          {orderTaxContainer}
          {orderServiceFeeContainer}
          {orderDeliveryFeeContainer}
          {orderCouponContainer}
          {orderSubscriptionContainer}
          {orderTotalContainer}
          {this.state.editNoteVisible ? (
            <OrderDetailNoteForm
              note={note}
              updateOrder={(note) =>
                this.props.updateOrder({
                  orderId,
                  note,
                })
              }
              hideOrderDetailNoteForm={this.hideOrderDetailNoteForm}
            />
          ) : (
            orderNoteViewContainer
          )}
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

export default connect(mapStateToProps)(OrderDetailItem);
