import { useQuery } from 'react-query';
import { getBusinessTransportation } from 'store/api';
import { TransportationKeys } from 'store/actiontypes';

export const useGetTransportation = (input, options = {}) =>
  useQuery({
    queryKey: [TransportationKeys.Transportation, input],
    queryFn: getBusinessTransportation,
    ...options,
  });
