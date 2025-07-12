import { useHistory, useLocation } from 'react-router-dom';
import { Typography } from '@material-ui/core';

import { Button } from 'new-components/elements';
import { useRGetMaxPlatformCheck } from 'repositories/merchant/loan';

import { loanListHeaderCx } from '../../styles';

export default function MainInfo() {
  const history = useHistory();
  const { pathname } = useLocation();
  const { refetch } = useRGetMaxPlatformCheck();

  const handleOnCreateButtonClicked = () => {
    refetch();

    const partner = pathname.split('/')[2];
    
    history.push(`/merchant/${partner}/loan/create`);
  };

  return (
    <div id='loan-list-main-info' css={loanListHeaderCx}>
      <div className='info'>
        <div className='title'>
          <Typography variant='h5'>Pinjaman</Typography>
        </div>
        <div className='description'>
          <Typography variant='subtitle2'>Daftar Pengajuan Pinjaman</Typography>
        </div>
      </div>
      <div>
        <Button
          onClick={handleOnCreateButtonClicked}
          style={{ padding: '6px 16px' }}
        >
          Ajukan Pinjaman Baru
        </Button>
      </div>
    </div>
  );
}
