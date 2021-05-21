import React from "react";
import { withRouter } from "react-router-dom";

//icons
import { ReactComponent as CottageHomeOrange } from "./../../../assets/common/CottageHomeOrange.svg";

//scss
import "./BusinessFooter.scss";

import { PageRoute } from "../../../constants";

function BusinessFooter({ props }) {
  return (
    <div className="business-footer-wrapper">
      <div className="business-footer">
        <div className="business-footer-powered-by">Powered by Cottage</div>
        <div className="business-footer-icon" onClick={() => (window.location = PageRoute.HOME)}>
          <CottageHomeOrange />
        </div>
        <div className="business-footer-links">
          <span onClick={() => (window.location = PageRoute.TERMS)}>Terms & Conditions</span>
          <span className="dashses">-</span>
          <span onClick={() => (window.location = PageRoute.PRIVACY)}>Privacy</span>
          {/* <span className="dashses">-</span> */}
          {/* <span>Help</span> */}
        </div>
      </div>
    </div>
  );
}

export default withRouter(BusinessFooter);
