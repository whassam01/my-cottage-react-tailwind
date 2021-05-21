import React from "react";
import { withRouter } from "react-router-dom";
import moment from "moment";
import { CurrencyValue } from "components/common";

const UnconnectedSubscriptionInvoiceItem = (props) => {
  const { subscriptionInvoice, history } = props;
  const {
    number,
    createdAt,
    paymentStatus,
    businessTitle,
    businessUrlDomain,
    businessUrlSubdomain,
    planTitle,
    cardLastFour,
    cost,
  } = subscriptionInvoice;

  const orderNumberContainer = <div>{number}</div>;

  const createdAtContainer = <div>{moment(createdAt).format("MMM DD, hh:mmA")}</div>;

  const paymentStatusContainer = <div className={paymentStatus}>{paymentStatus}</div>;

  const businessContainer = (
    <div
      className="purchases-business-title"
      onClick={() => history.push(`/${businessUrlDomain}/${businessUrlSubdomain}`)}>
      {businessTitle}
    </div>
  );

  const planTitleContainer = <div>{planTitle}</div>;

  const paymentContainer = <div>{cardLastFour}</div>;

  const totalAmountContainer = (
    <div>
      <h3 style={{ fontWeight: "600" }}>
        <CurrencyValue value={cost.total} />
      </h3>
    </div>
  );

  return (
    <>
      <tr className="table-body" id="invoice-table-body">
        <td>{orderNumberContainer}</td>
        <td>{createdAtContainer}</td>
        <td>{paymentStatusContainer}</td>
        <td>{businessContainer}</td>
        <td>{planTitleContainer}</td>
        <td>{paymentContainer}</td>
        <td>{totalAmountContainer}</td>
      </tr>
    </>
  );
};

export const SubscriptionInvoiceItem = withRouter(UnconnectedSubscriptionInvoiceItem);
