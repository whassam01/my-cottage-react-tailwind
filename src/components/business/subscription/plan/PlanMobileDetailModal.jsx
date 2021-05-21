import React, { Component } from "react";
import Modal from "antd/lib/modal/Modal";
import "./Plan.scss";
import "../../Business.scss";
class PlanMobileDetailModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  render() {
    const {
      priceContainer,
      // tagsContainer,
      descriptionContainer,
      imageContainer,
      titleContainer,
      mealQuantity,
    } = this.props;
    return (
      <div>
        <div onClick={this.showModal} className="mobile-card-price">
          <p className="show-details">Show Details</p>
          {priceContainer}
        </div>
        <Modal
          className="Plan-product-detail-modal"
          visible={this.state.visible}
          footer={null}
          onCancel={() => this.setState({ visible: false })}>
          {titleContainer}
          <div className="flex card-body">
            {mealQuantity}
            {priceContainer}
          </div>
          {imageContainer}
          {/* {tagsContainer} */}
          {descriptionContainer}
        </Modal>
      </div>
    );
  }
}

export default PlanMobileDetailModal;
