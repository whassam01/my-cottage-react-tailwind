import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  createCardPaymentMethod,
  createConsumerCard,
  archiveConsumerCard,
  getCards,
} from 'store/api';
import { CardKeys, ConsumerKeys } from 'store/actiontypes';

export const useCreateCardPaymentMethod = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation(createCardPaymentMethod, {
    onSuccess: () => {
      queryClient.invalidateQueries(ConsumerKeys.Consumer);
      queryClient.invalidateQueries(CardKeys.Card);
    },
    ...options,
  });
};

export const useCreateConsumerCard = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation(createConsumerCard, {
    onSuccess: () => {
      queryClient.invalidateQueries(ConsumerKeys.Consumer);
      queryClient.invalidateQueries(CardKeys.Card);
    },
    ...options,
  });
};

export const useArchiveConsumerCard = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation(archiveConsumerCard, {
    onSuccess: () => {
      queryClient.invalidateQueries(ConsumerKeys.Consumer);
      queryClient.invalidateQueries(CardKeys.Card);
    },
    ...options,
  });
};

export const useGetCards = (input, options = {}) =>
  useQuery({
    queryKey: [CardKeys.Card, input],
    queryFn: getCards,
    retry: false,
    staleTime: Infinity,
    ...options,
  });
