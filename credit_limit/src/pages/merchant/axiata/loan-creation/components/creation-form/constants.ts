import * as yup from 'yup';

import { LoanCreationParam } from 'repositories/merchant/loan';

import { isValidFileSize, isValidFileType } from './utils';

const MAX_FILE_SIZE = 2 * 1024 * 1024; //2mb

const VALID_FILE_EXTENSIONS = [
  'pdf',
  'jpeg',
  'jpg',
  'png',
  'csv',
  'xls',
  'xlsx',
  'doc',
  'docx',
  'zip',
  'rar',
];

export const acceptedExtensions = VALID_FILE_EXTENSIONS.map(
  (ext) => `.${ext}`,
).join(', ');

const schemes: Record<keyof LoanCreationParam, unknown> = {
  loanType: yup.string().required('Pilih jenis pendanaan yang tersedia'),
  loanAmount: yup
    .string()
    .required('Jumlah pinjaman tidak boleh kosong')
    .noMoreThan2bil('Jumlah pinjaman min. Rp300.000 dan maks. Rp2.000.000.000')
    .test(
      'test-min-loan',
      'Jumlah pinjaman min. Rp300.000 dan maks. Rp2.000.000.000',
      (value) => {
        return parseInt(value) >= 300000;
      },
    ),
  loanDuration: yup
    .string()
    .required('Tenor tidak boleh kosong')
    .currencyValidator('Tenor min. 1 hari dan maks. 360 hari')
    .test(
      'test-tenor-validation',
      'Tenor min. 1 hari dan maks. 360 hari',
      (value) => {
        return parseInt(value) > 0 && parseInt(value) <= 360;
      },
    ),
  installmentNumber: yup.string().required('Pilih tagihan yang tersedia'),
  invoiceFile: yup
    .mixed()
    .required('Harap upload dokumen')
    .test(
      'is-valid-type',
      'Format File tidak sesuai. Harap upload dengan format PDF, JPG, PNG, CSV, XLS, DOC, ZIP, RAR',
      (value) =>
        isValidFileType({
          file: value as File,
          allowExtension: VALID_FILE_EXTENSIONS,
        }),
    )
    .test(
      'is-valid-size',
      'File terlalu besar, harap upload dokumen di bawah 2MB',
      (value) =>
        isValidFileSize({ file: value as File, maxSize: MAX_FILE_SIZE }),
    ),
  invoiceNumber: yup.string().required('Nomor invoice tidak boleh kosong'),
  bilyetFile: yup
    .mixed()
    .test(
      'is-valid-type',
      'Format File tidak sesuai. Harap upload dengan format PDF, JPG, PNG, CSV, XLS, DOC, ZIP, RAR',
      (value) =>
        value
          ? isValidFileType({
              file: value as File,
              allowExtension: VALID_FILE_EXTENSIONS,
            })
          : true,
    )
    .test(
      'is-valid-size',
      'File terlalu besar, harap upload dokumen di bawah 2MB',
      (value) =>
        value
          ? isValidFileSize({ file: value as File, maxSize: MAX_FILE_SIZE })
          : true,
    ),
};

export const loanCreationScheme = yup.object<LoanCreationParam>(schemes);
