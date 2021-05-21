import { useQuery } from 'react-query';
import { getSubscriptionInvoices } from 'store/api';
import { SubscriptionInvoiceKeys } from 'store/actiontypes';

export const useGetSubscriptionInvoices = (input, options = {}) =>
  useQuery({
    queryKey: [SubscriptionInvoiceKeys.SubscriptionInvoice, input],
    queryFn: getSubscriptionInvoices,
    ...options,
  });
