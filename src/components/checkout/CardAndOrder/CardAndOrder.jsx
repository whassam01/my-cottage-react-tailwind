import React from "react";
import { Checkbox } from "antd";

//components
import AllCards from "./../card/AllCards";
import PlanItem from "../plan/PlanItem";
import CheckoutDivider from "../CheckoutDivider/CheckoutDivider";
import { PrimaryButton } from "../../common";

//scss
import "./CardAndOrder.scss";

const CardAndOrder = (props) => {
  const { tax, total, isTermsAndConditionsAccepted } = props;
  return (
    <div className="card-and-order-wrapper">
      <div className="card-and-order">
        <div className="card-and-order-card">
          <AllCards
            showAddCard={props.showAddCard}
            hideAddCard={props.hideAddCard}
            selectedCardId={props.selectedCardId}
            stepNumber={1}
          />
        </div>
        <CheckoutDivider />
      </div>
      <div className="plan-checkout-terms-conditions">
        <div className="plan-checkout-terms-conditions-title">
          Step 2: Subscription Terms & Agreements
        </div>
        <div className="plan-checkout-terms-conditions-body">
          <p>
            I agree to <span>Cottage’s terms and conditions</span> and the following:
          </p>
          <ul>
            <li>
              Aliquam sem semper elementum facilisis habitant aenean dignissim ullamcorper molestie
              elementum, arcu convallis bibendum metus
            </li>
            <li>Dictumst sed senectus nec egestas in</li>
            <li>Integer sagittis aliquam pharetra varius sed morbi nunc sed massa, ornare</li>
            <li>
              Semper elit purus gravida cras diam magna egestas diam amet, sed duis tellus et,
              scelerisque posuere mattis id
            </li>
            <li>
              Purus in rutrum eu tortor ut et, egestas sit elementum vel arcu, sed eget neque, vitae
              tempus morbi amet donec id id sit imperdiet elit
            </li>
          </ul>
          <p>
            Malesuada curabitur neque, mattis diam ut ullamcorper enim. Risus turpis eget massa, in
            tellus, accumsan non risus, habitant. Lorem nec cras varius at nulla duis dolor aliquet
            ut. Facilisi velit libero, nisi, at aliquam arcu cursus convallis. Aenean sit ac vitae
            lobortis et nec lectus. Accumsan elementum cursus lacus vulputate aliquam egestas diam
            dui.
          </p>
          <div className="plan-checkout-checkbox">
            <Checkbox onChange={props.setTermsAndCondition}>
              I agree to the terms and conditions
            </Checkbox>
          </div>
        </div>
      </div>

      <div className="mobile-view-plan-item">
        <div className="mobile-view-plan-item-title">Step 3: Summary</div>
        <PlanItem plan={props.plan} tax={tax} total={total} />
      </div>

      <div className="mobile-view-plan-checkout">
        <PrimaryButton
          className="plan-checkout-button"
          eventHandler={props.completePurchase}
          loading={props.isCheckoutLoading}
          disabled={!isTermsAndConditionsAccepted}
          text={`Purchase ${(total?.amount / 100).toFixed(2)}${total?.currency.symbol}`}
        />
      </div>
    </div>
  );
};

export default CardAndOrder;
