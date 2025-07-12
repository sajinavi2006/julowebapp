import { css } from '@emotion/css';

export const camContainer = css`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  background: #ffffff;

  .webcamImg > * {
    border-radius: 24px;
  }

  button {
    border-radius: 8px;
    min-height: 48px;
    font-weight: bold;
  }

  .rotateButton {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    width: 143px;

    .iconRotateButton {
      width: 20px;
      height: 20px;
    }
  }

  .buttonOutline {
    background: white;
    border: 1px solid #00acf0;
    color: #00acf0;
  }

  .camFooterContainer {
    align-items: end;
    padding: 0px 16px;
    bottom: 10vh;
    position: fixed;
  }
`;

export const defaultCenter = css`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  flex: 1;
`;

export const backCameraCx = css`
  width: 100%;
  color: #ffffff;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 80px;
`;

export const camWrapper = css`
  justify-content: center;
  gap: 27px;
`;

export const camHeaderInstruction = css`
  color: #306cf7;
  background: #eaf0fe;
  border: solid 0.0625rem;
  border-color: #83a7fa;
  border-radius: 16px;
  padding: 4px 8px;
  font-weight: bold;
  font-size: 14px;
  text-align: center;
`;

export const wrapperRotateButton = css`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 120px;
  padding: 0px 16px;
`;

export const wrapperImageCx = css`
  text-align: center;
`;

export const webcamCx = css`
  border-radius: 20px;
  object-fit: cover;
`;

export const wrapperWebcamCx = (image: string) => css`
  display: inline-flex;
  position: relative;
  text-align: center;

  :after {
    content: '';
    display: block;
    width: 280px;
    height: 160px;
    background-image: url(${image});
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
  }
`;

export const photoResult = (h: number, w: number, rotDeg: number) => css`
  height: ${h}px;
  width: ${w}px;
  transform: ${(rotDeg / 90) % 2 ? 'translate(0%, 30%)' : ''} rotate(${rotDeg}deg);
  border-radius: 17px;
  object-fit: cover;
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

export const wrapperShutter = css`
`;
