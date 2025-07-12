import { Paper, Typography } from '@material-ui/core';

import Divider from 'components/Divider';
import { InfoIcon } from 'new-components/shapes';

import { alertCx, loanPaperCx, paperPaddingCx, loanCreationCx } from './styles';
import { CreationForm } from './components';

import BackButton from '../components/back-button';

const LoanCreation = () => {
  return (
    <div css={loanCreationCx} id='merchant-loan-detail'>
      <BackButton label='Kembali' />
      <Typography className='bold' variant='h5'>
        Ajukan Pinjaman Baru
      </Typography>
      <Paper square elevation={0} css={loanPaperCx}>
        <div css={paperPaddingCx}>
          <Typography className='title-text bold' variant='body1'>
            Isi Form
          </Typography>
          <Typography className='description-text bold' variant='caption'>
            <Typography className='next-text' variant='caption'>
              Selanjutnya:
            </Typography>{' '}
            Pengajuan Dalam Pengecekan
          </Typography>
        </div>

        <Divider />

        <div css={paperPaddingCx}>
          <div css={alertCx}>
            <InfoIcon className='info-icon' />
            <Typography variant='caption'>
              Isi form untuk mulai pengajuan pinjaman. Pastikan informasi yang
              kamu masukkan benar, ya.
            </Typography>
          </div>

          <CreationForm />
        </div>
      </Paper>
    </div>
  );
};

export default LoanCreation;
