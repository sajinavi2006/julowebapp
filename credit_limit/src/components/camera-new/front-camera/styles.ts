import { css } from '@emotion/css';

export const frontCameraContainer = (maxW: number) => css`
  background: #ffffff;
  color: #ffffff;
  width: 100%;
  max-width: ${maxW}px;
`;

export const frontCameraCx = css`
  height: 100vh;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 80px;

  button {
    display: flex;
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #00acf0;
    border-radius: 8px;
    background-color: #00acf0;
    color: #ffffff;
    font-weight: 600;
    justify-content: center;
    line-height: 24px;
  }

  .leftActionButton {
    margin-right: 4px;
  }

  .rightActionButton {
    margin-left: 4px;
  }

  .buttonOutline {
    background: white;
    border: 1px solid #00acf0;
    color: #00acf0;
  }

  .camHeaderInstruction {
    color: #306cf7;
    background: #eaf0fe;
    border: solid 1px;
    border-color: #83a7fa;
    border-radius: 15px;
    padding: 4px 8px;
    align-self: center;
    text-align: center;
    font-weight: bold;
    margin-bottom: 12px;
  }

  .camFooterContainer {
    align-items: end;
    padding: 0px 16px;
    bottom: 10vh;
    position: fixed;
  }

  .buttonContainer {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    flex-direction: row;
  }

  .camGuide {
    display: flex;
    justify-content: center;
    color: #000000;
    background: #b2e6fa;
    border-radius: 8px;
    padding: 16px;
    margin: 40px 0px;
    align-self: center;
    text-align: center;
    font-size: 14px;
  }

  .cameraContainer {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .shutterContainer {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .shutter {
    max-width: 80px;
    max-height: 80px;
    cursor: pointer;
  }

  .dialogCamera {
    position: absolute;
  }
`;

export const wrapperActionButton = css`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  width: 100%;
  gap: 8px;
  padding: 12px 0px;

  .leftActionButton,
  .rightActionButton {
    padding: 12px 16px;
  }
`;

export const wrapperCamera = css`
  display: flex;
  position: relative;
  justify-content: center;
  overflow: hidden;
  width: 100%;

  .webcam,
  .preview {
    border: 1px solid white;
    object-fit: cover;
    transform: scaleX(-1);
  }

  .frameCamera {
    /* display: block; */
    position: absolute;
  }
`;
