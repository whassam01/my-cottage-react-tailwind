import React, { Component } from "react";
import { connect } from "react-redux";

import { Row, Col } from "antd";

// Components
import CartPanel from "./cart/CartPanel";
import PlanPanel from "./plan/PlanPanel";

class SubscriptionPanel extends Component {
  render() {
    const { isMobileView } = this.props;
    return (
      <div>
        <Row gutter={[15, 15]}>
          <Col span={isMobileView ? 24 : 14}>
            <PlanPanel />
          </Col>
          {!isMobileView && (
            <Col span={10}>
              <CartPanel onShowLogin={this.props.onShowLogin} />
            </Col>
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

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionPanel);
