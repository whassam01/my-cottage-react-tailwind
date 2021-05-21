import React from "react";

export const Quantity = ({ quantity, interval }) => {
  return <>{`Up to ${quantity} meals per ${interval === "WEEKLY" ? "week" : "month"}`}</>;
};
