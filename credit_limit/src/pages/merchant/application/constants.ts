import * as yup from 'yup';

import { ApplicationFile } from 'repositories/merchant/application';

import { ApplicationForm, OtpVerification } from './steps';

export const ApplicationSteps = [ApplicationForm, OtpVerification];

const ApplicationFormDefaultValues = {
  currentStep: 0,
  address: '',
  addressDistrict: '',
  addressProvince: '',
  addressRegency: '',
  addressSubdistrict: '',
  addressZipcode: '',
  birthPlace: '',
  businessCategory: '',
  businessDuration: '',
  companyName: '',
  dob: '',
  emailDirector: '',
  fullname: '',
  gender: 'Pria',
  lastEducation: '',
  limit: '',
  maritalStatus: '',
  monthlyIncome: '',
  nib: '',
  nik: '',
  primaryPhoneNumber: '',
  productLine: '',
  ktp: {},
  selfie: {},
  nibDocument: {},
  cashflowReport: [],
  companyPhoto: [],
  financialDocument: [],
  otherDocument: [],
};

const OtpDefaultValues = {
  ...ApplicationFormDefaultValues,
  currenStep: 1,
  otp: '',
};

const SCHEME_ERROR_MESSAGE = {
  address: 'Alamat tidak boleh kosong',
  addressProvince: 'Provinsi tidak boleh kosong',
  addressRegency: 'Kota tidak boleh kosong',
  addressDistrict: 'Kabupaten tidak boleh kosong',
  addressSubdistrict: 'Kelurahan tidak boleh kosong',
  addressZipcode: 'Kode Pos tidak boleh kosong',

  birthPlace: 'Tempat Lahir tidak boleh kosong',
  businessCategory: 'Kategori Bisnis tidak boleh kosong',
  businessDuration: 'Lama Bisnis Berjalan tidak boleh kosong',
  companyName: 'Nama Perusahaan tidak boleh kosong',
  dob: 'Tanggal Lahir tidak boleh kosong',
  dobAgeIsValid: 'Minimal harus 21 tahun keatas',
  emailDirector: 'Email Direktur tidak boleh kosong',
  fullnameRequired: 'Nama Lengkap tidak boleh kosong',
  gender: 'Jenis Kelamin tidak boleh kosong',
  lastEducation: 'Pendidikan tidak boleh kosong',
  limit: 'Limit yang Diajukan tidak boleh kosong',
  maritalStatus: 'Status Perkawinan tidak boleh kosong',
  monthlyIncome: 'Pendapatan Bulanan tidak boleh kosong',
  monthlyIncomeIsTooLow: 'Minimal pendapatan harus 1.000.000 ',
  monthlyIncomeMaxReached: 'Pendapatan bulanan melebihi ketentuan',
  nib: 'Nomor NIB tidak boleh kosong',
  nik: 'NIK tidak boleh kosong',
  primaryPhoneNumber: 'Nomor HP Utama tidak boleh kosong',
  primaryPhoneNumberNotVerified: 'Mohon verifikasi nomor HP utama anda',
  primaryPhoneNumberFormatNotMatch: 'Format nomor telepon tidak valid',
  productLine: 'Product Line tidak boleh kosong',

  cashflowReport: 'Laporan Arus Kas tidak boleh kosong',
  companyPhoto: 'Foto Tempat Usaha tidak boleh kosong',
  financialDocument: 'Dokumen Keuangan tidak boleh kosong',
  ktp: 'Foto KTP tidak boleh kosong',
  nibDocument: 'NIB Document tidak boleh kosong',
  selfie: 'Foto Selfie + KTP tidak boleh kosong',

  doubleSpace: 'Harap tidak menggunakan 2 spasi sekaligus',
  invalidCharactersFormat:
    "Hanya dapat diisi dengan huruf dan karakter tertentu (.,-')",
  minCharacter: (length: number) => {
    return `Minimum ${length} karakter`;
  },
  maxCharacter: (length: number) => {
    return `Maksimum ${length} karakter`;
  },
};

