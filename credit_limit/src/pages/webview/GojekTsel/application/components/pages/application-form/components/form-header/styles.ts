import { css } from '@emotion/react';

export const formHeaderCx = css`
  background-color: #ffffff;
  margin-bottom: 0.5rem;
  padding: 1rem;

  p {
    color: #616161;
    margin: 0;

    &.form-header-sub-title {
      font-size: 0.875rem !important;
    }

    &.form-header-title {
      color: #008ac0;
      font-weight: bold;
    }
  }
`;
