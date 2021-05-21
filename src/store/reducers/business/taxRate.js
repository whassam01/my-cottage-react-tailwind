import { TaxRateActionType } from "../../actiontypes";
import { buildErrorMessage } from "../../../utils";

const businessTaxRateReducer = (
  taxRateState = {
    status: null,
    value: {
      data: [],
    },
    error: {
      code: null,
      message: null,
    },
  },
  action
) => {
  switch (action.type) {
    case TaxRateActionType.GET_TAX_RATE_REQUESTED: {
      return {
        ...taxRateState,
        status: action.type,
      };
    }
    case TaxRateActionType.GET_TAX_RATE_SUCCESS: {
      const { taxRates } = action.response.business;
      return {
        ...taxRateState,
        status: action.type,
        value: {
          ...taxRateState.value,
          data: taxRates,
        },
      };
    }
    case TaxRateActionType.GET_TAX_RATE_ERROR: {
      const { errors } = action.error;
      const { code } = errors[0];

      const message = buildErrorMessage(errors[0]);

      return {
        ...taxRateState,
        status: action.type,
        error: {
          code,
          message,
        },
      };
    }
    default:
      return taxRateState;
  }
};

export default businessTaxRateReducer;
