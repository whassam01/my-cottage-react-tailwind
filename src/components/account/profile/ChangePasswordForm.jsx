import React, { Component } from "react";
import { connect } from "react-redux";
import isLength from "validator/lib/isLength";

import { Modal, Row, Col, Typography, Input } from "antd";

// Utils
import { isEmpty, isEmptyObject } from "../../../utils";

// Components
import { ErrorBox, PrimaryButton, EditIcon } from "../../common";

// Redux
import { AuthenticationActionType } from "../../../store/actiontypes";
import { changePassword, getCurrentAuthenticatedUser } from "../../../store/actions";

import "../../../containers/general.scss";

const { Title, Paragraph } = Typography;

const REQUIRED_SYMBOL = "*";

const initialState = {
  visible: false,
  errorMessage: "",
  errors: {},
  isLoading: false,

  // email: null,
  oldPassword: null,
  newPassword: null,
  newPasswordConfirmation: null,
};

const changePasswordParams = {
  title: "Change your password",
  buttonText: "Update password",
  buttonIcon: "edit",
};

const FormFieldContent = {
  OLD_PASSWORD: {
    title: "ORIGINAL PASSWORD",
    label: "Original password",
    field: "oldPassword",
    limit: {
      min: 6,
      max: 30,
    },
  },
  NEW_PASSWORD: {
    title: "NEW PASSWORD",
    label: "New password",
    field: "newPassword",
    limit: {
      min: 6,
      max: 30,
    },
  },
  NEW_PASSWORD_CONFIRMATION: {
    title: "NEW PASSWORD CONFIRMATION",
    label: "New password confirmation",
    field: "newPasswordConfirmation",
    limit: {
      min: 6,
      max: 30,
    },
  },
};

const requiredFields = [
  FormFieldContent.OLD_PASSWORD,
  FormFieldContent.NEW_PASSWORD,
  FormFieldContent.NEW_PASSWORD_CONFIRMATION,
];

class ChangePasswordForm extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidUpdate(prevProps) {
    const { authentication } = this.props;

