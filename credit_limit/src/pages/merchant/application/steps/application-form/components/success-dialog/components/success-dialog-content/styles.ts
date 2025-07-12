import { css } from '@emotion/react';

export const successDialogContentCx = css`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;

  .success-dialog-icon {
  }

  .success-dialog-title {
    color: #00acf0;
    font-size: 0.875rem;
    font-weight: 700;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }

  .success-dialog-description {
    color: #616161;
    font-size: 0.875rem;
    margin-bottom: 1rem;
  }
`;
