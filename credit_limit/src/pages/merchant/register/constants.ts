import * as yup from 'yup';

import { RegisterParam } from 'repositories/merchant/auth';

import GoogleAccount from './components/google-account/GoogleAccount';
import RegisterForm from './components/form/Form';

export const RegistrationSteps = [GoogleAccount, RegisterForm];

export const defaultValues: RegisterParam = {
  email: '',
  nik: '',
  password: '',
  confirmPassword: '',
};

const options = {
  nik: /^(1[1-9]|21|[37][1-6]|5[1-3]|6[1-5]|[89][12])\d{2}\d{2}([04][1-9]|[1256][0-9]|[37][01])(0[1-9]|1[0-2])\d{2}\d{4}$/,
  password: /^(?=.*[0-9])(?=.*[a-zA-Z]).*$/,
};

const scheme: Record<keyof RegisterParam, unknown> = {
  email: yup.string().email(),
  nik: yup
    .string()
    .required('NIK harus diisi')
    .matches(options.nik, 'NIK tidak valid'),
  password: yup
    .string()
    .required('Kata sandi harus diisi')
    .matches(
      options.password,
      'Gunakan kombinasi angka dan huruf minimal 6 karakter',
    ),
  confirmPassword: yup
    .string()
    .required('Password tidak sesuai')
    .oneOf([yup.ref('password')], 'Password tidak sesuai'),
};

export const registerScheme = yup.object<RegisterParam>(scheme);
