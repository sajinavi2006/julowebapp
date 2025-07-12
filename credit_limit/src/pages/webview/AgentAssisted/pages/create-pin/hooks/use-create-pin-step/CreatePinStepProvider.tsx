import { createContext, useCallback } from 'react';

import _noop from '@julofinance/web-helpers/dist/fn/noop';

import { CreatePinStepContextProps, CreatePinStepProviderProps } from './types';

export const CreatePinStepContext = createContext<CreatePinStepContextProps>({
  step: 0,
  nextStep: () => {},
  prevStep: () => {},
});

const CreatePinStepProvider = (props: CreatePinStepProviderProps) => {
  const { children, setStep, step } = props;

  const nextStep = useCallback<CreatePinStepContextProps['nextStep']>(
    (cb = _noop) => {
      setStep((prev) => prev + 1);
      cb();
    },
    [],
  );

  const prevStep = useCallback<CreatePinStepContextProps['prevStep']>(
    (cb = _noop) => {
      setStep((prev) => prev - 1);
      cb();
    },
    [],
  );

  return (
    <CreatePinStepContext.Provider value={{ step, nextStep, prevStep }}>
      {children}
    </CreatePinStepContext.Provider>
  );
};

export default CreatePinStepProvider;
