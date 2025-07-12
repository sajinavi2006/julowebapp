import { css } from '@emotion/css';

export const buttonCx = css`
  &.MuiButtonBase-root {
    padding: 0.75rem 1rem;
    min-width: 0;

    border-radius: 0.5rem;

    font-weight: 700;
    text-transform: none;

    line-height: 24px;

    transition: all 0.3s ease;

    &:disabled {
      cursor: not-allowed;
      pointer-events: all;
    }

    &[data-variant='primary'] {
      background-color: #1ea7e9;

      &:hover {
        background-color: #008ac0;
      }

      &:active {
        background-color: #006790;
      }

      &:disabled {
        background-color: #ededed;
        color: #9e9e9e;
      }
    }

    &[data-variant='secondary'] {
      border-color: #00acf0;
      color: #00acf0;

      &:hover {
        background-color: #b2e6fa;
      }

      &:active {
        background-color: #b2e6fa;
        border-color: #006790;
        color: #006790;
      }

      &:disabled {
        background-color: #ffffff;
        border-color: #e0e0e0;
        color: #c2c2c2;
      }
    }

    &[data-variant='tertiary'] {
      color: #00acf0;

      &:hover {
        background-color: #b2e6fa;
        color: #008ac0;
      }

      &:active {
        background-color: #b2e6fa;
        color: #006790;
      }

      &:disabled {
        color: #c2c2c2;
      }
    }
  }
`;
