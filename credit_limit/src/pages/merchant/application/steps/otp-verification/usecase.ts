import { useFormContext } from 'hooks/react-hook-form';
import { setErrors } from 'utils/object';
import {
  useRRequestOtp,
  useRVerifyOtp,
  VerifyOtpParam,
} from 'repositories/merchant/application';
import {
  useOtp,
  useShowSnackbar,
  useStepContext,
  useTimer,
} from 'pages/merchant/application/hooks';

function useHandleOtp() {
  const { getValues, setError } = useFormContext<VerifyOtpParam>();
  const { goTo } = useStepContext();
  const { startTime, setTime } = useTimer();
  const { showSnackbar } = useShowSnackbar();
  const { setIsPhoneNumberVerified } = useOtp();

  const primaryPhoneNumber = getValues('primaryPhoneNumber');

  const { isLoading: isLoadingValidateOtp, mutateAsync: verifyOtp } =
    useRVerifyOtp({
      onSuccess: () => {
        setIsPhoneNumberVerified(true);
        goTo(0);
      },
    });

  const { isLoading: isLoadingReRequestOtp, mutateAsync: reRequestOtp } =
    useRRequestOtp({
      onSuccess: (data) => {
        const resendTime = data?.data?.resendTime as string;

        setTime(resendTime);
        startTime();
      },
      onError: (err) => {
        const statusCode = err.payload?.statusCode;
        const errors = err.payload?.errors || {};
        const errorMessage = err.payload?.message;

        switch (statusCode) {
          case 400:
            setError('otp', { message: errorMessage });
            break;
          case 429:
            showSnackbar({
              message: errorMessage,
              autoHideDuration: 5000,
              anchorOrigin: { horizontal: 'center', vertical: 'top' },
              variant: 'error',
            });
            break;
          case 500:
            setError('otp', { message: errors.error });
            break;
        }
      },
    });

  const handleReRequestOtp = () => {
    reRequestOtp({ variables: { phoneNumber: primaryPhoneNumber } });
  };

  const onSubmitOtp = async (fields: VerifyOtpParam) => {
    const { otp } = fields;

    if (!primaryPhoneNumber) return;

    try {
      await verifyOtp({
        variables: { otp, phoneNumber: primaryPhoneNumber },
      });
    } catch (err) {
      const statusCode = err?.payload?.statusCode;
      const errors = err?.payload?.errors || {};
      const errorMessage = err.payload?.message;

      switch (statusCode) {
        case 400:
          setError('otp', { message: errors.phoneNumber });
          break;
        case 422:
          setErrors(errors, setError);
          break;
        case 500:
          setError('otp', { message: errorMessage });
          break;
        default:
          console.error(err);
          break;
      }
      return;
    }
  };

  return {
    isLoadingValidateOtp,
    isLoadingReRequestOtp,
    onSubmitOtp,
    handleReRequestOtp,
  };
}

export default useHandleOtp;
