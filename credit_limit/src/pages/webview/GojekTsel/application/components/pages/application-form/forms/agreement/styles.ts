import { css } from '@emotion/react';

export const agreementCx = css`
  background-color: #ffffff;
  padding: 1rem;
  margin-bottom: 0.5rem;
  color: #404040;

  .agreement-checkbox {
    display: flex;
    align-items: center;

    &:first-of-type {
      margin-bottom: 1rem;
    }
    p {
      margin: 0;
      font-size: 0.875rem !important;
    }

    .Mui-checked {
      color: #00acf0;
    }
  }
`;
