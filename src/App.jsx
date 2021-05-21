import React, { Fragment, Component } from "react";
import { connect } from "react-redux";

// Components
import Routes from "./Routes";

// Redux
import { setMobileView } from "./store/actions/index";

import { ParallaxProvider } from 'react-scroll-parallax';

// import "antd/dist/antd.css";
// import "./App.scss";
import './App.css';
//import "./containers/general.scss";
//import "./scss/main.scss";


class App extends Component {
  componentDidMount = () => {
    this.setMobileView(window.innerWidth);

    window.addEventListener("resize", () => this.setMobileView(window.innerWidth), false);
  };

  setMobileView(width) {
    const isMobileView = this.props.isMobileView;
    if (width < 768 && !isMobileView) {
      this.props.setMobileView(true);
    } else if (width >= 768 && isMobileView) {
      this.props.setMobileView(false);
    }
  }

  render() {
    return (
      <ParallaxProvider>
        <Fragment>
          <Routes />
        </Fragment>
      </ParallaxProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isMobileView: state.mobileView.isMobileView,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setMobileView: (isMobileView) => {
      dispatch(setMobileView(isMobileView));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
