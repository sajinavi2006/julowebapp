import { css } from '@emotion/react';

export const inputCx = css`
  .MuiInputBase-root {
    border-radius: 0.5rem;
    border: 1px solid #e0e0e0;
    padding: 0.75rem;

    input {
      padding: 0;
    }

    &::before,
    &::after {
      display: none;
    }

    &.Mui-focused {
      border-color: #66cdf6;
    }

    &.Mui-error {
      border-color: #db4d3d;
    }

    &.Mui-disabled {
      cursor: not-allowed;
      background-color: #ededed;
      border-color: #c2c2c2;
      input {
        cursor: inherit;
        color: #757575;
      }
    }

    &.MuiInputBase-adornedStart {
      input {
        margin-left: 0.5rem;
      }
    }

    &.MuiInputBase-adornedEnd {
      input {
        margin-right: 0.5rem;
      }
    }

    .MuiOutlinedInput-notchedOutline {
      display: none;
    }
  }
`;
