import { API, Storage, graphqlOperation } from "aws-amplify";

import { ConsumerActionType } from "../actiontypes";
import {
  getConsumerQuery,
  updateConsumerMutation,
  createConsumerMutation,
  createGuestConsumerMutation,
} from "../graphql";

export const getConsumer = (input) => {
  return {
    types: [
      ConsumerActionType.GET_CONSUMER_REQUESTED,
      ConsumerActionType.GET_CONSUMER_SUCCESS,
      ConsumerActionType.GET_CONSUMER_ERROR,
    ],
    callAPI: () => {
      return API.graphql(graphqlOperation(getConsumerQuery, { input }));
    },
  };
};

export const createConsumer = (input) => {
  return {
    types: [
      ConsumerActionType.CREATE_CONSUMER_REQUESTED,
      ConsumerActionType.CREATE_CONSUMER_SUCCESS,
      ConsumerActionType.CREATE_CONSUMER_ERROR,
    ],
    callAPI: () => {
      return API.graphql(graphqlOperation(createConsumerMutation, { input }));
    },
  };
};

export const createGuestConsumer = (input) => {
  return {
    types: [
      ConsumerActionType.CREATE_GUEST_CONSUMER_REQUESTED,
      ConsumerActionType.CREATE_GUEST_CONSUMER_SUCCESS,
      ConsumerActionType.CREATE_GUEST_CONSUMER_ERROR,
    ],
    callAPI: () => {
      return API.graphql(graphqlOperation(createGuestConsumerMutation, { input }));
    },
  };
};

export const updateConsumer = (input) => {
  return {
    types: [
      ConsumerActionType.UPDATE_CONSUMER_REQUESTED,
      ConsumerActionType.UPDATE_CONSUMER_SUCCESS,
      ConsumerActionType.UPDATE_CONSUMER_ERROR,
    ],
    callAPI: () => {
      return API.graphql(graphqlOperation(updateConsumerMutation, { input }));
    },
  };
};

export const uploadConsumerImage = (input) => {
  return {
    types: [
      ConsumerActionType.UPLOAD_CONSUMER_IMAGE_REQUESTED,
      ConsumerActionType.UPLOAD_CONSUMER_IMAGE_SUCCESS,
      ConsumerActionType.UPLOAD_CONSUMER_IMAGE_ERROR,
    ],
    callAPI: () => {
      const { path, image, contentType } = input;

      return Storage.put(path, image, {
        contentType,
        contentEncoding: "base64",
      });
    },
  };
};

export const removeConsumerImage = (input) => {
  return {
    types: [
      ConsumerActionType.REMOVE_CONSUMER_IMAGE_REQUESTED,
      ConsumerActionType.REMOVE_CONSUMER_IMAGE_SUCCESS,
      ConsumerActionType.REMOVE_CONSUMER_IMAGE_ERROR,
    ],
    callAPI: () => {
      const { path } = input;

      return Storage.remove(path);
    },
  };
};
