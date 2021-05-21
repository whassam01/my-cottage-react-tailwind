import React from "react";
import icon from "assets/common/forkandspoon.gif";
import "./spoonAndFork.css";

// todo: don't pass in className but instead positions in an enum and put class here. ex SpoonSpinnerPosition.TOP
export const SpoonSpinner = ({ isLoading, className }) => (
  <div className="spoon-nested-loading">
    <div className={`spoon-spinning ${className}`}>
      {isLoading && <img src={icon} alt="" className={`spoon-loader ${className}`} />}
    </div>
  </div>
);
