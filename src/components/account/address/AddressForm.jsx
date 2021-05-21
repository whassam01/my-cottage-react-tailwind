import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Script from 'react-load-script';
import { Modal, Row, Col, Typography } from 'antd';
import { SubmitButton, Input, Select, Form } from 'formik-antd';
import { Formik } from 'formik';
import { ErrorsBox, CustomTextField, PlusIcon } from 'components/common';
import { useCreateConsumerAddress, useGetConsumer } from 'store/react-query';

import {
  initializeGooglePlacesAutoComplete,
  parseAutocompletedAddress,
  removeNullProp,
} from 'utils/index';
import { StateOrProvince, CountryCode, GoogleUrl } from 'constants/index';

import {
  AddressFormFieldContent,
  AddressInitialValues,
  AddressValidationSchema,
} from './AddressFormFields';
import './Address.scss';

const { Title, Paragraph } = Typography;
const { Option } = Select;
const { STREET, STREET2, CITY, ZIP_CODE, STATE, COUNTRY } = AddressFormFieldContent;

const AddressForm = (props) => {
  const { visible, onCancel } = props;
  const [initFormValues, setInitFormValues] = useState(AddressInitialValues);
  const isMobileView = useSelector((state) => state.mobileView.isMobileView);

  const createConsumerAddress = useCreateConsumerAddress();
  const consumer = useGetConsumer();

  // This is used to load the google maps api
  const loadScript = () => {
    const documentElement = document.getElementById('autocomplete');
    // This will add a function to an input with the id of autocomplete,
    // When an address is clicked the initalvalues of the form will update
    // To the new address
    const auto = initializeGooglePlacesAutoComplete(documentElement, () => {
      const autocompletedAddress = auto.getPlace();
      const address = parseAutocompletedAddress(autocompletedAddress);
      if (address) {
        setInitFormValues({ ...initFormValues, ...address });
      }
    });
  };

  return (
    <Modal
      className="form-modal-wrapper"
      visible={visible}
      onCancel={onCancel}
      style={{ top: 20 }}
      footer={null}>
      <Formik
        initialValues={initFormValues}
        validationSchema={AddressValidationSchema}
        enableReinitialize
        onSubmit={async (values, actions) => {
          try {
            let requestPayload = { consumerId: consumer?.data?.data?.consumer?.id };
            requestPayload = {
              ...AddressValidationSchema.cast(values),
              ...requestPayload,
            };
            removeNullProp(requestPayload);
            await createConsumerAddress.mutateAsync(requestPayload);
            onCancel();
          } catch (error) {
            actions.setErrors({ api: error.errors });
            actions.setSubmitting(false);
          }
        }}>
        {({ errors, touched }) => (
          <Form>
            <Row>
              <Col span={24}>
                <Title className="dashboard-form-title">Add address</Title>
              </Col>
            </Row>
            <Row className="Dashboard-forms-container">
              <Col span={24}>
                <Row>
                  <Col span={24}>
                    <div className="mb-2">
                      <CustomTextField
                        formFieldContent={STREET}
                        name={STREET.field}
                        type="text"
                        as={Input}
                        id="autocomplete"
                        maxLength={STREET.limit.max}
                      />
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col span={24}>
                    <div className="mb-2">
                      <CustomTextField
                        formFieldContent={STREET2}
                        name={STREET2.field}
                        type="text"
                        as={Input}
                        maxLength={STREET2.limit.max}
                      />
                    </div>
                  </Col>
                </Row>

                <Row gutter={5}>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <div className="mb-2">
                      <CustomTextField
                        formFieldContent={CITY}
                        name={CITY.field}
                        type="text"
                        as={Input}
                        maxLength={CITY.limit.max}
                      />
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <CustomTextField
                      formFieldContent={ZIP_CODE}
                      name={ZIP_CODE.field}
                      type="text"
                      as={Input}
                      maxLength={ZIP_CODE.limit.max}
                    />
                  </Col>
                </Row>

                <Row gutter={5}>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <div className="mb-2">
                      <Paragraph>{`${STATE.title}`}</Paragraph>
                      <Select
                        getPopupContainer={(trigger) => trigger.parentNode}
                        name={STATE.field}
                        className={
                          errors[STATE.field] && touched[STATE.field]
                            ? 'profile-input-select error-form'
                            : 'profile-input-select'
                        }>
                        {StateOrProvince.map((state) => (
                          <Option key={state} value={state}>
                            {state}
                          </Option>
                        ))}
                      </Select>
                    </div>
                  </Col>

                  <Col xs={24} sm={24} md={24} lg={12} xl={12} className={isMobileView && 'mb-2'}>
                    <div className="mb-2">
                      <Paragraph>{`${COUNTRY.title}`}</Paragraph>
                      <Select
                        getPopupContainer={(trigger) => trigger.parentNode}
                        name={COUNTRY.field}
                        className={
                          errors[COUNTRY.field] && touched[COUNTRY.field]
                            ? 'profile-input-select error-form'
                            : 'profile-input-select'
                        }>
                        {CountryCode.map((country) => (
                          <Option key={country} value={country}>
                            {country}
                          </Option>
                        ))}
                      </Select>
                    </div>
                  </Col>
                </Row>

                <Row>
                  <SubmitButton
                    type="primary"
                    icon={<PlusIcon />}
                    size="large"
                    style={{ width: '100%' }}
                    className="primary-button">
                    Add address
                  </SubmitButton>
                </Row>

                {errors.api && (
                  <Row>
                    <Col span={24}>
                      <Row>
                        <ErrorsBox messages={errors.api} />
                      </Row>
                    </Col>
                  </Row>
                )}
              </Col>
            </Row>
            <Script url={GoogleUrl.PLACES} onLoad={loadScript} />
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddressForm;
