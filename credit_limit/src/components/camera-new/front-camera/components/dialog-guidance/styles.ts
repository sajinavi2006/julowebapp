import { css } from '@emotion/css';

export const KtpUploadGuidanceCx = css`
  border-radius: 24px 24px 0px 0px;
  background: #f3fcff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.08);
`;

export const SheetHeader = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 1rem;

  .toggleSheet {
    margin-top: 13.5px;
    margin-bottom: 7.88px;
  }

  .titleSheet {
    width: 100%;
    margin-bottom: 1rem;
    color: #5e5e5e;
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;

export const SheetBody = css`
  padding: 0px 50px;

  .imageGuidance {
    width: 100%;
    margin: 1rem 0px;
  }
  .sheetBodyContent > * {
    padding-bottom: 1rem;
    color: #5e5e5e;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    :first-child {
      font-size: 14px;
      font-weight: 600;
    }
  }
`;
