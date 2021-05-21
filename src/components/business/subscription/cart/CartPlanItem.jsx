import React, { Component } from "react";

import { PlanInterval } from "../../../../constants";
import { CartActionButtons, CrossIcon } from "../../../common";

const PlanIntervalDescription = {
  [PlanInterval.WEEKLY]: "week",
  [PlanInterval.MONTHLY]: "month",
};

class CartPlanItem extends Component {
  render() {
    const { plan } = this.props;

    const titleContainer = <div>{plan.title}</div>;
    const mealQuantityContainer = (
      <div>
        {"Up to "} {plan.quantity} {"meals per "} {PlanIntervalDescription[plan.interval]}
      </div>
    );
    const removeButtonContainer = (
      <CartActionButtons actions={this.props.removePlan} icon={<CrossIcon />} />
    );
    return (
      <div className="plans-cart-detail">
        <div className="Plans-cart-title flex">
          {titleContainer} {removeButtonContainer}
        </div>
        <div className="Plans-cart-meal">{mealQuantityContainer}</div>
      </div>
    );
  }
}

export default CartPlanItem;
