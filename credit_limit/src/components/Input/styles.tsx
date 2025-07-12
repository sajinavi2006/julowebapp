import { css } from '@emotion/react';
import MuiTextField from '@material-ui/core/TextField';
import MuiOutlinedInput from '@material-ui/core/OutlinedInput';
import MuiInputLabel from '@material-ui/core/InputLabel';
import MuiInputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/core/styles';
import styled from '@emotion/styled';
import themeJ1 from 'themes/Partner/j1';

const juloBlue = '#00acf0';

const themeColor = themeJ1.colors;
const themeText = themeJ1.text;

interface IInputField {
  colorinput?: string;
  border?: string;
}

interface IInputContainer {
  error?: boolean;
}

export const TextField = withStyles({
  root: {
    '& .MuiInput-root': {
      color: themeText.primary,
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: themeColor.borderLight,
    },
    '& .MuiInput-underline:after': {
      borderBottom: `1px solid ${juloBlue}`,
    },
    '& .MuiInput-underline.Mui-error:after': {
      borderBottom: `1px solid ${themeColor.error}`,
    },
    '& .MuiInput-underline.Mui-disabled:before': {
      borderBottomStyle: 'solid',
    },
    '& .MuiInput-underline:hover:before': {
      borderBottom: `1px solid ${juloBlue}`,
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: `1px solid ${juloBlue}`,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: `1px solid ${themeColor.borderLight}`,
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: juloBlue,
      },
    },
  },
})(MuiTextField);

export const inputFieldCx = css`
  &.MuiInputBase-root {
    &:hover fieldset,
    &.Mui-focused fieldset {
      border: 1px solid ${themeColor.borderGreyTransparent};
    }
  }
`;

export const InputField = withStyles(() => ({
  root: {
    '& .MuiInputBase-input': {
      color: (props: IInputField) =>
        props?.colorinput ? props.colorinput : themeColor.white,
    },
    '& .MuiInputBase-root': {
      border: (props: IInputField) => props?.border,
    },
    '& .MuiInputBase-input.Mui-disabled': {
      color: themeText.primaryDisabled,
    },
    '& .MuiOutlinedInput-notchedOutline, & .MuiOutlinedInput-notchedOutline:hover, & .MuiOutlinedInput-notchedOutline:focus':
      {
        border: `1px solid ${themeColor.borderGreyTransparent}`,
      },
    '& .MuiOutlinedInput-input': {
      padding: '0px',
    },
  },
}))(MuiOutlinedInput);

export const InputLabel = withStyles({
  root: {
    transform: 'scale(0.75)',
  },
})(MuiInputLabel);

export const InputAdornment = withStyles({
  root: {
    '& .MuiInputBase-input:focus': {
      outline: 1,
    },
  },
})(MuiInputAdornment);

export const InputContainer = styled.div`
  width: 100%;
  margin-bottom: 27px;
  position: relative;

  // Hide arrow type=number
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }

  ${(props: IInputContainer) =>
    props.error && {
      marginBottom: '6px',
    }}
`;

export const HelperText = styled.span`
  color: #ffffff;
  font-size: 10px;
  position: relative;
  left: 0;
`;

export const Error = styled.span`
  color: ${themeColor.error};
  font-size: 10px;
  position: relative;
  left: 0;
`;
