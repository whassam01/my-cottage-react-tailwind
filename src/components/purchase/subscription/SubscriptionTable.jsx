import React from 'react';
import { Card } from 'antd';

import SubscriptionItem from './SubscriptionItem';

const TableHeaders = ['Subscription', 'Created', 'Business Name', 'Status', 'Cost'];

const SubscriptionTable = (props) => {
  const { id, subscriptions } = props;

  return (
    <div className="Profile-tabs-container">
      <Card bordered={false} id="account-tabs-sections">
        <table>
          <thead className="account-table-head">
            <tr>
              {TableHeaders.map((column) => (
                <th key={column}>{column}</th>
              ))}
              {/* For config dropdown. */}
              <th />
            </tr>
          </thead>
          <tbody className="account-table-body">
            {subscriptions.map((subscription) => (
              <SubscriptionItem key={subscription.id} consumerId={id} subscription={subscription} />
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default SubscriptionTable;
