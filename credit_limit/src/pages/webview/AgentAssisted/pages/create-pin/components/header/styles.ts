import { css } from '@emotion/react';

export const headerCx = css`
  display: flex;
  flex-direction: row;
  padding: 1rem;

  .back-btn {
    cursor: pointer;

    display: flex;
    align-items: center;

    font-weight: bold;
    line-height: 1.5rem;

    .arrow {
      margin-right: 0.75rem;
    }
  }
`;
