import React from "react";
import { useSelector } from "react-redux";
import { Modal, Row, Col, Typography } from "antd";
import { SubmitButton, Input, Select, Form } from "formik-antd";
import { Formik } from "formik";
import { useGetConsumer } from "store/react-query";
// Look into why maximum call stack exceeded when placed with the above
import { useUpdateSubscription } from "store/react-query/subscription";
import { ErrorsBox, CustomTextField, EditIcon, PaymentIcons } from "components/common";
import {
  SubscriptionFormFieldContent,
  SubscriptionFormInitialValues,
} from "./SubscriptionFormFields";
import "containers/general.scss";

const { BUSINESS, SUBSCRIPTION, CARD } = SubscriptionFormFieldContent;
const { Title, Paragraph } = Typography;
const { Option } = Select;

const SubscriptionForm = (props) => {
  const { visible, onCancel, subscriptionToEdit } = props;
  const isMobileView = useSelector((state) => state.mobileView.isMobileView);
  const consumer = useGetConsumer();
  const updateSubscription = useUpdateSubscription();

  return (
    <div>
      <Modal
        visible={visible}
        onCancel={onCancel}
        footer={null}
        style={{ top: "20px" }}
        className="form-modal-wrapper">
        <Formik
          initialValues={SubscriptionFormInitialValues(subscriptionToEdit)}
          onSubmit={async (values, actions) => {
            try {
              const requestPayload = {
                businessId: subscriptionToEdit.business.id,
                subscriptionId: subscriptionToEdit.id,
                cardId: values[CARD.field],
              };
              await updateSubscription.mutateAsync(requestPayload);
              onCancel();
            } catch (error) {
              actions.setErrors({ api: error.errors });
              actions.setSubmitting(false);
            }
          }}>
          {({ errors, values, isSubmitting, status }) => (
            <Form>
              <Row type="flex" justify="space-around" align="middle">
                <Title className="cottage-input-form-title"> Update subscription </Title>
              </Row>
              <Row gutter={[10, 20]} className="Dashboard-forms-container">
                <Col
                  xs={24}
                  sm={24}
                  md={24}
                  lg={12}
                  xl={12}
                  className={`${isMobileView ? "margin-bottom-20" : ""}`}>
                  <CustomTextField
                    formFieldContent={BUSINESS}
                    name={BUSINESS.field}
                    type="text"
                    as={Input}
                    disabled={true}
                  />
                </Col>
                <Col
                  xs={24}
                  sm={24}
                  md={24}
                  lg={12}
                  xl={12}
                  className={`${isMobileView ? "margin-bottom-20" : ""}`}>
                  <CustomTextField
                    formFieldContent={SUBSCRIPTION}
                    name={SUBSCRIPTION.field}
                    type="text"
                    as={Input}
                    disabled={true}
                  />
                </Col>
                <Col span={24}>
                  <div className="mb-2 payment-card-number-wrapper">
                    <Paragraph>{CARD.title}</Paragraph>
                    <Select
                      getPopupContainer={(trigger) => trigger.parentNode}
                      className="profile-input-select"
                      placeholder="Card"
                      style={{ width: "100%" }}
                      size={"large"}
                      name={CARD.field}>
                      {consumer?.data?.data?.consumer?.cards.edges.map((card) => (
                        <Option key={card.node.id} value={card.node.id}>
                          <PaymentIcons brand={card.node.brand} className="payment-card-icons" />
                          {card.node.lastFour}
                        </Option>
                      ))}
                    </Select>
                  </div>
                </Col>

                <Col span={24}>
                  <SubmitButton
                    type="primary"
                    icon={<EditIcon />}
                    size="large"
                    style={{ width: "100%" }}
                    className="primary-button"
                    disabled={values[CARD.field] === subscriptionToEdit.card.id}>
                    Update SubscriptionForm
                  </SubmitButton>
                </Col>

                {errors.api && (
                  <Row>
                    <Col span={24}>
                      <ErrorsBox messages={errors.api} />
                    </Col>
                  </Row>
                )}
              </Row>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default SubscriptionForm;
