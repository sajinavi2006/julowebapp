import { ReactNode } from 'react';

export type FunctionalComponent = (
  props: FunctionalComponentProps,
) => JSX.Element;

export interface FunctionalComponentProps extends Record<string, unknown> {
  children: ReactNode;
}
