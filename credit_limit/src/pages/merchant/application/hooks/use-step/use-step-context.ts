import { useContext } from 'react';

import { StepContext } from './StepProvider';
import { StepContextProps } from './types';

function useStepContext() {
  const context = useContext(StepContext);

  if (!context)
    throw new Error(
      'useStepContext must be used within StepNavigationProvider',
    );

  return context as unknown as StepContextProps;
}

export default useStepContext;
