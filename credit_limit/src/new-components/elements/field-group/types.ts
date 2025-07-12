import type { FieldError } from 'react-hook-form';

import type { FieldBaseProps } from '../types';

export interface FieldGroupProps
  extends React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    Omit<FieldBaseProps, 'required'> {
  children: React.ReactNode;
  className?: string;
  error?: FieldError;
  invalid?: boolean;
  showCounter?: boolean;
  /**
   * @default 0
   */
  maxTextLength?: number;
  /**
   * @default 0
   */
  currentTextLength?: number;
  labelIndicator?: React.ReactNode;
}
