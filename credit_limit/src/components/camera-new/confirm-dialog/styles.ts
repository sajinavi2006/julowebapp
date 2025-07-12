import { css } from '@emotion/css';

export const confirmDialogCX = css`
  font-size: 16px !important;

  .MuiPaper-rounded {
    border-radius: 16px;
  }

  .MuiDialog-paper {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px;
    min-width: 328px;
    max-width: 350px;
  }

  .dialogContent {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 24px 16px;
  }

  .dialogTitle {
    font-weight: 600;
    color: #00acf0;
  }

  .dialogMessage {
    margin-top: 8px;
    margin-bottom: 16px;
    text-align: center;
  }

  .dialogButtons {
    display: flex;
    align-items: center;
    gap: 8px;
    align-self: stretch;
  }

  button {
    display: flex;
    padding: 12px 16px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    flex: 1 0 0;
    font-weight: 600;
    border-radius: 8px;
    border: 1px solid #00acf0;
    height: 100%;
  }

  .buttonClose {
    background-color: #ffffff;
    color: #00acf0;
  }

  .buttonOk {
    background-color: #00acf0;
    color: #ffffff;
  }
`;
