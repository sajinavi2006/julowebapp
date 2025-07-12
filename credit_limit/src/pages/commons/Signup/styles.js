import { css } from '@emotion/css';

export const inputCx = css`
  .MuiOutlinedInput-root {
    .MuiOutlinedInput-notchedOutline,
    .MuiOutlinedInput-notchedOutline:hover,
    & .MuiOutlinedInput-notchedOutline:focus {
      border: 1px solid #ffffff;
    }

    &.Mui-error {
      border: 1px solid #F44336;
    }

    &.Mui-error fieldset {
      border: none;
    }
  }

  .Mui-focused {
    border: 1px solid #ffffff;
    outline: none;
  }

  .input-error {
    color: #ffffff;
  }
`;
