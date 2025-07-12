import { useCallback, useState } from 'react';
import { AxiosError } from 'axios';

import { useApplicationNavigation } from 'pages/webview/GojekTsel/application/hooks';
import { ApplicationParams } from 'pages/webview/GojekTsel/application/types';
import { useFormContext } from 'hooks/react-hook-form';
import { submitGojekTselApplication } from 'services/webview';

function useHandleApplication() {
  const [showSnackbar, setIsShowSnackbar] = useState({
    isOpen: false,
    message: '',
  });

  const { handleSubmit } = useFormContext<ApplicationParams>();
  const { navigate } = useApplicationNavigation();

  const onSubmit = useCallback(async (data: ApplicationParams) => {
    try {
      await submitGojekTselApplication({
        ...data,
        phone_number: '0' + data.phoneNumber,
        other_phone_number:
          data.otherPhoneNumber && '0' + data.otherPhoneNumber,
      });
      navigate('success-page');
    } catch (error) {
      const errorResponse = (error as AxiosError).response;
      const errorStatus = errorResponse?.status;
      // TEMPORARY : will be next enhancement for response code
      if (errorStatus === 400) {
        setIsShowSnackbar({
          isOpen: true,
          message: errorResponse?.data.errors[0],
        });
      }
    }
  }, []);

  const onSnackbarClose = useCallback(() => {
    setIsShowSnackbar({
      isOpen: false,
      message: '',
    });
  }, []);

  return {
    showSnackbar,
    onSnackbarClose,
    onSubmit: handleSubmit(onSubmit),
  };
}

export default useHandleApplication;
