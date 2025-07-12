import { css } from '@emotion/react';

export const limitBannerCx = css`
  position: relative;
  overflow: hidden;

  padding: 1rem;

  width: 100%;
  height: 5.25rem;

  border-radius: 0.5rem;

  margin-bottom: 1rem;

  .limit-bg {
    z-index: 0;
    user-select: none;
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .banner-text {
    position: relative;
    z-index: 1;

    color: white;

    display: flex;
    flex-direction: column;
    justify-content: center;

    .label {
      font-size: 0.625rem;
      font-weight: bold;
      line-height: 0.9375rem;
    }

    .limit {
      font-size: 1.5rem;
      font-weight: bold;
      line-height: 2rem;
    }
  }
`;
