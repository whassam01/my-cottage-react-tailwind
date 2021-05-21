import React from "react";
import { Tag } from "antd";
import { OrderStatus } from "./../../../../constants";
export function OrderStatusTag(props) {
  const { status, style } = props;
  const tagText =
    status === OrderStatus.BUSINESS_CANCELED ||
    status === OrderStatus.CONSUMER_CANCELED_NOT_REFUNDED ||
    status === OrderStatus.CONSUMER_CANCELED_REFUNDED
      ? { text: "CANCELLED", color: "red" }
      : status === OrderStatus.PURCHASED
      ? { text: OrderStatus.PURCHASED, color: "blue" }
      : status === OrderStatus.COMPLETED
      ? { text: OrderStatus.COMPLETED, color: "green" }
      : { text: status, color: "red" };
  return (
    <Tag color={tagText.color} style={{ ...style }}>
      {tagText.text}
    </Tag>
  );
}
