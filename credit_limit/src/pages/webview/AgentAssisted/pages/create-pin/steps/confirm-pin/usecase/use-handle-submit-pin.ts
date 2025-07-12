import { useCallback, useEffect, useState } from 'react';
import { AxiosError } from 'axios';

import { UseFormReturn } from 'hooks/react-hook-form';
import { createPin } from 'services/webview';
import { useAgentAssistedNavigation } from 'pages/webview/AgentAssisted/hooks';
import { CreatePinParam } from '../../../types';
import { PIN_LENGTH } from '../../../constants';

interface UseHandleSubmitPinOptions {
  form: UseFormReturn<CreatePinParam, unknown>;
  formRef: React.RefObject<HTMLFormElement>;
}

export const useHandleSubmitPin = (props: UseHandleSubmitPinOptions) => {
  const { form, formRef } = props;

  const [isSubmittingPin, setIsSubmittingPin] = useState<boolean>(false);
  const [isConfirmPinMatched, setIsConfirmPinMatched] = useState(true);

  const {
    setError,
    watch,
    formState: { errors },
  } = form;

  const confirmPinWatched = watch('confirmPin');
  const confimPinError = errors.confirmPin;

  const { goTo } = useAgentAssistedNavigation();

  const onSubmitPin = useCallback(async ({ pin }: CreatePinParam) => {
    try {
      setIsSubmittingPin(true);
      await createPin({ pin });
      goTo('success');
    } catch (err) {
      const error = (err as AxiosError)?.response;
      const errorStatus = error?.status;
      switch (errorStatus) {
        case 401:
          goTo('error-token');
          break;
        case 422:
          setError('confirmPin', {
            type: 'custom',
            message: error?.data?.message,
          });
          break;
        default:
          setError('confirmPin', {
            type: 'custom',
            message: error?.data?.message,
          });
          break;
      }
    } finally {
      setIsSubmittingPin(false);
    }
  }, []);

  useEffect(() => {
    if (confirmPinWatched.length === PIN_LENGTH && !confimPinError) {
      formRef.current?.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true }),
      );
    }

    if (confimPinError) {
      setIsConfirmPinMatched(false);
    }
  }, [confirmPinWatched, confimPinError]);

  return {
    isSubmittingPin,
    isConfirmPinMatched,
    onSubmitPin,
  };
};
