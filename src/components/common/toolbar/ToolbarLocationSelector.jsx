import React from "react";
import { Select } from "antd";

const { Option } = Select;

export const LocationSelector = ({ selectedBusiness, businesses }) => {
  return (
    <Select defaultValue={selectedBusiness && selectedBusiness.profile.location} size="default">
      {businesses &&
        businesses.map((b) => (
          <Option
            key={b.node.profile.location}
            value={b.node.profile.location}
            className="toolbar-select-option">
            {b.node.profile.location}
          </Option>
        ))}
    </Select>
  );
};
