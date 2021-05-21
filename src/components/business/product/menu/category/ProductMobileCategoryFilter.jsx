import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { setProductCategory } from "../../../../../store/actions";
import { DEFAULT_PRODUCT_CATEGORY } from "../../../../../constants";
import "./ProductMobileCategoryFilter.scss";

class ProductMobileCategoryFilter extends Component {
  handleClick = (e) => {
    console.log(e.target.value);
    const category = e.target.value;
    this.props.setProductCategory(category);
    this.props.onClick(category);
  };
  render() {
    const { categories } = this.props;
    return (
      <div className="filter-button">
        <select onChange={this.handleClick} className="filter-button">
          {categories && categories.length === 0 && <option>Filter</option>}
          {categories && categories.length > 0 && <option>{DEFAULT_PRODUCT_CATEGORY}</option>}
          {categories && categories.map((category, i) => <option key={i}>{category}</option>)}
        </select>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductMobileCategoryFilter);
