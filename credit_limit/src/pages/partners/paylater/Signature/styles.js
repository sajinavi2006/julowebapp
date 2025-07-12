import styled from '@emotion/styled';

export const SignatureContainer = styled.div`
  color: #5e5e5e;
  font-size: 14px;

  .layout-wrapper {
    padding-top: 1px !important;
    height: 100%;
  }
`;

export const SignatureWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;

  button {
    font-size: 16px;
  }
`;

export const SignatureDesc = styled.p`
  font-weight: bold;
  color: #5e5e5e;
`;

export const SignatureHeaderDivider = styled.div`
  border-top: 1px solid #e0e0e0;
  margin-left: -1.5rem;
  margin-right: -1.5rem;
  margin-bottom: 16px;
`;

export const SignatureContent = styled.div`
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  height: 196px;
  justify-content: space-between;
  p {
    font-size: 14px;
    margin: 0;
  }
`;

export const SignatureClickDescription = styled.p`
  color: #00acf0;
  width: 156px;
  margin: auto !important;
  cursor: pointer;
  font-weight: 700;
`;

export const SignatureBoxWrapper = styled.div`
  width: 100%;
  max-height: 93px;
  img {
    height: 100%;
  }
`;

export const DialogWrapper = styled.div`
  width: 100%;
  color: #5e5e5e;

  .dialog-clear-button {
    border-right: 2px solid #e0e0e0;
    border-left: 2px solid #e0e0e0;
  }

  .dialog-save-button {
    color: #00acf0;
  }

  .dialog-disable-button {
    color: rgba(94, 94, 94, 0.65) !important;
  }
`;

export const DialogHeader = styled.p`
  margin: 0;
  padding: 10px;
  border-bottom: 2px solid #e0e0e0;
  text-align: center;
  font-size: 16px;
`;

export const DialogContent = styled.div`
  position: relative;
  font-size: 12px;
  color: rgba(94, 94, 94, 0.65);
  text-align: center;

  p {
    height: 13%;
    overflow: auto;
    margin: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;

export const DialogFooterWrapper = styled.div`
  border-top: 2px solid #e0e0e0;
  display: flex;
  flex-direction: row;
  width: 100%;
`;
export const DialogButton = styled.p`
  padding: 10px;
  text-align: center;
  margin: 0;
  width: 33.3%;
  font-size: 12px;
`;

export const SignatureCanvasBox = styled.div`
  width: 100%;
  display: flex;
`;
