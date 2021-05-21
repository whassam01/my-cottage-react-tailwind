import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Modal, Row, Col, Typography } from 'antd';

// Stripe
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from 'react-stripe-elements';

// Components
import { ErrorBox, PrimaryButton, PlusIcon, PaymentIcons } from '../../common';

// Redux
import { createCardPaymentMethod, createConsumerCard } from '../../../store/actions';
import { CardActionType } from '../../../store/actiontypes';

// Utils
import { isEmpty, isEmptyObject } from '../../../utils';
// scss
import './Cards.scss';
const { Title, Paragraph } = Typography;

const initialState = {
  visible: false,
  errorMessage: '',
  errors: {},
  isLoading: false,
  brand: '',
  cardNumber: {},
  cardExpiry: {},
  cardCvc: {},
};

const REQUIRED_SYMBOL = '*';

const FormFieldContent = {
  CARD_NUMBER: {
    title: 'CARD NUMBER',
    label: 'Card number',
    field: 'cardNumber',
  },
  CARD_EXPIRY: {
    title: 'EXPIRATION DATE',
    label: 'Expiration date',
    field: 'cardExpiry',
  },
  CARD_CVC: {
    title: 'SECURITY CODE',
    label: 'Security code',
    field: 'cardCvc',
  },
};

const requiredFields = [
  FormFieldContent.CARD_NUMBER,
  FormFieldContent.CARD_EXPIRY,
  FormFieldContent.CARD_CVC,
];

const addCardParams = {
  title: 'Add card',
  buttonText: 'Add card',
  buttonIcon: 'plus',
};

class CardForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...initialState,
      cardFormContent: addCardParams,
    };
  }

  componentDidUpdate(prevProps) {
    const { card, invalidateConsumer, consumerId } = this.props;
    if (card.status !== prevProps.card.status) {
      if (card.status === CardActionType.CREATE_CARD_PAYMENT_METHOD_SUCCESS) {
        this.props.createConsumerCard({
          consumerId,
          cardId: card.value.paymentMethod.id,
        });
      } else if (card.status === CardActionType.CREATE_CONSUMER_CARD_SUCCESS) {
        invalidateConsumer();
        this.closeForm();
      } else if (
        card.status === CardActionType.CREATE_CARD_PAYMENT_METHOD_ERROR ||
        card.status === CardActionType.CREATE_CONSUMER_CARD_ERROR
      ) {
        const { message } = card.error;
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

  onSubmit = (e) => {
    const { errors } = this.validateInput();
    this.setState({
      errors,
    });

    if (!isEmptyObject(errors)) {
      return;
    }

    const cardNumberElement = this.props.elements.getElement(FormFieldContent.CARD_NUMBER.field);
    this.props.createCardPaymentMethod(this.props.stripe, { cardNumber: cardNumberElement });
  };

  validateInput = () => {
    const { errors } = this.state;

    requiredFields
      .filter((f) => isEmptyObject(this.state[f.field]))
      .forEach((fo) => {
        if (!errors[fo.field]) {
          errors[fo.field] = `${fo.label} is required`;
        }
      });

    const sortedErrors = {};
    Object.keys(errors)
      .sort()
      .reverse()
      .forEach((key) => (sortedErrors[key] = errors[key]));

    return { errors: sortedErrors };
  };

  handleInputChange = (e) => {
    const { elementType, complete, error, brand } = e;
    if (error) {
      this.setState({
        [elementType]: {},
        errors: {
          ...this.state.errors,
          [elementType]: error ? error.message : null,
        },
      });
    } else if (complete) {
      const updatedErrors = this.state.errors;
      delete updatedErrors[elementType];
      this.setState({
        brand,
        errors: updatedErrors,
        [elementType]: {
          complete,
        },
      });
    }
  };

  render() {
    const { CARD_NUMBER, CARD_EXPIRY, CARD_CVC } = FormFieldContent;
    const { cardFormContent, brand } = this.state;
    const { title, buttonText } = cardFormContent;
    const errorPayload =
      this.state.errorMessage !== initialState.errorMessage
        ? [this.state.errorMessage]
        : Object.values(this.state.errors);
    const errorBoxContainer = <ErrorBox messages={errorPayload} />;

    const cardNumberContainer = (
      <div className="payment-card-number-wrapper">
        <Paragraph>{`${CARD_NUMBER.title} ${REQUIRED_SYMBOL}`}</Paragraph>
        <div className="stripe-card-wrapper">
          <CardNumberElement
            className={this.state.errors[CARD_NUMBER.field] && 'StripeElement--invalid'}
            onChange={this.handleInputChange}
          />
          <span className="card-icons">
            <PaymentIcons brand={brand} />
          </span>
        </div>
      </div>
    );

    const securityCodeContainer = (
      <div>
        <Paragraph>{`${CARD_CVC.title} ${REQUIRED_SYMBOL}`}</Paragraph>
        <CardCvcElement
          className={this.state.errors[CARD_CVC.field] && 'StripeElement--invalid'}
          onChange={this.handleInputChange}
        />
      </div>
    );

    const expirationDateContainer = (
      <div>
        <Paragraph>{`${CARD_EXPIRY.title} ${REQUIRED_SYMBOL}`}</Paragraph>
        <CardExpiryElement
          className={this.state.errors[CARD_EXPIRY.field] && 'StripeElement--invalid'}
          onChange={this.handleInputChange}
        />
      </div>
    );

    const addCardButton = (
      <PrimaryButton
        icon={<PlusIcon />}
        eventHandler={this.onSubmit}
        loading={this.state.isLoading}
        text={buttonText}
      />
    );

    return (
      <div>
        <Modal
          visible={this.props.visible}
          onCancel={this.closeForm}
          footer={null}
          style={{ top: '20px' }}
          className="form-modal-wrapper">
          <Row type="flex" justify="space-around" align="middle">
            <Title className="dashboard-form-title">{title}</Title>
          </Row>
          <Row gutter={[10, 20]} className="Dashboard-forms-container">
            <Col span={24}>{cardNumberContainer}</Col>
            <Col xl={12} md={24} sm={24} xs={24}>
              {securityCodeContainer}
            </Col>
            <Col xl={12} md={24} sm={24} xs={24}>
              {expirationDateContainer}
            </Col>
            <Col span={24}>{addCardButton}</Col>

            {(!isEmpty(this.state.errorMessage) || !isEmptyObject(this.state.errors)) && (
              <Col span={24}>{errorBoxContainer}</Col>
            )}
          </Row>
          {/* <Row type="flex" justify="space-around" align="middle">
            <NeedHelp />
          </Row> */}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    card: state.consumer.card,
    isMobileView: state.mobileView.isMobileView,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createConsumerCard: (input) => dispatch(createConsumerCard(input)),
    createCardPaymentMethod: (stripe, input) => dispatch(createCardPaymentMethod(stripe, input)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(injectStripe(CardForm));
