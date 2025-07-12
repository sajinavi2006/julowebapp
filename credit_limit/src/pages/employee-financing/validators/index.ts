import * as yup from 'yup';

import 'utils/yup/string';

const disbursementValidation = {
  request_loan_amount: yup
    .string()
    .required('Jumlah pinjaman tidak boleh kosong')
    .currencyValidator('Tidak boleh diawali angka 0')
    .noMoreThan20mil('Jumlah pinjaman tidak boleh lebih dari 20 juta'),
  nik: yup
    .string()
    .required('KTP tidak boleh kosong')
    .matches(/^[0-9]+$/, 'Nomor KTP Harus berupa angka')
    .min(16, 'Mohon periksa kembali Nomor KTP Anda')
    .max(16, 'Mohon periksa kembali Nomor KTP Anda')
    .nikValidator('Mohon periksa kembali Nomor KTP Anda'),
  tenor: yup.number().required('Jangka waktu tidak boleh kosong'),
};

export const schemaDisbursementValidation = yup
  .object()
  .shape(disbursementValidation);
