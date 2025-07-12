import { css } from '@emotion/react';

export const titleCx = css`
  h2,
  h6 {
    padding-top: 0;
  }
  .modal-title {
    color: #00acf0;
    font-weight: 700;
    font-style: normal;
  }

  .icon-button {
    position: absolute;
    top: 9px;
    right: 10px;
  }
`;

export const contentCx = css`
  padding: 15px;
  background-color: #f5f5f5;
  height: 80%;
  overflow: scroll;
  position: relative;
  margin-bottom: 15px;
  margin: 0 20px;
  border-radius: 16px;
`;

export const actionCx = css`
  display: flex;
  flex-direction: column;
  padding: 8px 20px !important;
  gap: 15px;

  footer {
    span {
      color: #5e5e5e;
      font-size: 12px;
    }
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const checkboxCx = css`
  background-color: #ffffff;
  border-radius: 8px;

  .Mui-checked {
    color: #00acf0 !important;
  }

  .MuiFormControlLabel-root {
    margin: 0;
  }
`;

export const scrollerCx = css`
  display: flex;
  flex-direction: row;
  padding: 5px;
  background-color: #eaf0fe;
  border: 1px solid #83a7fa;
  border-radius: 100px;
  box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.16);
  position: absolute;
  bottom: 0px;
  justify-content: center;
  align-items: center;

  position: sticky;
  margin: auto;
  width: 140px;
  cursor: pointer;

  .text-see {
    font-size: 12px;
    color: #306cf7;
    margin-left: 4px;
  }

  .arrow {
    transform: rotate(-90deg);
  }
`;

export const successContentCx = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  min-width: 43rem;
`;
