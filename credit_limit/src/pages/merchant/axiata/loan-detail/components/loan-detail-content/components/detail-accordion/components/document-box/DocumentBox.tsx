import { FC } from 'react';
import Typography from '@material-ui/core/Typography';

import { DocumentIcon } from 'new-components/shapes';

import { docBoxCx } from '../../styles';

import { DocumentBoxProps } from './types';

const DocumentBox: FC<DocumentBoxProps> = ({ value, url }) => {
  const handleOnClick = () => {
    window.open(url, '_blank');
  };

  return (
    <div css={docBoxCx}>
      <div className='doc-label'>
        <DocumentIcon />
        <Typography variant='caption' className='doc-text'>
          {value}
        </Typography>
      </div>
      <Typography
        onClick={handleOnClick}
        className='action-text'
        variant='caption'
      >
        Lihat
      </Typography>
    </div>
  );
};

export default DocumentBox;