const applicationFormSchemes = {
  dob: yup.string().when('currentStep', {
    is: (val: number) => val === 0,
    then: (schema) =>
      schema
        .required(SCHEME_ERROR_MESSAGE['dob'])
        .test(
          'is-date-valid',
          SCHEME_ERROR_MESSAGE['dobAgeIsValid'],
          (date) => {
            const getInputDate = new Date(date);
            const getCurrentDate = new Date();
            let age = getCurrentDate.getFullYear() - getInputDate.getFullYear();

            const currentMonth = getCurrentDate.getMonth();
            const inputMonth = getInputDate.getMonth();
            const currentDate = getCurrentDate.getDate();
            const inputDate = getInputDate.getDate();

            if (
              currentMonth < inputMonth ||
              (currentMonth === inputMonth && currentDate < inputDate)
            ) {
              age--;
            }

            return age >= 21;
          },
        ),
  }),
  birthPlace: yup.string().when('currentStep', {
    is: (val: number) => val === 0,
    then: (schema) => schema.required(SCHEME_ERROR_MESSAGE['birthPlace']),
  }),
  businessCategory: yup.string().when('currentStep', {
    is: (val: number) => val === 0,
    then: (schema) => schema.required(SCHEME_ERROR_MESSAGE['businessCategory']),
  }),
  businessDuration: yup.string().when('currentStep', {
    is: (val: number) => val === 0,
    then: (schema) => schema.required(SCHEME_ERROR_MESSAGE['businessDuration']),
  }),
  companyName: yup.string().when('currentStep', {
    is: (val: number) => val === 0,
    then: (schema) => schema.required(SCHEME_ERROR_MESSAGE['companyName']),
  }),

  lastEducation: yup.string().when('currentStep', {
    is: (val: number) => val === 0,
    then: (schema) => schema.required(SCHEME_ERROR_MESSAGE['lastEducation']),
  }),
  emailDirector: yup.string().when('currentStep', {
    is: (val: number) => val === 0,
    then: (schema) =>
      schema
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          'Masukkan email yang valid',
        )
        .required(SCHEME_ERROR_MESSAGE['emailDirector']),
  }),
  fullname: yup.string().when('currentStep', {
    is: (val: number) => val === 0,
    then: (schema) =>
      schema
        .required(SCHEME_ERROR_MESSAGE['fullnameRequired'])
        .matches(/^((?!.*\s{2,}).)*$/, SCHEME_ERROR_MESSAGE['doubleSpace'])
        .matches(
          /^[a-zA-Z.,\-'\s]+$/,
          SCHEME_ERROR_MESSAGE['invalidCharactersFormat'],
        )
        .min(3, SCHEME_ERROR_MESSAGE.minCharacter(3))
        .max(100, SCHEME_ERROR_MESSAGE.maxCharacter(100)),
  }),

  gender: yup.string().when('currentStep', {
    is: (val: number) => val === 0,
    then: (schema) => schema.required(SCHEME_ERROR_MESSAGE['gender']),
  }),

  limit: yup.string().when('currentStep', {
    is: (val: number) => val === 0,
    then: (schema) => schema.required(SCHEME_ERROR_MESSAGE['limit']),
  }),

  maritalStatus: yup.string().when('currentStep', {
    is: (val: number) => val === 0,
    then: (schema) => schema.required(SCHEME_ERROR_MESSAGE['maritalStatus']),
  }),

  monthlyIncome: yup.string().when('currentStep', {
    is: (val: number) => val === 0,
    then: (schema) =>
      schema
        .required(SCHEME_ERROR_MESSAGE['monthlyIncome'])
        .test('price-range', function (value) {
          const monthlyIncome = Number(value);
          if (monthlyIncome < 1000000) {
            return this.createError({
              message: SCHEME_ERROR_MESSAGE['monthlyIncomeIsTooLow'],
            });
          } else if (monthlyIncome > 999000000) {
            return this.createError({
              message: SCHEME_ERROR_MESSAGE['monthlyIncomeMaxReached'],
            });
          }

          return true;
        }),
  }),

  nib: yup.string().when('currentStep', {
    is: (val: number) => val === 0,
    then: (schema) =>
      schema
        .required(SCHEME_ERROR_MESSAGE['nib'])
        .min(13, 'NIB harus 13 Digit'),
  }),
  nik: yup.string().when('currentStep', {
    is: (val: number) => val === 0,
    then: (schema) =>
      schema
        .max(16, 'NIK Maksimal 16 Angka')
        .required(SCHEME_ERROR_MESSAGE['nik']),
  }),
  primaryPhoneNumber: yup.string().when('currentStep', {
    is: (val: number) => val === 0,
    then: (schema) =>
      schema
        .required(SCHEME_ERROR_MESSAGE['primaryPhoneNumber'])
        .matches(
          /^(62|0)[0-9]{8,15}$/,
          SCHEME_ERROR_MESSAGE['primaryPhoneNumberFormatNotMatch'],
        )
        .test(
          'is-verified',
          SCHEME_ERROR_MESSAGE['primaryPhoneNumberNotVerified'],
          () => {
            const element = document.getElementsByName('primaryPhoneNumber');
            const isVerified = element[0].getAttribute('data-is-verified');

            return isVerified !== 'false';
          },
        ),
  }),
  productLine: yup.string().when('currentStep', {
    is: (val: number) => val === 0,
    then: (schema) => schema.required(SCHEME_ERROR_MESSAGE['productLine']),
  }),

  address: yup.string().when('currentStep', {
    is: (val: number) => val === 0,
    then: (schema) => schema.required(SCHEME_ERROR_MESSAGE['address']),
  }),

  addressProvince: yup.string().when('currentStep', {
    is: (val: number) => val === 0,
    then: (schema) => schema.required(SCHEME_ERROR_MESSAGE['addressProvince']),
  }),
  addressRegency: yup.string().when('currentStep', {
    is: (val: number) => val === 0,
    then: (schema) => schema.required(SCHEME_ERROR_MESSAGE['addressRegency']),
  }),

  addressDistrict: yup.string().when('currentStep', {
    is: (val: number) => val === 0,
    then: (schema) => schema.required(SCHEME_ERROR_MESSAGE['addressDistrict']),
  }),
  addressSubdistrict: yup.string().when('currentStep', {
    is: (val: number) => val === 0,
    then: (schema) =>
      schema.required(SCHEME_ERROR_MESSAGE['addressSubdistrict']),
  }),
  addressZipcode: yup.string().when('currentStep', {
    is: (val: number) => val === 0,
    then: (schema) => schema.required(SCHEME_ERROR_MESSAGE['addressZipcode']),
  }),
};

