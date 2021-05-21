import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Input } from "antd";
import isEmail from "validator/lib/isEmail";
import isLength from "validator/lib/isLength";

// Redux
import { AuthenticationActionType } from "../../../store/actiontypes";
import { forgotPassword, forgotPasswordSubmit } from "../../../store/actions";

// Utils
import { isEmpty, isEmptyObject } from "../../../utils";

// Components
import { ErrorBox, PrimaryButton } from "..";

//scss
import "./ResetPasswordForm.scss";

const initialState = {
  isLoading: false,
  errorMessage: "",
  errors: {},

  codeSent: false,
  confirmed: false,

  code: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const FormFieldContent = {
  CODE: {
    title: "VERIFICATION CODE",
    label: "Your one time six-digit code",
    field: "code",
    limit: {
      min: 6,
      max: 6,
    },
  },
  EMAIL: {
    title: "EMAIL",
    label: "Email address",
    field: "email",
  },
  PASSWORD: {
    title: "PASSWORD",
    label: "Password",
    field: "password",
    limit: {
      min: 6,
      max: 30,
    },
  },
  PASSWORD_CONFIRMATION: {
    title: "PASSWORD CONFIRMATION",
    label: "Password confirmation",
    field: "passwordConfirmation",
  },
};

const requestCodeRequiredFields = [FormFieldContent.EMAIL];

const confirmationRequiredFields = [
  FormFieldContent.EMAIL,
  FormFieldContent.CODE,
  FormFieldContent.PASSWORD,
  FormFieldContent.PASSWORD_CONFIRMATION,
];

export class ResetPasswordForm extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidUpdate(prevProps) {
    const { authentication } = this.props;
    if (authentication.status !== prevProps.authentication.status) {
      if (authentication.status === AuthenticationActionType.FORGOT_PASSWORD_SUCCESS) {
        this.setState({
          isLoading: false,
          codeSent: true,
        });
      } else if (
        authentication.status === AuthenticationActionType.FORGOT_PASSWORD_SUBMIT_SUCCESS
      ) {
        this.setState({
          isLoading: false,
          confirmed: true,
        });
      } else if (
        authentication.status === AuthenticationActionType.FORGOT_PASSWORD_ERROR ||
        authentication.status === AuthenticationActionType.FORGOT_PASSWORD_SUBMIT_ERROR
      ) {
        const { message } = authentication.error;

        this.setState({
          errorMessage: message,
          isLoading: false,
          errors: {},
        });
      }
    }
  }

  onInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  validateRequestCodeInput = () => {
    const { EMAIL } = FormFieldContent;
    const { email } = this.state;
    const errors = {};

    requestCodeRequiredFields
      .filter((f) => isEmpty(this.state[f.field]))
      .forEach((fo) => {
        errors[fo.field] = `${fo.label} is required`;
      });

    if (!isEmpty(email) && !isEmail(email)) {
      errors.email = `${EMAIL.label} is not valid`;
    }

    const sortedErrors = {};
    Object.keys(errors)
      .sort()
      .forEach((key) => (sortedErrors[key] = errors[key]));

    return { errors: sortedErrors };
  };

  validateConfirmationInput = () => {
    const { CODE, EMAIL, PASSWORD, PASSWORD_CONFIRMATION } = FormFieldContent;

    const { code, email, password, passwordConfirmation } = this.state;
    const errors = {};

    confirmationRequiredFields
      .filter((f) => isEmpty(this.state[f.field]))
      .forEach((fo) => {
        errors[fo.field] = `${fo.label} is required`;
      });

    if (!isEmpty(code) && !isLength(code, { min: CODE.limit.min, max: CODE.limit.max })) {
      errors.code = `${CODE.label} must be ${CODE.limit.min}-${CODE.limit.max} characters`;
    }

    if (!isEmpty(email) && !isEmail(email)) {
      errors.email = `${EMAIL.label} is not valid`;
    }

    // TODO match cognito password rules once confirmed
    if (
      !isEmpty(password) &&
      !isLength(password, { min: PASSWORD.limit.min, max: PASSWORD.limit.max })
    ) {
      errors.password = `${PASSWORD.label} must be ${PASSWORD.limit.min}-${PASSWORD.limit.max} characters and include an uppercase letter, lowercase letter, and a number`;
    }

    if (!isEmpty(password) && !isEmpty(passwordConfirmation) && password !== passwordConfirmation) {
      errors.passwordConfirmation = `${PASSWORD_CONFIRMATION.label} did not match`;
    }

    const sortedErrors = {};
    Object.keys(errors)
      .sort()
      .forEach((key) => (sortedErrors[key] = errors[key]));

    return { errors: sortedErrors };
  };

  onRequestCodeSubmit = (e) => {
    const { errors } = this.validateRequestCodeInput();
    this.setState({
      errors,
      errorMessage: initialState.errorMessage,
    });

    if (!isEmptyObject(errors)) {
      return;
    }
    this.setState({ isLoading: true }, () => this.props.forgotPassword(this.state.email));
  };

  onConfirmationSubmit = (e) => {
    const { errors } = this.validateConfirmationInput();
    this.setState({
      errors,
      errorMessage: initialState.errorMessage,
    });

    if (!isEmptyObject(errors)) {
      return;
    }

    this.setState({ isLoading: true }, () =>
      this.props.forgotPasswordSubmit(this.state.email, this.state.code, this.state.password)
    );
  };

  render() {
    const { CODE, EMAIL, PASSWORD, PASSWORD_CONFIRMATION } = FormFieldContent;

    const errorPayload =
      this.state.errorMessage !== initialState.errorMessage
        ? [this.state.errorMessage]
        : Object.values(this.state.errors);
    const errorBoxContainer = (
      <Col span={24}>
        <ErrorBox messages={errorPayload} />
      </Col>
    );

    const renderRequestCodeForm = (
      <div className="reset-password-request">
        <div className="reset-form-title">Forgot Password</div>
        <div className="reset-form-description">
          Enter your email address to get a new verification code.
        </div>
        <div className="reset-form-controll-box">
          <div>
            <Input
              className={
                this.state.errors[EMAIL.field]
                  ? "profile-forms-input error-form"
                  : "profile-forms-input"
              }
              value={this.state.email}
              onChange={this.onInputChange}
              placeholder={EMAIL.label}
              disabled={this.state.codeSent}
              name={EMAIL.field}
            />
          </div>
          <div>
            <PrimaryButton
              size="large"
              text={"Send Email"}
              eventHandler={this.onRequestCodeSubmit}
              disabled={this.state.email.length === 0}
              loading={this.state.isLoading}
            />
          </div>
          {(!isEmpty(this.state.errorMessage) || !isEmptyObject(this.state.errors)) &&
            errorBoxContainer}
        </div>
        <div className="reference-link">
          Have an account? <span onClick={this.props.goToSignIn}>Sign in</span>
        </div>
        <div className="reference-link">
          Don't have an Account? <span onClick={this.props.goToSignUp}>Sign up</span>
        </div>
      </div>
    );

    const renderConfirmationForm = (
      <div className="confirmation-form-wrapper">
        <div className="reset-form-title">Confirm New Password</div>
        <div className="confirmation-form-controll-box">
          <div>
            <Input
              className={
                this.state.errors[CODE.field]
                  ? "profile-forms-input error-form"
                  : "profile-forms-input"
              }
              value={this.state.code}
              onChange={this.onInputChange}
              placeholder={CODE.label}
              name={CODE.field}
              maxLength={CODE.limit.max}
            />
          </div>
          <div>
            <Input
              className={
                this.state.errors[EMAIL.field]
                  ? "profile-forms-input error-form"
                  : "profile-forms-input"
              }
              value={this.state.email}
              onChange={this.onInputChange}
              placeholder={EMAIL.label}
              disabled={this.state.codeSent}
              name={EMAIL.field}
            />
          </div>
          <div>
            <Input.Password
              value={this.state.password}
              onChange={this.onInputChange}
              placeholder={PASSWORD.label}
              name={PASSWORD.field}
              maxLength={PASSWORD.limit.max}
              className={this.state.errors[PASSWORD.field] ? "error-form" : ""}
            />
          </div>
          <div>
            <Input.Password
              value={this.state.passwordConfirmation}
              onChange={this.onInputChange}
              placeholder={PASSWORD_CONFIRMATION.label}
              name={PASSWORD_CONFIRMATION.field}
              maxLength={PASSWORD.limit.max}
              className={this.state.errors[PASSWORD_CONFIRMATION.field] ? "error-form" : ""}
            />
          </div>
          <div>
            <PrimaryButton
              size="large"
              text={"Confirm Password Reset"}
              eventHandler={this.onConfirmationSubmit}
              loading={this.state.isLoading}
            />
          </div>
          {(!isEmpty(this.state.errorMessage) || !isEmptyObject(this.state.errors)) &&
            errorBoxContainer}
          <div className="reference-link">
            Have an account? <span onClick={this.props.goToSignIn}>Sign in</span>
          </div>
          <div className="reference-link">
            Don't have an Account? <span onClick={this.props.goToSignUp}>Sign up</span>
          </div>
        </div>
      </div>
    );

    const renderSuccessMessage = (
      <div className="success-message">
        <div className="reset-form-title">Success</div>
        <div className="reset-form-description">
          Your password has been updated. Sign in now with your new password.
        </div>
        <div className="reference-link">
          Have an account? <span onClick={this.props.goToSignIn}>Sign in</span>
        </div>
        <div className="reference-link">
          Don't have an Account? <span onClick={this.props.goToSignUp}>Sign up</span>
        </div>
      </div>
    );

    return (
      <div className="reset-password-form-wrapper">
        {!this.state.codeSent
          ? renderRequestCodeForm
          : !this.state.confirmed
          ? renderConfirmationForm
          : renderSuccessMessage}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authentication: state.authentication,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    forgotPassword: (email) => dispatch(forgotPassword(email)),
    forgotPasswordSubmit: (email, code, password) =>
      dispatch(forgotPasswordSubmit(email, code, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordForm);
