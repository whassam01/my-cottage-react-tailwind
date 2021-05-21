import React, { Component } from "react";
import { Modal, Button } from "antd";

import "./AlertModal.scss";

export class AlertModal extends Component {
  render() {
    return (
      <Modal
        visible={this.props.visible}
        onCancel={this.props.onCancel}
        footer={null}
        centered={true}
        className="alert-modal">
        <div className="schedule-item-confirmation-modal-wrapper">
          <div className="schedule-item-confirmation-modal">
            <div className="confirmation-modal-body">
              <div className="confirmation-modal-title-info">Something went wrong</div>
              <div className="confirmation-modal-title-alert">{this.props.description}</div>
            </div>
            <div className="confirmation-modal-footer">
              <Button onClick={this.props.onCancel}>Close</Button>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default AlertModal;
