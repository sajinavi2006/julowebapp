import { forwardRef } from 'react';
import { cx } from '@emotion/css';
import { FormLabel } from '@material-ui/core';

import { FieldGroupProps } from './types';
import { fieldGroupCx } from './styles';

const FieldGroup = forwardRef<HTMLDivElement, FieldGroupProps>((props, ref) => {
  const {
    children,
    label,
    name,
    className,
    invalid,
    error,
    helperText,
    showCounter,
    maxTextLength,
    currentTextLength,
    labelIndicator,
  } = props;

  return (
    <div ref={ref} css={fieldGroupCx} className={cx('field-group', className)}>
      {Boolean(label) && (
        <FormLabel className='field-label' htmlFor={name}>
          {label}
          {labelIndicator}
        </FormLabel>
      )}
      {children}
      {((invalid && Boolean(error?.message)) || helperText || showCounter) && (
        <div className='field-info'>
          {invalid && Boolean(error?.message) ? (
            <div className='error field-info-item'>
              <span>{error?.message}</span>
            </div>
          ) : (
            helperText && (
              <div className='helper field-info-item'>
                <span>{helperText}</span>
              </div>
            )
          )}
          {showCounter && (
            <div className='counter field-info-item'>
              <span>
                {currentTextLength} / {maxTextLength}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
});

export default FieldGroup;
