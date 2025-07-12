import { useCallback, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { FormProvider, useForm } from 'hooks/react-hook-form';
import { RegisterParam } from 'repositories/merchant/auth';
import { registerCX } from './styles';

import { defaultValues, registerScheme, RegistrationSteps } from './constants';
import { PartnerParam } from './types';

import logoJulo from 'assets/img/paylater/julo-logo.svg';

const Register = () => {
  const { partnerName } = useParams<PartnerParam>();
  const [step, setStep] = useState(0);

  const form = useForm<RegisterParam>({
    defaultValues: defaultValues,
    resolver: yupResolver(registerScheme),
  });

  const RegistrationStep = RegistrationSteps[step];

  const handleOnSuccess = useCallback(() => {
    setStep((prevStep) => prevStep + 1);
  }, []);

  return (
    <FormProvider {...form}>
      <div css={registerCX} className='register-page'>
        <div className='left-container' />
        <div className='right-container'>
          <div className='inner-right-container'>
            <div className='logo-container'>
              <img src={logoJulo} alt='logo-julo' className='julo-logo' />
            </div>
            <div className='header'>Daftar</div>
            <div className='content'>
              <RegistrationStep onSuccess={handleOnSuccess} />
            </div>
            <div className='to-login'>
              Sudah memiliki akun?{' '}
              <Link to={`/merchant/${partnerName}/login`}>Masuk Sekarang</Link>
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default Register;
