import React from "react";

//components
import { CurrencyValue } from "./../../common";
import CheckoutDivider from "../CheckoutDivider/CheckoutDivider";

// Redux
import { PlanInterval } from "../../../constants";

//scss
import "./PlanItem.scss";

const PlanItem = (props) => {
  const { plan } = props;

  return (
    <div className="plan-item-wrapper">
      <div className="plan-item">
        {plan && (
          <div className="order-item-body">
            <div className="order-item-title-meals">
              <div className="order-item-title">{plan.title}</div>
              <div className="order-item-meals">{`Up to ${plan.quantity} meals per ${
                plan.interval === PlanInterval.WEEKLY ? "week" : "month"
              }`}</div>
            </div>
            <div>
              <div className="order-item-subtotal-data-row">
                <div>Subtotal</div>
                <div>
                  <CurrencyValue value={plan.price} />
                </div>
              </div>
              <div className="order-item-subtotal-data-row">
                <div>Tax</div>
                <div>
                  <CurrencyValue value={props.tax} />
                </div>
              </div>
              <div className="order-item-subtotal-data-row">
                <div>Total</div>
                <div>
                  <CurrencyValue value={props.total} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <CheckoutDivider />
    </div>
  );
};

export default PlanItem;
