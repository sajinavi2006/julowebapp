import { css } from '@emotion/react';

export const radioGroupCx = (orientation: 'row' | 'column') => css`
  &.MuiFormGroup-root {
    flex-direction: ${orientation};
  }
`;
