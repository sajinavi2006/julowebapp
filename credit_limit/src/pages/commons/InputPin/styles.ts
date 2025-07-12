import { css } from '@emotion/css';

export const inputPinCx = css`
  .g-pin-title {
    margin-top: 40px;
    padding-bottom: 30px;
    display: flex;
    align-items: center;
    &__txt {
      display: block;
      text-align: center;
      font-size: 18px;
      padding-left: 35px;
    }
  }

  .g-pin-body-white {
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 100vh;
    padding-bottom: 30px;
    color: #212529;
  }

  .g-back-trigger {
    cursor: pointer;
    position: absolute;
    left: 25px;
    > img {
      width: 20px;
    }
  }

  .g-auth-form-wrapper {
    margin-top: 20vh;
  }

  .g-pin-error-txt {
    color: #db4d3d;
  }
`;

export const inputStyle = css`
  border: none;
  border-bottom: 1px solid #e5e5e5;
  color: #000000;
  font-size: 28px;
  font-weight: bold;
`;
