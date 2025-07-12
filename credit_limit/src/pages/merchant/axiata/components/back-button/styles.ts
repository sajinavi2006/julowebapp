import { css } from '@emotion/react';

export const backButtonCx = css`
  display: flex;
  cursor: pointer;
  margin-bottom: 10px;

  .back-icon {
    transform: rotate(180deg);
    margin-right: 10px;
  }

  .back-label {
    color: #00acf0;
    font-weight: 700;
  }
`;
