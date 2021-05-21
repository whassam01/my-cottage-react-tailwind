import React from "react";
import "./SecondaryButton.scss";
import { Button } from "antd";

export const SecondaryButton = ({ text, type, icon, size, eventHandler, loading, disabled }) => {
  return (
    <Button
      className="secondary-button"
      type={type}
      icon={icon}
      size={size}
      style={{ width: "100%" }}
      onClick={eventHandler}
      loading={loading}
      disabled={disabled}>
      {text}
    </Button>
  );
};
