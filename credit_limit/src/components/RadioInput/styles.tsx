import React from 'react';
import MuiInputLabel from '@material-ui/core/InputLabel';
import MuiRadio, { RadioProps } from '@material-ui/core/Radio';
import { withStyles } from '@material-ui/core/styles';
import styled from '@emotion/styled';

interface IRadio {
    color?: string
}

export const Radio = withStyles({
  root: {
    '&$checked': {
      color: (props: IRadio) => props.color || '#00acf0',
    },
  },
  checked: {},
})((props: RadioProps) => <MuiRadio color='default' {...props} />);

export const InputLabel = withStyles({
  root: {
    transform: 'scale(0.75)',
  },
})(MuiInputLabel);

export const RadioInputContainer = styled.div`
    margin-bottom: 25px;
    label {
      margin-bottom: 0;
    }
`;

export const Error = styled.p`
  position: absolute;
  width: 100%;
  color: #ff4747;
  font-size: 12px;
  margin: 0;
  padding-top: 5px;
`;
