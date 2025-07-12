import { GojekLogo, Logo, TelkomselLogo } from 'new-components/shapes';

import { formFooterCx } from './styles';

const FormFooter = () => {
  return (
    <div css={formFooterCx} className='form-footer'>
      <div className='form-footer-logo'>
        <TelkomselLogo />
        <GojekLogo />
      </div>
      <span>Didukung Oleh</span>
      <Logo width={43} height={20} />
    </div>
  );
};

export default FormFooter;
