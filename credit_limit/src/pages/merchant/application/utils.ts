import { FieldValues } from 'react-hook-form';

import { UseFormReturn } from 'hooks/react-hook-form';

interface ResetDefaultValueProps {
  form: UseFormReturn<FieldValues>;
  defaultValue: FieldValues;
  currentStep: number;
}

function resetDefaultValue(props: ResetDefaultValueProps) {
  const { form, defaultValue, currentStep } = props;

  const { getValues, reset } = form;

  const values = getValues();
  const defaultValueKeys = Object.keys(defaultValue);

  reset(
    defaultValueKeys.reduce((prevValue, key) => {
      return {
        ...prevValue,
        ...(values[key]
          ? { [key]: values[key] }
          : {
              [key]: defaultValue[key as keyof typeof defaultValue],
            }),
        otp: '',
        currentStep,
      };
    }, {}),
  );
}

export default resetDefaultValue;
