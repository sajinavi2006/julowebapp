import * as yup from 'yup';
import utils from 'utils';

import 'utils/yup/string';

// custom validator

yup.addMethod(yup.string, 'breakLines', function (errorMessage) {
  return this.test(`test-break-lines`, errorMessage, function (value) {
    const { path, createError } = this;
    const isValid = value ? !/(\r\n|\n|\r)/gm.test(value) : true;
    return isValid || createError({ path, message: errorMessage });
  });
});

yup.addMethod(yup.string, 'housePhoneFormat', function (errorMessage) {
  // method for house phone format
  return this.test(`test-phone-format2`, errorMessage, function (value) {
    const { path, createError } = this;
    let isValid = true;
    if (value && !utils.validator.housePhoneValidator(value)) {
      isValid = false;
    }
    return isValid || createError({ path, message: errorMessage });
  });
});

yup.addMethod(yup.string, 'houseAndMobilePhoneFormat', function (errorMessage) {
  // method for mobile phone and house phone format
  return this.test(`test-phone-format3`, errorMessage, function (value) {
    const { path, createError } = this;
    let isValid = true;

    if (
      value &&
      !utils.validator.housePhoneValidator(value) &&
      !utils.validator.phoneValidator(value)
    ) {
      isValid = false;
    }
    return isValid || createError({ path, message: errorMessage });
  });
});

yup.addMethod(yup.string, 'phonePersonalIdentity', function (errorMessage) {
  return this.test(`test-phone-pi`, errorMessage, function () {
    const { path, createError } = this;
    let isValid = true;
    const mobilePhone1 = this.parent.mobile_phone_1;
    const mobilePhone2 = this.parent.mobile_phone_2;
    if (mobilePhone2 && mobilePhone1 === mobilePhone2) {
      isValid = false;
    }
    return isValid || createError({ path, message: 'Nomor HP harus berbeda' });
  });
});

yup.addMethod(
  yup.string,
  'validatePhoneWithPersonalIdentity',
  function (errorMessage) {
    return this.test(`test-phone-validate`, errorMessage, function (value) {
      const { path, createError } = this;
      let isValid = true;
      let message = '';
      const mobilePhone1 = this.options.context.mobile_phone_1;
      const mobilePhone2 = this.options.context.mobile_phone_2;
      if (mobilePhone1 === value) {
        isValid = false;
        message = 'Nomor HP harus berbeda dengan nomor HP utama';
      } else if (mobilePhone2 && mobilePhone2 === value) {
        isValid = false;
        message = 'Nomor HP harus berbeda dengan nomor HP lainnya';
      }

      return isValid || createError({ path, message });
    });
  },
);

yup.addMethod(yup.string, 'phoneFamilyInformation', function (errorMessage) {
  return this.test(`test-phone-fi`, errorMessage, function () {
    const { path, createError } = this;
    let isValid = true;
    const isMarried = this.options.context.spouse_name;
    const kinMobilePhone = this.parent.kin_mobile_phone;
    const closeKinMobilePhone = isMarried
      ? this.parent.spouse_mobile_phone
      : this.parent.close_kin_mobile_phone;

    if (closeKinMobilePhone === kinMobilePhone) {
      isValid = false;
    }

    return isValid || createError({ path, message: 'Nomor HP harus berbeda' });
  });
});

yup.addMethod(yup.string, 'companyRequired', function (errorMessage) {
  return this.test(`test-company-validate`, errorMessage, function (value) {
    const { path, createError } = this;
    let isValid = true;
    const isHideCompanyFields =
      this.parent.job_type === 'Staf rumah tangga' ||
      this.parent.job_type === 'Ibu rumah tangga' ||
      this.parent.job_type === 'Tidak bekerja' ||
      this.parent.job_type === 'Mahasiswa' ||
      !this.parent.job_type;
    if (!isHideCompanyFields && !value) {
      isValid = false;
    }
    return isValid || createError({ path, message: errorMessage });
  });
});

