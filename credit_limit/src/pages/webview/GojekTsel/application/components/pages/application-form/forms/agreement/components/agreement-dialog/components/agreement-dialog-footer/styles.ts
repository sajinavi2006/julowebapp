import { css } from '@emotion/react';

export const agreementDialogFooterCx = css`
  margin-top: 1rem;
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  width: 100%;
  padding: 1.5rem 1rem;
  background-color: white;

  button:not(:first-of-type) {
    margin-left: 0.5rem;
  }
`;
