import { css } from '@emotion/css';

const SCALE_VAR = [2, 1.75, 1.5];

export const livenessCameraCX = (
  isMobile: boolean,
  minW: number,
  maxW: number,
) => css`
  display: flex;
  justify-content: center;
  background: #ffffff;
  height: 100%;
  width: 100%;

  .webcamImg > * {
    border-radius: 24px;
  }

  button {
    display: flex;
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #00acf0;
    border-radius: 8px;
    background-color: #00acf0;
    color: #ffffff;
    font-weight: 600;

    :disabled {
      border: none;
      background-color: #ededed;
      color: #9e9e9e;
    }
  }

  .livenessGuideContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 12px 16px;
    height: 100%;
    margin-top: auto;
  }

  .livenessGuideImageContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .guideContainer {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .livenessGuideImage {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 193px;
    max-height: 204px;
    margin-top: 50%;
  }

  .livenessGuide {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: justify;
    border-radius: 8px;
    padding: 16px;
    color: #000000;
    background-color: #b2e6fa;
    margin-top: 65px;
    width: 100%;
    font-size: 14px !important;
    max-height: 98px;
  }

  .buttonContinueToCamera {
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: stretch;
    margin-top: 94px;
    max-height: 48px;
  }

  .defaultCenter {
    display: flex;
    justify-content: center;
  }

  .cameraContainer {
    display: flex;
    justify-content: center;
  }

  .livenessContent {
    max-width: ${maxW}px;
    min-width: ${minW}px;
    width: 100%;
    color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .buttonContinue {
    position: absolute;
    bottom: 32px;
    width: 90%;
    justify-content: center;
    align-items: center;
    align-self: stretch;
  }

  .timer {
    position: absolute;
    top: 72%;
    right: 5%;
    font-size: 72px;
    font-weight: bold;
    text-align: center;
  }

  .smileFace {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
  }

  @media (max-height: 43.75rem) {
    .smileFace {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: scale(${isMobile ? 0.5 : SCALE_VAR[1]});
      -webkit-transform: scale(${isMobile ? 0.5 : SCALE_VAR[1]});
      -moz-transform: scale(${isMobile ? 0.5 : SCALE_VAR[1]});
      -o-transform: scale(${isMobile ? 0.5 : SCALE_VAR[1]});
      transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
    }
  }

  .fadeInAndOut {
    animation: fade 3s infinite;
  }

  @keyframes fade {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  x-dot-face-auto-capture-ui {
    transform: scale(${isMobile ? 1 : SCALE_VAR[0]});
    padding: 10px;
    margin-top: ${isMobile ? '-10px' : '0px'};
  }

  #x-dot-face-auto-capture-ui {
    /** for overlay */
    > div.sc-gKsecS {
      display: none;
    }

    /** for circle */
    > div.sc-pGaPU {
      display: flex;
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
      width: 328px;
      height: 328px;
    }
    
    /** for text container */
    > div.sc-iBPTVF,
    div.sc-bdfCDU {
      margin-top: 4rem;
      top: 5%;
      height: auto;
      bottom: unset;

      /** for text wrapper */
      div.sc-fubDmA,
      .div.sc-dlfmHC {
        white-space: normal;
      }
    }
  }

  .smile-placeholder {
    position: absolute;
    display: flex;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    width: 328px;
    height: 328px;
  }
`;
