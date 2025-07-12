import { css, keyframes } from '@emotion/css';

const NAV_HEIGHT = 80;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const locationCx = css`
  width: 100vw;
  margin-top: ${NAV_HEIGHT}px;
  height: 100vh;
  max-height: calc(100vh - ${NAV_HEIGHT}px);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  font-size: 1rem;
  font-weight: 700;
  color: rgb(0, 172, 240);

  .loader {
    animation: ${rotate} 0.5s linear infinite;
    margin-bottom: 1.5rem;
  }

  .info {
    text-align: center;
  }
`;

export const navigationCx = css`
  padding: 0 1rem;

  background: white;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.12);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 500;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: ${NAV_HEIGHT}px;

  .logo-wrapper {
    display: flex;
    height: 3.125rem;
    width: 6.875rem;

    > img {
      width: 100%;
      height: 100%;
    }
  }
`;
