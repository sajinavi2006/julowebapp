import { AgreementDialogProps } from '../../types';

export interface AgreementDialogFooterProps
  extends Omit<AgreementDialogProps, 'isOpen'> {
  isAgreementLoading: boolean;
}
