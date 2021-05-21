import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Tag } from "antd";
import { S3Image } from "aws-amplify-react";
import { CurrencyValue } from "./../../../../common";

import defaultImageSvg from "../../../../../assets/business/product/defaultImage.svg";
import nutritionIcon from "../../../../../assets/business/product/nutrition.svg";
import ingredientsIcon from "../../../../../assets/business/product/ingridients.svg";

import "./MobileViewProductDetail.scss";

const productmageStyle = {
  width: "100%",
  borderRadius: "5px",
};

class MobileViewProductDetail extends Component {
  render() {
    const { productItem } = this.props;
    productItem.ingredients = productItem.ingredients.filter((ingredient) => ingredient);
    const { nutrition, ingredients } = productItem;

    return (
      <Modal
        visible={this.props.visible}
        onCancel={this.props.onCancel}
        footer={null}
        className="mobile-view-product-detail-modal">
        <div className="mobile-product-detail-wrapper">
          <div className="mobile-product-detail-info">
            <div className="mobile-product-detail-info-title">
              <h2>{productItem.title}</h2>
            </div>
            <div className="mobile-product-detail-category-tags">
              {productItem.categories &&
                productItem.categories.map((category, i) => (
                  <Tag key={i} className="mobile-product-detail-tags">
                    {category}
                  </Tag>
                ))}
            </div>
            <div className="mobile-product-detail-info-cost">
              <CurrencyValue value={productItem.price} />
            </div>
          </div>
          {productItem.description && (
            <div className="mobile-view-product-detail-description">
              {productItem.description}
              {/* <div
                className="mobile-view-product-details-trigger-button"
                onClick={this.props.onCancel}>
                <span>Hide Details</span>
              </div> */}
            </div>
          )}
          <div className="mobile-view-product-detail-image">
            {productItem.images && productItem.images[0] ? (
              <S3Image imgKey={productItem.images[0]} theme={{ photoImg: productmageStyle }} />
            ) : (
              <img src={defaultImageSvg} alt="default" />
            )}
          </div>

          <div>
            <div className="mobile-view-detail-nutrition-values-wrapper">
              <div className="mobile-view-detail-title-row">
                <div className="mobile-view-detail-title-row-icon">
                  <img src={nutritionIcon} alt="" />
                </div>
                <div className="mobile-view-detail-title-row-title">NUTRITIONAL VALUES</div>
              </div>
              <div className="mobile-view-detail-nutrition-values-data">
                <div className="mobile-view-detail-nutrition-value">
                  <div>{nutrition.calorie ? `${nutrition.calorie}g` : "--"}</div>{" "}
                  <div>calories</div>
                </div>
                <div className="mobile-view-detail-nutrition-value">
                  <div>{nutrition.protein ? `${nutrition.protein}g` : "--"}</div> <div>protein</div>
                </div>
                <div className="mobile-view-detail-nutrition-value">
                  <div>{nutrition.carbohydrate ? `${nutrition.carbohydrate}g` : "--"}</div>
                  <div>carbs</div>
                </div>
                <div className="mobile-view-detail-nutrition-value">
                  <div>{nutrition.fat ? `${nutrition.fat}g` : "--"}</div> <div>fats</div>
                </div>
              </div>
            </div>
            <div className="mobile-view-detail-ingridients-wrapper">
              <div className="mobile-view-detail-title-row">
                <div className="mobile-view-detail-title-row-icon">
                  <img src={ingredientsIcon} alt="" />
                </div>
                <div className="mobile-view-detail-title-row-title">INGREDIENTS</div>
              </div>
              <div className="mobile-view-detail-ingridients-value">
                {ingredients.length !== 0
                  ? ingredients.map((ingredient, index) => {
                      return ingredient ? <span key={index}>{ingredient},</span> : null;
                    })
                  : "--"}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isMobileView: state.mobileView.isMobileView,
  };
};

export default connect(mapStateToProps)(MobileViewProductDetail);
