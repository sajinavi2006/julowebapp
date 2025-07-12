import { Dialog, DialogContent } from '@material-ui/core';

import { AgreementDialogProps } from './types';
import { agreementDialogCx } from './styles';
import {
  AgreementDialogContent,
  AgreementDialogFooter,
  AgreementDialogHeader,
} from './components';
import { useHandleAgreementContent } from './usecase';

const AgreementDialog = (props: AgreementDialogProps) => {
  const { isOpen, onClose } = props;
  const { agreementContent, isAgreementLoading } = useHandleAgreementContent();

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      scroll='paper'
      css={agreementDialogCx}
      className='agreement-dialog'
    >
      <DialogContent id='agreement-dialog-content-wrapper'>
        <AgreementDialogHeader />
        <AgreementDialogContent agreementContent={agreementContent} />
        <AgreementDialogFooter
          onClose={onClose}
          isAgreementLoading={isAgreementLoading}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AgreementDialog;
