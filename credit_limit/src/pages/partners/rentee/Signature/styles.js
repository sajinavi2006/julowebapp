import styled from "@emotion/styled";

export const SignatureContainer = styled.div`
  color: #5e5e5e;
  font-size: 14px;
  
  .layout-wrapper {
    height: 100%;
  }
`;

export const SignatureWrapper = styled.div`
  display:flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;

  button {
    font-size: 16px;
  }
`;

export const SignatureContent = styled.div`
  border-top: 2px solid #e0e0e0;
  border-bottom: 2px solid #e0e0e0;
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  height: 196px;
  justify-content: space-between;
  p {
    font-size: 12px;
    margin: 0;
  }
`;

export const SignatureClickDescription = styled.p`
  color: #00acf0;
  width: 140px;
  margin: auto !important;
  cursor: pointer;
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
  padding: 20px 10px;
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
    pointer-events: none;
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
`;
