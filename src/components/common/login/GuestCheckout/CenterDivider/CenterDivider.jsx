import React from "react";

const types = {
  vertical: "vertical",
  horizontal: "horizontal",
};

function CenterDivider({ type }) {
  //to make sure no false value is passed
  if (!types[type]) type = "vertical";
  return (
    <div
      className={`center-divider ${
        type === types.vertical ? "center-divider-vertical" : "center-divider-horizontal"
      }`}>
      <div className="center-divider-line"></div>
      <div className="center-divider-text">OR</div>
    </div>
  );
}

CenterDivider.defaultProps = {
  type: "vertical",
};
export default CenterDivider;
