import { css } from '@emotion/react';

export const errorTokenCx = css`
  padding: 0 1rem;

  background: linear-gradient(180deg, #00acf0 0%, #008ac0 100%);

  min-height: 100vh;
  min-height: 100dvh;

  display: flex;
  flex-direction: column;
  align-items: center;

  .logo {
    margin-top: 2.0625rem;
  }

  .error-token-content {
    width: 100%;
    max-width: 20.5rem;

    margin-top: 5.9375rem;
    padding: 1rem;

    border-radius: 1rem;

    .text-wrapper {
      text-align: center;
      .title {
        color: #00acf0;
        font-weight: bold;
        line-height: 1.5rem;
      }

      .description {
        margin-top: 0.5rem;

        color: #616161;
        font-size: 0.875rem;
        line-height: 1.375rem;
      }
    }

    .contact-btn {
      margin-top: 1rem;
    }
  }
`;
