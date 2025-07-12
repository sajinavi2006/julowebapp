import { css } from '@emotion/css';
import { colsMin } from 'assets/css/utils';

export const pinStyle = (value) => css`
  div:nth-child(-n + ${value.length}) .otp-input {
    border: none !important;
  }

  ${colsMin('medium')} {
    .otp-input {
      width: 2vw !important;
    }
  } ;
`;
