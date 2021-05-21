import { OfferActionType } from "../../actiontypes";
import { buildErrorMessage } from "../../../utils";

const businessOfferReducer = (
  offerState = {
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
    case OfferActionType.GET_OFFERS_REQUESTED: {
      return {
        ...offerState,
        status: action.type,
      };
    }
    case OfferActionType.GET_OFFERS_SUCCESS: {
      const { offers } = action.response.business;
      return {
        ...offerState,
        status: action.type,
        value: {
          ...offerState.value,
          edges: offers.edges,
        },
      };
    }
    case OfferActionType.GET_OFFERS_ERROR: {
      const { errors } = action.error;
      const { code } = errors[0];

      const message = buildErrorMessage(errors[0]);

      return {
        ...offerState,
        status: action.type,
        error: {
          code,
          message,
        },
      };
    }
    default:
      return offerState;
  }
};

export default businessOfferReducer;
