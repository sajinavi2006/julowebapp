import { useCallback, useState } from 'react';

import _noop from '@julofinance/web-helpers/dist/fn/noop';

import { UseStepOptions } from './types';

function useStep(options: UseStepOptions) {
  const {
    defaultStep = 0,
    totalStep,
    onPrevStep: onPrevStepProp = _noop,
    onNextStep: onNextStepProp = _noop,
  } = options;

  const [currentStep, setCurrentStep] = useState(defaultStep);

  const goTo = useCallback((targetStep: number) => {
    setCurrentStep(targetStep);
  }, []);

  const onNextStep = useCallback(() => {
    setCurrentStep((prevStep) => {
      const nextStep = prevStep + 1;
      if (nextStep >= totalStep) return prevStep;

      return nextStep;
    });
    onNextStepProp();
  }, [onNextStepProp, totalStep]);

  const onPrevStep = useCallback(() => {
    setCurrentStep((_prevStep) => {
      const prevStep = _prevStep - 1;
      if (prevStep < 0) return _prevStep;

      return prevStep;
    });
    onPrevStepProp();
  }, [onPrevStepProp]);

  return { currentStep, onNextStep, onPrevStep, goTo };
}

export default useStep;
