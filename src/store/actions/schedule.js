import { API, graphqlOperation } from "aws-amplify";

import { ScheduleActionType } from "../actiontypes/index";
import { businessSchedulesQuery } from "../graphql/index";

export const getSchedules = (input, filters) => {
  return {
    types: [
      ScheduleActionType.GET_SCHEDULES_REQUESTED,
      ScheduleActionType.GET_SCHEDULES_SUCCESS,
      ScheduleActionType.GET_SCHEDULES_ERROR,
    ],
    payload: input,
    callAPI: () => {
      return API.graphql(graphqlOperation(businessSchedulesQuery, { input, filters }));
    },
  };
};
