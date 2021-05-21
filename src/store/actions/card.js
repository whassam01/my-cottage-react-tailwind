import { API, graphqlOperation } from 'aws-amplify';

import { CardActionType } from 'store/actiontypes';
import { archiveConsumerCardMutation, createConsumerCardMutation } from 'store/graphql';


export const createCardPaymentMethod = (input) => ({
  types: [
    CardActionType.CREATE_CARD_PAYMENT_METHOD_REQUESTED,
    CardActionType.CREATE_CARD_PAYMENT_METHOD_SUCCESS,
    CardActionType.CREATE_CARD_PAYMENT_METHOD_ERROR,
  ],
  callAPI: () =>
    input.stripe.createPaymentMethod({
      type: 'card',
      card: input.card.cardNumber,
    }),
});

export const createConsumerCard = (input) => ({
  types: [
    CardActionType.CREATE_CONSUMER_CARD_REQUESTED,
    CardActionType.CREATE_CONSUMER_CARD_SUCCESS,
    CardActionType.CREATE_CONSUMER_CARD_ERROR,
  ],
  callAPI: () => API.graphql(graphqlOperation(createConsumerCardMutation, { input })),
});

export const archiveConsumerCard = (input) => ({
  types: [
    CardActionType.ARCHIVE_CONSUMER_CARD_REQUESTED,
    CardActionType.ARCHIVE_CONSUMER_CARD_SUCCESS,
    CardActionType.ARCHIVE_CONSUMER_CARD_ERROR,
  ],
  callAPI: () => API.graphql(graphqlOperation(archiveConsumerCardMutation, { input })),
});
