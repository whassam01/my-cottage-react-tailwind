import { API, graphqlOperation } from 'aws-amplify';
import { getUserCredentials } from 'store/api/authentication';
import {
  createConsumerCardMutation,
  archiveConsumerCardMutation,
  getCardsQuery,
} from 'store/graphql';

export const createCardPaymentMethod = async (input) => {
  const {stripe, card} = input;
  const data = await stripe.createPaymentMethod({
    type: 'card',
    card: card.cardNumber,
  });
  return data;
};

export const createConsumerCard = async (input) => {
  const data = await API.graphql(graphqlOperation(createConsumerCardMutation, { input }));
  return data;
};

export const archiveConsumerCard = async (input) => {
  const data = await API.graphql(graphqlOperation(archiveConsumerCardMutation, { input }));
  return data;
};

export const getCards = async () => {
  const user = await getUserCredentials();
  // This needs to be in its own variable to work
  const input = { id: user?.identityId };
  const data = await API.graphql(graphqlOperation(getCardsQuery, { input }));
  return data;
};