    if (authentication.status !== prevProps.authentication.status) {
      if (authentication.status === AuthenticationActionType.GET_AUTHENTICATED_USER_SUCCESS) {
        this.props.changePassword({
          currentUser: authentication.value.cognitoUser,
          oldPassword: this.state.oldPassword,
          newPassword: this.state.newPassword,
        });
      } else if (authentication.status === AuthenticationActionType.CHANGE_PASSWORD_SUCCESS) {
        this.closeForm();
      } else if (
        authentication.status === AuthenticationActionType.CHANGE_PASSWORD_ERROR ||
        authentication.status === AuthenticationActionType.GET_AUTHENTICATED_USER_ERROR
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

  closeForm = (e) => {
    this.setState(initialState);
    this.props.onCancel();
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  validateInput = () => {
    const { OLD_PASSWORD, NEW_PASSWORD, NEW_PASSWORD_CONFIRMATION } = FormFieldContent;
    const { oldPassword, newPassword, newPasswordConfirmation } = this.state;
    const errors = {};

    requiredFields
      .filter((f) => isEmpty(this.state[f.field]))
      .forEach((fo) => {
        errors[fo.field] = `${fo.label} is required`;
      });

    // TODO match cognito password rules once confirmed
    if (
      !isEmpty(oldPassword) &&
      !isLength(oldPassword, { min: OLD_PASSWORD.limit.min, max: OLD_PASSWORD.limit.max })
    ) {
      errors.oldPassword = `${OLD_PASSWORD.label} must be ${OLD_PASSWORD.limit.min}-${OLD_PASSWORD.limit.max} characters and include an uppercase letter, lowercase letter, and a number`;
    }

    if (
      !isEmpty(newPassword) &&
      !isLength(newPassword, { min: NEW_PASSWORD.limit.min, max: NEW_PASSWORD.limit.max })
    ) {
      errors.newPassword = `${NEW_PASSWORD.label} must be ${NEW_PASSWORD.limit.min}-${NEW_PASSWORD.limit.max} characters and include an uppercase letter, lowercase letter, and a number`;
    }

    if (
      !isEmpty(newPasswordConfirmation) &&
      !isEmpty(newPasswordConfirmation) &&
      newPassword !== newPasswordConfirmation
    ) {
      errors.newPasswordConfirmation = `${NEW_PASSWORD_CONFIRMATION.label} did not match`;
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

    this.setState({ isLoading: true }, () => this.props.getCurrentAuthenticatedUser());
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { OLD_PASSWORD, NEW_PASSWORD, NEW_PASSWORD_CONFIRMATION } = FormFieldContent;

    const errorPayload =
      this.state.errorMessage !== initialState.errorMessage
        ? [this.state.errorMessage]
        : Object.values(this.state.errors);
    const errorBoxContainer = <ErrorBox messages={errorPayload} />;

    const oldPasswordContainer = (
      <div>
        <Paragraph>{`${OLD_PASSWORD.title} ${REQUIRED_SYMBOL}`}</Paragraph>
        <Input.Password
          value={this.state.firstName}
          name={OLD_PASSWORD.field}
          placeholder={OLD_PASSWORD.label}
          onChange={this.handleInputChange}
          maxLength={OLD_PASSWORD.limit.max}
          className={
            this.state.errors[OLD_PASSWORD.field]
              ? " profile-forms-input error-form"
              : "profile-forms-input"
          }
        />
      </div>
    );

    const newPasswordContainer = (
      <div>
        <Paragraph>{`${NEW_PASSWORD.title} ${REQUIRED_SYMBOL}`}</Paragraph>
        <Input.Password
          value={this.state.newPassword}
          onChange={this.handleChange}
          placeholder={NEW_PASSWORD.label}
          name={NEW_PASSWORD.field}
          maxLength={NEW_PASSWORD.limit.max}
          className={
            this.state.errors[NEW_PASSWORD.field]
              ? "profile-forms-input error-form"
              : "profile-forms-input"
          }
        />
      </div>
    );

    const newPasswordConfirmationContainer = (
      <div>
        <Paragraph>{`${NEW_PASSWORD_CONFIRMATION.title} ${REQUIRED_SYMBOL}`}</Paragraph>
        <Input.Password
          value={this.state.newPasswordConfirmation}
          onChange={this.handleChange}
          placeholder={NEW_PASSWORD_CONFIRMATION.label}
          name={NEW_PASSWORD_CONFIRMATION.field}
          maxLength={NEW_PASSWORD_CONFIRMATION.limit.max}
          className={
            this.state.errors[NEW_PASSWORD_CONFIRMATION.field]
              ? "profile-forms-input error-form"
              : "profile-forms-input"
          }
        />
      </div>
    );

    const changePasswordSubmitButton = (
      <PrimaryButton
        icon={<EditIcon />}
        size="large"
        text={changePasswordParams.buttonText}
        eventHandler={this.onSubmit}
        loading={this.state.isLoading}
      />
    );

    return (
      <div>
        <Modal
          visible={this.props.visible}
          onCancel={this.closeForm}
          footer={null}
          className="form-modal-wrapper">
          <Row>
            <Col span={24}>
              <Title className="dashboard-form-title">{changePasswordParams.title}</Title>
            </Col>
          </Row>
          <Row gutter={[10, 20]} className="Dashboard-forms-container">
            <Col span={24} className={`${this.props.isMobileView ? "margin-bottom-20" : ""}`}>
              {oldPasswordContainer}
            </Col>
            <Col span={24} className={`${this.props.isMobileView ? "margin-bottom-20" : ""}`}>
              {newPasswordContainer}
            </Col>
            <Col span={24} className={`${this.props.isMobileView ? "margin-bottom-20" : ""}`}>
              {newPasswordConfirmationContainer}
            </Col>
            <Col span={24}>{changePasswordSubmitButton}</Col>
            {/* <Col span={24}>
              <Row type="flex" justify="space-around" align="middle">
                <NeedHelp />
              </Row>
            </Col> */}

            {(!isEmpty(this.state.errorMessage) || !isEmptyObject(this.state.errors)) && (
              <Row>{errorBoxContainer}</Row>
            )}
          </Row>
        </Modal>
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
    changePassword: (input) => dispatch(changePassword(input)),
    getCurrentAuthenticatedUser: () => dispatch(getCurrentAuthenticatedUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordForm);
