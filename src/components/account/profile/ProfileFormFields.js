import * as yup from "yup";
import { phoneRegExp } from "constants/regex";

export const consumerImageStyle = {
  width: "100%",
  borderRadius: "5px",
};

export const updateProfileParams = {
  title: "Update profile",
  buttonText: "Update profile",
  buttonIcon: "edit",
};

export const ProfileFormFieldContent = {
  FIRST_NAME: {
    title: "FIRST NAME",
    label: "First name",
    field: "firstName",
    limit: {
      min: 1,
      max: 30,
    },
  },
  LAST_NAME: {
    title: "LAST NAME",
    label: "Last name",
    field: "lastName",
    limit: {
      min: 1,
      max: 30,
    },
  },
  EMAIL: {
    title: "EMAIL",
    label: "Email",
    field: "email",
    limit: {
      min: 3,
      max: 50,
    },
  },
  PHONE: {
    title: "PHONE NUMBER",
    label: "Phone number",
    field: "phoneNumber",
    limit: {
      min: 12,
      max: 12,
    },
  },
};

const { FIRST_NAME, LAST_NAME, EMAIL, PHONE } = ProfileFormFieldContent;

export const ProfileFormInitialValues = (profileToEdit) => {
  const {
    avatar = null,
    email = "",
    firstName = "",
    lastName = "",
    phoneNumber = "",
  } = profileToEdit;

  return {
    [FIRST_NAME.field]: firstName,
    [LAST_NAME.field]: lastName,
    [EMAIL.field]: email,
    [PHONE.field]: phoneNumber ? phoneNumber.slice(phoneNumber.length - 10) : "",
    avatar: {
      file: null,
      src: null,
      location: avatar,
    },
  };
};

export const ProfileFormValidationSchema = yup.object({
  [EMAIL.field]: yup
    .string()
    .email(`${EMAIL.label} must be a valid email`)
    .required(`${EMAIL.label} is required`)
    .min(
      EMAIL.limit.min,
      `${EMAIL.label} must be ${EMAIL.limit.min} - ${EMAIL.limit.max} characters`
    )
    .max(
      EMAIL.limit.max,
      `${EMAIL.label} must be ${EMAIL.limit.min} - ${EMAIL.limit.max} characters`
    ),
  [FIRST_NAME.field]: yup
    .string()
    .required(`${FIRST_NAME.label} is required`)
    .min(
      FIRST_NAME.limit.min,
      `${FIRST_NAME.label} must be ${FIRST_NAME.limit.min} - ${FIRST_NAME.limit.max} characters`
    )
    .max(
      FIRST_NAME.limit.max,
      `${FIRST_NAME.label} must be ${FIRST_NAME.limit.min} - ${FIRST_NAME.limit.max} characters`
    ),
  [LAST_NAME.field]: yup
    .string()
    .required(`${LAST_NAME.label} is required`)
    .min(
      LAST_NAME.limit.min,
      `${LAST_NAME.label} must be ${LAST_NAME.limit.min} - ${LAST_NAME.limit.max} characters`
    )
    .max(
      LAST_NAME.limit.max,
      `${LAST_NAME.label} must be ${LAST_NAME.limit.min} - ${LAST_NAME.limit.max} characters`
    ),
  [PHONE.field]: yup
    .string()
    .required(`${PHONE.label} is required`)
    .matches(phoneRegExp, "Phone number is not valid"),
});
