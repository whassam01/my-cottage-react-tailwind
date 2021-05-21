import React from 'react';
import moment from 'moment';

import { CurrencyValue, NameValue } from 'components/common';
import { TransportationType } from 'constants/transportation';
import { OrderStatus } from 'constants/order';
import { useTransitionOrder } from 'store/react-query';

import './OrderDetail.scss';

const CanceledStatusSet = new Set([
  OrderStatus.BUSINESS_CANCELED,
  OrderStatus.CONSUMER_CANCELED,
  OrderStatus.CONSUMER_CANCELED_REFUNDED,
  OrderStatus.CONSUMER_CANCELED_NOT_REFUNDED,
]);

const OrderDetail = (props) => {
  const { order } = props;

  const transitionOrder = useTransitionOrder();

  const cancelOrder = () => {
    transitionOrder.mutate({
      orderId: order.id,
      businessId: order.business.id,
      status: OrderStatus.CONSUMER_CANCELED,
    });
  };

  const { cost } = order;

  const scheduleValue = order.schedule
    ? `${moment(order.schedule.orderReadyStart).format('ddd, MMM D [at] h:mm a [-] ')} ${moment(
        order.schedule.orderReadyEnd
      ).format('h:mm a')}`
    : ``;
  return (
    <div className="order-item-detail">
      <div className="order-item-detail-customer-info">
        {order.schedule && (
          <div>
            <NameValue
              name={order.type === TransportationType.DELIVERY ? 'Delivery Time' : 'Pickup Time'}
              value={scheduleValue}
            />
          </div>
        )}
        {order.pickupAddress && (
          <div>
            <NameValue name="Address" value={order.pickupAddress.street} />
          </div>
        )}
        {order.consumerAddress && (
          <>
            <div>
              <NameValue
                name="Address"
                value={`${order.consumerAddress.street}, ${
                  order.consumerAddress.street2 || ''
                } \n ${order.consumerAddress.city}, ${order.consumerAddress.postalCode} \n ${
                  order.consumerAddress.stateOrProvince
                }, ${order.consumerAddress.country}`}
              />
            </div>
          </>
        )}
        <div>
          <NameValue
            name="Card"
            value={order.cardLastFour ? `Ending in ${order.cardLastFour}` : '--'}
          />
        </div>
        <div>
          <NameValue name="Notes" value={order.note ? order.note : 'None'} fadedValue />
        </div>
      </div>
      <div className="vertival-divider-div" />
      <div className="order-item-detail-order-info">
        <div className="order-item-detail-order-info-div-3">
          <div className="order-item-detail-order-info-row row-1">
            <div>
              <p>Description</p>
            </div>
            <div className="order-quantity">
              <p>Quantity</p>
            </div>
            <div className="order-amount">
              <p>Amount</p>
            </div>
          </div>
          {order.orderItems.map((orderItem) => (
            <div className="order-item-detail-order-info-row" key={orderItem.id}>
              <div>{orderItem.title}</div>
              <div className="order-quantity">x{orderItem.quantity}</div>
              <div className="order-amount">
                <CurrencyValue value={orderItem.price} />
              </div>
            </div>
          ))}
        </div>
        <div className="order-item-detail-order-info-div-2">
          <div className="order-item-detail-order-info-row subtotal-row">
            <h3>Subtotal</h3>
            <h3>
              <CurrencyValue value={cost.subtotal} />
            </h3>
          </div>
          <div className="order-item-detail-order-info-row">
            <div>Tax</div>
            <div>
              <CurrencyValue value={cost.estimatedTax} />
            </div>
          </div>
          <div className="order-item-detail-order-info-row">
            <div>Service Fee</div>
            <div>
              <CurrencyValue value={cost.serviceFee} />
            </div>
          </div>
          <div className="order-item-detail-order-info-row">
            <div>Delivery Fee</div>
            <div>
              <CurrencyValue value={cost.deliveryFee} />
            </div>
          </div>
          {order.couponName && cost.couponAmount && (
            <div className="order-item-detail-order-info-row">
              <div>Coupon</div>
              <div>
                <CurrencyValue value={cost.couponAmount} />
              </div>
            </div>
          )}
          {cost.subscriptionAmount && cost.subscriptionAmount.amount !== 0 && (
            <div className="order-item-detail-order-info-row">
              <div>Subscription</div>
              <div>
                <CurrencyValue value={cost.subscriptionAmount} />
              </div>
            </div>
          )}
          <div className="order-item-detail-order-info-row total subtotal-row">
            <h1>Total charged</h1>
            <h1>
              <CurrencyValue value={cost.total} />
            </h1>
          </div>
        </div>
      </div>
      <div className={`vertival-divider-div `} />
      <div className="order-item-detail-order-info">
        {!CanceledStatusSet.has(order.status) && (
          <div
            style={{ color: '#235C48', cursor: 'pointer', textDecoration: 'underline' }}
            onClick={cancelOrder}>
            Cancel This Order
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetail;
