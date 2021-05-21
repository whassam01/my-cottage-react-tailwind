import React, { Component } from "react";
import { connect } from "react-redux";
import { Input } from "antd";
import isLength from "validator/lib/isLength";
import isEmail from "validator/lib/isEmail";

// Redux
import { AuthenticationActionType, ConsumerActionType } from "../../../store/actiontypes";
import { signIn, getUserCredentials, getConsumer } from "../../../store/actions";

// Utils
import { isEmpty, isEmptyObject } from "../../../utils";

// Components
import { ErrorBox, PrimaryButton } from "..";

//scss
import "./SignInForm.scss";
import Form from "antd/lib/form/Form";

const initialState = {
  isLoading: false,
  errorMessage: "",
  errors: {},

  email: "",
  password: "",
};

const FormFieldContent = {
  EMAIL: {
    title: "EMAIL",
    label: "Email",
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
};

const requiredFields = [FormFieldContent.EMAIL, FormFieldContent.PASSWORD];

export class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  componentDidMount() {
    this.autoFocus.focus();
  }

  componentDidUpdate(prevProps) {
    const { authentication } = this.props;

    if (authentication.status !== prevProps.authentication.status) {
      if (authentication.status === AuthenticationActionType.SIGN_IN_SUCCESS) {
        this.props.getUserCredentials();
      } else if (authentication.status === AuthenticationActionType.SIGN_IN_ERROR) {
        const { message } = authentication.error;

        this.setState({
          errorMessage: message,
          isLoading: false,
          errors: {},
        });
      } else if (
        authentication.status === AuthenticationActionType.GET_USER_CREDENTIALS_SUCCESS &&
        authentication.value.isAuthenticated
      ) {
        const consumerId = authentication.value.id;
        this.props.getConsumer(consumerId);
      } else if (authentication.status === ConsumerActionType.GET_CONSUMER_SUCCESS) {
        this.closeForm();
      }
    }
  }

  closeForm() {
    this.setState(initialState);
    this.props.onClose();
  }

  handleChange = (e) => {
    const { name, value } = e.target;
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
      this.props.signIn(this.state.email, this.state.password)
    );
  };

  onForgotPassword = () => {
    const { email } = this.state;
    this.props.goToForgotPassword({ email });
  };

  validateInput = () => {
    const { EMAIL, PASSWORD } = FormFieldContent;
    const { email, password } = this.state;
    const errors = {};

    requiredFields
      .filter((f) => isEmpty(this.state[f.field]))
      .forEach((fo) => {
        errors[fo.field] = `${fo.label} is required`;
      });

    // TODO better email validation
    if (!isEmpty(email) && !isEmail(email)) {
      errors.email = `${EMAIL.label} is not valid`;
    }

    // match cognito password rules once confirmed
    if (
      !isEmpty(password) &&
      !isLength(password, { min: PASSWORD.limit.min, max: PASSWORD.limit.max })
    ) {
      errors.password = `${PASSWORD.label} must be ${PASSWORD.limit.min}-${PASSWORD.limit.max} characters and include an uppercase letter, lowercase letter, and a number`;
    }

    const sortedErrors = {};
    Object.keys(errors)
      .sort()
      .forEach((key) => (sortedErrors[key] = errors[key]));

    return { errors: sortedErrors };
  };

  render() {
    const { EMAIL, PASSWORD } = FormFieldContent;

    const errorPayload =
      this.state.errorMessage !== initialState.errorMessage
        ? [this.state.errorMessage]
        : Object.values(this.state.errors);

    return (
      <div className="signin-form-wrapper">
        <div className="signin-form">
          <div className="signin-form-title">Welcome Back</div>
          <div className="signin-form-description">
            Sign in to use Cottage to order from your favourite meal providers.
          </div>
          <Form onSubmit={this.onSubmit}>
            <div className="signin-form-control-box">
              <div>
                <Input
                  value={this.state.email}
                  onChange={this.handleChange}
                  placeholder={EMAIL.label}
                  name={EMAIL.field}
                  className={
                    this.state.errors[EMAIL.field]
                      ? "profile-forms-input error-form"
                      : "profile-forms-input"
                  }
                  ref={(input) => {
                    this.autoFocus = input;
                  }}
                />
              </div>
              <div>
                <Input.Password
                  value={this.state.password}
                  onChange={this.handleChange}
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
              <div>
                <PrimaryButton
                  size="large"
                  text={"Sign in"}
                  eventHandler={this.onSubmit}
                  loading={this.state.isLoading}
                />
              </div>
              <div className="signin-forgot-password" onClick={this.onForgotPassword}>
                Forgot Password?
              </div>

              {(!isEmpty(this.state.errorMessage) || !isEmptyObject(this.state.errors)) && (
                <ErrorBox messages={errorPayload} />
              )}
            </div>
          </Form>
          {/* <div className="or-connect-with">
            <div></div>
            <div>Or Connect With</div>
            <div></div>
          </div>
          <div className="social-login-buttons">
            <Button className="facebook-button">Facebook</Button>
            <Button className="twitter-button">Twitter</Button>
          </div> */}
          <div className="dont-have-account">
            Don't have an Account? <span onClick={this.props.goToSignUp}>Sign up</span>
          </div>
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
    signIn: (email, password) => dispatch(signIn(email, password)),
    getUserCredentials: () => dispatch(getUserCredentials()),
    getConsumer: (id) => dispatch(getConsumer({ id })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);
