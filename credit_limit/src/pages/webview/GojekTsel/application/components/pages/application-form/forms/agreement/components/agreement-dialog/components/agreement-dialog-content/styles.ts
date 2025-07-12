import { css } from '@emotion/react';

export const agreementDialogContentCx = css`
  padding: 1rem;
  margin-bottom: 4.625rem;
  border-radius: 0.5rem;
  background-color: #f5f5f5;

  color: #404040;

  line-height: 22px;

  .agreement-dialog-text {
    font-size: 0.875rem !important;
    a {
      color: #03a9f4;
    }
  }

  .scroll-to-bottom {
    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    left: 50%;
    bottom: 15%;

    width: 9.375rem;
    background-color: #eaf0fe;
    border-radius: 0.5rem;
    border: 1px solid #83a7fa;

    color: #2656c6;

    transform: translateX(-50%);

    cursor: pointer;
    user-select: none;
    box-shadow: 0 0.25rem 1.5rem 0 rgba(0, 0, 0, 0.16);

    span {
      margin-left: 0.25rem;

      font-size: 0.75rem !important;
      font-weight: 700;
    }
  }
`;
