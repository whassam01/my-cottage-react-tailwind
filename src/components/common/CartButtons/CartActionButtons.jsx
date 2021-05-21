import React from "react";
import "./CartActionButtons.scss";
export const CartActionButtons = ({ icon, bgColor, actions, isCheckoutDisabled }) => {
  return (
    <div
      className={`cart-buttons ${isCheckoutDisabled ? "disabled" : null} `}
      onClick={actions}
      style={{ background: bgColor }}>
      {icon}
    </div>
  );
};
