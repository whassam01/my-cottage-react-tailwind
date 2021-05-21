import emailjs from "emailjs-com";

import { EmailActionType } from "../actiontypes/index";

export const sendEmail = (input) => {
  const { serviceId, templateId, templateParams, userId } = input;
  return {
    types: [
      EmailActionType.SEND_EMAIL_REQUESTED,
      EmailActionType.SEND_EMAIL_SUCCESS,
      EmailActionType.SEND_EMAIL_ERROR,
    ],
    callAPI: () => {
      return emailjs.send(serviceId, templateId, templateParams, userId);
    },
  };
};
