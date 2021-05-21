import { useQuery } from 'react-query';
import { getOffersBySchedule } from 'store/api';
import { OfferKeys } from 'store/actiontypes';

export const useOffersBySchedule = (input, filters, options = {}) =>
  useQuery({
    queryKey: [OfferKeys.Offer, input, filters],
    queryFn: getOffersBySchedule,
    ...options,
  });