//page 1
const personalIdentityValidation = {
  ktp: yup.string().required('KTP tidak boleh kosong'),
  fullname: yup
    .string()
    .required('Nama lengkap tidak boleh kosong')
    .doubleSpace('Tidak boleh double spasi')
    .min(3, 'Minimal 3 karakter')
    .matches(/^[aA-zZ\s]+$/, 'Mohon gunakan nama lengkap asli')
    .englishCharacters('Mohon gunakan huruf alphabet'),
  birth_place: yup.string().when('$birth_place', ([name], schema) => {
    if (name) {
      return schema
        .required('Tempat lahir tidak boleh kosong')
        .doubleSpace('Tidak boleh double spasi')
        .min(3, 'Minimal 3 karakter')
        .englishCharacters('Mohon gunakan huruf alphabet')
        .nullable(true);
    }
    return schema;
  }),
  dob: yup.string().required('Tanggal lahir tidak boleh kosong'),
  gender: yup.string().required('Jenis Kelamin tidak boleh kosong'),
  address_street_num: yup
    .string()
    .required('Alamat tidak boleh kosong')
    .englishCharacters('Mohon gunakan huruf alphabet'),
  address_provinsi: yup
    .string()
    .required('Provinsi tidak boleh kosong')
    .nullable(true),
  address_kabupaten: yup
    .string()
    .required('Kabupaten tidak boleh kosong')
    .nullable(true),
  address_kecamatan: yup
    .string()
    .required('Kecamatan tidak boleh kosong')
    .nullable(true)
    .englishCharacters('Mohon gunakan huruf alphabet'),
  address_kelurahan: yup
    .string()
    .required('Kelurahan tidak boleh kosong')
    .nullable(true)
    .englishCharacters('Mohon gunakan huruf alphabet'),

  occupied_since: yup.string().required('Tanggal ditempati tidak boleh kosong'),
  home_status: yup.string().required('Status domisili tidak boleh kosong'),
  mobile_phone_1: yup
    .string()
    .required('Nomor HP utama tidak boleh kosong')
    .phoneFormat('Periksa kembali no handphone Anda')
    .phonePersonalIdentity(),
  mobile_phone_2: yup
    .string()
    .phoneFormat('Periksa kembali no handphone Anda')
    .phonePersonalIdentity(),
  marital_status: yup.string().required('Status sipil tidak boleh kosong'),
  dependent: yup.string().required('Jumlah tanggungan tidak boleh kosong'),
  customer_mother_maiden_name: yup
    .string()
    .when('$customer_mother_maiden_name', ([name], schema) => {
      if (name) {
        return schema
          .required('Nama lengkap ibu kandung tidak boleh kosong')
          .doubleSpace('Tidak boleh double spasi')
          .min(3, 'Minimal 3 karakter')
          .matches(/^[aA-zZ\s]+$/, 'Mohon gunakan nama lengkap asli');
      }
      return schema;
    }),
  address_kodepos: yup.string().when('$address_kodepos', ([name], schema) => {
    if (name) {
      return schema
        .required('Kodepos tidak boleh kosong')
        .min(5, 'Kodepos harus 5 karakter');
    }
    return schema;
  }),
};

//page 2
const familyInformationValidation = {
  kin_relationship: yup.string().required('Hubungan tidak boleh kosong'),
  kin_name: yup
    .string()
    .required('Nama keluarga kandung tidak boleh kosong')
    .min(3, 'Minimal 3 karakter')
    .doubleSpace('Tidak boleh double spasi')
    .matches(/^[aA-zZ\s]+$/, 'Mohon gunakan nama lengkap asli')
    .englishCharacters('Mohon gunakan huruf alphabet'),
  kin_mobile_phone: yup
    .string()
    .required('Nomor HP keluarga kandung tidak boleh kosong')
    .phoneFormat('Periksa kembali no handphone Anda')
    .validatePhoneWithPersonalIdentity()
    .phoneFamilyInformation(),
  close_kin_name: yup.string().when('$close_kin_name', ([name], schema) => {
    if (name) {
      return schema
        .required('Nama orang tua tidak boleh kosong')
        .min(3, 'Minimal 3 karakter')
        .doubleSpace('Tidak boleh double spasi')
        .matches(/^[aA-zZ\s]+$/, 'Mohon gunakan nama lengkap asli')
        .englishCharacters('Mohon gunakan huruf alphabet');
    }
    return schema;
  }),
  close_kin_mobile_phone: yup
    .string()
    .phoneFormat('Periksa kembali no handphone Anda')
    .when('$close_kin_name', ([name], schema) => {
      if (name) {
        return schema
          .required('Nomor HP orang tua tidak boleh kosong')
          .validatePhoneWithPersonalIdentity()
          .phoneFamilyInformation();
      }
      return schema;
    }),
  spouse_name: yup.string().when('$spouse_name', ([name], schema) => {
    if (name) {
      return schema
        .required('Nama pasangan tidak boleh kosong')
        .min(3, 'Minimal 3 karakter')
        .doubleSpace('Tidak boleh double spasi')
        .matches(/^[aA-zZ\s]+$/, 'Mohon gunakan nama lengkap asli')
        .englishCharacters('Mohon gunakan huruf alphabet');
    }
    return schema;
  }),
  spouse_mobile_phone: yup
    .string()
    .phoneFormat('Periksa kembali no handphone Anda')
    .when('$spouse_name', ([name], schema) => {
      if (name) {
        return schema
          .required('Nomor HP pasangan tidak boleh kosong')
          .validatePhoneWithPersonalIdentity()
          .phoneFamilyInformation();
      }
      return schema;
    }),
};

