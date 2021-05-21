import { useMutation, useQuery, useQueryClient } from 'react-query';
import { createConsumerAddress, archiveConsumerAddress, getAddresses } from 'store/api';
import { AddressKeys, ConsumerKeys } from 'store/actiontypes';

export const useCreateConsumerAddress = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation(createConsumerAddress, {
    onSuccess: () => {
      queryClient.invalidateQueries(AddressKeys.Address);
      queryClient.invalidateQueries(ConsumerKeys.Consumer);
    },
    ...options,
  });
};

export const useArchiveConsumerAddress = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation(archiveConsumerAddress, {
    onSuccess: () => {
      queryClient.invalidateQueries(AddressKeys.Address);
      queryClient.invalidateQueries(ConsumerKeys.Consumer);
    },
    ...options,
  });
};

export const useGetAddresses = (input, options = {}) =>
  useQuery({
    queryKey: [AddressKeys.Address, input],
    queryFn: getAddresses,
    retry: false,
    staleTime: Infinity,
    ...options,
  });
