import { css } from '@emotion/react';

export const pinInputCx = css`
  align-items: center;

  .field-label {
    margin-bottom: 0;
  }

  .field-info {
    padding: 0 1rem;
    text-align: center;
    font-size: 0.625rem;
    font-weight: 700;

    margin-top: 1.5rem;
  }

  .pin-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 1.5rem;

    .pin-input-container {
      &:not(:last-of-type) {
        margin-right: 1.5rem;
      }

      .pin-input {
        width: 1.5rem !important;
        font-size: 0.0625rem;
        height: 1.5rem;
        border-radius: 1.5rem;
        background-color: #fff;
        border: 1px solid #e0e0e0;
        margin: 0;
        color: transparent;
        caret-color: transparent;

        &.pin-input[value|=''] {
          background-color: transparent;
        }

        &.pin-input-error {
          border: 1px solid #db4d3d;
          background-color: #db4d3d;
        }

        &.pin-input:focus:not([value='']) {
          border: 2px solid #392355;
        }

        &.pin-input:disabled {
          background-color: #9e9e9e;
        }
      }
    }
  }
`;
