import React, { Component } from "react";
import { Menu, Dropdown, Button } from "antd";

import "./ViewFilter.scss";
export class ViewFilter extends Component {
  constructor(props) {
    super(props);
    const { viewSizeOptions } = this.props;
    this.state = {
      // Default to first view size on the list
      selectedViewSize: viewSizeOptions[0],
    };
  }

  changeViewSize = (viewSize) => {
    this.setState(
      {
        selectedViewSize: viewSize,
      },
      () => this.props.onViewSizeChange(viewSize)
    );
  };

  render = () => {
    const { selectedViewSize } = this.state;
    const { viewSizeOptions } = this.props;
    const menu = (
      <Menu className="view-menu">
        {viewSizeOptions.map((size) => {
          return (
            <Menu.Item onClick={() => this.changeViewSize(size)} key={size}>
              {size}
            </Menu.Item>
          );
        })}
      </Menu>
    );
    return (
      <div className="view-filter-wrapper">
        <span style={{ paddingRight: 10 }}>Show</span>

        <Dropdown overlay={menu} trigger={["click"]}>
          <Button className="view-button">
            <span className="number-of-views"> {selectedViewSize}</span>
            <ShivronIcon />
          </Button>
        </Dropdown>
        <span style={{ paddingLeft: 10 }}>per page</span>
      </div>
    );
  };
}

const ShivronIcon = () => {
  return (
    <img
      src={require("./../../../assets/common/shivron.svg")}
      className="shivron-icon"
      alt="shivron"
    />
  );
};
