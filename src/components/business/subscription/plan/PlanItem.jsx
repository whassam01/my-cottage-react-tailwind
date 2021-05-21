import React, { Component } from "react";
import { connect } from "react-redux";
import { Card } from "antd";
import { PlusIcon, Quantity, Price } from "../../../common";
import { PrimaryButton } from "../../../common/primaryButton/index";
// Redux
import { addPlanToCart } from "../../../../store/actions";
import { S3Image } from "aws-amplify-react";
import PlanMobileDetailModal from "./PlanMobileDetailModal";
import "../../Business.scss";
const profileImageStyle = {
  width: "100px",
  height: "100px",
  borderRadius: "5px",
  objectFit: "cover",
};

class PlanItem extends Component {
  state = { visible: false };

  addToCart = () => {
    const { plan } = this.props;
    this.props.addPlanToCart({ plan, quantity: 1 });
  };

  render() {
    const {
      isMobileView,
      plan,
      cart: {
        value: { plans },
      },
    } = this.props;

    const { title, description, price, interval, images, quantity } = plan;
    const { currency } = price;
    const isButtonDisabled = plans.length > 0;
    const titleContainer = <div className="product-card-title"> {title} </div>;

    const descriptionContainer = (
      <>
        {description ? (
          <div className="business-product-card-description"> {description} </div>
        ) : null}
      </>
    );
    const imageContainer = (
      <div>
        {images.map((image) => {
          return <S3Image key={image} imgKey={image} theme={{ photoImg: profileImageStyle }} />;
        })}
      </div>
    );
    // const tagsContainer = (
    //   <div className="card-footer">
    //     {this.state.tags.map((tag) => {
    //       return (
    //         <Tag key={tag} className="business-product-card-tags">
    //           {tag}
    //         </Tag>
    //       );
    //     })}
    //   </div>
    // );
    const priceContainer = (
      <div className="business-card-price">
        <Price price={price} symbol={currency.symbol} />
      </div>
    );
    const mealQuantity = <Quantity quantity={quantity} interval={interval} />;
    return (
      <Card className="business-product-card">
        <div className="business-product-card-details">
          <div className="business-product-image">{imageContainer}</div>
          <div className="product-card-container">
            <div className="card-header">
              {titleContainer}
              {!isMobileView && priceContainer}
            </div>
            <div className="card-body">
              {mealQuantity}
              {/* {!isMobileView && <p>Perks</p>} */}
            </div>
            {/* {!isMobileView && tagsContainer} */}

            {isMobileView && (
              <PlanMobileDetailModal
                isMobileView={isMobileView}
                priceContainer={priceContainer}
                // tagsContainer={tagsContainer}
                descriptionContainer={descriptionContainer}
                imageContainer={imageContainer}
                titleContainer={titleContainer}
                mealQuantity={mealQuantity}
              />
            )}
          </div>
        </div>
        <div className="Business-product-card-footer">
          {!isMobileView && descriptionContainer}
          <PrimaryButton
            text={"Add to cart"}
            eventHandler={this.addToCart}
            disabled={isButtonDisabled}
            icon={<PlusIcon />}
          />
        </div>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    isMobileView: state.mobileView.isMobileView,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPlanToCart: (input) => dispatch(addPlanToCart(input)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlanItem);
