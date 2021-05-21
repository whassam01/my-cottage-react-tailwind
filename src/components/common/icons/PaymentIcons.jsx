import React from "react";
import visa from "../../../assets/account/cards/visa.svg";
import amex from "../../../assets/account/cards/amex.svg";
import discover from "../../../assets/account/cards/discover.svg";
import mastercard from "../../../assets/account/cards/mastercard.svg";

export const PaymentIcons = ({ brand, className }) => {
  return (
    <>
      {brand === "discover" && <img src={discover} alt="" className={className} />}
      {brand === "mastercard" && <img src={mastercard} alt="" className={className} />}
      {brand === "amex" && <img src={amex} alt="" className={className} />}
      {brand === "visa" && <img src={visa} alt="" className={className} />}
    </>
  );
};
