import { useHistory } from 'react-router-dom';
import { useUserContext } from 'providers/UserProvider';
import { submitApplication } from 'services/employee-financing';
import { ErrorType, ISubmitPayload } from '../types';

const useLoanApplicationSubmit = () => {
  const { convertDataURLtoFile, handleNotification, handleLoadingOverlay } =
    useUserContext();
  const history = useHistory();

  const convertData = (payload: Record<string, string>) => {
    const data = payload;

    data.ktp_image = convertDataURLtoFile(
      data.ktp_image,
      `${Math.random()}.jpg`,
    );
    data.selfie = convertDataURLtoFile(data.selfie, `${Math.random()}.jpg`);
    data.gender = data.gender === 'Perempuan' ? 'female' : 'male';
    data.marriage_status =
      data.marriage_status === 'Menikah' ? 'married' : 'not_married';

    return data;
  };

  // any type but with static declaration
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  const isErrorWithMessage = (error: ErrorType) => {
    return (
      typeof error === 'object' &&
      error !== null &&
      typeof error.response.data === 'object'
    );
  };

  const submit = async (payload: ISubmitPayload) => {
    handleLoadingOverlay(true);
    const data = convertData(payload);

    const formData = new FormData();
    for (const key in data) {
      if (data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    }
    try {
      await submitApplication(formData);
      handleLoadingOverlay(false);
      history.push('/ef-pilot/success', {
        from: '/ef-pilot/application/financial',
      });
    } catch (error) {
      if (isErrorWithMessage(error)) {
        const errors = error?.response?.data?.errors ?? {};
        const errorMessage = Object.values(errors)[0];
        handleNotification({
          isOpen: true,
          message: errorMessage || 'Terjadi kesalahan ketika kirim formulir',
        });
        handleLoadingOverlay(false);
      }
    }
  };

  return {
    submit,
  };
};

export default useLoanApplicationSubmit;
