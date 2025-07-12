import { useContext } from 'react';

import { CreatePinStepContext } from './CreatePinStepProvider';

function useCreatePinStep() {
  const context = useContext(CreatePinStepContext);

  if (!context)
    throw new Error(
      'useCreatePinStep must be used within CreatePinStepProvider',
    );

  return context;
}

export default useCreatePinStep;
