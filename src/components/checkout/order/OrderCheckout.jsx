import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Input } from "antd";
import isLength from "validator/lib/isLength";

// Redux
import { OrderActionType } from "../../../store/actiontypes";

// Utils
import { isEmpty, isEmptyObject } from "./../../../utils";

//scss
import "./OrderCheckout.scss";
import { OrderStatus } from "../../../constants";
// image
import preparingFood from "../../../assets/business/product/prepare_food.gif";
import Modal from "antd/lib/modal/Modal";

const initialState = {
  errorMessage: "",
  errors: {},
  isLoading: false,
  code: null,
};

const FormFieldContent = {
  CODE: {
    title: "COUPON",
    label: "Code",
    field: "code",
  },
};

class OrderCheckout extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidUpdate(prevProps) {
    const { cart } = this.props;
    if (cart.status !== prevProps.cart.status) {
      if (cart.status === OrderActionType.APPLY_COUPON_TO_ORDER_SUCCESS) {
        this.setState({ isLoading: false });
      } else if (cart.status === OrderActionType.APPLY_COUPON_TO_ORDER_ERROR) {
        const { message } = cart.error;
        this.setState({
          errorMessage: message,
          isLoading: false,
          errors: {},
        });
      }
    }
  }

  onApplyCouponClick = (e) => {
    const { errors } = this.validateInput();
    this.setState({
      errors,
      errorMessage: initialState.errorMessage,
    });

    if (!isEmptyObject(errors)) {
      return;
    }
    this.setState({ isLoading: true, visible: true }, () =>
      this.props.applyCoupon(this.state.code)
    );
  };

  aggregateTotalCost = (orders) => {
    let total = 0;
    orders.forEach((o) => {
      if (o.status === OrderStatus.IN_REVIEW) {
        return o.cost && o.cost.total ? (total += o.cost.total.amount) : (total += 0);
      }
    });
    return (total / 100).toFixed(2);
  };

  validateInput = () => {
    const { CODE } = FormFieldContent;
    const { code } = this.state;
    const errors = {};

    if (!isEmpty(code) && !isLength(code, { min: 3, max: 40 })) {
      errors.code = `${CODE.label} must be 3-40 characters`;
    }

    const sortedErrors = {};
    Object.keys(errors)
      .sort()
      .forEach((key) => (sortedErrors[key] = errors[key]));

    return { errors: sortedErrors };
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  renderApplyCoupon = () => {
    const { CODE } = FormFieldContent;
    const errorPayload =
      this.state.errorMessage !== initialState.errorMessage
        ? [this.state.errorMessage]
        : Object.values(this.state.errors);
    const errorBoxContainer = <span>{errorPayload}</span>;
    return (
      <div className="order-voucher-code-wrapper">
        <div className="order-checkout-input-code">
          <div className="order-checkout-input-code-input-control">
            <Input
              id="autocomplete"
              value={this.state.code}
              name={CODE.field}
              placeholder={CODE.label}
              className="checkout-coupen-input"
              onChange={this.handleInputChange}
            />
          </div>
          <div className="order-checkout-input-code-apply-button">
            <Button onClick={this.onApplyCouponClick} loading={this.state.isLoading}>
              Apply
            </Button>
          </div>
        </div>
        {this.state.errorMessage && <div className="message-box">{errorBoxContainer}</div>}
      </div>
    );
  };
  renderCheckoutButton = () => {
    const { orders } = this.props.cart.value;
    return (
      <div className="order-checkout-place-order">
        <Button
          style={{ width: "100%" }}
          onClick={this.props.purchaseOrders}
          loading={this.props.isCheckoutLoading}
          disabled={!this.props.checkoutEnabled}>
          Place order for ${this.aggregateTotalCost(orders)}
        </Button>
        <Modal footer={null} visible={this.props.visible} className="preparing-food-modal">
          <div className="preparing-food">
            <img src={preparingFood} alt="" />
            <div className="preparing-food-description">
              Placing your order, please do not refresh
            </div>
          </div>
        </Modal>
      </div>
    );
  };
  render() {
    return (
      <div className="order-checkout-wrapper">
        <div className="order-checkout">
          <div>
            {this.props.applyCoupon && this.renderApplyCoupon()}
            {this.props.purchaseOrders && this.renderCheckoutButton()}
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
    account: state.consumer.account,
  };
};

export default connect(mapStateToProps)(OrderCheckout);
