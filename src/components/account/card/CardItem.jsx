import React from "react";
import { useSelector } from "react-redux";
import { Menu, Dropdown } from "antd";
import { DeleteOutlined, EllipsisOutlined } from "@ant-design/icons";
import { useArchiveConsumerCard } from "store/react-query";
import { PaymentIcons } from "components/common";

import "components/account/address/Address.scss";

const CardItem = (props) => {
  const { consumerId, card } = props;
  const { lastFour, brand, expMonth, expYear } = card;
  const isMobileView = useSelector((state) => state.mobileView.isMobileView);

  const archiveConsumerCard = useArchiveConsumerCard();

  const handleRemoveItemClick = (e) => {
    archiveConsumerCard.mutate({ consumerId, cardId: card.id });
  };

  const lastFourContainer = (
    <div datalabel={"CARD NUMBER"}>
      {"**** **** **** "}
      {lastFour}
    </div>
  );

  const brandContainer = (
    <div datalabel={!isMobileView ? "BRAND" : undefined}>
      <PaymentIcons brand={brand} className="payment-card-icons" />
    </div>
  );

  const expirationContainer = (
    <div datalabel={"EXPIRES"}>{`${
      expMonth.length >= 2 ? expMonth : "0" + expMonth
    }/${expYear}`}</div>
  );

  const menu = (
    <Menu>
      <Menu.Item className="cottage-dropdown-text" onClick={handleRemoveItemClick}>
        <DeleteOutlined /> Remove
      </Menu.Item>
    </Menu>
  );

  const cardDropdownContainer = (
    <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
      <EllipsisOutlined />
    </Dropdown>
  );

  return (
    <>
      <tr className="profile-table-row card-item-container" id="profile-tabs-table">
        <td>{brandContainer}</td>
        <td>{lastFourContainer}</td>
        <td>{expirationContainer}</td>
        <td>{cardDropdownContainer}</td>
      </tr>
    </>
  );
};

export default CardItem;
