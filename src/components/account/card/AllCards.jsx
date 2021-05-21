import React from "react";
import { useSelector } from "react-redux";
import { Card } from "antd";
import { SecondaryButton, PlusIcon } from "components/common";
import { useGetConsumer } from "store/react-query";
import CardItem from "./CardItem";
import "components/account/address/Address.scss";

const TableHeaders = ["TYPE", "CARD NUMBER", "EXPIRES"];

const AllCards = (props) => {
  const { showAddCard } = props;
  const isMobileView = useSelector((state) => state.mobileView.isMobileView);
  const consumer = useGetConsumer();
  const { id } = consumer?.data?.data?.consumer;
  const { edges } = consumer?.data?.data?.consumer?.cards;

  return (
    <div className="Profile-tabs-container">
      <div className="cottage-container-row">
        {!isMobileView && (
          <div className="cottage-tabs-title">
            <h1>Cards</h1>
          </div>
        )}
        <div className="cottage-tabs-button">
          <SecondaryButton icon={<PlusIcon />} eventHandler={showAddCard} text={"Add card"} />
        </div>
      </div>
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
            {edges.map((edge, key) => (
              <CardItem consumerId={id} key={key} card={edge.node} />
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default AllCards;
