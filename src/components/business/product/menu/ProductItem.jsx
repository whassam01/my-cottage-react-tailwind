import React, { Component } from "react";
import { connect } from "react-redux";
import { Tag, Skeleton, Input } from "antd";
import { S3Image } from "aws-amplify-react";

// Components
import { CurrencyValue } from "./../../../common";

// Styles
import "./ProductItem.scss";
// Icons
import defaultImageSvg from "../../../../assets/business/product/defaultImage.svg";
import nutritionIcon from "../../../../assets/business/product/nutrition.svg";
import ingredientsIcon from "../../../../assets/business/product/ingridients.svg";
import MobileViewProductDetail from "./MobileViewProductDetail/MobileViewProductDetail";
import { PlusAddonIcon, MinusAddonIcon, PlusIcon, PrimaryButton } from "../../../common";
import { MAX_OFFER_QUANTITY, IngredientUnitLabel } from "../../../../constants";

const productImageStyle = {
  width: "100px",
  height: "100px",
  borderRadius: "5px",
};

const initialQuantity = 1;

class ProductItem extends Component {
  state = {
    isShowDetail: false,
    quantity: initialQuantity,
  };

  onCancelMobileProductDetails = () => {
    this.setState({ isShowMobileProductDetails: false });
  };

  onViewMobileProductDetails = () => {
    this.setState({ isShowMobileProductDetails: true });
  };

  incrementQuantity = () => {
    const { quantity } = this.state;
    if (quantity !== MAX_OFFER_QUANTITY) {
      this.setState({ quantity: quantity + 1 });
    }
  };

  decrementQuantity = () => {
    const { quantity } = this.state;
    if (quantity !== initialQuantity) {
      this.setState({ quantity: quantity - 1 });
    }
  };

  addToCart = () => {
    const { quantity } = this.state;
    const { product } = this.props;

    this.props.addToCart(product, quantity);
    this.setState({ quantity: initialQuantity });
  };

