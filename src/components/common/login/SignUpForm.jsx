import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Input, Popover } from "antd";
import isLength from "validator/lib/isLength";
import isEmail from "validator/lib/isEmail";
// Components
// TODO: Add SocialMediaForm when supporting fb and twitter
// import SocialMediaForm from "./SocialMediaForm";
import { ErrorBox, PrimaryButton } from "..";

// Redux
import { AuthenticationActionType } from "../../../store/actiontypes";
import { signUp } from "../../../store/actions";

// Utils
import { isEmpty, isEmptyObject } from "../../../utils";

//scss
import "./SignUpForm.scss";
import { ErrorCode, PageRoute } from "../../../constants";
import Form from "antd/lib/form/Form";
import InputPhone from "../inputPhone/InputPhone";
import PasswordChecker from "../PasswordChecker";

const initialState = {
  isLoading: false,
  errorMessage: "",
  errors: {},
  passwordStatus: "",
  visible: false,
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phoneNumber: null,
  passwordConfirmation: "",
};

const FormFieldContent = {
  FIRST_NAME: {
    title: "FIRST NAME",
    label: "First name",
    field: "firstName",
    limit: {
      min: 1,
      max: 30,
    },
  },
  LAST_NAME: {
    title: "LAST NAME",
    label: "Last name",
    field: "lastName",
    limit: {
      min: 1,
      max: 30,
    },
  },
  EMAIL: {
    title: "EMAIL",
    label: "Email",
    field: "email",
  },
  PHONE: {
    title: "PHONE NUMBER",
    label: "Phone number",
    field: "phoneNumber",
    limit: {
      min: 12,
      max: 12,
    },
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

const requiredFields = [
  FormFieldContent.FIRST_NAME,
  FormFieldContent.LAST_NAME,
  FormFieldContent.EMAIL,
  FormFieldContent.PASSWORD,
  FormFieldContent.PHONE,
  FormFieldContent.PASSWORD_CONFIRMATION,
];

export class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
  }
  componentDidMount() {
    this.autoFocus.focus();
  }
  componentDidUpdate(prevProps) {
    const { authentication } = this.props;

    if (authentication.status !== prevProps.authentication.status) {
      if (authentication.status === AuthenticationActionType.SIGN_UP_SUCCESS) {
        const { firstName, lastName, email, password, phoneNumber } = this.state;
        this.props.goToVerificationStep({
          firstName,
          lastName,
          phoneNumber,
          email,
          password,
        });
        this.setState(initialState);
      } else if (authentication.status === AuthenticationActionType.SIGN_UP_ERROR) {
        // TODO
        // Initial sign up failed, if its identity theft (user is CONFIRMED) reject and don't move on, consider alerting original email holder about an attempted sign in
        // else if user is UNCONFIRMED delete the user in userpool and retry the sign up after abandoned user is removed.
        const { message } = authentication.error;
        this.setState({
          errorMessage: message,
          isLoading: false,
          errors: {},
        });
      }
    }
  }

  hide = () => {
    this.setState({
      visible: false,
    });
  };

  handleVisibleChange = (visible) => {
    this.setState({ visible });
  };

  onPasswordChange = (e) => {
    let defaultStatus;
    this.setState({ password: e.target.value }, () =>
      this.setState({
        passwordStatus: defaultStatus,
      })
    );
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})");
    if (strongRegex.test(e.target.value)) {
      defaultStatus = "Strong";
    } else if (e.target.value) {
      defaultStatus = "Week";
    } else {
      defaultStatus = "";
    }
  };

  onInputChange = (e) => {
    let { name, value } = e.target;
    if (name === FormFieldContent.PHONE.field && value.length !== 0) {
      value = value.match(/\+?\d+/g).join("");
    }
    this.setState({ [name]: value });
  };

  onSubmit = () => {
    const { errors } = this.validateInput();
    this.setState({
      errors,
      errorMessage: initialState.errorMessage,
    });

    if (!isEmptyObject(errors)) {
      return;
    }

    this.setState({ isLoading: true }, () =>
      this.props.signUp(this.state.email, this.state.password)
    );
  };

  validateInput = () => {
    const {
      FIRST_NAME,
      LAST_NAME,
      EMAIL,
      PHONE,
      PASSWORD,
      PASSWORD_CONFIRMATION,
    } = FormFieldContent;
    const { firstName, lastName, email, phoneNumber, password, passwordConfirmation } = this.state;
    const errors = {};

    requiredFields
      .filter((f) => isEmpty(this.state[f.field]))
      .forEach((fo) => {
        errors[fo.field] = `${fo.label} is required`;
      });

    if (
      !isEmpty(firstName) &&
      !isLength(firstName, { min: FIRST_NAME.limit.min, max: FIRST_NAME.limit.max })
    ) {
      errors.firstName = `${FIRST_NAME.label} must be ${FIRST_NAME.limit.min}-${FIRST_NAME.limit.max} characters`;
    }

    if (
      !isEmpty(lastName) &&
      !isLength(lastName, { min: LAST_NAME.limit.min, max: LAST_NAME.limit.max })
    ) {
      errors.lastName = `${LAST_NAME.label} must be ${LAST_NAME.limit.min}-${LAST_NAME.limit.max} characters`;
    }

    if (!isEmpty(email) && !isEmail(email)) {
      errors.email = `${EMAIL.label} is not valid`;
    }

    if (
      !isEmpty(phoneNumber) &&
      !isLength(phoneNumber, { min: PHONE.limit.min, max: PHONE.limit.max })
    ) {
      errors.phoneNumber = `${PHONE.label} must be a length of ${PHONE.limit.max}`;
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

  render() {
    const {
      FIRST_NAME,
      LAST_NAME,
      EMAIL,
      PASSWORD,
      PASSWORD_CONFIRMATION,
      PHONE,
    } = FormFieldContent;

    const errorPayload =
      this.state.errorMessage !== initialState.errorMessage
        ? [this.state.errorMessage]
        : Object.values(this.state.errors);
    const errorBoxContainer = (
      <Col span={24}>
        <ErrorBox messages={errorPayload} />
      </Col>
    );

    const firstNameContainer = (
      <div>
        <Input
          value={this.state.firstName}
          onChange={this.onInputChange}
          placeholder={FIRST_NAME.label}
          name={FIRST_NAME.field}
          maxLength={FIRST_NAME.limit.max}
          ref={(input) => {
            this.autoFocus = input;
          }}
          className={this.state.errors[FIRST_NAME.field] ? "error-form" : ""}
        />
      </div>
    );

    const lastNameContainer = (
      <div>
        <Input
          value={this.state.lastName}
          onChange={this.onInputChange}
          placeholder={LAST_NAME.label}
          name={LAST_NAME.field}
          maxLength={LAST_NAME.limit.max}
          className={this.state.errors[LAST_NAME.field] ? "error-form" : ""}
        />
      </div>
    );

    const emailContainer = (
      <div>
        <Input
          value={this.state.email}
          onChange={this.onInputChange}
          placeholder={EMAIL.label}
          name={EMAIL.field}
          className={this.state.errors[EMAIL.field] ? "error-form" : ""}
        />
      </div>
    );

    const passwordContainer = (
      <Popover
        content={<PasswordChecker passwordStatus={this.state.passwordStatus} />}
        title={null}
        trigger="hover"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}>
        <div
          id="password-label"
          datalabel={this.state.passwordStatus}
          style={
            this.state.passwordStatus === "Strong" ? { color: "green" } : { color: "#fb775a" }
          }>
          <Input.Password
            value={this.state.password}
            autoComplete="off"
            onChange={this.onPasswordChange}
            placeholder={PASSWORD.label}
            name={PASSWORD.field}
            maxLength={PASSWORD.limit.max}
            className={
              this.state.errors[PASSWORD.field]
                ? "profile-forms-input error-form"
                : "profile-forms-input"
            }
          />
        </div>
      </Popover>
    );

    const PhoneNumberContainer = (
      <div>
        <InputPhone
          value={
            this.state.phoneNumber
              ? this.state.phoneNumber.substring(2, this.state.phoneNumber.length)
              : ""
          }
          name={PHONE.field}
          placeholder={PHONE.label}
          onChange={this.onInputChange}
          className={"profile-forms-input"}
        />
      </div>
    );

    const passwordConfirmationContainer = (
      <div>
        <Input.Password
          value={this.state.passwordConfirmation}
          onChange={this.onInputChange}
          placeholder={PASSWORD_CONFIRMATION.label}
          name={PASSWORD_CONFIRMATION.field}
          maxLength={PASSWORD.limit.max}
          className={
            this.state.errors[PASSWORD_CONFIRMATION.field]
              ? "profile-forms-input error-form"
              : "profile-forms-input"
          }
        />
      </div>
    );

    const signUpButton = (
      <PrimaryButton
        size="large"
        text={"Sign up"}
        eventHandler={this.onSubmit}
        loading={this.state.isLoading}
      />
    );

    return (
      <div className="signup-from">
        <div className="signup-form-title">Join Cottage</div>
        <div className="signup-form-description">
          Create an account to manage your orders, addresses, and payments with your favorite meal
          services.
        </div>
        <Form onSubmit={this.onSubmit}>
          <div className="signup-form-control-box">
            <div className="fisrt-last-name">
              {firstNameContainer}
              {lastNameContainer}
            </div>
            <div>{emailContainer}</div>
            <div>{PhoneNumberContainer}</div>
            <div>{passwordContainer}</div>
            <div>{passwordConfirmationContainer}</div>
            <div>{signUpButton}</div>
            {(!isEmpty(this.state.errorMessage) || !isEmptyObject(this.state.errors)) &&
              errorBoxContainer}
          </div>
        </Form>
        <div className="signup-form-bottom-text">
          By continuing, I agree to Cottage’s{" "}
          <span>
            <a href={PageRoute.TERMS} target="_blank" rel="noopener noreferrer">
              Terms and conditions
            </a>
          </span>{" "}
          and{" "}
          <span>
            <a href={PageRoute.PRIVACY} target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>
          </span>
        </div>

        {/* <div className="or-connect-with">
          <div></div>
          <div>Or Connect With</div>
          <div></div>
        </div>
        <div className="social-login-buttons">
          <Button className="facebook-button">Facebook</Button>
          <Button className="twitter-button">Twitter</Button>
        </div> */}
        {this.props.authentication.error?.code === ErrorCode.USERNAME_EXISTS_ERROR && (
          <div className="resend-code">Having sign up issues? Email support@cottage.menu</div>
        )}
        <div className="dont-have-account">
          Already have an Account? <span onClick={this.props.goToSignIn}>Sign in</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authentication: state.authentication,
});

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (email, password) => dispatch(signUp({ username: email, password })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
