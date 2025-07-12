import { css } from '@emotion/react';
import bgLogin from 'assets/img/background/bg-merchant-login.png';

export const registerCX = css`
  display: flex;
  flex: 1;
  position: relative;
  height: 100vh;

  .left-container {
    background-image: url(${bgLogin});
    background-size: cover;
    flex: 1;

    @media (max-width: 992px) {
      display: none;
    }
  }

  .right-container {
    display: flex;
    flex: 1;
    background: #ffffff;
    width: 100%;
    justify-content: center;
    align-items: center;
  }

  .inner-right-container {
    flex: 1;
    max-width: 32.5rem;
    padding: 0 1.25rem;
  }

  .logo-container {
    display: grid;
    justify-content: center;
    margin-bottom: 1.5rem;
  }

  .header {
    margin-bottom: 2rem;
    font-weight: 700;
    font-size: 1.5rem;
  }

  .google-btn {
    width: 100%;

    .google-icon {
      margin-right: 0.5rem;
    }
  }

  .field-group:not(:first-child) {
    margin-bottom: 1.5rem;
  }

  .counter {
    font-size: 0.75rem;
  }

  .back-to-google {
    margin: 1rem 0;
  }

  .MuiFormLabel-root {
    font-weight: bold;
    color: #404040;
  }

  .submit-btn {
    width: 100%;
    color: #ffffff;
    align-items: center;
    border-radius: 0.5rem;
  }

  .to-login {
    margin-top: 1rem;
  }

  .change-email {
    color: #00acf0;
    cursor: pointer;
  }

  a {
    color: #00acf0;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    pointer-events: auto;
    z-index: 10;
  }
`;
