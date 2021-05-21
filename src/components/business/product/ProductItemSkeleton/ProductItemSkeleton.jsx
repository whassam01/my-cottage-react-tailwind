import React from "react";
import { Skeleton } from "antd";

//scss
import "./ProductItemSkeleton.scss";

function ProductItemSkeleton({ active }) {
  return (
    <div className="product-item-skeleton-wrapper">
      <Skeleton
        avatar={{ size: "large", shape: "square" }}
        active={active}
        className="product-item-skeleton"
      />
    </div>
  );
}

export default ProductItemSkeleton;
