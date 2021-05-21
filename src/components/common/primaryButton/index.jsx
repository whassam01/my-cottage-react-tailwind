import React from "react";
import "./PrimaryButton.scss";
import { Button } from "antd";

export const PrimaryButton = ({
  text,
  type,
  icon,
  size,
  eventHandler,
  loading,
  disabled,
  style,
  className,
}) => {
  return (
    <Button
      className={`primary-button ${className ? className : ""}`}
      type={type}
      icon={icon}
      htmlType="submit"
      size={size}
      style={style}
      block
      onClick={eventHandler}
      loading={loading}
      disabled={disabled}>
      {text}
    </Button>
  );
};
