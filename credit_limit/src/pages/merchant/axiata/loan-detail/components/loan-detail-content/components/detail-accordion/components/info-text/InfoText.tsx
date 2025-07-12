import { FC } from 'react';
import { Typography } from '@material-ui/core';

import { infoTextCx } from '../../styles';
import DocumentBox from '../document-box';

import { InfoTextProps } from './types';

const InfoText: FC<InfoTextProps> = (props) => {
  const { label, value, type = 'text', url = '' } = props;
  
  return (
    <div css={infoTextCx}>
      {value && (
        <>
          <Typography variant='caption' className='label'>
            {label}
          </Typography>

          {type === 'text' ? (
            <Typography variant='subtitle2' className='value'>
              {String(value)}
            </Typography>
          ) : (
            <DocumentBox value={value as string} url={url} />
          )}
        </>
      )}
    </div>
  );
};

export default InfoText;
