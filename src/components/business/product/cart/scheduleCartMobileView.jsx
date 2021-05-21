import React from "react";
import Modal from "antd/lib/modal/Modal";
import Cart from "./Cart";

export const ScheduleCartMobileView = ({ visible, onClose, onShowLogin }) => {
  return (
    <Modal visible={visible} footer={null} onCancel={onClose} className="Cart-modal">
      <Cart onShowLogin={onShowLogin} />
    </Modal>
  );
};
