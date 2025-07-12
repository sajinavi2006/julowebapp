import { ReactElement } from 'react';
import { render as _render } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import runIfFn from '@julofinance/web-helpers/dist/fn/runIfFn';

import MockProvider from 'providers/MockProvider';
import AppSnackBar from 'components/AppSnackBar';
import LoadingOverlay from 'components/LoadingOverlay';

import { RenderOptions } from './type';

const defaultHistory = createMemoryHistory();

export const render = (ui: ReactElement, options: RenderOptions = {}) => {
  const { history, extendWrapper } = options;

  const rendered = _render(ui, {
    wrapper: ({ children }) => (
      <MockProvider history={history ?? defaultHistory}>
        <LoadingOverlay />
        {runIfFn(extendWrapper, { children }) ?? children}
        <AppSnackBar />
      </MockProvider>
    ),
    ...options,
  });

  return {
    ...rendered,
    rerender: (ui: ReactElement, options: RenderOptions) =>
      render(ui, { container: rendered.container, ...options }),
  };
};

export * from '@testing-library/react';
export { defaultHistory as history };
