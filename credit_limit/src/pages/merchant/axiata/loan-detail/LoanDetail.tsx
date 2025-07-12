import { useHistory, useLocation, useParams } from 'react-router-dom';
import { Typography, Paper } from '@material-ui/core';

import Divider from 'components/Divider';
import { Chevron } from 'new-components/shapes';
import { useRGetLoan } from 'repositories/merchant/loan';

import { useSnackbar } from '../components';

import LoanDetailHeader from './components/loan-detail-header';
import LoanDetailContent from './components/loan-detail-content';
import { loanDetailCx, loanPaperCx } from './styles';

const LoanDetail = () => {

  const history = useHistory();
  const { pathname } = useLocation();
  const partner = pathname.split('/')[2];

  const { setMessage } = useSnackbar();

  const handleOnButtonClick = () => {
    history.push(`/merchant/${partner}/`);
  };

  const { loanXid } = useParams<{ loanXid: string }>();

  const { data } = useRGetLoan({
    loanXid,
    enabled: true,
    onError: (err) => {
      const statusCode = err.payload?.statusCode;
      const errorMessage = err.payload?.message || '';

      switch (statusCode) {
        case 404:
          setMessage(errorMessage);

          history.push(`/merchant/${partner}/`);
          break;
        default:
          console.error(err);
          break;
      }
    },
  });

  const loanData = data?.data;

  return (
    <div css={loanDetailCx} id='merchant-loan-detail'>
      <div onClick={handleOnButtonClick} className='header-container'>
        <Chevron className='back-icon' fill='#00ACF0' />
        <Typography variant='subtitle1' className='title-text'>
          Pinjaman
        </Typography>
      </div>
      <Typography className='loan-detail-title' variant='h5'>
        Proses Pengajuan Pinjaman
      </Typography>

      {loanData && (
        <Paper css={loanPaperCx} elevation={0}>
          <LoanDetailHeader data={loanData} />
          <Divider />
          <LoanDetailContent data={loanData} />
        </Paper>
      )}
    </div>
  );
};

export default LoanDetail;
