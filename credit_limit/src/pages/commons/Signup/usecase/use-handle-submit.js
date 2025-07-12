import { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import useGeolocation from 'hooks/use-geolocation';
import { useUserContext } from 'providers/UserProvider';
import Analytics from 'utils/Analytics/Analytics';
import { preRegister, requestOtp } from 'services/auth';

import utils from 'utils';
import { signupSchema } from '../utils';

function useHandleSubmit() {
  const history = useHistory();
  const { search } = useLocation();

  const { handleSubmit, control } = useForm({
    resolver: yupResolver(signupSchema),
    shouldFocusError: false,
    mode: 'onSubmit',
  });

  const { handleLoadingOverlay, handleNotification } = useUserContext();

  const { isPermissionGranted } = useGeolocation({
    enabled: true,
    onPermissionGranted: (position) => {
      Analytics.logEvent({
        title: 'sign_up',
        eventName: 'location_permission_granted',
      });

      const { latitude, longitude } = position.coords;

      utils.store.set('latitude', latitude);
      utils.store.set('longitude', longitude);
    },
    onPermissionDenied: () => {
      handleNotification({
        isOpen: true,
        message:
          'Mohon ijinkan akses lokasi untuk dapat mengakses website JULO',
      });
    },
  });

  const handleOnSubmit = useCallback(
    async (formData) => {
      if (!isPermissionGranted) {
        return handleNotification({
          isOpen: true,
          message:
            'Mohon ijinkan akses lokasi untuk dapat mengakses website JULO',
        });
      }

      handleLoadingOverlay(true);

      try {
        const preRegisterResp = await preRegister(formData);

        if (preRegisterResp.success) {
          const requestOtpResp = await requestOtp({ email: formData.email });

          utils.store.set('nik', formData.nik);
          utils.store.set('email', formData.email);

          utils.store.set('expiredTime', requestOtpResp.data?.expired_time);
          utils.store.set('resendTime', requestOtpResp.data?.resend_time);
          utils.store.set('requestId', requestOtpResp.data?.request_id);
          utils.store.set('xTimestamp', requestOtpResp.data?.x_timestamp);

          history.push({
            pathname: 'otp',
            state: { from: 'register' },
            search
          });
        }
      } catch (error) {
        const response = error.response;

        const errorData = response?.data || {};
        const errMessage = response?.message;
        const errResult =
          errorData?.errors?.length > 0
            ? errorData.errors[0]
            : errMessage ?? 'Network Error';

        handleNotification({
          isOpen: true,
          message: errResult,
        });
      } finally {
        handleLoadingOverlay(false);
      }
    },
    [isPermissionGranted],
  );

  return {
    onSubmitRegister: handleSubmit(handleOnSubmit),
    formControl: control,
  };
}

export default useHandleSubmit;
