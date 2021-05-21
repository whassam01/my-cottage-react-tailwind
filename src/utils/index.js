import { ErrorCode, ErrorMessage } from "../constants";

export * from "./google";

export const isEmpty = (value) => value === undefined || value === null || value === "";

export const isEmptyObject = (obj) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

export const displayablePhoneNumber = (str) => {
  //Filter only numbers from the input
  let cleaned = ("" + str).replace(/\D/g, "");

  //Check if the input is of correct
  let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    //Remove the matched extension code
    //Change this to format for any country code.
    let intlCode = match[1] ? "+1 " : "";
    return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("");
  }

  return null;
};

export const cleanedPhoneInput = (phoneNumber) => {
  return phoneNumber.match(/\+?\d+/g).join("");
};

export const buildErrorMessage = (error) => {
  const { constructor } = error;
  if (constructor.name === ErrorCode.GRAPHQL) {
    return "Unexpected GraphQL!";
  }

  const {
    extensions: { code, validations },
  } = error;

  if (code === ErrorCode.BAD_USER_INPUT) {
    const validationsMessage = Object.keys(validations).join(", ");
    return `${ErrorMessage[ErrorCode.BAD_USER_INPUT]}: ${validationsMessage}`;
  } else if (ErrorMessage[code]) {
    return ErrorMessage[code];
  } else {
    return "Sorry, something went wrong";
  }
};

export const removeNullProp = (obj) => {
  for (const propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
};

export const createStreetString = (address) => {
  let string = "";
  if (address) {
    string =
      address.street && address.street2
        ? `${address.street}, ${address.street2}`
        : `${address.street}`;
  }
  return string;
};
