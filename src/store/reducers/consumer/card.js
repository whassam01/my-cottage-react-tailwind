import {
  AuthenticationActionType,
  ConsumerActionType,
  CardActionType,
} from "../../actiontypes/index";
import { buildErrorMessage } from "../../../utils";

const consumerCardReducer = (
  cardState = {
    status: null,
    value: {
      id: null,
      total: 0,
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
    case ConsumerActionType.GET_CONSUMER_REQUESTED: {
      return {
        ...cardState,
        status: ConsumerActionType.GET_CONSUMER_REQUESTED,
      };
    }
    case ConsumerActionType.GET_CONSUMER_SUCCESS: {
      const {
        consumer: { id, cards },
      } = action.response;
      const { total, edges } = cards;
      return {
        ...cardState,
        status: ConsumerActionType.GET_CONSUMER_SUCCESS,
        value: {
          ...cardState.value,
          id,
          total,
          edges,
        },
      };
    }
    case ConsumerActionType.GET_CONSUMER_ERROR: {
      const { errors } = action.error;
      const { code } = errors[0];

      const message = buildErrorMessage(errors[0]);

      return {
        ...cardState,
        status: ConsumerActionType.GET_CONSUMER_ERROR,
        error: {
          code,
          message,
        },
      };
    }
    case CardActionType.CREATE_CARD_PAYMENT_METHOD_REQUESTED: {
      return {
        ...cardState,
        status: CardActionType.CREATE_CARD_PAYMENT_METHOD_REQUESTED,
      };
    }
    case CardActionType.CREATE_CARD_PAYMENT_METHOD_SUCCESS: {
      const { paymentMethod } = action.response;
      return {
        ...cardState,
        status: CardActionType.CREATE_CARD_PAYMENT_METHOD_SUCCESS,
        value: {
          ...cardState.value,
          paymentMethod,
        },
      };
    }
    case CardActionType.CREATE_CARD_PAYMENT_METHOD_ERROR: {
      const { error } = action.response;
      const { code, message } = error;
      return {
        ...cardState,
        status: CardActionType.CREATE_CARD_PAYMENT_METHOD_ERROR,
        error: {
          code,
          message,
        },
      };
    }
    case CardActionType.CREATE_CONSUMER_CARD_REQUESTED: {
      return {
        ...cardState,
        status: CardActionType.CREATE_CONSUMER_CARD_REQUESTED,
      };
    }
    case CardActionType.CREATE_CONSUMER_CARD_SUCCESS: {
      const { card } = action.response.createConsumerCard;
      return {
        ...cardState,
        status: CardActionType.CREATE_CONSUMER_CARD_SUCCESS,
        value: {
          ...cardState.value,
          total: cardState.value.total + 1,
          edges: [{ node: card }, ...cardState.value.edges],
        },
      };
    }
    case CardActionType.CREATE_CONSUMER_CARD_ERROR: {
      const { errors } = action.error;
      const { code } = errors[0];

      const message = buildErrorMessage(errors[0]);

      return {
        ...cardState,
        status: CardActionType.CREATE_CONSUMER_CARD_ERROR,
        error: {
          code,
          message,
        },
      };
    }
    case CardActionType.ARCHIVE_CONSUMER_CARD_SUCCESS: {
      const { card } = action.response.archiveConsumerCard;
      const postArchiveCards = cardState.value.edges.filter((a) => a.node.id !== card.id);

      return {
        ...cardState,
        status: CardActionType.ARCHIVE_CONSUMER_CARD_SUCCESS,
        value: {
          ...cardState.value,
          edges: postArchiveCards,
        },
      };
    }
    case CardActionType.ARCHIVE_CONSUMER_CARD_ERROR: {
      const { errors } = action.error;
      const { code } = errors[0];

      const message = buildErrorMessage(errors[0]);

      return {
        ...cardState,
        status: CardActionType.ARCHIVE_CONSUMER_CARD_ERROR,
        error: {
          code,
          message,
        },
      };
    }
    case AuthenticationActionType.SIGN_OUT_SUCCESS: {
      return {
        ...cardState,
        status: AuthenticationActionType.SIGN_OUT_SUCCESS,
        value: {
          id: null,
          total: 0,
          edges: [],
        },
      };
    }
    default:
      return cardState;
  }
};

export default consumerCardReducer;
