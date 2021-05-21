import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  getConsumer,
  createConsumer,
  createGuestConsumer,
  updateConsumer,
  uploadConsumerImage,
  removeConsumerImage,
} from 'store/api';
import { ConsumerKeys } from 'store/actiontypes';

export const useGetConsumer = (input, options = {}) =>
  useQuery({
    queryKey: [ConsumerKeys.Consumer, input],
    queryFn: getConsumer,
    retry: false,
    staleTime: Infinity,
    ...options,
  });

export const useCreateConsumer = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation(createConsumer, {
    onSuccess: () => {
      queryClient.invalidateQueries(ConsumerKeys.Consumer);
    },
    ...options,
  });
};

export const useCreateGuestConsumer = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation(createGuestConsumer, {
    onSuccess: () => {
      queryClient.invalidateQueries(ConsumerKeys.Consumer);
    },
    ...options,
  });
};

export const useUpdateConsumer = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation(updateConsumer, {
    onSuccess: () => {
      queryClient.invalidateQueries(ConsumerKeys.Consumer);
    },
    ...options,
  });
};

export const useUploadConsumerImage = (options = {}) =>
  useMutation(uploadConsumerImage, {
    ...options,
  });

export const useRemoveConsumerImage = (options = {}) =>
  useMutation(removeConsumerImage, {
    ...options,
  });
