import React, { Component } from "react";
import { connect } from "react-redux";
import isLength from "validator/lib/isLength";

// Redux
import { AuthenticationActionType, ConsumerActionType } from "../../../store/actiontypes";
import { confirmSignUp, getUserCredentials, signIn, createConsumer } from "../../../store/actions";

// Utils
import { isEmpty, isEmptyObject } from "../../../utils";

// Components
import { PrimaryButton } from "..";
import ReactCodeInput from "react-code-input";

//scss
import "./SignUpVerificationForm.scss";

const initialState = {
  isLoading: false,
  errorMessage: "",
  errors: {},

  code: "",
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
};

const baseCodeStyle = {
  fontFamily: "monospace",
  MozAppearance: "textfield",
  borderRadius: "0.375rem",
  border: "2px solid",
  borderColor: "#4a5568",
  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  paddingLeft: "auto",
  paddingRight: 0,
  textAlign: "center",
  margin: "0.5rem",
  width: "2.5rem",
  height: "3rem",
  fontSize: "1.5rem",
  // boxSizing: "border-box",
};

const inputCodeStyleMobile = {
  margin: "0.25rem",
  width: "1.875rem",
  height: "2.25rem",
  fontSize: "1rem",
};

const requiredFields = [FormFieldContent.CODE];

export class SignUpVerificationForm extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidUpdate(prevProps) {
    const { authentication, account } = this.props;
    const { firstName, lastName, email, password, phoneNumber } = this.props;

    if (authentication.status !== prevProps.authentication.status) {
      if (authentication.status === AuthenticationActionType.CONFIRMATION_SIGN_UP_SUCCESS) {
        this.props.signIn(email, password);
      } else if (authentication.status === AuthenticationActionType.SIGN_IN_SUCCESS) {
        this.props.getUserCredentials();
      } else if (authentication.status === AuthenticationActionType.GET_USER_CREDENTIALS_SUCCESS) {
        const consumerId = authentication.value.id;
        this.props.createConsumer({
          id: consumerId,
          firstName,
          lastName,
          email,
          phoneNumber,
          acceptedTerms: true,
        });
      } else if (
        authentication.status === AuthenticationActionType.CONFIRMATION_SIGN_UP_ERROR ||
        authentication.status === AuthenticationActionType.SIGN_IN_ERROR
      ) {
        const { message } = authentication.error;

        this.setState({
          errorMessage: message,
          isLoading: false,
          errors: {},
        });
      }
    }

    if (account.status !== prevProps.account.status) {
      if (account.status === ConsumerActionType.CREATE_CONSUMER_SUCCESS) {
        this.setState(initialState, () => this.props.onClose());
      } else if (account.status === ConsumerActionType.CREATE_CONSUMER_ERROR) {
        const { message } = authentication.error;

        this.setState({
          errorMessage: message,
          isLoading: false,
          errors: {},
        });
      }
    }
  }

  onInputChange = (value) => {
    this.setState({ ...this.state, code: value });
  };

  validateInput = () => {
    const { CODE } = FormFieldContent;
    const { code } = this.state;
    const errors = {};

    requiredFields
      .filter((f) => isEmpty(this.state[f.field]))
      .forEach((fo) => {
        errors[fo.field] = `${fo.label} is required`;
      });

    if (!isEmpty(code) && !isLength(code, { min: CODE.limit.min, max: CODE.limit.max })) {
      errors.code = `${CODE.label} must be 6 characters`;
    }

    const sortedErrors = {};
    Object.keys(errors)
      .sort()
      .forEach((key) => (sortedErrors[key] = errors[key]));

    return { errors: sortedErrors };
  };

  onSubmit = (e) => {
    const { errors } = this.validateInput();
    this.setState({
      errors,
      errorMessage: initialState.errorMessage,
    });

    if (!isEmptyObject(errors)) {
      return;
    }

    this.setState({ isLoading: true }, () =>
      this.props.confirmSignUp(this.props.email, this.state.code)
    );
  };

  render() {
    const { CODE } = FormFieldContent;
    const { email } = this.props;

    return (
      <div className="signup-verification-wrapper">
        <div className="signup-verification-title">Verification Code</div>
        <div className="signup-verification-description">
          <span> We emailed you a six-digit code to</span> <span>{email}.</span>
          <span>Enter the code below to confirm your email address.</span>
        </div>
        <div className="signup-verification-control-box">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ReactCodeInput
              fields={6}
              onChange={(value) => this.onInputChange(value)}
              name={CODE.field}
              value={this.state.code}
              inputStyle={{ ...baseCodeStyle, ...inputCodeStyleMobile }}
            />
          </div>
          <div>
            <PrimaryButton
              size="large"
              text={"Verify Now"}
              eventHandler={this.onSubmit}
              disabled={this.state.code.length < 6}
              loading={this.state.isLoading}
            />
          </div>
        </div>
        <div className="no-email-received">
          No email received? <span>Resend code</span>
        </div>
        <div className="have-account">
          Already have an Account? <span onClick={this.props.goToSignIn}>Sign in</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authentication: state.authentication,
  account: state.consumer.account,
});

const mapDispatchToProps = (dispatch) => {
  return {
    confirmSignUp: (email, confirmationCode) => dispatch(confirmSignUp(email, confirmationCode)),
    getUserCredentials: () => dispatch(getUserCredentials()),
    signIn: (email, password) => dispatch(signIn(email, password)),
    createConsumer: (input) => dispatch(createConsumer(input)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpVerificationForm);
