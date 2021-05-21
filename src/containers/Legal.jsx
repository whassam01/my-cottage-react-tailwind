import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Card } from "antd";
import { Link, withRouter } from "react-router-dom";

//css
import "./NotFound.css";

import { AuthenticationActionType, ConsumerActionType } from "../store/actiontypes";
import {
  getCurrentAuthenticatedUser,
  getUserCredentials,
  getConsumer,
  signOut,
  getActiveSchedulesInCart,
} from "../store/actions";

// Components
import { Toolbar, Login } from "../components/common";
import { PageRoute } from "../constants";
import Privacy from "../components/legal/Privacy";
import TermsConditions from "../components/legal/TermsConditions";

import "./Legal.scss";

class Legal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getUserCredentials();
    this.props.getActiveSchedulesInCart();
  }

  componentDidUpdate(prevProps) {
    const { authentication, account } = this.props;

    if (authentication.status !== prevProps.authentication.status) {
      if (
        authentication.status === AuthenticationActionType.GET_USER_CREDENTIALS_SUCCESS &&
        authentication.value.isAuthenticated
      ) {
        const consumerId = authentication.value.id;
        this.props.getConsumer(consumerId);
      }
    }

    if (account.status !== prevProps.account.status) {
      if (account.status === ConsumerActionType.GET_CONSUMER_SUCCESS) {
        this.setState({ isLoading: false });
      }
    }
  }

  onShowLogin = () => {
    this.setState({ isLoginVisible: true });
  };

  onHideLogin = () => {
    this.setState({ isLoginVisible: false });
  };

  render() {
    const { isLoginVisible } = this.state;
    const {
      isMobileView,
      signOut,
      match,
      location: { pathname },
    } = this.props;
    return (
      <div className="account">
        <Toolbar onSignOut={signOut} onShowLogin={this.onShowLogin} />
        <div className="account-container body-wrapper">
          <Row gutter={[30, 30]} style={{ margin: isMobileView ? "10px" : "30px" }}>
            <Col sm={24} xl={6}>
              <div className="account-help-wrapper">
                <h3>Legal</h3>
                <div className="help-tabs-list">
                  <p>
                    <Link
                      to={PageRoute.TERMS}
                      className={
                        pathname === PageRoute.LEGAL || pathname === PageRoute.TERMS
                          ? "active"
                          : null
                      }>
                      Terms & Conditions
                    </Link>
                  </p>
                  <p>
                    <Link
                      to={PageRoute.PRIVACY}
                      className={pathname === PageRoute.PRIVACY ? "active" : null}>
                      Privacy Policy
                    </Link>
                  </p>
                </div>
              </div>
            </Col>
            <Col sm={24} xl={18}>
              <Card bordered={false}>
                {(match.path === PageRoute.LEGAL || match.path === PageRoute.TERMS) && (
                  <TermsConditions />
                )}
                {match.path === PageRoute.PRIVACY && <Privacy />}
              </Card>
            </Col>
          </Row>
        </div>
        <Login visible={isLoginVisible} onClose={this.onHideLogin} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authentication: state.authentication,
    account: state.consumer.account,
    isMobileView: state.mobileView.isMobileView,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentAuthenticatedUser: () => dispatch(getCurrentAuthenticatedUser()),
    getUserCredentials: () => dispatch(getUserCredentials()),
    getConsumer: (id) => dispatch(getConsumer({ id })),
    getActiveSchedulesInCart: () => dispatch(getActiveSchedulesInCart()),
    signOut: () => dispatch(signOut()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Legal));
