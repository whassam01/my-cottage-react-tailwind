import { useQuery } from 'react-query';
import { getSchedules } from 'store/api';
import { ScheduleKeys } from 'store/actiontypes';

export const useGetSchedules = (input, options = {}) =>
  useQuery({
    queryKey: [ScheduleKeys.Schedules, input],
    queryFn: getSchedules,
    ...options,
  });
