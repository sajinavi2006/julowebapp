import { FC } from 'react';
import { Typography } from '@material-ui/core';

import { descriptionTextCx } from './types';

const DescriptionText: FC = ({ children }) => (
  <Typography css={descriptionTextCx} variant='subtitle1'>
    {children}
  </Typography>
);

export default DescriptionText;
