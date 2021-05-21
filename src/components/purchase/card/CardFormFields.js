import * as yup from 'yup';

export const CardFormFieldContent = {
  CARD_NUMBER: {
    title: 'CARD NUMBER',
    label: 'Card number',
    field: 'cardNumber',
  },
  CARD_EXPIRY: {
    title: 'EXPIRATION DATE',
    label: 'Expiration date',
    field: 'cardExpiry',
  },
  CARD_CVC: {
    title: 'SECURITY CODE',
    label: 'Security code',
    field: 'cardCvc',
  },
};

const { CARD_NUMBER, CARD_EXPIRY, CARD_CVC } = CardFormFieldContent;

export const CardInitialValues = {
  [CARD_NUMBER.field]: '',
  [CARD_EXPIRY.field]: '',
  [CARD_CVC.field]: '',
};
