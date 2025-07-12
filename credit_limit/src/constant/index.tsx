import iconActiveAccount from 'assets/img/icon/ic-active_account.png';
import iconCard100 from 'assets/img/icon/ic-card_100.png';
import iconChecklist from 'assets/img/icon/ic-checklist_green_round.svg';
import iconDocumentSent from 'assets/img/icon/ic-document_sent.svg';

import logoBankBCA from 'assets/img/logo/Bank-BCA.svg';
import logoBankBNI from 'assets/img/logo/Bank-BNI.svg';
import logoBankBRI from 'assets/img/logo/Bank-BRI.svg';
import logoBankMandiri from 'assets/img/logo/Bank-Mandiri.svg';
import logoNameBlue from 'assets/img/logo/logo-name_blue.png';

import backgroundCard100 from 'assets/img/background/bg-card_100.jpg';

import { text } from 'assets/css/stylesValue';

export const DATE_OF_BIRTH = new Date('01/01/1990').toString();
export const MIN_WIDTH = 320;
export const MAX_WIDTH = 500;
export const MAX_WIDTH_2 = 400;
export const Z_INDEX_DIALOG = 1200;
export const ACTIVATION_TIMER = 15000; // 302000 5 minutes in epoch
export const MAX_WINDOW_WIDTH =
  window.innerWidth < 500 ? window.innerWidth - 28 : 472;
export const downloadAppUrl = 'https://go.onelink.me/app/downloadbutton';

export const redirectStatus = {
  activationSuccess: 'activation_success',
  unregistered: 'unregistered',
  verificationOnProcess: 'verification_on_process',
  activationSystemError: 'activation_system_error',
  systemError: 'system_error',
};

export const whitelistedPartnerCropImageSelfie = ['linkaja'];

export const blacklistedPartnerLiveness = ['linkaja'];

export const whitelistedPartner = [
  'klar',
  '99usahaku',
  'finfleet',
  'j1',
  'klop',
  'linkaja',
  'sellury',
  'olx',
  'rentee',
  'paylater',
  'dana',
  'cermati',
  'smartfren',
  'jeff',
  'digifin',
  'myim3',
];

export const whitelistedTnCPartner = ['cashbac'];

export const blacklistedRegisterFlowJ1 = ['klop'];

export const listedLongformField = {
  rentee: {
    hide: ['address_kodepos'],
    disable: [],
  },
  linkaja: {
    hide: ['gmaps', 'bank_scrapping'],
    disable: ['mobile_phone_1', 'get_settings', 'get_home_info'],
  },
  j1: {
    hide: ['address_kodepos'],
    disable: [],
  },
  paylater: {
    hide: ['address_kodepos', 'mobile_phone_1'],
    disable: [],
  },
};
export const BREAKPOINT: Record<string, number> = {
  xsmall: 320,
  small: 499,
  medium: 768,
  large: 992,
  extraLarge: 1200,
};

export const colsMinMax = (
  keyBreakPointMin: string,
  keyBreakPointMax: string,
) => {
  const breakPointArray = Object.keys(BREAKPOINT).map((key) => [
    key,
    BREAKPOINT[key],
  ]);

  const [resultMax] = breakPointArray.reduce(
    (current, [name, size]) =>
      keyBreakPointMax === name
        ? [...current, `@media screen and (max-width: ${size}px)`]
        : current,
    [],
  );
  const [resultMin] = breakPointArray.reduce(
    (current, [name, size]) =>
      keyBreakPointMin === name
        ? [...current, `and (min-width: ${size}px)`]
        : current,
    [],
  );
  return `${resultMax} ${resultMin}`;
};

export const NAVBAR_MENU_AUTH = [
  {
    title: 'Masuk',
    url: '',
    page: 'login',
    config: {
      type: 'text',
      baseColor: '#fff',
      hoverColor: '#0084B8',
    },
  },
  {
    title: 'Daftar',
    url: '',
    page: 'signup',
    config: {
      type: 'text',
      baseColor: '#fff',
      hoverColor: '#0084B8',
    },
  },
  {
    title: 'Download',
    url: 'https://go.onelink.me/zOQD/Webapp',
    page: '',
    config: {
      urlType: 'windowOpen',
      type: 'button',
      baseColor: '#fff',
      hoverColor: '#0084B8',
    },
  },
];

export const NAVBAR_MENU = [
  {
    title: 'Download',
    url: 'https://go.onelink.me/zOQD/Webapp',
    page: '',
    config: {
      urlType: 'windowOpen',
      type: 'button',
      baseColor: '#fff',
      hoverColor: '#0084B8',
    },
  },
];

