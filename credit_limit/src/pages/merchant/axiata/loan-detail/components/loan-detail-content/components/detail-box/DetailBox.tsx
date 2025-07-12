import { useMemo } from 'react';
import Typography from '@material-ui/core/Typography';

import formatMoney from '@julofinance/web-helpers/dist/string/formatMoney';

import { LoanDetailContentProps } from '../../types';

import { detailBoxCx } from './styles';


export const DetailBox: React.FC<LoanDetailContentProps> = (props) => {
  const { data } = props;
  
  const loanBoxInfo = useMemo(
    () => [
      {
        label: 'Jumlah Pinjaman',
        value: data.loanAmount && formatMoney(data.loanAmount),
      },
      {
        label: 'Tagihan',
        value: data.installmentNumber && `${data.installmentNumber}x`,
      },
      { label: 'Tenor', value: data.loanDuration && `${data.loanDuration} Hari` },
      { label: 'Bunga', value: data.interestRate && `${data.interestRate}%` },
      {
        label: 'Biaya Provisi',
        value: data.provisionAmount && formatMoney(data.provisionAmount),
      },
      {
        label: 'Nominal per Tagihan',
        value: data.installmentAmount && formatMoney(data.installmentAmount),
      },
    ],
    [data],
  );

  return (
    <div css={detailBoxCx}>
      <Typography
        variant='subtitle1'
        className='detail-box-title'
      >
        Informasi Pinjaman
      </Typography>
      <div className='box-container'>
        {loanBoxInfo.map(
          (data, index) =>
            data.value ? (
              <div key={index}>
                <Typography
                  variant='caption'
                  className='label-text'
                >
                  {data.label}
                </Typography>
                <Typography
                  variant='body2'
                  className='value-text'
                >
                  {data.value}
                </Typography>
              </div>
            ) : '',
        )}
      </div>
    </div>
  );
};

export default DetailBox;
