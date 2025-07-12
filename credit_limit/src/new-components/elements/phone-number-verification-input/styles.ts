import { css } from '@emotion/react';

export const phoneNumberVerificationInputCx = css`
  .phone-number-verification {
    display: flex;
    align-items: end;

    .phone-number-verification-input {
      width: 100%;
      &.field-group {
        margin: 0 !important;
      }
    }

    .phone-number-verification-button {
      svg {
        margin-right: 0.5rem;
      }
    }

    .MuiButton-outlined {
      padding-top: 0.438rem;
      padding-bottom: 0.438rem;
    }

    .MuiButton-contained {
      padding-top: 0.563rem;
      padding-bottom: 0.563rem;
    }

    .MuiButtonBase-root {
      min-width: 9.375rem;
      margin-left: 1rem;
    }
  }
`;
