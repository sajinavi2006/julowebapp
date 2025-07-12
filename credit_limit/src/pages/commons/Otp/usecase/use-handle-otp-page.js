import { useCallback, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { containsNumber } from '@julofinance/web-helpers/dist/string';

import utils from 'utils';
import { useUserContext } from 'providers/UserProvider';
import { verifyOtp, requestOtp } from 'services/auth';

import { OTP_MAX_DIGIT } from '../constants';
import { calculateTime } from '../utils';

export function useHandleOtpPage() {
  const nik = utils.store.get('nik');
  const email = utils.store.get('email');
  const otpResendTime = utils.store.get('resendTime');
  const requestId = utils.store.get('requestId');
  const xTimestamp = utils.store.get('xTimestamp');

  const history = useHistory();
  const { handleNotification } = useUserContext();

  const initialTimeLeft = calculateTime({
    resendTime: otpResendTime,
  });

  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(initialTimeLeft || '00:00');
  const [messageError, setMessageError] = useState('');
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isAllowRefetchOtp, setIsAllowRefetchOtp] = useState(false);

  const onResendVerificationCode = useCallback(async () => {
    setIsButtonLoading(true);
    setMessageError('');
    setOtp('');

    try {
      const response = await requestOtp({ email });
      const { expired_time, resend_time, request_id, x_timestamp } =
        response.data;

      utils.store.set('expiredTime', expired_time);
      utils.store.set('resendTime', resend_time);
      utils.store.set('requestId', request_id);
      utils.store.set('xTimestamp', x_timestamp);

      setIsAllowRefetchOtp(false);
      setTimeLeft(
        calculateTime({
          resendTime: resend_time,
        }),
      );
    } catch (error) {
      const errorMessage = Array.isArray(error?.response?.data?.errors)
        ? error?.response?.data?.errors?.[0]
        : error?.response?.data?.errors ?? 'Network Error';

      handleNotification({
        isOpen: true,
        message: errorMessage?.message || errorMessage,
      });
    } finally {
      setIsButtonLoading(false);
    }
  }, []);

  const onSubmitOtp = useCallback(async (value) => {
    if (!containsNumber(value)) return setOtp('');

    setOtp(value);
    setMessageError('');

    if (value.length === OTP_MAX_DIGIT) {
      const payload = {
        email,
        request_id: utils.store.get('requestId'),
        x_timestamp: utils.store.get('xTimestamp'),
        otp: value,
      };

      try {
        setIsButtonLoading(true);
        await verifyOtp(payload);

        history.push('pin');
      } catch (error) {
        setIsButtonLoading(false);
        setMessageError(error?.response?.data?.errors?.[0]);
      }
    } else {
      setMessageError('');
    }
  }, []);

  useEffect(() => {
    if (!nik || !email || !requestId || !xTimestamp || !otpResendTime) {
      setTimeLeft('00:00');
      history.goBack();
    }

    const intervalId = setInterval(() => {
      const time = calculateTime({
        resendTime: otpResendTime,
        onCountdownStop: () => {
          setIsAllowRefetchOtp(true);
          clearInterval(intervalId);
        },
      });

      setTimeLeft(time);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [otpResendTime]);

  return {
    isAllowRefetchOtp,
    email,
    onSubmitOtp,
    isButtonLoading,
    messageError,
    otp,
    onResendVerificationCode,
    timeLeft,
  };
}
