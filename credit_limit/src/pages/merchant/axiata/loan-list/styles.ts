import { css } from '@emotion/react';

export const loanListHeaderCx = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  .info {
    display: flex;
    flex-direction: column;

    .title {
      line-hieght: 32px;
      color: #000000;
    }

    .description {
      color: #616161;
    }
  }

  .create-loan-button {
    padding: 6px 16px;
  }
`;


export const tablesContainerCx = css`
  background: white;
  border-radius: 16px;
  margin-top: 30px;
`;