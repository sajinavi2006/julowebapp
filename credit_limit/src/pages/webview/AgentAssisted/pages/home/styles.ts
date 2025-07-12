import { css } from '@emotion/react';

export const homeCx = css`
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

  .home-content {
    width: 100%;
    max-width: 20.5rem;

    margin-top: 5.9375rem;
    padding: 1rem;

    border-radius: 0.5rem;

    .text-wrapper {
      .welcome-text {
        display: flex;
        flex-direction: column;

        color: #00acf0;
        font-weight: bold;
        line-height: 1.5rem;
      }

      .description {
        margin-top: 0.5rem;

        color: #616161;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.375rem;
      }
    }

    .create-pin-btn {
      margin-top: 1rem;
    }

    footer {
      margin-top: 1.5rem;
      padding: 0.5rem;

      display: flex;
      justify-content: center;
      align-items: center;

      color: #404040;
      font-size: 0.75rem;
      font-weight: bold;
      line-height: 1.0625rem;

      > :not(:last-child) {
        margin-right: 0.5rem;
      }
    }
  }
`;
