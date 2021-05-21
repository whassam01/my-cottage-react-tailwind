import React, { Component } from "react";

import homeLogo from "../../../assets/common/LOGO.png";

import "./logo.scss";

export class Logo extends Component {
  render() {
    return (
      <div className="navbar-logo-container">
        <img src={homeLogo} alt="home logo" />
      </div>
    );
  }
}

export default Logo;
