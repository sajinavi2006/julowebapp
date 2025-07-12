import { css } from '@emotion/react';

export const formFooterCx = css`
  padding: 1rem 0 1rem 0;
  text-align: center;

  span {
    margin-bottom: 0.5rem;
    color: #616161;
    font-weight: 700;
    font-size: 0.625rem;
  }

  .form-footer-logo {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;

    img {
      width: auto;
      height: 19px;

      &:not(:last-child) {
        margin-right: 1rem;
      }
    }
  }
`;
