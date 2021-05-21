import React from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import { PlanInterval } from 'constants/plan';

const SubscriptionItem = (props) => {
  const { subscription } = props;

  const planTitleContainer = <div>{subscription.plan.title}</div>;
  const createdAtContainer = <div>{moment(parseInt(subscription.createdAt, 10)).format('LL')}</div>;
  const businessTitleContainer = <div>{subscription.business.profile.title}</div>;
  const statusContainer = <div>{subscription.status}</div>;

  let intervalString = '';
  if (subscription.plan.interval === PlanInterval.WEEKLY) {
    intervalString = ' / wk';
  } else if (subscription.plan.interval === PlanInterval.MONTHLY) {
    intervalString = ' / mo';
  }

  const costContainer = (
    <div>
      {subscription.plan.price.currency.symbol}
      {(subscription.plan.price.amount / 100).toFixed(2)}
      {intervalString}
    </div>
  );

  return (
    <>
      <tr className="table-body" id="subscription-table-body">
        <td>{planTitleContainer}</td>
        <td>{createdAtContainer}</td>
        <td>{businessTitleContainer}</td>
        <td>{statusContainer}</td>
        <td>{costContainer}</td>
      </tr>
    </>
  );
};

export default withRouter(SubscriptionItem);