  render() {
    const { quantity } = this.state;
    const { product, isMobileView, isLoading, isCheckoutDisabled } = this.props;
    const { title, description, price, categories, nutrition, ingredients, images } = product;

    const categoriesContainer = categories.map((category, i) => (
      <Tag key={i} className="business-product-card-tags">
        {category}
      </Tag>
    ));

    const descriptionContainer = (
      <>
        <div className="business-product-card-description"> {description}</div>
      </>
    );

    const imageContainer =
      images && images.length > 0 ? (
        <S3Image imgKey={images[0]} theme={{ photoImg: productImageStyle }} />
      ) : (
        <img src={defaultImageSvg} alt="default" />
      );

    const nutritionContainer = (
      <div className="nutrition-values-wrapper">
        <div className="title-row">
          <div className="title-row-icon">
            <img src={nutritionIcon} alt="" />
          </div>
          <div className="title-row-title">NUTRITIONAL VALUES</div>
        </div>
        <div className="nutrition-values-data">
          <div>
            <div className="nutrition-value">
              <div style={{ color: "#FB775A" }}>
                {nutrition.calorie ? `${nutrition.calorie}` : "--"}
              </div>{" "}
              <div>calories</div>
            </div>
            <div className="nutrition-value">
              <div>{nutrition.protein ? `${nutrition.protein}g` : "--"}</div> <div>protein</div>
            </div>
          </div>
          <div>
            <div className="nutrition-value">
              <div>{nutrition.carbohydrate ? `${nutrition.carbohydrate}g` : "--"}</div>
              <div>carbs</div>
            </div>
            <div className="nutrition-value">
              <div>{nutrition.fat ? `${nutrition.fat}g` : "--"}</div> <div>fats</div>
            </div>
          </div>
        </div>
      </div>
    );

    const ingredientsContainer = (
      <div>
        <div className="title-row">
          <div className="title-row-icon">
            <img src={ingredientsIcon} alt="" />
          </div>
          <div className="title-row-title">INGREDIENTS</div>
        </div>
        <div className="ingredients-value">
          {ingredients.length !== 0
            ? ingredients.map((ingredient, index) => {
                return ingredient && index !== ingredients.length - 1 ? (
                  <span key={index}>
                    {`${ingredient.name}: ${ingredient.value} - ${
                      IngredientUnitLabel[ingredient.unit]
                    }`}
                    {", "}
                  </span>
                ) : (
                  <span key={index}>
                    {`${ingredient.name}: ${ingredient.value} - ${
                      IngredientUnitLabel[ingredient.unit]
                    }`}
                  </span>
                );
              })
            : "--"}
        </div>
      </div>
    );

    const quantityContainer = (
      <div className="product-offer-item-quantity">
        <Input
          name="quantity"
          value={`QTY: ${quantity}`}
          className={"offer-item-quantity-input-value"}
          onChange={this.handleInputChange}
          addonBefore={
            <div onClick={this.decrementQuantity}>
              <MinusAddonIcon />
            </div>
          }
          addonAfter={
            <div onClick={this.incrementQuantity}>
              <PlusAddonIcon />
            </div>
          }
        />
      </div>
    );

    const addToCartButtonContainer = (
      <div className="product-offer-item-button">
        <PrimaryButton
          text={"Add to Cart"}
          disabled={isCheckoutDisabled}
          eventHandler={this.addToCart}
          icon={<PlusIcon />}
        />
      </div>
    );

    return (
      <>
        {isLoading ? (
          <Skeleton
            avatar={{ size: "large", shape: "square" }}
            active={isLoading}
            className="product-item-skeleton"
          />
        ) : (
          <div className="product-item-wrapper">
            <div className="product-item">
              {isMobileView && categories.length !== 0 && (
                <div className="product-item-category">{categoriesContainer}</div>
              )}
              <div className="product-item-info">
                <div className="product-item-image">
                  {imageContainer}{" "}
                  <div
                    className="show-details-trigger-button"
                    onClick={() => this.setState({ isShowDetail: !this.state.isShowDetail })}>
                    {this.state.isShowDetail ? (
                      <span>Hide Details</span>
                    ) : (
                      <span>Show Details</span>
                    )}
                  </div>
                </div>
                <div className="product-item-info-detail">
                  <div className="product-item-title-row">
                    <h1 className="block-with-text product-card-title">{title}</h1>
                    {!isMobileView && (
                      <h1 className="business-card-price">
                        <CurrencyValue value={price} />
                      </h1>
                    )}
                  </div>
                  {!isMobileView && categories.length !== 0 && (
                    <div className="product-item-category">{categoriesContainer}</div>
                  )}
                  {isMobileView && (
                    <h1 className="product-item-price-mobile">
                      <div
                        className="product-item-mobile-detail-trigger"
                        onClick={this.onViewMobileProductDetails}>
                        Show Details
                      </div>
                      <CurrencyValue value={price} />
                    </h1>
                  )}
                  {!isMobileView && (
                    <div className="product-item-description">{descriptionContainer}</div>
                  )}
                </div>
              </div>
            </div>
            {!isMobileView && (
              <>
                <div
                  className="product-item-nutrition-info"
                  ref={(r) => (this.nutritionValuesRef = r)}
                  style={
                    this.nutritionValuesRef && this.state.isShowDetail
                      ? { maxHeight: this.nutritionValuesRef.scrollHeight }
                      : null
                  }>
                  {nutrition && nutritionContainer}
                  {ingredientsContainer}
                </div>
              </>
            )}

            <div className="product-offer-quantity-wrapper">
              {quantityContainer}
              {addToCartButtonContainer}
            </div>
            {isMobileView && (
              <MobileViewProductDetail
                productItem={product}
                visible={this.state.isShowMobileProductDetails}
                onCancel={this.onCancelMobileProductDetails}
              />
            )}
            {isMobileView && (
              <MobileViewProductDetail
                productItem={product}
                visible={this.state.isShowMobileProductDetails}
                onCancel={this.onCancelMobileProductDetails}
              />
            )}
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isMobileView: state.mobileView.isMobileView,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);
