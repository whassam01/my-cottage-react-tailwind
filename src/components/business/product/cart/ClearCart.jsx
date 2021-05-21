import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';

import { clearBusinessScheduleInCart } from 'store/actions';

import { PrimaryButton } from '../../../common';

import './ClearCart.scss';

class ClearCart extends Component {
  render() {
    const { business } = this.props;
    const { id } = business.value;
    const message = `You are attempting to add an item from a different location. Are you sure you want to proceed?`;

    return (
      <div>
        <Modal
          className="delivery-address-warning-modal"
          visible={this.props.visible}
          onCancel={this.props.onCancel}
          style={{ top: 20 }}
          footer={null}>
          <div className="warning-modal-content">
            <div className="warning-modal-title">Wait, your cart will be emptied!</div>
            <div className="warning-modal-info">{message}</div>
            <div className="warning-modal-buttons">
              <PrimaryButton text="No, go back" eventHandler={this.props.onCancel} />
              <PrimaryButton
                text="Yes, clear it"
                eventHandler={() => {
                  this.props.clearBusinessScheduleInCart(id);
                  this.props.onCancel();
                }}
              />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    business: state.business.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearBusinessScheduleInCart: (businessId) =>
      dispatch(clearBusinessScheduleInCart({ businessId })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClearCart);
