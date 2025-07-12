import { Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import { Chevron } from 'new-components/shapes';

import { BackButtonProps } from './types';
import { backButtonCx } from './styles';

const BackButton = (props: BackButtonProps) => {
  const { label } = props;

  const history = useHistory();

  return (
    <div onClick={() => history.goBack()} css={backButtonCx}>
      <Chevron className='back-icon' fill='#00ACF0' />
      <Typography variant='subtitle1' className='back-label'>
        {label}
      </Typography>
    </div>
  );
};

export default BackButton;
