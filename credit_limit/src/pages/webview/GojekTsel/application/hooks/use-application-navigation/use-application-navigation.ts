import { useContext } from 'react';

import { ApplicationNavigationContext } from './ApplicationNavigationProvider';

function useApplicationNavigation() {
  return useContext(ApplicationNavigationContext);
}

export default useApplicationNavigation;
