import { FC } from 'react';
import { Typography } from '@material-ui/core';

import { titleTextCx } from './types';

const TitleText: FC = ({ children }) => (
  <Typography css={titleTextCx} variant='subtitle1'>
    {children}
  </Typography>
);

export default TitleText;
