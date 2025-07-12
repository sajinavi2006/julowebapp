import { ChangeEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { setErrors } from 'utils/object';
import { Button, Input } from 'new-components/elements';
import { FormProvider, useForm } from 'hooks/react-hook-form';
import { LoginParam, useRLogin } from 'repositories/merchant/auth';
import { loginScheme, defaultValues } from './constants';
import { PartnerParams } from './types';
import { loginCX } from './styles';

import logoJulo from 'assets/img/paylater/julo-logo.svg';

const Login = () => {
  const { partnerName } = useParams<PartnerParams>();

  const form = useForm<LoginParam>({
    defaultValues,
    resolver: yupResolver(loginScheme),
  });

  const { handleSubmit, setError } = form;

  const { mutate, isLoading } = useRLogin({
    onError: (err) => {
      const statusCode = err.payload?.statusCode;
      const errors = err.payload?.errors || {};

      switch (statusCode) {
        case 422:
          setErrors<LoginParam>(errors, setError);
          break;
        default:
          console.error(err);
          break;
      }
    },
  });

  const onSubmit = (data: LoginParam) => {
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
    <FormProvider {...form}>
      <div css={loginCX} className='login-page'>
        <div className='left-container' />
        <div className='right-container'>
          <div className='inner-right-container'>
            <div className='logo-container'>
              <img src={logoJulo} alt='logo-julo' className='julo-logo' />
            </div>
            <div className='title'>Masuk</div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                name='nik'
                label='NIK'
                disabled={isLoading}
                placeholder='Masukkan NIK'
                onChange={handleOnChange}
              />
              <Input
                name='password'
                label='Kata Sandi'
                disabled={isLoading}
                placeholder='Masukkan kata sandi'
                type='password'
              />
              <Button type='submit' disabled={isLoading} className='submit-btn'>
                Masuk
              </Button>
            </form>
            {/* TODO: will be added later on for forgot password
            <div className='forgot-password'>
              <Link to='/merchant/forgot-password'>Lupa Password</Link>
            </div> */}
            <div className='register'>
              Belum memiliki akun?{' '}
              <Link to={`/merchant/${partnerName}/register`}>
                Daftar Sekarang
              </Link>
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default Login;
