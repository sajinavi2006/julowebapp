import { css } from '@emotion/css';

export const overlayCx = css`
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 9999999999;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;

  .loading-img {
    width: 100px;
    height: 100px;
  }
`;
