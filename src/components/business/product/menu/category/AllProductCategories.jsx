import React, { Component } from "react";
import { connect } from "react-redux";
import { Skeleton, Space } from "antd";
import _ from "underscore";

// Component
import ProductCategoryItem from "./ProductCategoryItem";

// Redux
import { DEFAULT_PRODUCT_CATEGORY } from "../../../../../constants";

//styles
import "./AllProductCategories.scss";
import ProductMobileCategoryFilter from "./ProductMobileCategoryFilter";
class AllProductCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      selectedCategory: DEFAULT_PRODUCT_CATEGORY,
    };
  }

  selectCategoryTag = (category) => {
    this.setState({ selectedCategory: category });
  };

  findCommonCategories = (products) => {
    const categories = products.map((p) => p.node.categories);
    return _.union(...categories);
  };

  render() {
    const { isLoading, products, isMobileView } = this.props;
    const categories = this.findCommonCategories(products);

    return (
      <div className="all-product-categories-wrapper">
        {isLoading ? (
          <Space>
            {isMobileView ? (
              <Skeleton.Button active={isLoading} />
            ) : (
              <>
                <Skeleton.Button active={isLoading} />
                <Skeleton.Button active={isLoading} />
                <Skeleton.Button active={isLoading} />
                <Skeleton.Button active={isLoading} />
                <Skeleton.Button active={isLoading} />
              </>
            )}
          </Space>
        ) : (
          <>
            {!this.props.isMobileView && categories.length > 0 && (
              <ProductCategoryItem
                key={DEFAULT_PRODUCT_CATEGORY}
                category={DEFAULT_PRODUCT_CATEGORY}
                selectCategoryTag={this.state.selectedCategory}
                onClick={this.selectCategoryTag}
                isLoading={isLoading}
              />
            )}
            {!isMobileView &&
              categories.map((category) => (
                <ProductCategoryItem
                  key={category}
                  category={category}
                  selectCategoryTag={this.state.selectedCategory}
                  onClick={this.selectCategoryTag}
                  isLoading={isLoading}
                />
              ))}
            {isMobileView && (
              <ProductMobileCategoryFilter
                categories={categories}
                onClick={this.selectCategoryTag}
              />
            )}
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    business: state.business.id,
    isMobileView: state.mobileView.isMobileView,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProductCategories);
