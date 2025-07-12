import { ApplicationParams } from 'pages/webview/GojekTsel/application/types';
import { useFormContext } from 'hooks/react-hook-form';
import { excludeKey } from 'utils/object';

function useHandleFormFields() {
  const {
    formState: { errors },
    watch,
  } = useFormContext<ApplicationParams>();
  const isFormFieldsHasError = Object.keys(errors).length > 0;
  const formFields = excludeKey<ApplicationParams>(watch(), [
    'otherPhoneNumber',
  ]);
  const isAllFormFieldValid = Object.values(formFields).every(
    (value) => Boolean(value) || value === true,
  );

  return { isFormFieldsHasError, isAllFormFieldValid };
}

export default useHandleFormFields;
