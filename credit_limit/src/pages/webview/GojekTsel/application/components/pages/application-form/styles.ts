import { css } from '@emotion/react';

export const applicationFormCx = css`
  width: 100%;
  max-width: 54.75rem;
  margin: 0 auto;

  form {
    .field-group {
      margin-bottom: 1rem;

      input {
        &::placeholder {
          color: #e0e0e0;

          opacity: 1;
        }
      }

      .MuiInput-root {
        font-size: 0.875rem !important;
      }

      .MuiFormLabel-root {
        color: #616161;
        font-size: 0.75rem;
        font-weight: 700;
      }
    }
  }
`;
