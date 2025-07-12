import { useCallback, useEffect, useState } from 'react';
import { AxiosError } from 'axios';

import { UseFormReturn } from 'hooks/react-hook-form';
import { verifyPin } from 'services/webview';
import { useAgentAssistedNavigation } from 'pages/webview/AgentAssisted/hooks';
import { CreatePinParam } from '../../../types';
import { PIN_LENGTH } from '../../../constants';
import { useCreatePinStep } from '../../../hooks';

interface UseHandleVerifyPinOptions {
  form: UseFormReturn<CreatePinParam, unknown>;
  formRef: React.RefObject<HTMLFormElement>;
}

export const useHandleVerifyPin = (props: UseHandleVerifyPinOptions) => {
  const { form, formRef } = props;

  const [isVerifyingPin, setIsVerifyingPin] = useState<boolean>(false);

  const {
    setError,
    watch,
    formState: { errors },
  } = form;

  const pinWatched = watch('pin');
  const pinError = errors.pin;

  const { goTo } = useAgentAssistedNavigation();
  const { nextStep } = useCreatePinStep();

  const onVerifyPin = useCallback(async ({ pin }: CreatePinParam) => {
    setIsVerifyingPin(true);
    try {
      await verifyPin({ pin });
      nextStep();
    } catch (err) {
      const error = (err as AxiosError)?.response;
      const errorStatus = error?.status;
      switch (errorStatus) {
        case 401:
          goTo('error-token');
          break;
        case 422:
          setError('pin', {
            type: 'custom',
            message:
              'PIN yang kamu buat terlalu lemah. Mohon jangan buat PIN yang mudah ditebak seperti tanggal lahir, nomor berurut, dan nomor berulang.',
          });
          break;
        default:
          setError('pin', {
            type: 'custom',
            message: error?.data?.message,
          });
          break;
      }
    } finally {
      setIsVerifyingPin(false);
    }
  }, []);

  useEffect(() => {
    if (pinWatched.length === PIN_LENGTH && !pinError) {
      formRef.current?.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true }),
      );
    }
  }, [pinWatched, pinError]);

  return {
    isVerifyingPin,
    onVerifyPin,
  };
};
