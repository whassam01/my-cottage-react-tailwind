import { useQuery } from 'react-query';
import { getBusinessByDomain } from 'store/api';
import { BusinessKeys } from 'store/actiontypes';

export const useGetBusinessByDomain = (input, options = {}) =>
  useQuery({
    queryKey: [BusinessKeys.Business, input],
    queryFn: getBusinessByDomain,
    ...options,
  });
