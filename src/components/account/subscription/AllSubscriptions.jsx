import React from "react";
import { useSelector } from "react-redux";
import { Typography, Card, Row } from "antd";
import { useGetConsumer } from "store/react-query";
import SubscriptionItem from "./SubscriptionItem";
const { Title } = Typography;

const TableHeaders = ["SUBSCRIPTION", "BUSINESS NAME", "AMOUNT", "CARD ENDING"];

const AllSubscriptions = (props) => {
  const { showUpdateSubscription } = props;
  const consumer = useGetConsumer();
  const { id, subscriptions = [] } = consumer?.data?.data?.consumer;
  return (
    <div className="Profile-tabs-container">
      <Card bordered={false} id="account-tabs-sections">
        <table>
          <thead className="account-table-head">
            <tr>
              {TableHeaders.map((column, i) => (
                <th key={i}>{column}</th>
              ))}
              {/* For config dropdown. */}
              <th></th>
            </tr>
          </thead>
          <tbody className="account-table-body">
            {subscriptions.map((subscription, key) => (
              <SubscriptionItem
                key={key}
                consumerId={id}
                subscription={subscription}
                showUpdateSubscription={() => showUpdateSubscription(subscription)}
              />
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default AllSubscriptions;
