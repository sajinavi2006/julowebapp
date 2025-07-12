import { excludeKey, setErrors } from 'utils/object';
import { useFormContext } from 'hooks/react-hook-form';
import {
  ApplicationParam,
  useRSubmitApplication,
} from 'repositories/merchant/application';

interface UseHandleApplicationFormOptions {
  onSuccessSubmitApplication: () => void;
}

function useHandleApplicationForm(options: UseHandleApplicationFormOptions) {
  const { onSuccessSubmitApplication } = options;

  const { setError, handleSubmit } = useFormContext<ApplicationParam>();

  const { mutateAsync } = useRSubmitApplication({
    onSuccess: onSuccessSubmitApplication,
  });

  const onSubmit = async (data: ApplicationParam) => {
    try {
      await mutateAsync({
        variables: excludeKey(data, [
          'ktp',
          'selfie',
          'nibDocument',
          'companyPhoto',
          'financialDocument',
          'cashflowReport',
          'otherDocument',
          'otp',
          'currentStep',
        ]),
      });
    } catch (err) {
      const statusCode = err.payload?.statusCode;
      const errors = err.payload?.errors || {};

      switch (statusCode) {
        case 422:
          if (!!errors) {
            setErrors<ApplicationParam>(errors, setError);
          }
          break;
        default:
          console.error(err);
          break;
      }
    }
  };

  return {
    onSubmit: handleSubmit(onSubmit),
  };
}

export default useHandleApplicationForm;
