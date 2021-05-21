import React from 'react';
import { useGetOrders } from 'store/react-query';

import { OrderStatus } from 'constants/order';
import { SpoonSpinner } from 'components/common/SpoonAndForkSpinner/spoonAndFork';

import OrderTable from './OrderTable';

const AddressPane = () => {
  const orderQuery = useGetOrders(
    {},
    {
      statuses: [
        OrderStatus.PURCHASED,
        OrderStatus.COMPLETED,
        OrderStatus.BUSINESS_CANCELED,
        OrderStatus.CONSUMER_CANCELED,
        OrderStatus.CONSUMER_CANCELED_REFUNDED,
        OrderStatus.CONSUMER_CANCELED_NOT_REFUNDED,
      ],
    }
  );

  if (orderQuery.isLoading) {
    return <SpoonSpinner isLoading={true} />;
  }

  if (orderQuery.isError) {
    return <div>Something went wrong</div>;
  }

  const { id, orders = {} } = orderQuery?.data?.data?.consumer;
  const { edges = [] } = orders;

  return (
    <div>
      <h1>
        Total of <span style={{ color: '#FB775A' }}>{edges.length}</span> orders.
      </h1>
      <OrderTable id={id} orders={edges} />
    </div>
  );
};

export default AddressPane;
