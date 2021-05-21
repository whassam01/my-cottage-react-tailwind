import React from 'react';
import { Card } from 'antd';

import OrderItem from './OrderItem';

const TableHeaders = ['Order #', 'Created', 'Type', 'BusinessName', 'Status', 'Amount', ''];

const OrderTable = (props) => {
  const { id, orders } = props;

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
            {orders.map((order) => (
              <OrderItem key={order.id} consumerId={id} order={order.node} />
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default OrderTable;
