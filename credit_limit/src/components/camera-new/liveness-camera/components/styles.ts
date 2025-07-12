import { css } from '@emotion/css';

export const app = css`
  font-family: Nunito !important;
  font-size: 100%;
  line-height: 1.5;
  color: #404354;
  display: flex;
  flex-flow: column;
  align-items: center;
  text-align: center;
`;

export const container = css`
  width: 100%;
  height: 100%;
  position: relative;
  #x-dot-face-auto-capture {
    > div {
      display: flex;
      justify-content: center;
    }
    video {
      width: inherit;
      height: 100vh;
    }
  }

  img {
    max-width: 100%;
  }
`;

export const primary = (disabled?: boolean) => css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375em;
  margin: 0 auto;
  padding: 0.625em 1em;
  background: #00bfb2;
  cursor: ${disabled ? `not-allowed` : `default`};
  color: ${disabled ? `grey` : `white`};
  background-color: ${disabled ? `lightgrey` : `null`};
  border: 0;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  font-family: Montserrat, Arial, sans-serif;
  font-weight: 600;
  font-size: 1rem;
  margin: 0.5rem;
`;
