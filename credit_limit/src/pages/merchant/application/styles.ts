import { css } from '@emotion/react';

export const applicationCx = css`
  position: relative;
  z-index: 1;

  background-color: #f7f7f7;
  margin-top: 4rem; //navbar height

  input {
    &::placeholder {
      color: #e0e0e0;

      opacity: 1;
    }
  }
`;
