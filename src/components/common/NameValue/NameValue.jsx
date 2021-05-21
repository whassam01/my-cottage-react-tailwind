import React from "react";
import "./NameValue.scss";

export function NameValue(props) {
  const { name, value, fadedValue, style, className } = props;
  return (
    <div style={{ ...style }} className={["name-value-wrapper", className].join(" ")}>
      <div className="name-value">
        <div className="name-value-name">
          <p>{name}</p>
        </div>
        <div className={`name-value-value ${fadedValue ? "value-faded" : ""}`}>
          <h3>{value}</h3>
        </div>
      </div>
    </div>
  );
}

NameValue.defaultProps = {
  fadedValue: false,
};
