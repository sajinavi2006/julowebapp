import { css } from '@emotion/react';

export const loanErrorDialogCx = css`
  .MuiDialog-scrollPaper {
    align-items: flex-end;

    .MuiDialog-paper {
      width: 100%;
      margin-bottom: 0;
      padding-bottom: 0.5rem;
      margin: 0;
      border-radius: 1rem 1rem 0 0;
      max-width: 100%;

      @media (min-width: 769px) {
        max-width: 22.5rem;
      }

      .MuiDialogTitle-root {
        border-bottom: 1px solid #ededed;
        padding: 0.75rem 1rem;
        h2 {
          font-family: Nunito;
          font-weight: 700;
          font-size: 1rem;
        }
      }

      .MuiDialogContent-root {
        padding: 1rem 1rem 0 1rem;

        .dialog-max-credit-loan-info {
          text-align: center;
          margin-top: 1rem;
          color: #404040;
        }
      }
      .MuiDialogActions-root {
        padding: 0.75rem 1rem;
        justify-content: center;
      }
    }
  }
`;
