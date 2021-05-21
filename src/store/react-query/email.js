import { useMutation, useQueryClient } from 'react-query';
import { sendEmail } from 'store/api';
import { EmailKeys } from 'store/actiontypes';

export const useSendEmail = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation(sendEmail, {
    onSuccess: () => {
      queryClient.invalidateQueries(EmailKeys.Email);
    },
    ...options,
  });
};
