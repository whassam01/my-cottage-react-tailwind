import React from "react";

export const Price = ({ price, symbol }) => {
  return (
    <>
      {symbol} {(price.amount / 100).toFixed(2)}
    </>
  );
};
