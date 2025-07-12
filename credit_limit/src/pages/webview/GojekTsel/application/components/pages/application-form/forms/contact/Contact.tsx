import { Alert } from '@material-ui/lab';

import { useFormContext } from 'hooks/react-hook-form';
import { Input } from 'new-components/elements';
import { Info } from 'new-components/shapes';

import { handleNumericalInput } from '../utils';
import { contactCx } from './styles';

const Contact = () => {
  const {
    trigger,
    getValues,
    fieldsRef,
    formState: { isSubmitting },
  } = useFormContext();

  const isOtherPhoneExist = Boolean(getValues('otherPhoneNumber'));

  return (
    <div css={contactCx} className='contact-form'>
      <Alert icon={<Info />} severity='info' className='contact-alert'>
        Pastikan kamu memasukkan email dan nomor HP yang terdaftar di Gojek
      </Alert>

      <Input
        ref={(e) => (fieldsRef.current['email'] = e)}
        name='email'
        label='Email'
        placeholder='Masukkan Email'
        type='email'
        maxLength={253}
        disabled={isSubmitting}
      />
      <Input
        ref={(e) => (fieldsRef.current['phoneNumber'] = e)}
        name='phoneNumber'
        label='Nomor HP'
        placeholder='Masukkan Nomor HP'
        leftElement={'+62'}
        maxLength={14}
        onChange={(e) => {
          handleNumericalInput(e);
          isOtherPhoneExist && trigger('otherPhoneNumber');
        }}
        disabled={isSubmitting}
      />
    </div>
  );
};

export default Contact;
