import React, { Component } from "react";
import { connect } from "react-redux";

// Components
import PlanItem from "./PlanItem";

// Redux
import { BusinessActionType } from "../../../../store/actiontypes";
import { getPlans } from "../../../../store/actions";

// Utils
import { PlanStatus } from "../../../../constants";

class PlanPanel extends Component {
  componentDidMount = () => {
    const { business } = this.props;
    if (business.status === BusinessActionType.GET_BUSINESSES_BY_DOMAIN_SUCCESS) {
      this.getPlans();
    }
  };

  componentDidUpdate = (prevProps) => {
    const { business } = this.props;
    if (business.status !== prevProps.business.status) {
      if (business.status === BusinessActionType.GET_BUSINESSES_BY_DOMAIN_SUCCESS) {
        this.getPlans();
      }
    }
  };

  getPlans = () => {
    const businessId = this.props.business.value.id;

    this.props.getPlans(
      {
        id: businessId,
      },
      {
        statuses: [PlanStatus.ACTIVE],
      }
    );
  };

  render() {
    const plans = this.props.plan.value.edges;

    return (
      <div>
        {plans.map((p) => (
          <PlanItem key={p.node.id} plan={p.node} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    business: state.business.id,
    plan: state.business.plan,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPlans: (input, filters) => dispatch(getPlans(input, filters)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlanPanel);
