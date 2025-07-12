import { css } from '@emotion/react';

export const otpInputCx = css`
  align-items: center;

  .otp-container {
    .otp-input-container {
      &:not(:last-of-type) {
        margin-right: 0.5rem;
      }

      .otp-input {
        width: 2.5rem !important;
        font-size: 0.875rem;
        height: 2.5rem;
        border-radius: 0.5rem;
        background-color: #fff;
        border: 1px solid #e0e0e0;
        margin: 0;
        color: #181818;

        &.otp-input-error {
          border: 1px solid #db4d3d;
        }

        &:focus {
          border-color: #66cdf6;
        }
      }
    }
  }
`;
