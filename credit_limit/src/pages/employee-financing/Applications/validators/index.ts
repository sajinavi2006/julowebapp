import * as yup from 'yup';

import 'utils/yup/string';
import {
  phoneFamilyInformationEF,
  validatePhoneWithPersonalIdentityEF,
} from '../utils/yup-methods';

//page personal_identity
const personalIdentityValidation = {
  ktp_image: yup.string().required('Foto KTP tidak boleh kosong'),
  selfie: yup.string().required('Foto Selfie tidak boleh kosong'),
  nik: yup
    .string()
    .required('KTP tidak boleh kosong')
    .matches(/^[0-9]+$/, 'Nomor KTP Harus berupa angka')
    .min(16, 'Mohon periksa kembali Nomor KTP Anda')
    .max(16, 'Mohon periksa kembali Nomor KTP Anda')
    .nikValidator('Mohon periksa kembali Nomor KTP Anda'),
  phone_number: yup
    .string()
    .required('Nomor HP aktif tidak boleh kosong')
    .phoneFormat('Periksa kembali no handphone Anda'),
  place_of_birth: yup
    .string()
    .required('Tempat lahir tidak boleh kosong')
    .doubleSpace('Tidak boleh double spasi')
    .min(3, 'Minimal 3 karakter')
    .englishCharacters('Mohon gunakan huruf alphabet'),
  gender: yup.string().required('Jenis Kelamin tidak boleh kosong'),
};

//page family_information
const familyInformationValidation = {
  mother_name: yup
    .string()
    .required('Nama orang tua tidak boleh kosong')
    .min(3, 'Minimal 3 karakter')
    .doubleSpace('Tidak boleh double spasi')
    .matches(/^[aA-zZ\s]+$/, 'Mohon gunakan nama lengkap asli')
    .englishCharacters('Mohon gunakan huruf alphabet'),
  mother_phone_number: yup
    .string()
    .required('Nomor HP orang tua tidak boleh kosong')
    .phoneFormat('Periksa kembali no handphone Anda')
    .test(validatePhoneWithPersonalIdentityEF),
  marriage_status: yup.string().required('Status sipil tidak boleh kosong'),
  couple_name: yup
    .string()
    .nullable()
    .transform((o: string, c: string) => (o === '' ? null : c))
    .min(3, 'Minimal 3 karakter')
    .doubleSpace('Tidak boleh double spasi')
    .matches(/^[aA-zZ\s]+$/, 'Mohon gunakan nama lengkap asli')
    .englishCharacters('Mohon gunakan huruf alphabet'),
  couple_phone_number: yup
    .string()
    .phoneFormat('Periksa kembali no handphone Anda')
    .test(validatePhoneWithPersonalIdentityEF)
    .test(phoneFamilyInformationEF),
};

//page financial
const financialValidation = {
  expense_per_month: yup
    .string()
    .required('Total pengeluaran rumah tangga per bulan tidak boleh kosong')
    .currencyValidator('Tidak boleh diawali angka 0'),
  expenses_monthly_house_rent: yup
    .string()
    .required('Total cicilan/sewa rumah per bulan tidak boleh kosong')
    .currencyValidator('Tidak boleh diawali angka 0'),
  debt_installments_per_month: yup
    .string()
    .required('Total cicilan hutan per bulan tidak boleh kosong')
    .currencyValidator('Tidak boleh diawali angka 0'),
};

export const schemaPersonalIdentity = yup
  .object()
  .shape(personalIdentityValidation);

export const schemaFamilyInformation = yup
  .object()
  .shape(familyInformationValidation);

export const schemaFinancialValidation = yup
  .object()
  .shape(financialValidation);
