import styled from "@emotion/styled";

export const PinVerficationWrapper = styled.div`
  text-align: center;
  color: #5e5e5e;
  .otp-input {
    border-bottom: 2px solid #e0e0e0;
    color: #5e5e5e;
  }

  .container {
    padding-top: 15px;
  }

  .otp-input:focus-visible {
    border-bottom: 2px solid #5e5e5e;
    caret-color: transparent;
  }

  .otp-input {
      width: 1.3rem !important;
  }

  input:not([value=""]){
    border-bottom: 0 !important;
  }

  .pin-forgot-password {
      margin-top: 45px;
    u {
      font-size: 12px;
      font-weight: bold;
    }
  }

  .pin-title {
    font-size: 16px;
    margin-bottom: 35px;
  }

  .pin-verification-confirmation-button {
    width: 210px;
    margin: auto;
    margin-top: 25px;
    padding: 12px;
    font-size: 12px;
  }
`;

export const LoanIdWrapper = styled.div`
  padding: 10px 20px;
  background-color: #eaf9ff;
  border-radius: 4px;
  width: 210px;
  margin: auto;
  margin-bottom: 10px;
  p,
  b {
    font-size: 14px;
    color: #5e5e5e;
    margin-bottom: 0;
  }
`;
