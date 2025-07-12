import { css } from '@emotion/react';

import bgPattern from 'assets/img/background.jpg';

export const createPinCx = css`
  width: 100%;
  height: 100vh;
  height: 100dvh;

  display: flex;
  flex-direction: column;

  background-image: url(${bgPattern});
  background-size: cover;

  color: #ffffff;

  form {
    margin-top: 2.375rem;

    .pin-input {
      > .field-label {
        font-size: 1rem !important;
        font-weight: 700;
      }

      > .field-info > .field-info-item {
        font-size: 0.625rem;
      }

      > .field-label,
      > .field-info .field-info-item {
        color: #ffffff;
      }
    }
  }
`;
