import type { ReactNode } from 'react';
import type { History } from 'history';

export interface MockProviderProps {
  children: ReactNode;
  history: History<unknown>;
}
