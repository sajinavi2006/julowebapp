import { useFormContext } from 'hooks/react-hook-form';
import { Input } from 'new-components/elements';

import { handleNumericalInput } from '../utils';
import { personalIdentityCx } from './styles';
import { handleAlphabetInput } from './utils';

const PersonalIdentity = () => {
  const {
    fieldsRef,
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <div css={personalIdentityCx} className='personal-identitiy-form'>
      <Input
        ref={(e) => (fieldsRef.current['name'] = e)}
        name='name'
        label='Nama'
        onChange={(e) => {
          handleAlphabetInput(e);
        }}
        placeholder='Masukkan Nama'
        disabled={isSubmitting}
      />
      <Input
        ref={(e) => (fieldsRef.current['nik'] = e)}
        name='nik'
        label='NIK'
        onChange={(e) => {
          handleNumericalInput(e);
        }}
        placeholder='Masukkan NIK'
        maxLength={16}
        disabled={isSubmitting}
      />
    </div>
  );
};

export default PersonalIdentity;
