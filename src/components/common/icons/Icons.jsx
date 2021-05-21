import React from "react";
import Purchase from "../../../assets/account/purchase.svg";
import Logout from "../../../assets/account/logout.svg";
import User from "../../../assets/account/user.svg";
import ArrowUp from "../../../assets/common/arrowUp.svg";
import ArrowDown from "../../../assets/common/arrowDown.svg";
import Plus from "../../../assets/common/plus.svg";
import Help from "../../../assets/common/help.svg";
import Shop from "../../../assets/common/shop.svg";
import Home from "../../../assets/common/Home.svg";
import Add from "../../../assets/common/add.svg";
import Cart from "../../../assets/common/cart.svg";
import Cross from "../../../assets/business/subscription/cross.svg";
import ProductCartCross from "../../../assets/business/product/cross.svg";
import ProductCartTick from "../../../assets/business/product/tick.svg";
import BusinessPlusIcon from "../../../assets/business/product/plus.svg";
import BusinessMinusIcon from "../../../assets/business/product/minus.svg";
import { EditOutlined } from "@ant-design/icons";
import SideIcon from "../../../assets/common/sidebar-icon.svg";
import EmptyCart from "../../../assets/common/empty-cart.svg";
import Delete from "../../../assets/common/delete.svg";
import kidnap from "../../../assets/common/kidnap.gif";
import bin from "../../../assets/common/bin.svg";
import "./Icons.scss";

export const PurchaseIcon = () => {
  return <img src={Purchase} alt="" className="profile-dropdown-icon" />;
};

export const LogoutIcon = () => {
  return <img src={Logout} alt="" className="profile-dropdown-icon logout-icon" />;
};

export const UserIcon = () => {
  return <img src={User} alt="" className="profile-dropdown-icon" />;
};
export const ArrowDownIcon = () => {
  return <img src={ArrowDown} alt="" className="profile-dropdown-arrows" />;
};

export const PlusIcon = () => {
  return <img src={Plus} alt="plus-icon" className="plus-icon" />;
};

export const EditIcon = () => {
  return <EditOutlined />;
};

export const HelpIcon = () => {
  return <img src={Help} alt="help-icon" className="help" />;
};
export const MyOrderIcon = () => {
  return <img src={Shop} alt="" className="profile-dropdown-icon" />;
};
export const SidebarIcon = () => {
  return <img src={SideIcon} alt="" />;
};

export const HomeIcon = () => {
  return <img src={Home} alt="" />;
};

export const AddIcon = () => {
  return <img src={Add} alt="" />;
};
export const MinusAddonIcon = () => {
  return <img src={BusinessMinusIcon} alt="" />;
};
export const PlusAddonIcon = () => {
  return <img src={BusinessPlusIcon} alt="" />;
};

export const CrossIcon = () => {
  return <img src={Cross} alt="" />;
};
export const ProductCrossIcon = () => {
  return <img src={ProductCartCross} alt="" />;
};
export const ProductTickIcon = () => {
  return <img src={ProductCartTick} alt="" />;
};
export const DeleteIcon = () => {
  return <img src={Delete} alt="" />;
};
export const Bin = ({ className }) => {
  return <img src={bin} alt="" className={`bin-icon ${className}`} />;
};
export const EmptyCartIcon = () => {
  return <img src={EmptyCart} alt="" />;
};
export const NotFoundIcon = () => {
  return <img src={kidnap} alt="" />;
};
export const CartIcon = ({ value, eventHandler }) => {
  return (
    <div className="cart-icon" onClick={eventHandler}>
      <img src={Cart} alt="" /> <span className="cart-count">{value}</span>
    </div>
  );
};
export const ArrowUpIcon = ({ visible, open }) => {
  return (
    <img
      src={ArrowUp}
      alt=""
      className={visible ? "profile-dropdown-arrows rotation" : "profile-dropdown-arrows"}
    />
  );
};
