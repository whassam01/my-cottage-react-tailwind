import React, { Component } from "react";
import { PageHeader, Button } from "antd";

// Components
import Fullpage from "../components/home/FullPage";
import Logo from "../components/common/logo/Logo";

// Utils
import { DASHBOARD_LOGIN_LINK } from "../constants";
import "./general.scss";
class Home extends Component {
  goToDashboard = () => {
    window.location = DASHBOARD_LOGIN_LINK;
  };

  render() {
    return (
      <div className="home">
        <div className="site-page-header-ghost-wrapper">
          <PageHeader
            ghost={false}
            title={<Logo />}
            extra={[
              <Button key="3" id="login-button" onClick={this.goToDashboard}>
                SIGN IN
              </Button>,
            ]}
          />
        </div>
        <Fullpage />
      </div>
    );
  }
}

export default Home;
