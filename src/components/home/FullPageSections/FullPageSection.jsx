import React from "react";

//scss
import "./FullPageSection.scss";

function FullPageSection({ textSection, imageSection, reverse, vertical, children }) {
  return (
    <div className="section fp-auto-height overflow-hidden">
      <div
        className={`section-body flex md:flex-col-reverse lg:flex-row flex-wrap w-full px-8 md:px-10 ${reverse ? "section-body-row-reverse flex-col-reverse lg:flex-row-reverse md:px-10" : ""} ${
          vertical ? "section-body-row-vertical" : ""
        }`}>
        {textSection && textSection}
        {imageSection && imageSection}
        {children && children}
      </div>
    </div>
  );
}

export default FullPageSection;

FullPageSection.defaultProps = {
  reverse: false,
  vertical: false,
};
