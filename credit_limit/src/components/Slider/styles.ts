import styled from '@emotion/styled';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

export const StyledSliderContainer = styled.div`
  width: 100%;

  input[type='range'] {
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 20px;
      width: 20px;
      border-radius: 50%;
      background: #ffffff;
      cursor: ew-resize;
      box-shadow: 0 0 2px 0 #555;
      transition: background 0.3s ease-in-out;
    }

    &::-moz-range-thumb {
      -webkit-appearance: none;
      height: 20px;
      width: 20px;
      border-radius: 50%;
      background: #ffffff;
      cursor: ew-resize;
      box-shadow: 0 0 2px 0 #555;
      transition: background 0.3s ease-in-out;
    }

    &::-ms-thumb {
      -webkit-appearance: none;
      height: 20px;
      width: 20px;
      border-radius: 50%;
      background: #ffffff;
      cursor: ew-resize;
      box-shadow: 0 0 2px 0 #555;
      transition: background 0.3s ease-in-out;
    }

    &::-webkit-slider-thumb:hover {
      background: #d4d4d4;
    }

    &::-moz-range-thumb:hover {
      background: #d4d4d4;
    }

    &::-ms-thumb:hover {
      background: #d4d4d4;
    }

    &::-webkit-slider-runnable-track {
      -webkit-appearance: none;
      box-shadow: none;
      border: none;
      background: transparent;
    }

    &::-moz-range-track {
      -webkit-appearance: none;
      box-shadow: none;
      border: none;
      background: transparent;
    }

    &::-ms-track {
      -webkit-appearance: none;
      box-shadow: none;
      border: none;
      background: transparent;
    }
  }
`;

export const StyledSlider = styled.input<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
>`
  -webkit-appearance: none;
  margin-right: 15px;
  width: 100%;
  height: 10px;
  background: #f0f0f0;
  border-radius: 5px;
  background-image: linear-gradient(to right, #73d7fe, #00acf0);
  background-size: ${({ value = 0, max = 0 }) =>
      (Number(value) / Number(max)) * 100}%
    100%;
  background-repeat: no-repeat;
`;
