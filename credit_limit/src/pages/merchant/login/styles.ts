import { css } from '@emotion/react';
import bgLogin from 'assets/img/background/bg-merchant-login.png';

export const loginCX = css`
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

  .title {
    margin-bottom: 2rem;
    font-weight: 700;
    font-size: 1.5rem;
  }

  .field-group {
    margin-bottom: 1rem;
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

  .forgot-password {
    margin-top: 1rem;
    padding: 0.75rem 1rem;
    font-weight: 700;
    display: grid;
    justify-content: center;
  }

  .register {
    margin-top: 1rem;
  }

  a {
    color: #00acf0;
  }
`;
