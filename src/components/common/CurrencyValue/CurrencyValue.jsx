import React from "react";

export function CurrencyValue(props) {
  const { value, style, className } = props;
  const { amount, currency } = value;
  return (
    <div style={{ ...style }} className={className}>
      {currency.symbol}
      {(amount / 100).toFixed(2)}
    </div>
  );
}