// Card for skinny page
export const CARD_STATUS_100 = {
  cards: [
    {
      type: 1,
      title: {
        colour: '#FFFFFF',
        text: 'Lanjutkan Pengajuan Anda',
      },
      content: {
        colour: '#FFFFFF',
        text: 'Formulir pengajuan Anda belum selesai, silahkan lanjutkan pengisian sekarang',
      },
      button: [
        {
          colour: '#13637b',
          text: 'Lanjutkan Isi Formulir',
          textcolour: '#FFFFFF',
          action_type: 'redirect',
          destination: 'application/personal_identity',
          background_img: null,
          border: null,
        },
      ],
      image_icn: iconCard100,
      background_img: backgroundCard100,
      border: null,
    },
  ],
};

// Card for waiting API after submit
export const CARD_STATUS_100_LINKAJA = {
  cards: [
    {
      type: 1,
      title: {
        colour: '#FFFFFF',
        text: 'Data Kamu Sedang Ditinjau',
      },
      content: {
        colour: '#FFFFFF',
        text: 'Pengajuan kamu sedang diproses. Silakan muat ulang halaman ini secara berkala.',
      },
      button: [
        {
          colour: '#13637b',
          text: 'Muat Ulang',
          textcolour: '#FFFFFF',
          action_type: 'reload',
          destination: '',
          background_img: null,
          border: null,
        },
      ],
      image_icn: iconCard100,
      background_img: backgroundCard100,
      border: null,
    },
  ],
};

export const BANK_LIST = [
  {
    name: 'bca',
    image: logoBankBCA,
  },
  {
    name: 'bni',
    image: logoBankBNI,
  },
  {
    name: 'bri',
    image: logoBankBRI,
  },
  {
    name: 'mandiri',
    image: logoBankMandiri,
  },
];

const DROPDOWN_SELECT_DOCUMENT = [
  {
    id: 1,
    title: 'Informasi Bank',
  },
  {
    id: 2,
    title: 'Informasi BPJS',
  },
  {
    id: 3,
    title: 'Slip Gaji',
  },
  {
    id: 4,
    title: 'Mutasi Rekening',
  },
];

export const DIALOG_INVALID_TOKEN = {
  img: null,
  title: {
    text: 'Sesi anda telah berakhir.',
  },
  message: {
    text: 'Silahkan login kembali.',
  },
  button: [
    {
      text: 'Tutup',
      action: 'close',
      url: '',
    },
  ],
};

export const DIALOG_INVALID_URL_PARAMS_WEBVIEW = {
  img: null,
  title: {
    text: 'URL anda tidak valid.',
  },
  message: {
    text: 'Silahkan tutup halaman ini dan coba beberapa saat lagi.',
  },
  button: [],
};

export const DIALOG_INVALID_FLOW_REGISTER_KLOP = {
  img: null,
  title: {
    text: 'Tidak dapat melakukan registrasi',
  },
  message: {
    text: 'Mohon registrasi melalui aplikasi KLOP',
  },
  button: [],
};

export const BROWSER_NOT_SUPPORT_CAMERA = {
  img: null,
  title: {
    text: 'Browser tidak support.',
  },
  message: {
    text: 'Silahkan gunakan browser lain.',
  },
  button: [
    {
      text: 'Tutup',
      action: 'close',
      url: '',
    },
  ],
};

export const FORM_131 = [
  {
    title: 'KTP',
    name: 'ktp_self',
    isRequired: true,
    value: '',
  },
  {
    title: 'Selfie dengan KTP',
    name: 'selfie',
    isRequired: true,
    value: '',
  },
  {
    title: 'Bukti Penghasilan',
    key: 'income',
    isRequired: false,
    descriptionIsRequired:
      'Upload salah satu dari Bukti Penghasilan seperti Slip Gaji atau Mutasi Rekening.',
    information:
      'Jika melengkapi dua dokumen Bukti Penghasilan, peluang pinjaman Anda disetujui menjadi lebih besar !',
    formLength: 2,
    dropdown: [
      {
        title: 'Slip Gaji',
        name: 'paystub',
        value: '',
      },
      {
        title: 'Mutasi Rekening',
        name: 'bank_statement',
        value: '',
      },
    ],
  },
];

export const RANGE_FUND = [
  {
    title: '500.000',
    value: 500000,
  },
  {
    title: '1.000.000',
    value: 1000000,
  },
  {
    title: '1.500.000',
    value: 1500000,
  },
  {
    title: '2.000.000',
    value: 2000000,
  },
  {
    title: '2.500.000',
    value: 2500000,
  },
  {
    title: '3.000.000',
    value: 3000000,
  },
  {
    title: '3.500.000',
    value: 3500000,
  },
  {
    title: '4.000.000',
    value: 4000000,
  },
];

