import { css } from '@emotion/react';

export const snackbarCx = css`
  &[variant='error'] {
    .MuiAlert-root {
      color: #db4d3d;
      background-color: #f7d8d4;
    }
  }

  .MuiAlert-message {
    text-align: center;
  }
`;