const schemes = {
  ...applicationFormSchemes,
  otp: yup.string().when('currentStep', {
    is: (val: number) => val === 1,
    then: (schema) => schema,
  }),
};

const shapes = {
  ktp: yup.mixed().when('currentStep', {
    is: (val: number) => val === 0,
    then: (schema) =>
      schema.test('required', SCHEME_ERROR_MESSAGE['ktp'], (value) => {
        return value && Boolean((value as ApplicationFile).url);
      }),
  }),
  selfie: yup.mixed().when('currentStep', {
    is: (val: number) => val === 0,
    then: (schema) =>
      schema.test('required', SCHEME_ERROR_MESSAGE['selfie'], (value) => {
        return value && Boolean((value as ApplicationFile).url);
      }),
  }),
  nibDocument: yup.mixed().when('currentStep', {
    is: (val: number) => val === 0,
    then: (schema) =>
      schema.test('required', SCHEME_ERROR_MESSAGE['nibDocument'], (value) => {
        return value && Boolean((value as ApplicationFile).url);
      }),
  }),
  financialDocument: yup.mixed().when('currentStep', {
    is: (val: number) => val === 0,
    then: (schema) =>
      schema.test(
        'required',
        SCHEME_ERROR_MESSAGE['financialDocument'],
        (value) => {
          return value && (value as ApplicationFile[]).length > 0;
        },
      ),
  }),
  companyPhoto: yup.mixed().when('currentStep', {
    is: (val: number) => val === 0,
    then: (schema) =>
      schema.test('required', SCHEME_ERROR_MESSAGE['companyPhoto'], (value) => {
        return value && (value as ApplicationFile[]).length > 0;
      }),
  }),
  cashflowReport: yup.mixed().when('currentStep', {
    is: (val: number) => val === 0,
    then: (schema) =>
      schema.test(
        'required',
        SCHEME_ERROR_MESSAGE['cashflowReport'],
        (value) => {
          return value && (value as ApplicationFile[]).length > 0;
        },
      ),
  }),
};

export const defaultValues = [ApplicationFormDefaultValues, OtpDefaultValues];

export const applicationScheme = yup.object(schemes).shape(shapes);
