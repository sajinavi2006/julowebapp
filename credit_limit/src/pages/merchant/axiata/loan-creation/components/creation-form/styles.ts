import { css } from '@emotion/react';

export const creationFormCx = css`
  display: grid;
  gap: 15px;

  .field-label {
    font-size: 12px !important;
    font-weight: 700;
  }

  .MuiInputBase-root input {
    color: #181818;
  }

  .MuiChip-labelSmall {
    padding-left: 5px;
    padding-right: 5px;
  }

  .MuiChip-label {
    font-size: 10px;
  }

  .MuiChip-sizeSmall {
    height: 15px;
  }

  .MuiChip-root {
    margin-left: 5px;
  }

  .MuiFormLabel-root {
    color: #404040;
  }

  .two-rows {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
  }
`;

export const selectOptionCx = css`
  .MuiInputLabel-root {
    font-size: 12px !important;
    color: #404040;
    font-weight: 700;
  }

  .MuiInputLabel-formControl {
    transform: none;
  }

  .MuiOutlinedInput-root {
    border-radius: 0.5rem;
  }

  .MuiSelect-select.MuiSelect-select {
    border-radius: 0.5rem;
    padding: 0.75rem;
    padding-right: 24px;
  }

  .MuiOutlinedInput-notchedOutline {
    border: 1px solid #e0e0e0;
  }

  .MuiInputBase-input.Mui-disabled {
    background-color: #ededed;
  }

  .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline {
    border-color: #e0e0e0;
  }

  .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
    border-color: #e0e0e0;
  }

  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border: 1px solid #66cdf6;
  }

  fieldset {
    legend {
      max-width: 0;
    }
  }

  .MuiSelect-select:focus {
    background-color: inherit;
  }
`;
