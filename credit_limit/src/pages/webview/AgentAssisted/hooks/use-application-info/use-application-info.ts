import { useContext } from 'react';

import { ApplicationInfoContext } from './ApplicationInfoProvider';

function useApplicationInfo() {
  const context = useContext(ApplicationInfoContext);

  if (!context)
    throw new Error(
      'useApplicationInfo must be used within ApplicationInfoProvider',
    );

  return context;
}

export default useApplicationInfo;
