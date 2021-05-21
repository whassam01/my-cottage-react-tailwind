import React from "react";
import { Button } from "antd";

function FullPageTextSection({ image, title, description, button, extra, style }) {
  return (
    <div className="section-body-text-info justify-center flex-row lg:flex-1 md:flex-col-reverse lg:flex-row-reverse" style={style}>
      <div className="section-body-text-info-content">
        <div className="section-body-text-info-content-title mb-6 text-left">{title}</div>
        <div className="section-body-text-info-content-description text-left">{description}</div>
        {button && (
          <div className="section-body-text-info-content-buttons">
            <Button onClick={button.onClick} className="rounded-md">
              {button.text}
            </Button>
          </div>
        )}
        {extra && <div className="section-body-text-info-content-extra">{extra}</div>}
      </div>
    </div>
  );
}

export default FullPageTextSection;
