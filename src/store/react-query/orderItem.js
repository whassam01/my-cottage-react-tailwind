import { useMutation, useQueryClient } from 'react-query';
import { createOrderItem, updateOrderItem, deleteOrderItem } from 'store/api';
import { OrderItemKeys } from 'store/actiontypes';

export const useCreateOrderItem = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation(createOrderItem, {
    onSuccess: () => {
      queryClient.invalidateQueries(OrderItemKeys.OrderItem);
    },
    ...options,
  });
};

export const useUpdateOrderItem = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation(updateOrderItem, {
    onSuccess: () => {
      queryClient.invalidateQueries(OrderItemKeys.OrderItem);
    },
    ...options,
  });
};

export const useDeleteOrderItem = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation(deleteOrderItem, {
    onSuccess: () => {
      queryClient.invalidateQueries(OrderItemKeys.OrderItem);
    },
    ...options,
  });
};
