import { cx } from '@emotion/css';
import { forwardRef, useMemo } from 'react';
import DefaultButton from '@material-ui/core/Button';

import { ButtonProps } from './types';
import { buttonCx } from './styles';

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    className,
    type = 'button',
    variant = 'primary',
    disableElevation = true,
    ...resProps
  } = props;

  const variantMap = useMemo(() => {
    switch (variant) {
      case 'secondary':
        return 'outlined';

      case 'tertiary':
        return 'text';

      case 'primary':
      default:
        return 'contained';
    }
  }, [variant]);

  return (
    <DefaultButton
      ref={ref}
      type={type}
      className={cx(buttonCx, className)}
      color='primary'
      variant={variantMap}
      data-variant={variant}
      disableElevation={disableElevation}
      {...resProps}
    />
  );
});

export default Button;
