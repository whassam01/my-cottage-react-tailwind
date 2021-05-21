import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Spin } from "antd";

// Components
import { Toolbar, Container } from "../components/common";

// Redux
import { AuthenticationActionType, ConsumerActionType } from "../store/actiontypes";
import { getUserCredentials, getConsumer } from "../store/actions";
import Purchase from "../components/purchase/Purchase";

import { PageRoute } from "../constants";

class Purchases extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount = () => {
    this.props.getUserCredentials();
  };

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

  onTabChange = (tab) => {
    this.setState({ activeTab: tab });
  };

  signOut = () => {
    this.props.history.push(PageRoute.HOME);
  };

  render() {
    const { authentication, account } = this.props;
    const { isLoading } = this.state;

    if (authentication.status === AuthenticationActionType.GET_CURRENT_SESSION_ERROR) {
      return <Redirect to={PageRoute.HOME} />;
    }

    if (account.status === ConsumerActionType.GET_CONSUMER_ERROR) {
      return <Redirect to={PageRoute.HOME} />;
    }

    return (
      <div className="purchases">
        <Toolbar onSignOut={this.signOut} />
        <div className="body-wrapper">
          <Container>{isLoading ? <Spin tip="Loading..." /> : <Purchase />}</Container>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authentication: state.authentication,
    account: state.consumer.account,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserCredentials: () => dispatch(getUserCredentials()),
    getConsumer: (id) => dispatch(getConsumer({ id })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Purchases);
