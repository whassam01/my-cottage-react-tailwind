import { ScheduleActionType } from "../../actiontypes";
import { buildErrorMessage } from "../../../utils";

const businessScheduleReducer = (
  scheduleState = {
    status: null,
    value: {
      edges: [],
    },
    error: {
      code: null,
      message: null,
    },
  },
  action
) => {
  switch (action.type) {
    case ScheduleActionType.GET_SCHEDULES_REQUESTED: {
      return {
        ...scheduleState,
        status: ScheduleActionType.GET_SCHEDULES_REQUESTED,
      };
    }
    case ScheduleActionType.GET_SCHEDULES_SUCCESS: {
      const { schedules } = action.response.business;
      return {
        ...scheduleState,
        status: ScheduleActionType.GET_SCHEDULES_SUCCESS,
        value: {
          ...scheduleState.value,
          edges: schedules.edges,
        },
      };
    }
    case ScheduleActionType.GET_SCHEDULES_ERROR: {
      const { errors } = action.error;
      const { code } = errors[0];

      const message = buildErrorMessage(errors[0]);

      return {
        ...scheduleState,
        status: ScheduleActionType.GET_SCHEDULES_ERROR,
        error: {
          code,
          message,
        },
      };
    }
    default:
      return scheduleState;
  }
};

export default businessScheduleReducer;
