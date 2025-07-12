import { forwardRef } from 'react';
import { DialogTransitionProps } from './types';
import { Slide } from '@material-ui/core';

const DialogTransition = forwardRef<HTMLDivElement, DialogTransitionProps>(
  (props, ref) => {
    return <Slide direction='up' ref={ref} {...props} />;
  },
);

export default DialogTransition;
