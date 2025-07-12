import { css } from '@emotion/react';

export const stepperCx = css`
  display: flex;
  position: relative;
  margin: 15px 0;
`;

export const stepCx = css`
  height: 4px;
  flex-grow: 1;
  background-color: #ededed;
  margin: 0 5px;
  border-radius: 16px;

  &:first-of-type {
    margin-left: 0;
  }

  &:last-of-type {
    margin-right: 0;
  }
`;

export const activeStepCx = css`
  background-color: #00acf0;
`;

export const stepInfoCx = css`
  position: absolute;
  right: 0;
  top: 15px;
  color: #616161;
`;
