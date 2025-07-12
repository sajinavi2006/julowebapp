import utils from 'utils';

export const BASE_DATA = {
  token: utils.store.get('token'),
  partner: utils.store.get('partner'),
  appStatus: utils.store.get('appStatus'),
  accountId: utils.store.get('accountId'),
  fullname: utils.store.get('fullname'),
  phone: utils.store.get('phone'),
  username: '',
  pin: '',
  count: 0,
  isPhotoDialogShown: false,
  notificationDuration: 10000,
  webVersion: '0.0.1',
  errorDivPaddingTop: '10px',
  cameraAllowError:
    'Untuk melanjutkan proses pengajukan, mohon izinkan penggunaan kamera pada perangkat Anda.',
  jobTypes: [
    'pengusaha',
    'staf rumah tangga',
    'freelance',
    'pegawai swasta',
    'pegawai negeri',
  ],
  provinces: [],
  regencies: [],
  villages: [],
  subDistrict: [],
  invalidPhoneError1Flg: true,
  invalidPhoneError2Flg: true,
  invalidDataFlg: true,
};
