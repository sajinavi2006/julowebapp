import { css } from '@emotion/react';

export const successPageCx = css`
  width: 100%;
  height: calc(100vh - 4rem);
  max-width: 54.75rem;
  margin: 0 auto;

  .success-page-card {
    text-align: center;
    background-color: #ffffff;
    border-radius: 1rem;
    padding: 1rem;
    margin-bottom: 1.5rem;

    .success-page-title {
      color: #00acf0;
      font-size: 1rem;
      font-weight: 700;
      margin-top: 1.5rem;
    }

    .success-page-content {
      color: #616161;
      margin-top: 0.75rem;
      font-size: 1rem;
      font-weight: 400;
    }

    p {
      margin: 0;
    }
  }
`;
