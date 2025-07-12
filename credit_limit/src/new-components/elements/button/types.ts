import type { ButtonProps as DefaultButtonProps } from '@material-ui/core';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

export interface ButtonProps
  extends Omit<DefaultButtonProps, 'color' | 'variant'> {
  /**
   * @default primary
   */
  variant?: ButtonVariant;
}
