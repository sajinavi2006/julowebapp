import { css } from '@emotion/css';
import CermatiBackground from 'assets/img/background/bg-cermati_auth.png';

export const createPinContainerStyle = css`
  background: url(${CermatiBackground});
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
  padding-bottom: 30px;
  color: #fff;

  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
`;

export const backImageStyle = css`
  cursor: pointer;
  position: absolute;
  left: 25px;
  img {
    width: 20px;
  }
`;

export const createPinInputStyle = css`
  background-color: transparent !important;
  width: 2.1rem !important;
  height: 2.5rem;
  margin: 0 0.3rem;
  font-size: 1.8rem;
  border: none;
  border-bottom: 2px solid #fff;
  color: #fff;
  font-weight: 600;

  &:focus-visible {
    outline: none !important;
  }
`;
