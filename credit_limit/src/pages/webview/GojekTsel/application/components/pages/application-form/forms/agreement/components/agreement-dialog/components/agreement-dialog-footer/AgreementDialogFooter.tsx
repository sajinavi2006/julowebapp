import { Button } from 'new-components/elements';

import { useIsScrollBottom } from '../../usecase';
import { AgreementDialogFooterProps } from './types';
import { agreementDialogFooterCx } from './styles';
import { useHandleAgreeAgreement } from './usecase';

const AgreementDialogFooter = (props: AgreementDialogFooterProps) => {
  const { onClose, isAgreementLoading } = props;
  const { isScrollBottom } = useIsScrollBottom();

  const { onAgreeAgreement } = useHandleAgreeAgreement({ onClose });

  return (
    <div css={agreementDialogFooterCx} className='agreement-dialog-footer'>
      <Button
        disabled={isAgreementLoading}
        fullWidth
        variant='secondary'
        onClick={onClose}
      >
        Tidak Setuju
      </Button>
      <Button
        fullWidth
        variant='primary'
        disabled={isAgreementLoading || !isScrollBottom}
        onClick={onAgreeAgreement}
      >
        Setuju
      </Button>
    </div>
  );
};

export default AgreementDialogFooter;
