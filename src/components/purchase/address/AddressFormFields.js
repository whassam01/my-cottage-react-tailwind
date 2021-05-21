import * as yup from 'yup';

export const AddressFormFieldContent = {
  STREET: {
    title: 'STREET AND NUMBER',
    label: 'Street',
    field: 'street',
    limit: {
      min: 2,
      max: 40,
    },
  },
  CITY: {
    title: 'CITY',
    label: 'City',
    field: 'city',
    limit: {
      min: 3,
      max: 40,
    },
  },
  STREET2: {
    title: 'STREET 2',
    label: 'Street 2',
    field: 'street2',
    limit: {
      min: 2,
      max: 40,
    },
  },
  ZIP_CODE: {
    title: 'ZIPCODE',
    label: 'Zip code',
    field: 'postalCode',
    limit: {
      min: 5,
      max: 10,
    },
  },
  STATE: {
    title: 'STATE',
    label: 'State',
    field: 'stateOrProvince',
    limit: {
      min: 2,
      max: 2,
    },
  },
  COUNTRY: {
    title: 'COUNTRY',
    label: 'Country',
    field: 'country',
    limit: {
      min: 2,
      max: 2,
    },
  },
};

const { STREET, STREET2, CITY, ZIP_CODE, STATE, COUNTRY } = AddressFormFieldContent;

export const AddressInitialValues = {
  [STREET.field]: '',
  [STREET2.field]: '',
  [CITY.field]: '',
  [ZIP_CODE.field]: '',
  [STATE.field]: '',
  [COUNTRY.field]: '',
};

export const AddressValidationSchema = yup.object({
  [STREET.field]: yup
    .string()
    .required(`${STREET.label} is required`)
    .min(
      STREET.limit.min,
      `${STREET.label} must be ${STREET.limit.min}-${STREET.limit.max} characters`
    )
    .max(
      STREET.limit.max,
      `${STREET.label} must be ${STREET.limit.min}-${STREET.limit.max} characters`
    ),
  [STREET2.field]: yup
    .string()
    .transform((value, originalValue) => (originalValue === '' ? null : originalValue))
    .notRequired()
    .nullable()
    .min(
      STREET2.limit.min,
      `${STREET2.label} must be ${STREET2.limit.min}-${STREET2.limit.max} characters`
    )
    .max(
      STREET2.limit.max,
      `${STREET2.label} must be ${STREET2.limit.min}-${STREET2.limit.max} characters`
    ),
  [CITY.field]: yup
    .string()
    .required(`${CITY.label} is required`)
    .min(CITY.limit.min, `${CITY.label} must be ${CITY.limit.min}-${CITY.limit.max} characters`)
    .max(CITY.limit.max, `${CITY.label} must be ${CITY.limit.min}-${CITY.limit.max} characters`),

  [ZIP_CODE.field]: yup
    .string()
    .required(`${ZIP_CODE.label} is required`)
    .min(
      ZIP_CODE.limit.min,
      `${ZIP_CODE.label} must be ${ZIP_CODE.limit.min}-${ZIP_CODE.limit.max} characters`
    )
    .max(
      ZIP_CODE.limit.max,
      `${ZIP_CODE.label} must be ${ZIP_CODE.limit.min}-${ZIP_CODE.limit.max} characters`
    ),

  [STATE.field]: yup.string().required(`${STATE.label} is required`),
  [COUNTRY.field]: yup.string().required(`${COUNTRY.label} is required`),
});
