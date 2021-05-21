import React from "react";
import { Input, Form, Select } from "antd";

//components
import { PrimaryButton, InputPhone } from "./../../../index";
//scss
import "./GuestCheckoutForm.scss";
import { ErrorBox } from "../../../errorBox/ErrorBox";

//constsnts
import { StateOrProvince, ScheduleType } from "./../../../../../constants";

function GuestCheckoutForm(props) {
  const { checkoutType, selectedAddress, onSubmit, isLoading, errorMessages } = props;
  const [form] = Form.useForm();
  return (
    <div className="guest-checkout-right">
      <div>
        <div className="right-title">Guest Checkout</div>
        <div className="guest-checkout-right-form">
          <Form form={form}>
            <div className="guest-checkout-right-description">
              Required in order to contact you about your order.
            </div>
            <div className="guest-checkout-right-form-row">
              <Form.Item name="firstName">
                <Input placeholder="First Name" />
              </Form.Item>
              <Form.Item name="lastName">
                <Input placeholder="Last Name" />
              </Form.Item>
            </div>
            <div className="guest-checkout-right-form-row">
              <Form.Item name="email">
                <Input placeholder="Email Address" />
              </Form.Item>
            </div>
            <div className="guest-checkout-right-form-row">
              <Form.Item name="phoneNumber">
                <InputPhone placeholder="Phone Number" />
              </Form.Item>
            </div>
            {checkoutType === "DELIVERY" && (
              <>
                <div className="guest-checkout-right-form-row">
                  <Form.Item name="street">
                    <Input placeholder="Street" />
                  </Form.Item>
                </div>
                <div className="guest-checkout-right-form-row">
                  <Form.Item name="city">
                    <Input placeholder="City" />
                  </Form.Item>
                </div>
                <div className="guest-checkout-right-form-row">
                  <Form.Item name="stateOrProvince">
                    <Select
                      getPopupContainer={(trigger) => trigger.parentNode}
                      placeholder="State"
                      style={{ width: "100%" }}>
                      {StateOrProvince.map((state) => (
                        <Select.Option key={state} value={state}>
                          {state}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item name="postalCode">
                    <Input placeholder="Zip Code" />
                  </Form.Item>
                </div>
              </>
            )}
            {checkoutType === ScheduleType.PICK_UP && (
              <>
                <div className="guest-checkout-pick-up-info">
                  You selected the following pick up location for this checkout:
                </div>
                <div className="guest-checkout-pick-up-info guest-checkout-pick-up-info-address">
                  {selectedAddress.street}, {selectedAddress.postalCode} {selectedAddress.city},{" "}
                  {selectedAddress.stateOrProvince}
                </div>
              </>
            )}
            <div className="proceed-to-checkout-box">
              <div className="agree-condition-text">
                By continuing, I agree to Cottage’s <span>Terms & Conditions</span>.
              </div>
              <div className="proceed-to-checkout-button">
                <Form.Item>
                  <PrimaryButton
                    text="Proceed to Checkout"
                    eventHandler={() => onSubmit(form)}
                    htmlType="submit"
                    loading={isLoading}
                  />
                </Form.Item>
              </div>
            </div>
            {errorMessages.length !== 0 && (
              <div>
                <ErrorBox messages={errorMessages} />
              </div>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
}

export default GuestCheckoutForm;
