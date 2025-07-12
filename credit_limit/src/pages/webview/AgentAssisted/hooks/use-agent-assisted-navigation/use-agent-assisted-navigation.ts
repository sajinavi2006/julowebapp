import { useContext } from 'react';

import { AgentAssistedContext } from './AgentAssistedNavigationProvider';

function useAgentAssistedNavigation() {
  const context = useContext(AgentAssistedContext);

  if (!context)
    throw new Error(
      'useAgentAssistedNavigation must be used within AgentAssistedNavigationProvider',
    );

  return context;
}

export default useAgentAssistedNavigation;
