import { css } from '@emotion/react';

export const detailBoxCx = css`
  .detail-box-title {
    color: #00ACF0;
    font-weight: 700;
  }

  .box-container {
    background: linear-gradient(180deg, #00acf0 0%, #008ac0 100%);
    border-radius: 8px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 15px;
    margin-bottom: 15px;
    margin-top: 5px;
    grid-row-gap: 15px;

    .label-text {
      color: #b2e6fa;
      font-weight: 700;
    }

    .value-text {
      color: #ffffff;
      font-weight: 700;
    }
  }
`;
