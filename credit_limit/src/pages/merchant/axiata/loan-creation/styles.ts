import { css } from '@emotion/react';

export const loanCreationCx = css`
  max-width: 50rem;

  .bold {
    font-weight: 700;
  }

  .title-text {
    color: #181818;
  }

  .description-text {
    color: #9E9E9E;
  }

  .next-text {
    color: #616161;
  }
`;

export const loanPaperCx = css`
  border-radius: 16px;
  padding: 15px 0;
  margin-top: 10px;
`;

export const paperPaddingCx = css`
  padding: 10px 30px;
`;

export const alertCx = css`
  border: 1px solid #83a7fa;
  border-radius: 8px;
  background-color: #eaf0fe;
  color: #2656c6;
  padding: 5px 10px;
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;

  .info-icon {
    margin-right: 5px;
  }
`;
