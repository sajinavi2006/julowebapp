import { ChangeEvent } from 'react';

import { Button, Input } from 'new-components/elements';
import { GoogleAccount } from '../google-account';

import { useRRegister, RegisterParam } from 'repositories/merchant/auth';
import { useFormContext } from 'hooks/react-hook-form';
import { setErrors } from 'utils/object';

const RegisterForm = () => {
  const form = useFormContext<RegisterParam>();

  const { handleSubmit, setError } = form;

  const { mutate, isLoading } = useRRegister({
    onError: (err) => {
      const statusCode = err?.payload?.statusCode;
      const errors = err?.payload?.errors || {};

      switch (statusCode) {
        case 400:
          setErrors<RegisterParam>(errors, setError);
          break;
        default:
          console.error(err);
          break;
      }
    },
  });

  const onSubmit = (data: RegisterParam) => {
    mutate({ variables: data });
  };

  const handleOnChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const inputValue = e.target.value;
    const numericOnly = inputValue.replace(/\D/g, '');

    e.target.value = numericOnly;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input name='email' label='Email' disabled={true} />
      <div className='back-to-google'>
        Ingin gunakan email lain?{' '}
        <GoogleAccount
          render={(renderProps) => (
            <span className='change-email' {...renderProps}>
              Ubah Email
            </span>
          )}
        />
      </div>
      <Input
        name='nik'
        label='NIK'
        placeholder='Masukkan NIK'
        maxLength={16}
        onChange={handleOnChange}
        disabled={isLoading}
        showCounter
      />
      <Input
        name='password'
        label='Kata Sandi'
        placeholder='Masukkan kata sandi'
        type='password'
        disabled={isLoading}
      />
      <Input
        name='confirmPassword'
        label='Ulangi Kata Sandi'
        placeholder='Masukkan ulang kata sandi'
        type='password'
        disabled={isLoading}
      />
      <Button type='submit' className='submit-btn' disabled={isLoading}>
        Daftar
      </Button>
    </form>
  );
};

export default RegisterForm;
