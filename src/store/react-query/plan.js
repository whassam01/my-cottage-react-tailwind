import { useQuery } from 'react-query';
import { getPlans } from 'store/api';
import { PlanKeys } from 'store/actiontypes';

export const useGetPlans = (input, filters, options = {}) =>
  useQuery({
    queryKey: [PlanKeys.Plan, input, filters],
    queryFn: getPlans,
    ...options,
  });
