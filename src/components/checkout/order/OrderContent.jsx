import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Tag, Input } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import moment from "moment";

// Redux
import { OrderActionType, OrderItemActionType } from "../../../store/actiontypes";
import { CurrencyValue, ProductCrossIcon, ProductTickIcon } from "../../common";
//icons
import arrowUpDark from "./../../../assets/common/arrowUpDark.svg";
import OrderItem from "./OrderItem";
import { OrderStatus, ErrorCode } from "../../../constants";

class OrderContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: "",
      isLoading: false,
      detailsVisible: false,
      isShowOrderDetail: false,
      isTextAreaEnable: false,
      note: props.order.note,
      isShowAttachedNote: false,
    };
  }

  componentDidUpdate(prevProps) {
    const { cart } = this.props;

    const matchingOrder = cart.value.orders.find((o) => o.id === this.props.order.id);
    const prevMatchingOrder = prevProps.cart.value.orders.find((o) => o.id === this.props.order.id);
    const { cartStatus } = matchingOrder;
    if (cartStatus !== prevMatchingOrder.cartStatus) {
      if (
        cartStatus === OrderItemActionType.UPDATE_ORDER_ITEM_SUCCESS ||
        cartStatus === OrderItemActionType.DELETE_ORDER_ITEM_SUCCESS
      ) {
        if (matchingOrder.status === OrderStatus.IN_REVIEW) {
          if (matchingOrder.orderItems.length === 0) {
            this.setState({ isLoading: true, errorMessage: "" }, () =>
              this.props.deleteOrder(this.props.order.id)
            );
          } else {
            this.setState({ isLoading: true, errorMessage: "" }, () =>
              this.props.calculateOrder(this.props.order.id)
            );
          }
        }
      } else if (cartStatus === OrderActionType.CALCULATE_ORDER_SUCCESS) {
        this.setState({ isLoading: false, errorMessage: "" });
      } else if (cartStatus === OrderActionType.CALCULATE_ORDER_ERROR) {
        this.setState({ errorMessage: matchingOrder.error.message }, () =>
          this.props.getOrder(matchingOrder.id)
        );
      } else if (cartStatus === OrderActionType.GET_ORDER_SUCCESS) {
        this.setState({ isLoading: false });
      } else if (cartStatus === OrderActionType.GET_ORDER_ERROR) {
        // TODO disable everything?
      } else if (
        cartStatus === OrderActionType.TRANSITION_ORDER_REQUESTED ||
        cartStatus === OrderActionType.APPLY_CARD_TO_ORDER_REQUESTED ||
        cartStatus === OrderActionType.APPLY_DELIVERY_ADDRESS_TO_ORDER_REQUESTED
      ) {
        if (matchingOrder.status === OrderStatus.IN_REVIEW) {
          this.setState({ isLoading: true });
        }
      } else if (cartStatus === OrderActionType.TRANSITION_ORDER_SUCCESS) {
        if (matchingOrder.status === OrderStatus.PURCHASED) {
          this.setState({ isLoading: false });
        }
      } else if (
        cartStatus === OrderActionType.APPLY_CARD_TO_ORDER_SUCCESS ||
        cartStatus === OrderActionType.APPLY_DELIVERY_ADDRESS_TO_ORDER_SUCCESS
      ) {
        if (matchingOrder.status === OrderStatus.IN_REVIEW) {
          // check all card related errors
          if (matchingOrder.error && matchingOrder.error.code !== ErrorCode.CARD_EXPIRED_ERROR) {
            this.setState({ isLoading: false });
          } else {
            this.setState({ isLoading: false, errorMessage: "" });
          }
        }
      } else if (
        cartStatus === OrderActionType.TRANSITION_ORDER_ERROR ||
        cartStatus === OrderActionType.APPLY_CARD_TO_ORDER_ERROR ||
        cartStatus === OrderActionType.APPLY_DELIVERY_ADDRESS_TO_ORDER_ERROR
      ) {
        this.setState({ isLoading: false, errorMessage: matchingOrder.error.message });
      }
    }
  }

  showDetailsClick = (e) => {
    this.setState({ detailsVisible: true });
  };

  hideDetailsClick = (e) => {
    this.setState({ detailsVisible: false });
  };

  toggleShowDetail = () => {
    this.setState({ isShowOrderDetail: !this.state.isShowOrderDetail });
  };

  enableTextarea = (e) => {
    //enable pointer events and set focus of textarea
    this.setState({ isTextAreaEnable: true });
    if (this.textareaRef) this.textareaRef.focus();
  };

  saveTextarea = (e) => {
    e.stopPropagation();
    this.setState({ isTextAreaEnable: false });
    this.textareaRef.blur();
    this.props.updateOrder({
      note: this.state.note,
    });
  };

  cancelTextarea = (e) => {
    e.stopPropagation();
    this.setState(
      {
        note: this.props.order.note,
        isTextAreaEnable: false,
      },
      () => this.textareaRef.blur()
    );
  };

  showAdditionalNotes = () => {
    this.setState({ isShowAttachedNote: true });
    this.enableTextarea();
  };

  render() {
    const { order, isMobileView } = this.props;
    const { isShowOrderDetail, isLoading, errorMessage, isTextAreaEnable } = this.state;
    const OrderStatusSuccessful = order.status === OrderStatus.PURCHASED;
    const orderOutcomeContainer = (
      <div>
        {isLoading ? (
          <LoadingOutlined />
        ) : OrderStatusSuccessful ? (
          <div className="order-status-successful">Successfully charged!</div>
        ) : errorMessage === "" ? null : (
          <div className="order-status-error">{errorMessage}</div>
        )}
      </div>
    );

    const heightOfNotesDiv = this.state.isShowAttachedNote ? 166 : 0;
    return (
      <div
        className={`checkout-order-item-wrapper ${
          OrderStatusSuccessful
            ? "order-status-successful"
            : errorMessage
              ? "order-status-error"
              : null
          }`}>
        <div className="checkout-order-item">
          <div className="checkout-order-item-head" onClick={this.toggleShowDetail}>
            <div className="checkout-order-item-head-left">
              <div>
                <Tag className="checkout-order-item-tag">{order.type.replace("_", " ")} </Tag>
              </div>
              <div className="checkout-order-item-schedule-time">
                {moment(order.schedule.orderReadyStart).format("ddd, MMM D [at] h:mm a [-] ")}
                {moment(order.schedule.orderReadyEnd).format("h:mm a")}
                {isMobileView && <div>{orderOutcomeContainer}</div>}
              </div>
            </div>
            {!isMobileView && <div>{orderOutcomeContainer}</div>}
            <div className="checkout-order-item-head-right">
              <div className="checkout-order-item-head-price">
                <CurrencyValue value={order.cost.total} />
              </div>
              <div
                className={`checkout-order-item-head-detail-trigger ${
                  isShowOrderDetail ? "trigger-active" : ""
                  }`}>
                {isMobileView ? (
                  <img src={arrowUpDark} alt="" />
                ) : (
                    <>
                      <div>{isShowOrderDetail ? "HIDE" : "SHOW"}</div>
                      <div>DETAILS</div>
                    </>
                  )}
              </div>
            </div>
          </div>
          {/* collapsable body starts here */}
          <div
            className="checkout-order-item-collapsable-body"
            ref={(r) => (this.bodyRef = r)}
            style={
              isShowOrderDetail ? { maxHeight: this.bodyRef.scrollHeight + heightOfNotesDiv } : {}
            }>
            <div className="checkout-order-item-divider"></div>
            <div className="checkout-order-item-orders">
              <div className="checkout-orders-title-row">
                <div>Description</div>
                <div>Quantity</div>
                <div>Amount</div>
              </div>
              {order.orderItems.map((item) => {
                return (
                  <OrderItem
                    key={item.id}
                    item={item}
                    order={order}
                    OrderStatusSuccessful={OrderStatusSuccessful}
                    isOrderLoading={isLoading}
                    updateOrderItem={(quantity) => {
                      this.props.updateOrderItem({
                        orderId: order.id,
                        orderItemId: item.id,
                        quantity,
                      });
                    }}
                    deleteOrderItem={() =>
                      this.props.deleteOrderItem({
                        orderId: order.id,
                        orderItemId: item.id,
                      })
                    }
                  />
                );
              })}
            </div>
            <div className="checkout-order-item-subtotal">
              <div className="checkout-order-item-subtotal-title">Subtotal</div>
              <div className="checkout-orders-subtotal-data-row">
                <div>Tax</div>
                <div>
                  <CurrencyValue value={order.cost.estimatedTax} />
                </div>
              </div>
              <div className="checkout-orders-subtotal-data-row">
                <div>Service Fee</div>
                <div>
                  <CurrencyValue value={order.cost.serviceFee} />
                </div>
              </div>
              {order.cost.deliveryFee.amount > 0 && (
                <div className="checkout-orders-subtotal-data-row">
                  <div>Delivery Fee</div>
                  <div>
                    <CurrencyValue value={order.cost.deliveryFee} />
                  </div>
                </div>
              )}
              {order.cost.couponAmount.amount < 0 && (
                <div className="checkout-orders-subtotal-data-row checkout-orders-subtotal-data-row-green">
                  <div>Discount {order.cost.couponName ? order.cost.couponName : ""}</div>
                  <div>
                    <CurrencyValue value={order.cost.couponAmount} />
                  </div>
                </div>
              )}
              {order.cost.subscriptionAmount.amount < 0 && (
                <div className="checkout-orders-subtotal-data-row checkout-orders-subtotal-data-row-green">
                  <div>Subscription</div>
                  <div>
                    <CurrencyValue value={order.cost.subscriptionAmount} />
                  </div>
                </div>
              )}
              <div className="checkout-order-item-total-amount">
                Total of <CurrencyValue value={order.cost.total} />
              </div>
            </div>
            {/* additional notes start here */}
            {order.note || this.state.isShowAttachedNote ? (
              <div className="additional-notes">
                <div className="additional-notes-title">ADDITIONAL NOTES</div>
                <div
                  className="additional-notes-input"
                  style={isTextAreaEnable ? {} : { backgroundColor: "#F6F8FA" }}
                  onClick={this.enableTextarea}>
                  <Input.TextArea
                    disabled={isTextAreaEnable ? false : true}
                    autoSize
                    placeholder="Enter additional notes"
                    defaultValue={this.state.note}
                    value={this.state.note}
                    onChange={(e) => this.setState({ note: e.target.value })}
                    ref={(r) => (this.textareaRef = r)}
                    style={
                      isTextAreaEnable
                        ? { pointerEvents: "all" }
                        : { pointerEvents: "none", backgroundColor: "#F6F8FA", color: "#768ca5" }
                    }
                  />
                  {isTextAreaEnable && (
                    <>
                      <Button
                        onClick={this.cancelTextarea}
                        style={{ color: "#768ca5", backgroundColor: "#ffffff", border: "none" }}>
                        {isMobileView ? <ProductCrossIcon /> : "Cancel"}
                      </Button>
                      <Button
                        onClick={this.saveTextarea}
                        style={{ color: "#ffffff", backgroundColor: "#fb775a", border: "none" }}>
                        {isMobileView ? <ProductTickIcon /> : "Save"}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ) : (
                <div className="attach-note" onClick={this.showAdditionalNotes}>
                  Attach a note
                </div>
              )}
          </div>
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
