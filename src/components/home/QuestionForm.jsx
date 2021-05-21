import React, { Component } from "react";
import { connect } from "react-redux";
import { Input, Row } from "antd";
import isLength from "validator/lib/isLength";
import isEmail from "validator/lib/isEmail";

// Redux
import { sendEmail } from "../../store/actions";
import { EmailActionType } from "../../store/actiontypes";

// Components
import { PrimaryButton, ErrorBox } from "../common";

import { isEmpty, isEmptyObject } from "./../../utils";
import config from "../../config";

const FormFieldContent = {
  FIRST_NAME: {
    label: "First name",
    field: "firstName",
    limit: {
      min: 2,
      max: 30,
    },
  },
  LAST_NAME: {
    label: "Last name",
    field: "lastName",
    limit: {
      min: 2,
      max: 30,
    },
  },
  EMAIL: {
    label: "Email",
    field: "email",
    limit: {
      min: 2,
      max: 50,
    },
  },
  QUESTION: {
    label: "Question",
    field: "question",
    limit: {
      min: 0,
      max: 250,
    },
  },
};

const requiredFields = [
  FormFieldContent.FIRST_NAME,
  FormFieldContent.LAST_NAME,
  FormFieldContent.EMAIL,
  FormFieldContent.QUESTION,
];

const initialState = {
  errorMessage: "",
  errors: {},
  firstName: "",
  lastName: "",
  email: "",
  question: "",
  isDisable: false,
};

// TODO remove this component its no longer needed
export class QuestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCharCount: 0,
      maxCharCount: 250,
      ...initialState,
    };
  }

  componentDidUpdate(prevProps) {
    const { email } = this.props;
    if (email.status !== prevProps.email.status) {
      if (email.status === EmailActionType.SEND_EMAIL_SUCCESS) {
        this.setState({ isLoading: false, isDisable: true });
      } else if (email.status === EmailActionType.SEND_EMAIL_ERROR) {
        this.setState({
          errorMessage:
            "Sorry about that. Email us directly at contact@trycottage.com and we'll respond within 12 hours!",
          error: {},
          isLoading: false,
          isDisable: true,
        });
      }
    }
  }

  onQuestionChange = (event) => {
    const { maxCharCount } = this.state;
    if (event.target.value.length > maxCharCount) {
      return;
    }
    this.setState({ currentCharCount: event.target.value.length, question: event.target.value });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  validateInput = () => {
    const { FIRST_NAME, LAST_NAME, EMAIL, QUESTION } = FormFieldContent;
    const { firstName, lastName, email, question } = this.state;
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
      errors.firstName = `${FIRST_NAME.label} must be ${FIRST_NAME.limit.min} - ${FIRST_NAME.limit.max} characters`;
    }

    if (
      !isEmpty(lastName) &&
      !isLength(lastName, { min: LAST_NAME.limit.min, max: LAST_NAME.limit.max })
    ) {
      errors.lastName = `${LAST_NAME.label} must be ${LAST_NAME.limit.min} - ${LAST_NAME.limit.max} characters`;
    }

    if (!isEmpty(email) && !isEmail(email)) {
      errors.email = `${EMAIL.label} must be a valid email`;
    }

    if (
      !isEmpty(question) &&
      !isLength(question, { min: QUESTION.limit.min, max: QUESTION.limit.max })
    ) {
      errors.lastName = `${QUESTION.label} must be ${QUESTION.limit.min} - ${QUESTION.limit.max} characters`;
    }

    const sortedErrors = {};
    Object.keys(errors)
      .sort()
      .forEach((key) => (sortedErrors[key] = errors[key]));

    return { errors: sortedErrors };
  };

  sendEmail = () => {
    const { errors } = this.validateInput();
    this.setState({
      errors,
      errorMessage: initialState.errorMessage,
    });

    if (!isEmptyObject(errors)) {
      return;
    }

    const { firstName, lastName, question, email } = this.state;
    this.setState({ isLoading: true }, () =>
      this.props.sendEmail({
        serviceId: "default_service",
        templateId: "template_MMtM3c4D",
        templateParams: {
          reply_to: "reply_to_value",
          first_name: firstName,
          last_name: lastName,
          message_html: `<p>${question}</p>`,
          customer_email: email,
        },
        userId: config.emailjs.EMAIL_JS_USER_ID,
      })
    );
  };

  render() {
    const { FIRST_NAME, LAST_NAME, EMAIL, QUESTION } = FormFieldContent;
    const { currentCharCount, maxCharCount } = this.state;
    const isMaxLimitReached = currentCharCount === maxCharCount;

    const errorPayload =
      this.state.errorMessage !== initialState.errorMessage
        ? [this.state.errorMessage]
        : Object.values(this.state.errors);
    const errorBoxContainer = <ErrorBox messages={errorPayload} />;

    return (
      <div className="question-form-body-wrapper">
        <div className="question-form-body">
          <div className="question-form-name">
            <div>
              <Input
                name={FIRST_NAME.field}
                placeholder={FIRST_NAME.label}
                value={this.state.firstName}
                maxLength={FIRST_NAME.limit.max}
                className={this.state.errors[FIRST_NAME.field] ? "error-form" : ""}
                onChange={this.handleInputChange}
              />
            </div>
            <div>
              <Input
                name={LAST_NAME.field}
                placeholder={LAST_NAME.label}
                value={this.state.lastName}
                maxLength={LAST_NAME.limit.max}
                className={this.state.errors[LAST_NAME.field] ? "error-form" : ""}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div className="question-form-email">
            <Input
              name={EMAIL.field}
              placeholder={EMAIL.label}
              value={this.state.email}
              className={this.state.errors[EMAIL.field] ? "error-form" : ""}
              onChange={this.handleInputChange}
            />
          </div>
          <div
            className={`question-form-message ${
              this.state.errors[QUESTION.field] ? "error-form-div" : ""
            }`}
            style={isMaxLimitReached ? { borderColor: "red" } : {}}>
            <Input.TextArea
              name={QUESTION.field}
              placeholder={"How can we help you?"}
              value={this.state.question}
              maxLength={QUESTION.limit.max}
              // className={this.state.errors[QUESTION.field] ? "error-form" : ""}
              onChange={this.onQuestionChange}
            />
            <div className="message-char-count">
              {currentCharCount}/{maxCharCount}
            </div>
          </div>
          <div className="question-form-submit">
            <PrimaryButton
              className={`${this.state.isDisable ? "disbaled-button" : ""}`}
              size="large"
              text={
                !this.state.isDisable
                  ? "Submit"
                  : this.state.errorMessage !== initialState.errorMessage
                  ? "Whoops, something went wrong!"
                  : "Sent!"
              }
              disabled={this.state.isDisable}
              loading={this.state.isLoading}
              eventHandler={this.sendEmail}
            />
          </div>
          {(!isEmpty(this.state.errorMessage) || !isEmptyObject(this.state.errors)) && (
            <Row>{errorBoxContainer}</Row>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.email,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendEmail: (input) => dispatch(sendEmail(input)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionForm);
