import { createContext, useCallback } from 'react';

import { pages } from './constants';
import {
  ApplicationNavigationContextProps,
  ApplicationNavigationPage,
  ApplicationNavigationProviderProps,
} from './types';

export const ApplicationNavigationContext =
  createContext<ApplicationNavigationContextProps>({
    navigate: () => {},
  });

const ApplicationNavigationProvider = (
  props: ApplicationNavigationProviderProps,
) => {
  const { children, setPage } = props;

  const navigate = useCallback((page: ApplicationNavigationPage) => {
    setPage(pages.indexOf(page));
  }, []);

  return (
    <ApplicationNavigationContext.Provider value={{ navigate }}>
      {children}
    </ApplicationNavigationContext.Provider>
  );
};

export default ApplicationNavigationProvider;
