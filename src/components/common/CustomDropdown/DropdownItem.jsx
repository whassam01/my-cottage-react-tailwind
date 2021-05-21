import React from "react";

export const DropdownItem = (props) => {
  const { onClick, color, icon, title } = props;
  return (
    <div className="more-icon-dropdown-body-item" onClick={onClick}>
      <div>{icon && <div className="dropdown-icon">{icon}</div>}</div>
      <div>
        {title && (
          <div className="dropdown-title" style={{ color }}>
            {title}
          </div>
        )}
      </div>
    </div>
  );
};
DropdownItem.defaultProps = {
  color: "#4C6889",
  icon: null,
  title: null,
};
