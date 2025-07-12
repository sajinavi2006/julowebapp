import { css } from '@emotion/react';

export const loadingCx = css`
  width: 100%;
  height: 100vh;
  height: 100dvh;

  .loading-header {
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0.875rem 0;

    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.12);
  }

  .loading-content {
    height: 100%;

    padding-top: 9.0625rem;
    margin: 0 auto;
    max-width: 12.875rem;

    text-align: center;

    display: flex;
    flex-direction: column;

    align-items: center;
    color: #00acf0;

    .loader {
      svg {
        color: #00acf0;
      }
    }

    .description {
      font-weight: bold;
      margin-top: 1.5rem;
    }
  }
`;
