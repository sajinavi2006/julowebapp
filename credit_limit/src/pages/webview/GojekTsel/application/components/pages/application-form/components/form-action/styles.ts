import { css } from '@emotion/react';

export const formActionCx = css`
  position: sticky;
  bottom: 0;

  .button-submit-wrapper {
    background-color: #fff;
    padding: 1rem;
  }

  .MuiSnackbar-root {
    position: unset;
    transform: none;

    .MuiSnackbarContent-root {
      width: 100%;
      border-radius: 0;
      padding: 0.5rem 1rem;
      color: #af3e31;
      background-color: #f7d8d4;
    }

    .MuiPaper-elevation6 {
      box-shadow: none;
    }
  }
`;