export const LINKAJA_RETRY_TIME = 3;

export const LOAN_TIME_PERIOD = [
  {
    title: '1 Bulan',
    value: 1,
  },
  {
    title: '2 Bulan',
    value: 2,
  },
  {
    title: '3 Bulan',
    value: 3,
  },
  {
    title: '4 Bulan',
    value: 4,
  },
  {
    title: '5 Bulan',
    value: 5,
  },
  {
    title: '6 Bulan',
    value: 6,
  },
  {
    title: '7 Bulan',
    value: 7,
  },
  {
    title: '8 Bulan',
    value: 8,
  },
  {
    title: '9 Bulan',
    value: 9,
  },
  {
    title: '10 Bulan',
    value: 10,
  },
  {
    title: '11 Bulan',
    value: 11,
  },
  {
    title: '12 Bulan',
    value: 12,
  },
];

export const cardCase = (value: string) => {
  switch (value) {
    case 'webpage':
      return {
        type: 'Acount Activate',
        title: 'Horeee! akun JULO mu sudah aktif 🎉',
        message: {
          text: 'Yuk, lakukan transaksi pertamamu sekarang lewat aplikasi JULO, install sekarang!',
          size: '14',
        },
        button: {
          text: 'Download Aplikasi',
          action: null,
          url: null,
        },
        image: iconActiveAccount,
        dialog: {
          img: logoNameBlue,
          title: {
            text: 'Download Aplikasi JULO',
          },
          message: {
            text: 'Untuk mengakses semua produk, Anda wajib mendownload aplikasi JULO terlebih dahulu',
          },
          button: [
            {
              text: 'Download Aplikasi',
              action: 'url',
              urlType: 'windowOpen',
              url: 'https://go.onelink.me/zOQD/Webapp',
            },
          ],
        },
      };
    case 'webpage1':
      return {
        type: 'Acount Activate',
        title: 'Horeee! akun JULO mu sudah aktif 🎉',
        message: {
          text: 'Yuk, lakukan transaksi pertamamu sekarang lewat aplikasi JULO, install sekarang!',
          size: '14',
        },
        button: {
          text: 'Download Aplikasi',
          action: null,
          url: null,
        },
        image: iconActiveAccount,
        dialog: {
          img: logoNameBlue,
          title: {
            text: 'Download Aplikasi JULO',
          },
          message: {
            text: 'Untuk pengisian form kembali, Anda wajib mendownload aplikasi JULO terlebih dahulu',
          },
          button: [
            {
              text: 'Download Aplikasi',
              action: 'url',
              urlType: 'windowOpen',
              url: 'https://go.onelink.me/zOQD/Webapp',
            },
          ],
        },
      };
    case 'appl_docs':
      return {
        dialog: {
          img: '',
          title: {
            text: 'Tinggal sedikit lagi',
          },
          message: {
            text: 'Mohon lengkapi dokumen yang dibutuhkan untuk menyelesaikan proses pengajuan',
          },
          button: [
            {
              text: 'Lanjutkan',
              action: 'form',
              url: null,
            },
          ],
        },
        dialogForm: {
          type: 'dropdown',
          img: '',
          dropdownMenu: DROPDOWN_SELECT_DOCUMENT,
          title: {
            text: 'Lengkapi Dokumen Tambahan',
          },
          titleMenuMandatory: 'Bukti Penghasilan',
          titleMenuOptional: 'Unggah Bukti Lainnya',
          message: {
            text: 'Anda perlu melengkapi dokumen yang dibutuhkan untuk dapat melanjutkan proses pengajuan.',
          },
          button: {
            text: 'Unggah Dokumen',
            action: 'On Review',
            url: null,
          },
        },
      };
    case '131':
      return {
        dialog: {
          img: '',
          title: {
            text: 'Tinggal sedikit lagi',
          },
          message: {
            text: 'Mohon lengkapi dokumen yang dibutuhkan untuk menyelesaikan proses pengajuan',
          },
          button: [
            {
              text: 'Lanjutkan',
              action: 'form',
              url: null,
            },
          ],
        },
        dialogForm: {
          type: 'fixed',
          img: '',
          title: {
            text: 'Dokumen Pendukung',
          },
          titleMenuMandatory: 'Bukti Penghasilan',
          titleMenuOptional: 'Unggah Bukti Lainnya',
          message: {
            text: 'Jika melengkapi Mutasi Rekening atau Bukti Penghasilan, peluang pinjaman anda untuk disetujui 30% lebih besar !',
          },
          button: {
            text: 'Kirim Dokumen',
            action: 'On Review',
            url: null,
          },
        },
      };
    case 'appl_main':
      return {
        dialog: {
          img: '',
          title: {
            text: 'Tinggal sedikit lagi',
          },
          message: {
            text: 'Mohon lengkapi dokumen yang dibutuhkan untuk menyelesaikan proses pengajuan',
          },
          button: [
            {
              text: 'Lanjutkan',
              action: 'form',
              url: null,
            },
          ],
        },
        dialogForm: {
          type: 'dropdown',
          img: '',
          dropdownMenu: DROPDOWN_SELECT_DOCUMENT,
          title: {
            text: 'Lengkapi Dokumen Tambahan',
          },
          titleMenuMandatory: 'Bukti Penghasilan',
          titleMenuOptional: 'Unggah Bukti Lainnya',
          message: {
            text: 'Anda perlu melengkapi dokumen yang dibutuhkan untuk dapat melanjutkan proses pengajuan.',
          },
          button: {
            text: 'Unggah Dokumen',
            action: 'On Review',
            url: null,
          },
        },
      };
    case 'reapply_j1':
      return {
        dialog: {
          img: '',
          title: {
            text: 'Tinggal sedikit lagi',
          },
          message: {
            text: 'Mohon lengkapi dokumen yang dibutuhkan untuk menyelesaikan proses pengajuan',
          },
          button: [
            {
              text: 'Lanjutkan',
              action: 'form',
              url: null,
            },
          ],
        },
        dialogForm: {
          type: 'dropdown',
          img: '',
          dropdownMenu: DROPDOWN_SELECT_DOCUMENT,
          title: {
            text: 'Lengkapi Dokumen Tambahan',
          },
          titleMenuMandatory: 'Bukti Penghasilan',
          titleMenuOptional: 'Unggah Bukti Lainnya',
          message: {
            text: 'Anda perlu melengkapi dokumen yang dibutuhkan untuk dapat melanjutkan proses pengajuan.',
          },
          button: {
            text: 'Unggah Dokumen',
            action: 'On Review',
            url: null,
          },
        },
      };
    case 'j1_appl_docs':
      return {
        dialog: {
          img: '',
          title: {
            text: 'Tinggal sedikit lagi',
          },
          message: {
            text: 'Mohon lengkapi dokumen yang dibutuhkan untuk menyelesaikan proses pengajuan',
          },
          button: [
            {
              text: 'Lanjutkan',
              action: 'form',
              url: null,
            },
          ],
        },
        dialogForm: {
          type: 'dropdown',
          img: '',
          dropdownMenu: DROPDOWN_SELECT_DOCUMENT,
          title: {
            text: 'Lengkapi Dokumen Tambahan',
          },
          titleMenuMandatory: 'Bukti Penghasilan',
          titleMenuOptional: 'Unggah Bukti Lainnya',
          message: {
            text: 'Anda perlu melengkapi dokumen yang dibutuhkan untuk dapat melanjutkan proses pengajuan.',
          },
          button: {
            text: 'Unggah Dokumen',
            action: 'On Review',
            url: null,
          },
        },
      };
    case 'On Review':
      return {
        type: 'On Review',
        title: 'Formulir Anda sedang dalam proses',
        message: {
          text: 'Mohon menunggu, formulir Anda sedang di proses oleh team JULO',
          size: '16',
        },
        button: {
          text: null,
          action: null,
          url: null,
        },
        image: null,
        dialog: {
          img: iconDocumentSent,
          title: {
            text: 'Selamat!',
          },
          message: {
            text: 'Dokumen Bukti Penghasilan Anda telah berhasil diunggah. Silahkan tunggu hingga proses verifikasi data Anda selesai.',
          },
          button: [
            {
              text: 'Lanjutkan',
              action: '',
            },
          ],
        },
      };
    case 'Success Submit':
      return {
        type: 'Success Submit',
        title: 'Selamat!',
        message: {
          text: 'Dokumen Bukti Penghasilan Anda telah berhasil diunggah. Silahkan tunggu hingga proses verifikasi data Anda selesai.',
          size: '16',
        },
        button: {
          text: 'Tutup',
          action: null,
          url: null,
        },
        image: iconDocumentSent,
      };
    case 'Wrong KTP':
      return {
        type: 'Wrong KTP',
        title: 'Tinggal sedikit lagi',
        message: {
          text: 'Terjadi kesalahan pada hasil foto KTP yang Anda masukkan. Silahkan perbaiki foto KTP Anda sekarang.',
          size: '16',
        },
        button: {
          text: 'Perbaiki Foto',
          action: 'form',
          url: null,
        },
        image: null,
        dialog: {
          img: iconDocumentSent,
          title: {
            text: 'Selamat!',
          },
          message: {
            text: 'Foto identitas Anda telah berhasil diunggah. Silahkan tunggu hingga proses verifikasi data Anda selesai.',
          },
          button: [
            {
              text: 'Lanjutkan',
              action: '',
            },
          ],
        },
        dialogForm: {
          type: 'fixed',
          img: '',
          dropdownMenu: null,
          form: [
            {
              title: 'KTP',
              type: 'ktp',
            },
          ],
          title: {
            text: 'Perbaiki Foto',
          },
          message: {
            text: 'Pastikan upload foto Identitas Anda dengan jelas agar dapat melanjutkan proses pengajuan pinjaman',
          },
          button: {
            text: 'Submit',
            action: 'On Review',
            url: null,
          },
        },
      };
    case 'Wrong Selfie':
      return {
        type: 'Wrong Selfie',
        title: 'Tinggal sedikit lagi',
        message: {
          text: 'Terjadi kesalahan pada hasil foto selfie yang Anda masukkan. Silahkan perbaiki foto selfie Anda sekarang.',
          size: '16',
        },
        button: {
          text: 'Perbaiki Foto',
          action: 'form',
          url: null,
        },
        image: null,
        dialog: {
          img: iconDocumentSent,
          title: {
            text: 'Selamat!',
          },
          message: {
            text: 'Foto identitas Anda telah berhasil diunggah. Silahkan tunggu hingga proses verifikasi data Anda selesai.',
          },
          button: [
            {
              text: 'Lanjutkan',
              action: '',
            },
          ],
        },
        dialogForm: {
          type: 'fixed',
          img: '',
          dropdownMenu: null,
          form: [
            {
              title: 'Selfie',
              type: 'selfie',
            },
          ],
          title: {
            text: 'Perbaiki Foto',
          },
          message: {
            text: 'Pastikan upload foto Identitas Anda dengan jelas agar dapat melanjutkan proses pengajuan pinjaman',
          },
          button: {
            text: 'Submit',
            action: 'On Review',
            url: null,
          },
        },
      };
    case 'Wrong KTP & Selfie':
      return {
        type: 'Wrong KTP & Selfie',
        title: 'Tinggal sedikit lagi',
        message: {
          text: 'Terjadi kesalahan pada hasil foto KTP dan selfie yang Anda masukkan. Silahkan perbaiki foto KTP dan selfie Anda sekarang.',
          size: '16',
        },
        button: {
          text: 'Perbaiki Foto',
          action: 'form',
          url: null,
        },
        image: null,
        dialog: {
          img: iconDocumentSent,
          title: {
            text: 'Selamat!',
          },
          message: {
            text: 'Foto identitas Anda telah berhasil diunggah. Silahkan tunggu hingga proses verifikasi data Anda selesai.',
          },
          button: [
            {
              text: 'Lanjutkan',
              action: '',
            },
          ],
        },
        dialogForm: {
          type: 'fixed',
          img: '',
          dropdownMenu: null,
          form: [
            {
              title: 'KTP',
              type: 'ktp',
            },
            {
              title: 'Selfie',
              type: 'selfie',
            },
          ],
          title: {
            text: 'Perbaiki Foto',
          },
          message: {
            text: 'Pastikan upload foto Identitas Anda dengan jelas agar dapat melanjutkan proses pengajuan pinjaman',
          },
          button: {
            text: 'Submit',
            action: 'On Review',
            url: null,
          },
        },
      };
    case 'Rentee transaction success':
      return {
        dialog: {
          img: iconChecklist,
          title: {
            text: 'Transaksi Sukses',
          },
          message: {
            text: (
              <span>
                Mohon hubungi{' '}
                <span className={text({ weight: 'bold' })}>
                  Erajaya Retail Officer (ERO)
                </span>{' '}
                untuk memasukkan transaksi di kasir
              </span>
            ),
          },
          button: [
            {
              text: 'Kembali',
              action: 'Close Rentee transaction success',
            },
          ],
        },
      };
    case 'Transaction success':
      return {
        dialog: {
          img: iconChecklist,
          title: {
            text: 'Transaksi Sukses',
          },
          message: {
            text: 'Silahkan tutup pesan ini.',
          },
          button: [
            {
              text: 'Kembali',
              action: 'Close transaction success',
            },
          ],
        },
      };
    default:
      break;
  }
};
