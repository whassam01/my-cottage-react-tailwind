import React from "react";
import { Menu, Dropdown } from "antd";
import { DeleteOutlined, EditOutlined, EllipsisOutlined } from "@ant-design/icons";
// Weird bug, call stack gets exceeded if I import from 'store/react-query'
import { useArchiveSubscription } from "store/react-query/subscription";
import "./Subscription.scss";

const SubscriptionItem = (props) => {
  const { subscription, showUpdateSubscription } = props;
  const { business, plan, card } = subscription;
  const archiveSubscription = useArchiveSubscription();
  const handleRemoveItemClick = (e) => {
    archiveSubscription.mutate({ businessId: business.id, subscriptionId: subscription.id });
  };

  const subscriptionContainer = <div datalabel={"SUBSCRIPTION"}>{plan.title}</div>;

  const businessContainer = <div datalabel={"BUSINESS NAME"}>{business.profile.title}</div>;

  const cardEndingContainer = <div datalabel={"AMOUNT"}>{card.lastFour}</div>;

  const amountContainer = (
    <div datalabel={"CARD ENDING"}>
      {plan.price.currency.symbol}
      {(plan.price.amount / 100).toFixed(2)}
    </div>
  );

  const menu = (
    <Menu>
      <Menu.Item key="1" className={"cottage-dropdown-text"} onClick={showUpdateSubscription}>
        <EditOutlined />
        Edit
      </Menu.Item>
      <Menu.Item key="2" className={"cottage-dropdown-text"} onClick={handleRemoveItemClick}>
        <DeleteOutlined />
        Remove
      </Menu.Item>
    </Menu>
  );

  const subscriptionDropdownContainer = (
    <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
      <EllipsisOutlined />
    </Dropdown>
  );

  return (
    <>
      <tr className="profile-table-row" id="profile-tabs-table">
        <td>{subscriptionContainer}</td>
        <td>{businessContainer}</td>
        <td>{amountContainer}</td>
        <td>{cardEndingContainer}</td>
        <td>{subscriptionDropdownContainer}</td>
      </tr>
    </>
  );
};

export default SubscriptionItem;
