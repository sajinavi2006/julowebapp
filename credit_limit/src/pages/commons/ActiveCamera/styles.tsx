import { css } from '@emotion/css';

export const cameraContainer = css`
  width: 100%;
`;

export const shutterButton = css`
  background-color: green;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  position: absolute;
  bottom: 0;
  margin-bottom: 30px;
  left: 50%;

  ::before {
    content: '';
    width: 120px;
    height: 120px;
    top: -10px;
    left: -10px;
    position: absolute;
    border: 2px dotted white;
    border-radius: 50%;
    box-sizing: border-box;
  }
`;

export const shutterButtonBorder = css`
  content: '';
  width: 100px;
  height: 100px;
  position: absolute;
  top: -5px;
  left: -5px;
  border: 2px dotted white;
  border-radius: 50%;
  box-sizing: border-box;
`;

export const livenessCam = css`
  x-dot-face-auto-capture-ui {
    transform: scale(2);

    svg {
      transform: scale(2);
    }
  }
`;
