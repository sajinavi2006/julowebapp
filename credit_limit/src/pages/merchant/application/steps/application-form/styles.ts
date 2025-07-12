import { css } from '@emotion/react';

export const applicationFormCx = css`
  height: 100%;

  .application-form-background {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;

    width: 100%;
    height: 100%;

    pointer-events: none;

    img {
      width: 100%;
      height: 400px;

      object-fit: cover;
    }
  }

  .application-form-fields {
    width: 100%;
    max-width: 54.75rem;
    padding-top: 2.875rem;
    margin: 0 auto;

    .application-header {
      margin-bottom: 1.75rem;

      color: #fff;

      .title {
        margin: 0;

        font-weight: 700;
        font-size: 1.5rem;

        line-height: 2rem;
      }
      .description {
        margin: 0;

        line-height: 1.5rem;
      }
    }

    .dob-datepicker {
      .MuiInputBase-root {
        position: relative;
        padding: 0;

        input[type='date'] {
          padding: 0.75rem;
        }

        input[type='date']::-webkit-calendar-picker-indicator {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: auto;
          height: auto;
          color: transparent;
          background: transparent;
        }
      }
    }
  }

  form {
    display: inline-block;

    width: 100%;
    background: #fff;
    border-radius: 1rem;
    padding: 3.5rem;

    .field-group {
      margin-bottom: 1.5rem;
      font-size: 0.75rem;

      input {
        &::placeholder {
          color: #e0e0e0;

          opacity: 1;
        }
      }

      .MuiFormLabel-root {
        color: #00acf0;
        font-size: 0.75rem;
        font-weight: 700;
      }

      .MuiRadio-colorPrimary.Mui-checked {
        color: #00acf0;
      }
    }

    .input-select {
      .MuiInputBase-root {
        margin-top: 0;
        border: 1px solid #e0e0e0;
        border-radius: 0.5rem;
        &::before,
        &::after {
          display: none;
        }
        .MuiSelect-select {
          padding-top: 0.75rem;
          padding-bottom: 0.75rem;
          padding-left: 0.75rem;

          div {
            color: #e0e0e0;
            opacity: 1;
          }
          &:focus {
            background-color: transparent;
          }
        }
        &.Mui-focused {
          .MuiSelect-root {
            border-color: #66cdf6;
          }
        }
        &.Mui-disabled {
          cursor: not-allowed;
          background-color: #ededed;
          border-color: #c2c2c2;
          color: #757575;
          .MuiSelect-select {
            color: inherit;
            cursor: inherit;
          }
          input {
            cursor: inherit;
            color: inherit;
          }
        }
        &.Mui-error {
          border-color: #db4d3d;
        }
        .MuiOutlinedInput-notchedOutline {
          display: none;
        }
        input {
          top: 0;
          background-color: transparent;
          padding-left: 0.75rem;
          border: 0;
          font-size: 0.875rem;
          color: #757575;
          opacity: 1;
        }
        &[data-filled='true'] {
          input {
            opacity: 0;
          }
        }
      }
    }

    .radio-input {
      .MuiTypography-root {
        font-weight: 400;
        font-size: 0.875rem;
        color: #404040;
      }
    }
  }
`;
