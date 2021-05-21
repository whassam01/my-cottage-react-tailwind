import React, { Component } from "react";
import { connect } from "react-redux";
import isLength from "validator/lib/isLength";

import { Button, Row, Col, Typography, Input } from "antd";

// Redux
import { OrderActionType } from "../../../store/actiontypes";

// Utils
import { ErrorBox } from "../../common";
import { isEmpty, isEmptyObject } from "../../../utils";

const { Paragraph } = Typography;

const initialState = {
  visible: false,
  errorMessage: "",
  errors: {},
  isLoading: false,
  note: null,
};

const FormFieldContent = {
  NOTE: {
    title: "ADDITIONAL NOTES",
    label: "Leave a note for your order",
    field: "note",
    limit: {
      min: 5,
      max: 250,
    },
  },
};

class OrderDetailNoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
      note: this.props.note,
    };
  }

  componentDidUpdate(prevProps) {
    const { cart } = this.props;
    if (cart.status !== prevProps.cart.status) {
      if (cart.status === OrderActionType.UPDATE_ORDER_SUCCESS) {
        this.closeForm();
      } else if (cart.status === OrderActionType.UPDATE_ORDER_ERROR) {
        const { message } = cart.error;
        this.setState({
          errorMessage: message,
          isLoading: false,
          errors: {},
        });
      }
    }
  }

  closeForm = () => {
    this.setState(initialState);
    this.props.hideOrderDetailNoteForm();
  };

  onSaveNoteClick = (e) => {
    const { errors } = this.validateInput();
    this.setState({
      errors,
      errorMessage: initialState.errorMessage,
    });

    if (!isEmptyObject(errors)) {
      return;
    }

    this.setState({ isLoading: true }, () => this.props.updateOrder(this.state.note));
  };

  validateInput = () => {
    const { NOTE } = FormFieldContent;
    const { note } = this.state;
    const errors = {};

    if (!isEmpty(note) && !isLength(note, { min: NOTE.limit.min, max: NOTE.limit.max })) {
      errors.note = `${NOTE.label} must be ${NOTE.limit.min}-${NOTE.limit.max} characters`;
    }

    const sortedErrors = {};
    Object.keys(errors)
      .sort()
      .forEach((key) => (sortedErrors[key] = errors[key]));

    return { errors: sortedErrors };
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSelectChange = (name) => (value) => {
    this.setState({ [name]: value });
  };

  render() {
    const { NOTE } = FormFieldContent;

    const errorPayload =
      this.state.errorMessage !== initialState.errorMessage
        ? [this.state.errorMessage]
        : Object.values(this.state.errors);
    const errorBoxContainer = <ErrorBox messages={errorPayload} />;

    const noteContentContainer = (
      <div>
        <Paragraph>{NOTE.title}</Paragraph>
        <Input
          value={this.state.note}
          name={NOTE.field}
          placeholder={NOTE.label}
          onChange={this.handleInputChange}
          maxLength={NOTE.limit.max}
          className={this.state.errors[NOTE.field] ? "error-form" : ""}
        />
      </div>
    );

    const saveNoteButton = (
      <div>
        <Button onClick={this.onSaveNoteClick} loading={this.state.isLoading}>
          Save
        </Button>
      </div>
    );

    const cancelNoteButton = (
      <div>
        <Button onClick={this.closeForm} loading={this.state.isLoading}>
          Cancel
        </Button>
      </div>
    );

    return (
      <div>
        <Row>
          <Col span={24}>
            <Row>
              <Col span={24}>{noteContentContainer}</Col>
              <Col span={24}>
                {cancelNoteButton}
                {saveNoteButton}
              </Col>
            </Row>

            {(!isEmpty(this.state.errorMessage) || !isEmptyObject(this.state.errors)) && (
              <Row>{errorBoxContainer}</Row>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    business: state.business.id,
    cart: state.cart,
    isMobileView: state.mobileView.isMobileView,
  };
};

export default connect(mapStateToProps)(OrderDetailNoteForm);
