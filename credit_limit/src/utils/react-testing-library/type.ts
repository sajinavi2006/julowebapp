import type { RenderOptions as _RenderOptions } from '@testing-library/react';
import type { History } from 'history';
import type { ReactElement, ReactNode } from 'react';

export type MaybeRenderProp<P> = ReactNode | ((props: P) => ReactNode);

export interface RenderOptions extends _RenderOptions {
  history?: History<unknown>;
  extendWrapper?: MaybeRenderProp<{ children: ReactElement }>;
}
