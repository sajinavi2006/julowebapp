import { useFormContext } from 'hooks/react-hook-form';
import { Input } from 'new-components/elements';

import { handleNumericalInput } from '../utils';
import { OtherPhoneLabel } from './components';
import { otherPhoneCx } from './styles';

const OtherPhone = () => {
  const {
    getValues,
    trigger,
    fieldsRef,
    formState: { isSubmitting },
  } = useFormContext();

  const isPhoneNumberExist = Boolean(getValues('phoneNumber'));

  return (
    <div css={otherPhoneCx} className='other-phone-form'>
      <Input
        ref={(e) => (fieldsRef.current['otherPhoneNumber'] = e)}
        name='otherPhoneNumber'
        label='Nomor HP Lainnya'
        placeholder='Masukkan Nomor HP'
        leftElement={'+62'}
        maxLength={14}
        onChange={(e) => {
          handleNumericalInput(e);
          isPhoneNumberExist && trigger('phoneNumber');
        }}
        labelIndicator={<OtherPhoneLabel />}
        disabled={isSubmitting}
      />
    </div>
  );
};

export default OtherPhone;
