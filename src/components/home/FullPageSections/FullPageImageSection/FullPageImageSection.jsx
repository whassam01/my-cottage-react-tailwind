import React from "react";

function FullPageImageSection({ image, style }) {
  return (
    <div className="section-body-image-info " style={style}>
      <div className="relative">{image}</div>
    </div>
  );
}

export default FullPageImageSection;
