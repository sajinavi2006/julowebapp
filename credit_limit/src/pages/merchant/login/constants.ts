import * as yup from 'yup';

import { LoginParam } from 'repositories/merchant/auth';

export const defaultValues: LoginParam = {
  nik: '',
  password: '',
};

const schemes: Record<keyof LoginParam, unknown> = {
  nik: yup.string().required('NIK tidak boleh kosong'),
  password: yup.string().required('Password tidak boleh kosong'),
};

export const loginScheme = yup.object<LoginParam>(schemes);
