import { css } from '@emotion/react';

export const backCameraUniversalCx = css`
  .cameraBack,
  .cameraViewBack,
  .cameraSensorBack,
  .cameraOutputBack,
  .webcam {
    position: fixed;
    left: calc(50% - 175px);
    margin-top: 50px;
    object-fit: cover;
  }

  .cameraTriggerContainerBack {
    color: white;
    font-size: 16px;
    border: none;
    text-align: center;
    position: fixed;
    bottom: 50px;
    width: 100%;
  }

  .cameraTriggerBack {
    width: 200px;
    background-color: black;
    color: white;
    font-size: 16px;
    border-radius: 30px;
    border: none;
    padding: 15px 20px;
    text-align: center;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.2);
    left: calc(50% - 100px);
  }

  .cameraRetryBack {
    font-size: 16px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.38;
    letter-spacing: normal;
    text-align: left;
    color: #ffffff;
  }
`;
