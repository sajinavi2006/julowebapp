import { useState } from 'react';
import { Global, css } from '@emotion/react';

import {
  AgentAssistedNavigationProvider,
  AgentAssistedPage,
  ApplicationInfoProvider,
} from './hooks';
import { AgentAssistedPages } from './constants';
import {
  useHandleCheckTokenExist,
  useHandleGetApplicationInfo,
} from './usecase';

const AgentAssisted = () => {
  const [page, setPage] = useState<AgentAssistedPage>('loading');

  const AgentAssistedPage = AgentAssistedPages[page];

  const isTokenExist = useHandleCheckTokenExist();
  const applicationInfo = useHandleGetApplicationInfo({
    setPage,
    isTokenExist,
  });

  return (
    <AgentAssistedNavigationProvider setPage={setPage} page={page}>
      <ApplicationInfoProvider applicationInfo={applicationInfo}>
        <AgentAssistedPage />

        <Global
          styles={css`
            html {
              font-size: 16px !important;
            }
          `}
        />
      </ApplicationInfoProvider>
    </AgentAssistedNavigationProvider>
  );
};

export default AgentAssisted;
