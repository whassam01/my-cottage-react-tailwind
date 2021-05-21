import React, { Component } from "react";
import { connect } from "react-redux";
import { Tag } from "antd";

import { setProductCategory } from "../../../../../store/actions";

//styles
import "./ProductCategoryItem.scss";

class ProductCategoryItem extends Component {
  handleClick = (category) => {
    this.props.setProductCategory(category);
    this.props.onClick(category);
  };
  render() {
    const { category, selectCategoryTag } = this.props;
    const isActive = category === selectCategoryTag;
    return (
      <Tag
        className={`cottage-tag ${isActive ? "cottage-tag-active" : ""}`}
        onClick={() => this.handleClick(category)}>
        {category}
      </Tag>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isMobileView: state.mobileView.isMobileView,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setProductCategory: (category) => dispatch(setProductCategory({ category })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCategoryItem);
