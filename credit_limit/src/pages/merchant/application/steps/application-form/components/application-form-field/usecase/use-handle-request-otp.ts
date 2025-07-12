import { useRef } from 'react';

import { setErrors } from 'utils/object';
import { useFormContext } from 'hooks/react-hook-form';
import { useRRequestOtp } from 'repositories/merchant/application';
import {
  useTimer,
  useShowSnackbar,
  useStepContext,
} from 'pages/merchant/application/hooks';

function useHandleRequestOtp() {
  const form = useFormContext();
  const { getValues, setError, clearErrors } = form;
  const { showSnackbar } = useShowSnackbar();
  const { time, setTime, startTime } = useTimer();
  const { onNextStep } = useStepContext();

  const primaryPhoneNumber = getValues('primaryPhoneNumber');
  const prevPrimaryPhoneNumber = useRef(primaryPhoneNumber);
  const isPrimaryPhoneNumberChange =
    primaryPhoneNumber !== prevPrimaryPhoneNumber.current;

  const { isLoading, mutateAsync: requestOtp } = useRRequestOtp({
    retry: false,
    onSuccess: (data) => {
      const resendTime = data.data.resendTime;
      prevPrimaryPhoneNumber.current = primaryPhoneNumber;

      onNextStep();
      setTime(resendTime);
      startTime();
    },
    onError: (err) => {
      const statusCode = err.payload?.statusCode;
      const errors = err.payload?.errors || {};
      const errorMessage = err.payload?.message;
      const resendTime = err.payload?.data?.resendTime;

      switch (statusCode) {
        case 400:
          setErrors(
            {
              primaryPhoneNumber: errors.phoneNumber,
            },
            setError,
          );
          break;

        case 429:
          prevPrimaryPhoneNumber.current = primaryPhoneNumber;
          showSnackbar({
            message: errors.otp,
            anchorOrigin: { horizontal: 'center', vertical: 'top' },
            variant: 'error',
          });

          onNextStep();
          setTime(resendTime);
          startTime();
          break;

        case 500:
          setErrors(
            {
              primaryPhoneNumber: errorMessage,
            },
            setError,
          );
          break;

        default:
          break;
      }
    },
  });

  const onRequest = () => {
    clearErrors('primaryPhoneNumber');
    if (!time || isPrimaryPhoneNumberChange) {
      requestOtp({ variables: { phoneNumber: primaryPhoneNumber } });
    } else {
      onNextStep();
    }
  };

  return {
    isOtpLoading: isLoading,
    onRequest,
  };
}

export default useHandleRequestOtp;
