import { object, string } from 'yup';

import utils from 'utils';
import 'utils/yup/string';

const signupValidation = {
  email: string()
    .required('Gmail tidak boleh kosong')
    .test('is-gmail', 'Hanya dapat diisi dengan alamat gmail', (value) =>
      value
        ? utils.validator.gmailValidator(value) ||
          utils.validator.juloEmailValidator(value)
        : true,
    ),
  nik: string()
    .required('NIK tidak boleh kosong')
    .nikValidator('Pastikan NIK yang kamu isi valid'),
};

export const signupSchema = object().shape(signupValidation);
