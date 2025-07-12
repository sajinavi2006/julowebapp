import * as yup from 'yup';

import 'utils/yup/string';

const dataConfirmationValidation = {
  phone: yup
    .string()
    .required('No. Handphone tidak boleh kosong')
    .min(5, 'Kurang dari 15 digit')
    .phoneFormat('No. Handphone tidak valid'),
  email: yup
    .string()
    .required('Email tidak boleh kosong')
    .emailFormat('Email tidak valid'),
};

export const schemaDataConfirmation = yup
  .object()
  .shape(dataConfirmationValidation);
