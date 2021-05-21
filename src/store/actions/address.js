import { API, graphqlOperation } from "aws-amplify";

import { AddressActionType } from "../actiontypes/index";
import { createConsumerAddressMutation, archiveConsumerAddressMutation } from "../graphql/index";

export const createConsumerAddress = (input) => {
  return {
    types: [
      AddressActionType.CREATE_ADDRESS_REQUESTED,
      AddressActionType.CREATE_ADDRESS_SUCCESS,
      AddressActionType.CREATE_ADDRESS_ERROR,
    ],
    callAPI: () => {
      return API.graphql(graphqlOperation(createConsumerAddressMutation, { input }));
    },
  };
};

export const archiveConsumerAddress = (input) => {
  return {
    types: [
      AddressActionType.ARCHIVE_ADDRESS_REQUESTED,
      AddressActionType.ARCHIVE_ADDRESS_SUCCESS,
      AddressActionType.ARCHIVE_ADDRESS_ERROR,
    ],
    callAPI: () => {
      return API.graphql(graphqlOperation(archiveConsumerAddressMutation, { input }));
    },
  };
};
