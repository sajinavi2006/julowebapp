import styled from '@emotion/styled';
import { makeStyles } from '@material-ui/core/styles';

const juloBlue = '#00acf0';

export const useStyles = makeStyles({
  root: {
    '& .MuiSvgIcon-root': {
      color: 'rgba(94, 94, 94, 0.65)',
    },
    '& .MuiPickersToolbar-toolbar': {
      backgroundColor: 'red',
    },
    '& .MuiInput-root': {
      color: '#5e5e5e',
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: '#e0e0e0',
    },
    '& .MuiInput-underline:after': {
      borderBottom: `1px solid ${juloBlue}`,
    },
    '& .MuiInput-underline.Mui-error:after': {
      borderBottom: '1px solid #f44336',
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
      border: '1px solid #e0e0e0',
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: juloBlue,
      },
    },
    '& .MuiInput-input.Mui-disabled': {
      color: 'rgba(0, 0, 0, 0.38)',
    },
  },
});

export const DatePickerContainer = styled.div`
  margin-bottom: 27px;
  position: relative;
`;

export const Error = styled.span`
  color: #f44336;
  font-size: 12px;
  position: absolute;
  left: 0;
  bottom: -20px;
`;
