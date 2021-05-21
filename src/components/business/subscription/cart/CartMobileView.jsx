import React from "react";
import Modal from "antd/lib/modal/Modal";
import CartPanel from "./CartPanel";

export const CartMobileView = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} footer={null} onCancel={onClose} className="Cart-modal">
      <CartPanel />
    </Modal>
  );
};
