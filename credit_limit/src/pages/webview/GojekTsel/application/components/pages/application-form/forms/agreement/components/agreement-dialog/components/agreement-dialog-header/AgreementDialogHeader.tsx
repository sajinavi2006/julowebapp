import { PrivacyPolicy } from 'new-components/shapes';

import { agreementDialogHeaderCx } from './styles';

const AgreementDialogHeader = () => {
  return (
    <div css={agreementDialogHeaderCx} className='agreement-dialog-header'>
      <div className='agreement-dialog-icon'>
        <PrivacyPolicy />
      </div>
      <p className='agreement-dialog-title'>
        Kebijakan Privasi Pengguna Aplikasi JULO
      </p>
    </div>
  );
};

export default AgreementDialogHeader;
