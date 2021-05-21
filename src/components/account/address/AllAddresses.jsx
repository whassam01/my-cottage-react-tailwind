import React from "react";
import { useSelector } from "react-redux";
import { Card } from "antd";
import { useGetConsumer } from "store/react-query";
import { SecondaryButton, PlusIcon } from "components/common";

import AddressItem from "./AddressItem";
import "./Address.scss";
import { SpoonSpinner } from "components/common/SpoonAndForkSpinner/spoonAndFork";

const TableHeaders = ["STREET AND NUMBER", "CITY", "STATE", "ZIPCODE", "COUNTRY"];

const AllAddresses = (props) => {
  const { showAddAddress } = props;
  const isMobileView = useSelector((state) => state.mobileView.isMobileView);
  const consumer = useGetConsumer();
  console.log(consumer);

  if (consumer.isSuccess) {
    const { id } = consumer?.data?.data?.consumer;
    const { edges } = consumer?.data?.data?.consumer?.addresses;
    return (
      <div className="Profile-tabs-container addresses">
        <div className="cottage-container-row">
          {!isMobileView && (
            <div className="cottage-tabs-title">
              <h1>Addresses</h1>
            </div>
          )}
          <div className="cottage-tabs-button">
            <SecondaryButton
              icon={<PlusIcon />}
              eventHandler={showAddAddress}
              text={"Add address"}
            />
          </div>
        </div>
        <Card bordered={false} id="account-tabs-sections">
          <table>
            <thead>
              <tr className="account-table-head">
                {TableHeaders.map((column, i) => (
                  <th key={i}>{column}</th>
                ))}
                <th></th>
              </tr>
            </thead>
            <tbody className="account-table-body">
              {edges.map((address, key) => (
                <AddressItem consumerId={id} key={key} address={address.node} />
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    );
  } else {
    return <SpoonSpinner isLoading={true} />;
  }
};

export default AllAddresses;
