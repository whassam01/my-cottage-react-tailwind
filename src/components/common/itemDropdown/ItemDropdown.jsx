import React from "react";
import { Row, Col, Dropdown, Menu } from "antd";

import configIconSvg from "../../../assets/common/configIcon.svg";
import closeItemSvg from "../../../assets/common/closeItemIcon.svg";
import editItemSvg from "../../../assets/common/editItemIcon.svg";

import "./ItemDropdown.scss";

export const ItemDropdown = (props) => {
  const menu = (
    <Menu className={`cottage-item-dropdown-menu ${props.className}`}>
      {props.showEdit && (
        <Menu.Item
          key="1"
          className="cottage-item-dropdown-menu-edit"
          onClick={props.handleEditItemClick}>
          <Row type="flex" justify="space-around" align="middle">
            <Col span={6}>
              <img src={editItemSvg} alt="edit" />
            </Col>

            <Col span={18}>Edit</Col>
          </Row>
        </Menu.Item>
      )}
      <Menu.Item
        key="2"
        className="cottage-item-dropdown-menu-remove"
        onClick={props.handleRemoveItemClick}>
        <Row type="flex" justify="space-around" align="middle">
          <Col span={6}>
            <img src={closeItemSvg} alt="close" />
          </Col>

          <Col span={18}>Remove</Col>
        </Row>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement="bottomRight" overlayClassName="cottage-item-dropdown">
      <div className="config-button-div">
        <img src={configIconSvg} alt="" />
      </div>
    </Dropdown>
  );
};
