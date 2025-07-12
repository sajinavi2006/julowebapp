import { css } from '@emotion/react';

export const loanDetailCx = css`
  max-width: 50rem;

  .loan-detail-title {
    font-weight: 700 !important;
  }

  .header-container {
    display: flex;
    cursor: pointer;
    margin-bottom: 10px;

    .back-icon {
      transform: rotate(180deg);
      margin-right: 10px;
    }

    .title-text {
      color: #00acf0;
      font-weight: 700;
    }
  }

  // prevent inherit style from innerHtml
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-style: normal;
    padding-top: 0;
    padding-bottom: 0;
  }
`;

export const loanPaperCx = css`
  border-radius: 16px;
  padding: 15px 0;
  margin-top: 10px;
`;
