import React from "react";
import "./EditButton.scss";

import editItemIcon from "../../../assets/common/editItemIcon.svg";

export const EditButton = (props) => {
  return (
    <div
      className={`cottage-edit-button-container ${props.className ? props.className : ""}`}
      onClick={props.onClick}>
      <img className="" src={editItemIcon} alt="Icon" />
    </div>
  );
};
