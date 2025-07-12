import type { CSSProperties, ReactNode } from 'react';

export interface PageProps {
  style?: CSSProperties;
  className?: string;
  useHeader?: boolean;
  children?: ReactNode;
}
