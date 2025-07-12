import { Checkbox } from '@material-ui/core';

import { useFormContext } from 'hooks/react-hook-form';

import { AgreementDialog } from './components';
import { agreementCx } from './styles';
import { useHandleAgreementDialog } from './usecase';

const Agreement = () => {
  const {
    watch,
    setValue,
    formState: { isSubmitting },
  } = useFormContext();

  const { isOpen, handleCheckboxChange, handleOnClose } =
    useHandleAgreementDialog();

  return (
    <div css={agreementCx} className='agreement-form'>
      <div className='agreement-checkbox'>
        <Checkbox
          name='agreementRegistration'
          checked={watch('agreementRegistration')}
          onChange={(e) => setValue('agreementRegistration', e.target.checked)}
          disabled={isSubmitting}
        />
        <p>Saya bersedia dihubungi untuk proses registrasi</p>
      </div>
      <div className='agreement-checkbox'>
        <Checkbox
          name='agreementTnc'
          checked={watch('agreementTnc')}
          onChange={(e) => handleCheckboxChange(e)}
          disabled={isSubmitting}
        />
        <p>Saya telah membaca dan menyetujui Kebijakan Privasi Pengguna</p>
      </div>
      <AgreementDialog isOpen={isOpen} onClose={handleOnClose} />
    </div>
  );
};

export default Agreement;
