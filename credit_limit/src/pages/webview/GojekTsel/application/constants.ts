import * as yup from 'yup';

import 'utils/yup/string';
import { ApplicationParams } from './types';
import { ApplicationForm, SuccessPage } from './components/pages';

export const ApplicationPages = [ApplicationForm, SuccessPage];

export const defaultValues: ApplicationParams = {
  nik: '',
  name: '',
  email: '',
  phoneNumber: '',
  otherPhoneNumber: '',
  agreementRegistration: false,
  agreementTnc: false,
};

const SCHEME_ERROR_MESSAGES = {
  minNik: 'NIK Minimum 16 karakter',
  nikFormat: 'Format NIK tidak sesuai',

  doubleSpaceName: 'Nama tidak boleh menggunakan 2 spasi sekaligus',
  nameFormat: 'Format nama tidak dapat diisi dengan angka atau simbol',
  minName: 'Minimal 3 karakter',

  emailFormat: 'Email tidak sesuai format. Contoh: username@gmail.com',
  emailFormatWithoutExample: 'Email tidak sesuai format',

  phoneNumberIsEqual: 'Nomor HP harus berbeda',
  otherPhoneNumberIsEqual: 'Nomor HP Lainnya harus berbeda',
  phoneNumberFormat: 'Nomor HP tidak sesuai format. Contoh: 8123456789',

  wrongFormat: 'Format tidak sesuai',
};

const schemes = {
  name: yup
    .string()
    .min(3, SCHEME_ERROR_MESSAGES['minName'])
    .doubleSpace(SCHEME_ERROR_MESSAGES['doubleSpaceName']),
  nik: yup
    .string()
    .min(16, SCHEME_ERROR_MESSAGES['minNik'])
    .nikValidator(SCHEME_ERROR_MESSAGES['nikFormat']),

  email: yup
    .string()
    .email(SCHEME_ERROR_MESSAGES['emailFormat'])
    .emailFormat(SCHEME_ERROR_MESSAGES['emailFormat'])
    .doubleSpace(SCHEME_ERROR_MESSAGES['emailFormatWithoutExample']),

  phoneNumber: yup
    .string()
    .min(10, SCHEME_ERROR_MESSAGES['phoneNumberFormat'])
    .matches(/^8[0-9]+$/, SCHEME_ERROR_MESSAGES['phoneNumberFormat'])
    .test(
      'is-phone-number-equal-other-phone-number',
      SCHEME_ERROR_MESSAGES['phoneNumberIsEqual'],
      (value, context) => {
        return context.parent.otherPhoneNumber !== value;
      },
    ),

  otherPhoneNumber: yup
    .string()
    .matches(/^(8[0-9]{9,})$/, {
      message: SCHEME_ERROR_MESSAGES['phoneNumberFormat'],
      excludeEmptyString: true,
    })
    .test(
      'is-other-phone-number-equal-phone-number',
      SCHEME_ERROR_MESSAGES['otherPhoneNumberIsEqual'],
      (value, context) => {
        if (!context.parent.phoneNumber) return true;
        return context.parent.phoneNumber !== value;
      },
    ),

  agreementRegistration: yup.boolean(),
  agreementTnc: yup.boolean(),
};

export const applicationFormSchema = yup.object().shape(schemes);
