import { css } from '@emotion/css';

export const actionItemMenu = css`
  :hover {
    transform: scale(0.9);
  }
`;

export const imgChecklist = (value: boolean) => css`
  position: absolute;
  top: -5px;
  left: -5px;
  visibility: ${!value && 'hidden'};
`;

export const cardHome = css`
  height: 50vw !important;
  max-height: 250px !important;
  min-height: 175px !important;
`;
