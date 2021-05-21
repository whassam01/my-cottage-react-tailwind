import React, { useState } from 'react';
import { Modal, Row, Col, Typography } from 'antd';

import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from 'react-stripe-elements';

import { CardFormFieldContent } from 'components/purchase/card/CardFormFields';
import { PaymentIcons, PlusIcon, PrimaryButton } from 'components/common';
import { useCreateCardPaymentMethod, useCreateConsumerCard, useGetCards } from 'store/react-query';

const { Title, Paragraph } = Typography;

const REQUIRED_SYMBOL = '*';

const CardForm = (props) => {
  const { visible, onCancel, consumerId } = props;

  const [errors, setErrors] = useState({});
  const [cardBrand, setCardBrand] = useState('');

  const createStripeCard = useCreateCardPaymentMethod();
  const createConsumerCard = useCreateConsumerCard();

  const cardQuery = useGetCards();

  const handleInputChange = (stripeEvent) => {
    const { elementType, complete, error, brand } = stripeEvent;
    if (error) {
      setErrors({ ...errors, [elementType]: error ? error.message : null });
    } else if (complete) {
      const updatedErrors = errors;
      delete updatedErrors[elementType];

      setCardBrand(brand);
      setErrors(updatedErrors);
    }
  };

  const onSubmit = async () => {
    const cardNumberElement = props.elements.getElement(CardFormFieldContent.CARD_NUMBER.field);

    const res = await createStripeCard.mutateAsync({
      stripe: props.stripe,
      card: { cardNumber: cardNumberElement },
    });

    if (!res.paymentMethod?.id) {
      setErrors({ ...errors, createCardError: true });
      return;
    }

    const updatedErrors = errors;
    delete updatedErrors.createCardError;
    setErrors(updatedErrors);

    await createConsumerCard.mutateAsync({
      consumerId,
      cardId: res.paymentMethod.id,
    });

    await cardQuery.refetch();
    onCancel();
  };

  return (
    <Modal
      maskClosable={
        !createConsumerCard.isLoading && !createStripeCard.isLoading && !cardQuery.isLoading
      }
      className="form-modal-wrapper"
      visible={visible}
      onCancel={onCancel}
      footer={null}>
      <Row type="flex" justify="space-around" align="middle">
        <Title className="dashboard-form-title">Add new card</Title>
      </Row>
      <Row gutter={[10, 20]} className="Dashboard-forms-container">
        <Col span={24}>
          <div className="payment-card-number-wrapper">
            <Paragraph>{`${CardFormFieldContent.CARD_NUMBER.title} ${REQUIRED_SYMBOL}`}</Paragraph>
            <div className="stripe-card-wrapper">
              <CardNumberElement onChange={handleInputChange} />
              <span className="card-icons">
                <PaymentIcons brand={cardBrand} />
              </span>
              {/* stripe uses red, we can configure them to use whatever color we want */}
              {errors.cardNumber && <span style={{ color: 'red' }}>Invalid card number</span>}
            </div>
          </div>
        </Col>
        <Col xl={12} md={24} sm={24} xs={24}>
          <div>
            <Paragraph>{`${CardFormFieldContent.CARD_CVC.title} ${REQUIRED_SYMBOL}`}</Paragraph>
            <CardCvcElement onChange={handleInputChange} />
            {/* stripe uses red, we can configure them to use whatever color we want */}
            {errors.cardCvc && <span style={{ color: 'red' }}>Invalid cvc</span>}
          </div>
        </Col>
        <Col xl={12} md={24} sm={24} xs={24}>
          <div>
            <Paragraph>{`${CardFormFieldContent.CARD_EXPIRY.title} ${REQUIRED_SYMBOL}`}</Paragraph>
            <CardExpiryElement onChange={handleInputChange} />
            {/* stripe uses red, we can configure them to use whatever color we want */}
            {errors.cardExpiry && <span style={{ color: 'red' }}>Card expired</span>}
          </div>
        </Col>
        <Col span={24}>
          {' '}
          <PrimaryButton
            icon={<PlusIcon />}
            eventHandler={onSubmit}
            loading={
              createStripeCard.isLoading || createConsumerCard.isLoading || cardQuery.isLoading
            }
            text="Add card"
          />
          {/* stripe uses red, we can configure them to use whatever color we want */}
          {errors.createCardError && <span style={{ color: 'red' }}>Invalid card details</span>}
        </Col>
      </Row>
    </Modal>
  );
};

export default injectStripe(CardForm);
