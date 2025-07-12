import { createContext } from 'react';

import {
  AgentAssistedContextProps,
  AgentAssistedNavigationProviderProps,
} from './types';

export const AgentAssistedContext = createContext<AgentAssistedContextProps>({
  goTo: () => {},
  page: 'loading',
});

function AgentAssistedNavigationProvider(
  props: AgentAssistedNavigationProviderProps,
) {
  const { children, setPage, page } = props;

  return (
    <AgentAssistedContext.Provider
      value={{
        goTo: setPage,
        page,
      }}
    >
      {children}
    </AgentAssistedContext.Provider>
  );
}

export default AgentAssistedNavigationProvider;
