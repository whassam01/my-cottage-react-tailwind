import React from "react";
import { connect } from "react-redux";
import { PrimaryButton } from "./../../../common";
import PlanItem from "../../plan/PlanItem";
import "./PlanCheckoutSummary.scss";

const PlanCheckoutSummary = (props) => {
  const { isTermsAndConditionsAccepted, tax, total } = props;
  return (
    <div className="plan-checkout-summary">
      <div className="plan-checkout-summary-title">Order Summary</div>
      <PlanItem plan={props.plan} tax={tax} total={total} />
      <PrimaryButton
        className="plan-checkout-button"
        eventHandler={props.completePurchase}
        loading={props.isCheckoutLoading}
        disabled={!isTermsAndConditionsAccepted}
        text={`Purchase ${(total?.amount / 100).toFixed(2)}${total?.currency.symbol}`}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    taxRate: state.business.taxRate,
  };
};

export default connect(mapStateToProps)(PlanCheckoutSummary);
