import React, { Component } from "react";
import { Modal } from "antd";

// Components
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import SignUpVerificationForm from "./SignUpVerificationForm";
import ResetPasswordForm from "./ResetPasswordForm";

//icons
import "../../../containers/general.scss";
import "./Login.scss";
import GuestCheckout from "./GuestCheckout/GuestCheckout";

const LoginStep = {
  SIGN_IN: "SIGN_IN",
  SIGN_UP: "SIGN_UP",
  GUEST_CHECKOUT: "GUEST_CHECKOUT",
  SIGN_UP_VERIFICATION: "SIGN_UP_VERIFICATION",
  FORGOT_PASSWORD: "FORGOT_PASSWORD",
};

const initialState = {
  step: LoginStep.SIGN_IN,
  email: "",
  phoneNumber: "",
  password: "",
  firstName: "",
  lastName: "",
};

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    if (this.props.step === LoginStep.GUEST_CHECKOUT) {
      this.setState({ step: this.props.step });
    }
  }

  goToStep = (step, params) => {
    this.setState({
      step,
      ...params,
    });
  };

  onTapChange = (key) => {
    this.setState({ step: key });
  };

  onCloseForm = () => {
    this.setState(initialState, () => this.props.onClose());
  };

  render() {
    let { step, firstName, lastName, email, phoneNumber, password } = this.state;
    let cardContainer = null;
    if (step === LoginStep.GUEST_CHECKOUT) {
      cardContainer = (
        <GuestCheckout
          goToSignIn={() => this.goToStep(LoginStep.SIGN_IN)}
          goToSignUp={() => this.goToStep(LoginStep.SIGN_UP)}
        />
      );
    } else if (step === LoginStep.FORGOT_PASSWORD) {
      cardContainer = (
        <ResetPasswordForm
          goToSignIn={() => this.goToStep(LoginStep.SIGN_IN)}
          goToSignUp={() => this.goToStep(LoginStep.SIGN_UP)}
        />
      );
    } else if (step === LoginStep.SIGN_UP_VERIFICATION) {
      cardContainer = (
        <SignUpVerificationForm
          firstName={firstName}
          lastName={lastName}
          email={email}
          phoneNumber={phoneNumber}
          password={password}
          onClose={this.props.onClose}
          goToSignIn={() => this.goToStep(LoginStep.SIGN_IN)}
        />
      );
    } else if (step === LoginStep.SIGN_IN) {
      cardContainer = (
        <SignInForm
          goToForgotPassword={(params) => this.goToStep(LoginStep.FORGOT_PASSWORD, params)}
          goToSignUp={() => this.goToStep(LoginStep.SIGN_UP)}
          onClose={this.props.onClose}
        />
      );
    } else if (step === LoginStep.SIGN_UP) {
      cardContainer = (
        <SignUpForm
          goToVerificationStep={(params) => this.goToStep(LoginStep.SIGN_UP_VERIFICATION, params)}
          goToSignIn={() => this.goToStep(LoginStep.SIGN_IN)}
        />
      );
    }

    return (
      <div>
        <Modal
          visible={this.props.isLoginVisible}
          className="login-modal"
          onCancel={this.props.onClose}
          style={step === LoginStep.GUEST_CHECKOUT ? { top: "5%" } : {}}
          footer={null}>
          <div
            style={step === LoginStep.GUEST_CHECKOUT ? { width: "100%" } : {}}
            className="login-modal-content">
            {cardContainer}
          </div>
          {!step === LoginStep.GUEST_CHECKOUT && <div className="cottage-home-icon"></div>}
        </Modal>
      </div>
    );
  }
}

export default Login;
