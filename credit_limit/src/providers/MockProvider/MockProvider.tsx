import React, { FC } from 'react';
import { Router } from 'react-router-dom';

import ThemeSelector from 'components/ThemeSelector';
import GlobalContextProvider from 'providers/GlobalContextProvider';

import { MockProviderProps } from './type';

const MockProvider: FC<MockProviderProps> = (props) => {
  const { children, history } = props;

  return (
    <Router history={history}>
      <ThemeSelector>
        <GlobalContextProvider>
          <>{children}</>
        </GlobalContextProvider>
      </ThemeSelector>
    </Router>
  );
};

export default MockProvider;
