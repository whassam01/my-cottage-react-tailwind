import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  getOrders,
  getOrder,
  createOrders,
  updateOrder,
  deleteOrder,
  applyCouponToOrder,
  applyDeliveryAddressToOrder,
  applyCardToOrder,
  transitionOrder,
  calculateOrder,
} from 'store/api';
import { OrderKeys } from 'store/actiontypes';

export const useGetOrders = (input, filters = {}, pagination, options = {}) =>
  useQuery({
    queryKey: [OrderKeys.Order, input, filters, pagination],
    queryFn: getOrders,
    ...options,
  });

export const useGetConsumerOrder = (input, filters, pagination, options = {}) =>
  useQuery({
    queryKey: [OrderKeys.Order, input, filters, pagination],
    queryFn: getOrders,
    ...options,
  });

export const useGetOrder = (input, filters, pagination, options = {}) =>
  useQuery({
    queryKey: [OrderKeys.Order, input, filters, pagination],
    queryFn: getOrder,
    ...options,
  });

export const useCreateOrders = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation(createOrders, {
    onSuccess: () => {
      queryClient.invalidateQueries(OrderKeys.Order);
    },
    ...options,
  });
};

export const useUpdateOrder = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation(updateOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries(OrderKeys.Order);
    },
    ...options,
  });
};

export const useDeleteOrder = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation(deleteOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries(OrderKeys.Order);
    },
    ...options,
  });
};

export const useApplyCouponToOrder = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation(applyCouponToOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries(OrderKeys.Order);
    },
    ...options,
  });
};

export const useApplyDeliveryAddressToOrder = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation(applyDeliveryAddressToOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries(OrderKeys.Order);
    },
    ...options,
  });
};

export const useApplyCardToOrder = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation(applyCardToOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries(OrderKeys.Order);
    },
    ...options,
  });
};

export const useTransitionOrder = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation(transitionOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries(OrderKeys.Order);
    },
    ...options,
  });
};

export const useCalculateOrder = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation(calculateOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries(OrderKeys.Order);
    },
    ...options,
  });
};