//page 3
const jobAndEducationValidation = {
  job_type: yup.string().required('Tipe pekerjaan tidak boleh kosong'),
  job_industry: yup
    .string()
    .companyRequired('Bidang pekerjaan tidak boleh kosong'),
  profession: yup
    .string()
    .companyRequired('Profesi pekerjaan tidak boleh kosong'),
  company_name: yup
    .string()
    .companyRequired('Nama perusahaan tidak boleh kosong')
    .doubleSpace('Tidak boleh double spasi')
    .englishCharacters('Mohon gunakan huruf alphabet')
    .nullable(true),
  company_phone_number: yup
    .string()
    .companyRequired('Nomor telepon perusahaan tidak boleh kosong')
    .when('job_type', ([jobType], schema) => {
      const isHideCompanyFields =
        jobType === 'Staf rumah tangga' ||
        jobType === 'Ibu rumah tangga' ||
        jobType === 'Tidak bekerja' ||
        jobType === 'Mahasiswa' ||
        !jobType;

      if (isHideCompanyFields) {
        return schema;
      }
      if (jobType === 'Pengusaha') {
        return schema.houseAndMobilePhoneFormat(
          'Periksa kembali no telepon kantor Anda',
        );
      }

      return schema.housePhoneFormat('Periksa kembali no telepon kantor Anda');
    }),
  job_start: yup
    .string()
    .companyRequired('Tanggal mulai pekerjaan tidak boleh kosong'),
  payday: yup.string().companyRequired('Tanggal gajian tidak boleh kosong'),
  last_education: yup
    .string()
    .required('Pendidikan terakhir tidak boleh kosong'),
};

//page 4
const financialValidation = {
  loan_purpose: yup.string().required('Tujuan pinjaman tidak boleh kosong'),
  loan_purpose_desc: yup
    .string()
    .required('Deskripsi tujuan pinjaman tidak boleh kosong')
    .doubleSpace('Tidak boleh double spasi')
    .breakLines('Tidak boleh menggunakan enter')
    .englishCharacters('Mohon gunakan huruf alphabet')
    .min(40, 'Minimal 40 karakter'),
  monthly_income: yup
    .string()
    .required('Penghasilan perbulan tidak boleh kosong')
    .currencyValidator('Tidak boleh diawali angka 0'),
  monthly_housing_cost: yup
    .string()
    .required('Total cicilan/sewa rumah per bulan tidak boleh kosong')
    .currencyValidator('Tidak boleh diawali angka 0'),
  monthly_expenses: yup
    .string()
    .required('Total pengeluaran rumah tangga per bulan tidak boleh kosong')
    .currencyValidator('Tidak boleh diawali angka 0'),
  total_current_debt: yup
    .string()
    .required('Total cicilan hutang per bulan tidak boleh kosong')
    .currencyValidator('Tidak boleh diawali angka 0'),
  bank_name: yup.string().required('Nama bank tidak boleh kosong'),
  bank_account_number: yup
    .string()
    .matches(/^[0-9]*$/, 'Nomor rekening harus angka')
    .min(5, 'Minimal 5 karakter')
    .required('Nomor rekening tidak boleh kosong'),
  referral_code: yup
    .string()
    .matches(/^[a-zA-Z0-9]*$/, 'Referral harus angka atau huruf'),
};

export const schemaPersonalIdentity = yup
  .object()
  .shape(personalIdentityValidation);

export const schemaFamilyInformation = yup
  .object()
  .shape(familyInformationValidation);

export const schemaJobAndEducation = yup
  .object()
  .shape(jobAndEducationValidation);

export const schemaFinancialValidation = yup
  .object()
  .shape(financialValidation);
