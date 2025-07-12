import { DetailedHTMLProps } from 'react';

export interface ApplicationPageProps
  extends Omit<
    DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    'ref'
  > {
  useHeader?: boolean;
}
