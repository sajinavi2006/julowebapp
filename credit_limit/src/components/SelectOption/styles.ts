import MuiInputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import styled from '@emotion/styled';

interface Styled {
  error: boolean;
}

export const useStyles = makeStyles(() => ({
  formControl: {
    width: '100%',
  },
  select: {
    color: '#5e5e5e',
    '&:before': {
      // normal
      borderBottom: '1px solid #e0e0e0',
    },
    '&:after': {
      // focused
      borderBottom: `1px solid #00acf0`,
    },
    '&:hover:not(.Mui-disabled):not(.Mui-error):before': {
      // hover
      borderBottom: `1px solid #00acf0`,
    },
  },
}));

export const InputLabel = withStyles({
  root: {
    transform: 'scale(0.75)',
  },
})(MuiInputLabel);

export const SelectOptionContainer = styled.div<Styled>`
  margin-bottom: 27px;
  position: relative;
  width: 100%;

  ${(props) => props.error && {
    marginBottom: '6px'
  }}
`;

export const Error = styled.span`
  color: #f44336;
  font-size: 12px;
  position: relative;
  left: 0;
`;
