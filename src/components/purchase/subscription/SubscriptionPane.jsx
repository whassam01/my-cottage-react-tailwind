import React from 'react';
import { useGetSubscriptions } from 'store/react-query';

import { SpoonSpinner } from 'components/common/SpoonAndForkSpinner/spoonAndFork';
import { SubscriptionStatus } from 'constants/subscription';

import SubscriptionTable from './SubscriptionTable';

const SubscriptionPane = () => {
  const subscriptionQuery = useGetSubscriptions();

  if (subscriptionQuery.isLoading) {
    return <SpoonSpinner isLoading={true} />;
  }

  if (subscriptionQuery.isError) {
    return <div>Something went wrong</div>;
  }

  const { id, subscriptions = [] } = subscriptionQuery?.data?.data?.consumer;

  const formatHeader = (subs) => {
    if (!subs) {
      return '';
    } else if (subs.length === 0) {
      return 'No subscription history';
    } else {
      const activeCount = subs.filter((s) => s.status === SubscriptionStatus.ACTIVE).length;
      const canceledCount = subs.filter((s) => s.status === SubscriptionStatus.CANCELED).length;
      return `${activeCount} Active Subscription / ${canceledCount} Canceled`;
    }
  };

  return (
    <div>
      <h1>{formatHeader(subscriptions)}</h1>
      <SubscriptionTable id={id} subscriptions={subscriptions} />
    </div>
  );
};

export default SubscriptionPane;
