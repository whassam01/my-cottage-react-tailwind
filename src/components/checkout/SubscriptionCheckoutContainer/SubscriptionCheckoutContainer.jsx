import React from "react";
import { connect } from "react-redux";

import { Container } from "./../../../components/common";
import CardAndOrder from "./../../../components/checkout/CardAndOrder/CardAndOrder";
import PlanCheckoutSummary from "./PlanCheckoutSummary/PlanCheckoutSummary";
import "./SubscriptionCheckoutContainer.scss";

export class SubscriptionCheckoutContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      isTermsAndConditionsAccepted: false,
    };
  }
  buildTaxCurrency = () => {
    if (!this.props.plan) return;
    const {
      plan: {
        price: { amount, currency },
      },
    } = this.props;
    const data = this.props.taxRate?.value?.data;
    const rate = data && data.length > 0 ? data[0].percent / 100 : 0;
    return {
      amount: Math.ceil(amount * rate),
      currency,
    };
  };
  buildTotalCurrency = (taxAmount) => {
    if (!this.props.plan) return;

    const {
      plan: {
        price: { amount, currency },
      },
    } = this.props;
    return {
      amount: Math.ceil(amount + taxAmount),
      currency,
    };
  };

  render() {
    const { isTermsAndConditionsAccepted } = this.state;
    const tax = this.buildTaxCurrency();
    const total = this.buildTotalCurrency(tax?.amount);
    return (
      <div className="subscription-checkout-container">
        <div className="subscription-checkout-plan-info">
          <Container style={{ marginTop: "2rem" }}>
            <CardAndOrder
              showAddCard={this.props.showAddCard}
              hideAddCard={this.props.hideAddCard}
              plan={this.props.plan}
              tax={tax}
              total={total}
              selectedCardId={this.props.selectedCardId}
              isTermsAndConditionsAccepted={isTermsAndConditionsAccepted}
              setTermsAndCondition={() =>
                this.setState({ isTermsAndConditionsAccepted: !isTermsAndConditionsAccepted })
              }
              isCheckoutLoading={this.props.isCheckoutLoading}
              completePurchase={this.props.completePurchase}
            />
          </Container>
        </div>

        <div className="subscription-checkout-plan-summary">
          <PlanCheckoutSummary
            isTermsAndConditionsAccepted={isTermsAndConditionsAccepted}
            plan={this.props.plan}
            isCheckoutLoading={this.props.isCheckoutLoading}
            completePurchase={this.props.completePurchase}
            tax={tax}
            total={total}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    taxRate: state.business.taxRate,
  };
};

export default connect(mapStateToProps)(SubscriptionCheckoutContainer);
