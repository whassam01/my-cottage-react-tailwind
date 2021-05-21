import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { Tag } from 'antd';

import OrderDetail from 'components/purchase/order/OrderDetail/OrderDetail';
import { CurrencyValue } from 'components/common';
import { OrderStatusTag } from 'components/purchase/order/OrderStatusTag/OrderStatusTag';

const OrderItem = (props) => {
  const { order } = props;

  const [orderDetailsVisible, setOrderDetailsVisible] = useState(false);

  const showOrderDetails = () => {
    setOrderDetailsVisible(true);
  };

  const hideOrderDetails = () => {
    setOrderDetailsVisible(false);
  };

  const { number, createdAt, status, business, type, cost } = order;

  const orderNumberContainer = <div>{number}</div>;

  const createdAtContainer = <div>{moment(createdAt).format('LL')}</div>;

  const statusContainer = (
    <div>
      <OrderStatusTag status={status} />
    </div>
  );

  const businessContainer = (
    <div
      className="purchases-business-title"
      onClick={() => props.history.push(`/${business.urlDomain}/${business.urlSubdomain}`)}>
      {business.profile.title}
    </div>
  );

  const typeContainer = (
    <div>
      <Tag
        style={{
          border: '1px solid #d9d9d9',
          color: '#768ca5',
          background: '#ffffff',
          fontWeight: 600,
        }}>
        {type.replace('_', ' ')}
      </Tag>
    </div>
  );

  const totalAmountContainer = (
    <div style={{ fontWeight: '600' }}>
      <CurrencyValue value={cost.total} />
    </div>
  );

  return (
    <>
      <tr className={`table-body ${orderDetailsVisible ? 'active-tr' : ''}`}>
        <td>{orderNumberContainer}</td>
        <td>{createdAtContainer}</td>
        <td>{typeContainer}</td>
        <td>{businessContainer}</td>
        <td>{statusContainer}</td>
        <td>{totalAmountContainer}</td>
        <td>
          <div
            onClick={() => {
              orderDetailsVisible ? hideOrderDetails() : showOrderDetails();
            }}>
            {orderDetailsVisible ? (
              <div style={{ color: '#235C48', cursor: 'pointer', textDecoration: 'underline' }}>
                Hide details
              </div>
            ) : (
              <div style={{ color: '#235C48', cursor: 'pointer', textDecoration: 'underline' }}>
                Show details
              </div>
            )}
          </div>
        </td>
      </tr>
      <tr
        className="order-item-detail-wrapper-tr"
        style={orderDetailsVisible ? { borderBottom: '1px solid #eef0f1' } : { border: 'none' }}>
        <td colSpan="8" className="order-item-detail-wrapper-td">
          {orderDetailsVisible && (
            <div className="order-item-detail-wrapper">
              <OrderDetail order={order} />
            </div>
          )}
        </td>
      </tr>
    </>
  );
};

export default withRouter(OrderItem);
