import React from "react";
import NumberFormat from "react-number-format";

import "./InputPhone.css";

export const InputPhone = ({ ...props }) => {
  const className = props.className
    ? props.className + " dashboard-input-phone-number"
    : "dashboard-input-phone-number";
  return <NumberFormat {...props} className={className} format="+1 (###) ###-####" mask="_" />;
};

export default InputPhone;
