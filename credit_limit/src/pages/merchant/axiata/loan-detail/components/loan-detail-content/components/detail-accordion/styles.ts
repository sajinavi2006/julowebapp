import { css } from '@emotion/react';

export const loanAccordionCx = css`
  .MuiAccordionDetails-root {
    display: block;
    padding: 0px 16px 16px;
  }
  .MuiAccordionSummary-content {
    margin: 0;
  }
  .MuiAccordionSummary-content.Mui-expanded {
    margin: 0;
  }
`;

export const infoTextCx = css`
  display: block;

  .label {
    color: #757575;
    line-height: 3;
    font-weight: 700;
  }

  .value {
    color: #181818;
    font-weight: 700;
  }
`;

export const summaryTitleCx = css`
  color: #757575;
  font-weight: 700 !important;
`;

export const detailContainerCx = css`
  display: flex;
  flex-direction: column;

  .date {
    color: #757575;
    margin-bottom: 10px;
  }

  .info-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-row-gap: 10px;
    grid-column-gap: 25px;
  }
`;

export const docBoxCx = css`
  display: grid;
  grid-template-columns: repeat(2, auto);
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #f5f5f5;
  padding: 5px 10px;
  gap: 10px;

  .doc-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .doc-text {
    color: #404040;
    margin-left: 5px;
  }

  .action-text {
    font-weight: 700;
    color: #00acf0;
    align-self: center;
    cursor: pointer;
  }
`;
