import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import Divider from 'components/Divider';
import { Button } from 'new-components/elements';
import { LOAN_INACTIVE } from 'pages/merchant/axiata/constants';
import { useSnackbar } from 'pages/merchant/axiata/components';

import MasterAgreementModal from '../master-agreement-modal';
import { useDetailContent } from '../../hooks/use-detail-content';

import DetailBox from './components/detail-box';
import DetailAccordion from './components/detail-accordion';
import { LoanDetailContentProps } from './types';
import { detailContentCx, detailInfoCx } from './styles';

const LoanDetailContent: React.FC<LoanDetailContentProps> = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data } = props;

  const { content } = useDetailContent({
    loanStatus: data.loanStatus,
    email: data.email,
  });

  const { setMessage } = useSnackbar();

  const history = useHistory();
  const { pathname } = useLocation();

  const handleOnButtonClick = () => {
    if (data.loanStatus === LOAN_INACTIVE) {
      if (data.maxPlatformCheck === 'IN_PROGRESS') {
        return setMessage('Dokumen belum tersedia. Kami siapkan dulu, ya.');
      }
      return setIsModalOpen(true);
    }

    const partner = pathname.split('/')[2];

    history.push(`/merchant/${partner}/`);
  };

  return (
    <div css={detailContentCx}>
      <div css={detailInfoCx}>
        <div className='content-margin'>{content.icon}</div>
        {content.title}
        {content.description}
      </div>

      <Divider className='content-margin' />

      <div className='loan-content'>
        <DetailBox data={data} />
        <DetailAccordion data={data} />
        <Button
          className='content-button'
          onClick={handleOnButtonClick}
          fullWidth
        >
          {data.loanStatus === LOAN_INACTIVE ? 'Konfirmasi Dokumen' : 'Kembali'}
        </Button>
      </div>
      <MasterAgreementModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        loanData={data}
      />
    </div>
  );
};

export default LoanDetailContent;
