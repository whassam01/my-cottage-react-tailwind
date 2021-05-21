import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Typography, Card } from "antd";
import CartPlanItem from "./CartPlanItem";

// Redux
import { CartActionType } from "../../../../store/actiontypes";
import {
  clearProductOrdersInCart,
  setActivePlanOrdersInCart,
  removePlanOrderInCart,
} from "../../../../store/actions";

// Components
import { PrimaryButton } from "../../../common";

// Utils
import { PageRoute } from "../../../../constants";

// Styling
import "./CartPanel.scss";

const { Title } = Typography;

class CartPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transitionToCheckout: false,
      CartValue: 0,
    };
  }

  componentDidUpdate = (prevProps) => {};

  createPlanOrders = () => {
    this.props.clearProductOrdersInCart();
    this.props.setActivePlanOrdersInCart();
  };

  render() {
    const {
      status,
      value: { plans },
    } = this.props.cart;

    if (status === CartActionType.SET_ACTIVE_PLAN_ORDERS_IN_CART) {
      const {
        selectedBusiness: { urlDomain, urlSubdomain },
      } = this.props.location.value;
      return <Redirect to={`/${urlDomain}/${urlSubdomain}${PageRoute.CHECKOUT}`} />;
    }

    const renderCartTotal = () => {
      let { CartValue } = this.state;
      plans.forEach((a) => {
        CartValue += a.plan.price.amount;
      });
      return (CartValue / 100).toFixed(2);
    };

    return (
      <Card className="subscription-plans-card">
        <Title>My Cart </Title>
        {plans.length === 0 ? (
          <div className="empty-business-cart-box">Add a subscription to your cart</div>
        ) : (
          <>
            {plans.map((p) => (
              <CartPlanItem
                key={p.plan.id}
                plan={p.plan}
                quantity={p.quantity}
                removePlan={() => this.props.removePlanOrderInCart(p.plan.id)}
              />
            ))}{" "}
          </>
        )}
        <div className="Plans-cart-total flex">
          <p>Subtotal </p> <p>${renderCartTotal()}</p>
        </div>
        <PrimaryButton
          eventHandler={this.createPlanOrders}
          disabled={plans.length === 0}
          text="Proceed to checkout"
        />
        {/* <div className="payment-note">
          We accept every payment method. Standard rates may apply lorem ipsum dolor sit amet.
        </div> */}
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authentication: state.authentication,
    business: state.business.id,
    location: state.business.location,
    cart: state.cart,
    transportation: state.business.transportation,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearProductOrdersInCart: () => dispatch(clearProductOrdersInCart()),
    setActivePlanOrdersInCart: () => dispatch(setActivePlanOrdersInCart()),
    removePlanOrderInCart: (planId) => dispatch(removePlanOrderInCart({ planId })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartPanel);
