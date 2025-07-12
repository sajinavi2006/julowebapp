import { css } from '@emotion/react';

import otpBackground from 'assets/img/partner/axiata/otp-background.png';

export const otpVerificationCx = css`
  background: url(${otpBackground});
  display: flex;
  flex-direction: column;

  .otp-verification-header {
    width: 100%;
    background: #fff;
    box-shadow: 0px 1px 16px 0px rgba(0, 0, 0, 0.12);
    height: 66px;
    display: flex;
    margin: 0 auto;
    padding: 1rem 18rem;
    align-items: center;

    @media (max-width: 992px) {
      padding: 1rem 2rem;
    }

    .arrow-icon {
      cursor: pointer;
    }

    p {
      color: #727272;
      margin-bottom: 0;
      margin-left: 14px;
      font-size: 16px;
      font-weight: 700;
    }
  }

  .otp-verification-body {
    width: 100%;
    height: 100%;
    max-width: 416px;
    min-width: 320px;
    min-height: calc(100vh - 8.125rem);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    margin-right: auto;
    margin-left: auto;

    position: relative;
    font-size: inherit;

    .otp-verification-title {
      p {
        text-align: center;
        color: #616161;
        font-size: 16px;
        margin: 0;
      }
    }

    .otp-verification-input {
      width: 100%;

      .otp-input-field {
        margin: 27px 0 14px 0;
      }

      .otp-timer {
        display: flex;
        justify-content: center;
        margin-bottom: 27px;

        .otp-badge {
          padding: 4px 8px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 100px;
          border: 1px solid #e0e0e0;
          background: #ededed;

          p {
            margin: 0;
            font-size: 10px;
            font-weight: 700;
            margin-left: 4px;
          }
        }
      }

      .otp-actions {
        width: 100%;
        text-align: center;

        .otp-resend-action {
          display: flex;
          justify-content: center;
          font-weight: 700;
          font-size: 0.875rem;

          p {
            margin: 0 0.5rem 0 0;
          }

          .resend-enabled {
          }

          a {
            cursor: pointer;
            color: #00acf0;

            &[aria-disabled='true'] {
              color: #9e9e9e;
              pointer-events: none;
              cursor: not-allowed;
            }
          }
        }

        button {
          margin-top: 27px;
        }
      }
    }

    .field-info {
      text-align: center;
    }
  }
`;
