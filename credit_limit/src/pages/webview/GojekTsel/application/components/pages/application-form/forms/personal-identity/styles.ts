import { css } from '@emotion/react';

export const personalIdentityCx = css`
  padding: 1rem;
  background-color: white;
  margin-bottom: 0.5rem;

  .back-btn {
    color: #00acf0;
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;

    .arrow-left-icon {
      fill: #616161;
    }

    img,
    span {
      cursor: pointer;
    }

    span {
      margin-left: 0.5rem;
      font-weight: bold;
    }
  }

  .agreement-field {
    display: flex;
    align-items: center;

    p {
      margin: 0 0 0 0.5rem;
      color: #616161;
    }

    .MuiCheckbox-root {
      padding: 0;
      color: #00acf0;

      &.Mui-checked {
        color: #00acf0;
      }
    }
  }
`;
