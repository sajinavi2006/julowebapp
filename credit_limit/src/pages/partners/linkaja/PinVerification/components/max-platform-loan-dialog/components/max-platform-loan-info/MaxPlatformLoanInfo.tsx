import { ExclamationMarkCircle } from 'new-components/shapes';

import { maxPlatformLoanInfoCx } from './styles';

const MaxPlatformLoanInfo = () => {
  return (
    <div css={maxPlatformLoanInfoCx} className='max-platform-loan-info'>
      <ExclamationMarkCircle />
      <span>
        Untuk informasi lebih lanjut, kamu bisa klik{' '}
        <a target='_blank' href='https://julo.co.id/faq/faq-pengajuan-kredit'>
          di sini
        </a>
      </span>
    </div>
  );
};

export default MaxPlatformLoanInfo;
