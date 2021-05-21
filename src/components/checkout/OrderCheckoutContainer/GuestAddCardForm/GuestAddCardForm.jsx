import React from "react";
import { CardNumberElement, CardExpiryElement, CardCvcElement } from "react-stripe-elements";

import "./GuestAddCardForm.scss";

function GuestAddCardForm({ guestAddCardFormInputChange }) {
  return (
    <div className="guest-checkout-payment-step-body">
      <div>
        <CardNumberElement onChange={guestAddCardFormInputChange} />
      </div>
      <div>
        <CardCvcElement onChange={guestAddCardFormInputChange} />
      </div>
      <div>
        <CardExpiryElement onChange={guestAddCardFormInputChange} />
      </div>
    </div>
  );
}

export default GuestAddCardForm;
