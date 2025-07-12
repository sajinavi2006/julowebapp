import { useCallback, useState } from 'react';

import { UseFormReturn } from 'hooks/react-hook-form';
import { LoanCreationParam } from 'repositories/merchant/loan';
import { useRLoanCreation } from 'repositories/merchant/loan/mutations';
import { isObjectEmpty, setErrors } from 'utils/object';

interface UseHandleFormSubmitProps {
  form: UseFormReturn<LoanCreationParam, unknown>;
}

export const useHandleFormSubmit = (props: UseHandleFormSubmitProps) => {
  const { form } = props;

  const { setError } = form;

  const [errorMessage, setErrorMessage] = useState<string | undefined>('');

  const { mutate, isLoading } = useRLoanCreation({
    onError: (err) => {
      const statusCode = err?.payload?.statusCode;
      const errors = err?.payload?.errors || {};

      switch (statusCode) {
        case 400:
          if (isObjectEmpty(errors)) {
            setErrorMessage(err.payload?.message);
          } else {
            setErrors<LoanCreationParam>(errors, setError);
          }
          break;
        default:
          console.error(err);
          break;
      }
    },
  });

  const handleCloseSnakbar = useCallback(() => {
    setErrorMessage('');
  }, []);

  const onSubmit = (data: LoanCreationParam) => {
    mutate({ variables: data });
  };

  const onError = () => {
    setErrorMessage('Harap lengkapi form dan koreksi data yang masih salah');
  };

  return {
    isLoading,
    error: errorMessage,
    onCloseSnackbar: handleCloseSnakbar,
    onSubmit,
    onError,
  };
};
