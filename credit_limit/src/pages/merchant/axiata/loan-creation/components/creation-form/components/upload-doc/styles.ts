import { css } from '@emotion/react';

export const uploadDocCx = css`
  .info-text {
    color: #616161;
    font-size: 10px;
    margin-bottom: 0.5rem;
  }

  .margin-right-10 {
    margin-right: 10px;
  }

  .margin-bottom-10 {
    margin-bottom: 10px;
  }
`;

export const uploadBoxCx = (isError: boolean) => css`
  height: 120px;
  border: 2px dashed ${isError ? '#db4d3d' : '#66cdf6'};
  border-radius: 8px;
  background-color: #b2e6fa;
  color: #006790;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;

  input {
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }
`;

export const uploadedBoxCx = (isError: boolean) => css`
  height: 120px;
  border: 1px solid ${isError ? '#db4d3d' : '#e0e0e0'};
  border-radius: 8px;
  background-color: #f5f5f5;
  color: #404040;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;

  .remove-button {
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
  }
`;
