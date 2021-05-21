import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  createSubscription,
  archiveSubscription,
  updateSubscription,
  getSubscriptions,
} from 'store/api';
import { SubscriptionKeys } from 'store/actiontypes';

export const useCreateSubscription = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation(createSubscription, {
    onSuccess: () => {
      queryClient.invalidateQueries(SubscriptionKeys.Subscription);
    },
    ...options,
  });
};

export const useUpdateSubscription = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation(updateSubscription, {
    onSuccess: () => {
      queryClient.invalidateQueries(SubscriptionKeys.Subscription);
    },
    ...options,
  });
};

export const useArchiveSubscription = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation(archiveSubscription, {
    onSuccess: () => {
      queryClient.invalidateQueries(SubscriptionKeys.Subscription);
    },
    ...options,
  });
};

export const useGetSubscriptions = (input, options = {}) =>
  useQuery({
    queryKey: [SubscriptionKeys.Subscription, input],
    queryFn: getSubscriptions,
    retry: false,
    staleTime: Infinity,
    ...options,
  });
