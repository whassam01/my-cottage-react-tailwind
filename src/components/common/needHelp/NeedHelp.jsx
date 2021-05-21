import React from "react";

import needHelpIcon from "../../../assets/common/needHelpIcon.svg";

import "./NeedHelp.scss";

export const NeedHelp = (props) => {
  return (
    <div className="cottage-input-need-help">
      <img className="" src={needHelpIcon} alt="Icon" />
      Need help?
    </div>
  );
};
