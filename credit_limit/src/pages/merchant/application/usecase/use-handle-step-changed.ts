import { useEffect, useRef } from 'react';
import { FieldValues } from 'react-hook-form';

import { UseFormReturn } from 'hooks/react-hook-form';

import { defaultValues } from '../constants';
import resetDefaultValue from '../utils';

interface UseHandleDefaultValueOptions {
  currentStep: number;
  form: UseFormReturn<FieldValues, unknown>;
}

function useHandleStepChanged(options: UseHandleDefaultValueOptions) {
  const { currentStep, form } = options;

  const { reset, getValues } = form;

  const prevCurrentStep = useRef(currentStep);

  useEffect(() => {
    if (currentStep !== prevCurrentStep.current) {
      resetDefaultValue({
        form,
        currentStep,
        defaultValue: defaultValues[currentStep],
      });
      prevCurrentStep.current = currentStep;
    }
  }, [currentStep, getValues, reset]);
}

export default useHandleStepChanged;
