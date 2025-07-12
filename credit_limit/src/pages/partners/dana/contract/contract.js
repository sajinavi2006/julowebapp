import React from 'react';
import { cx } from '@emotion/css';
import { fontWeight, text, width } from 'assets/css/stylesValue';
import { tableNumber, tableContent } from './style';
import { useLocation } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import Layout from 'components/Layout';
import formatMoney from '@julofinance/web-helpers/dist/string/formatMoney';

import ojk from 'assets/img/OJK.svg';

import { Card, Div, Img, Wrapper, Row, Col } from 'assets/css/styled';
import {
  dBlock,
  ml0,
  mt2,
  mt3,
  mr0,
  mb0,
  mb2,
  mb3,
  mb4,
  mb5,
  pl0,
  pr0,
  pr2,
  px0,
  w100,
  dFlex,
  pr3,
  textLeft,
} from 'assets/css/stylesFix';

/**
 * Route: /dana/contract
 */

const DanaContract = () => {
  const theme = useTheme();
  const themeColors = theme?.colors;
  const themeCardPrimary = theme?.cardPrimary;
  const URLParams = useLocation();
  const {
    customer_name,
    customer_nik,
    customer_phone,
    date_today,
    dob,
    due_date_1,
    due_date_2,
    due_date_3,
    due_date_4,
    full_address,
    interest_amount,
    late_fee_rate,
    loan_amount,
    maximum_late_fee_amount,
    partner_email,
    partner_privacy_rule,
    partner_tnc,
    payment_amount_1,
    payment_amount_2,
    payment_amount_3,
    payment_amount_4,
  } = Object.fromEntries(new URLSearchParams(URLParams.search)) || {};

  const decodeBase64 = (value) => {
    // handle error from encode base64
    try {
      const result = window.atob(value);
      return result;
    } catch {
      return '';
    }
  };

  return (
    <Layout
      barBackTitle='Surat Perjanjian'
      barBackType=''
      barBackHideImage
      contentBackground={themeColors?.backgroundColorPrimary}
      fullWidth
      hideNavbar
      disableBarBackRedirect
    >
      <Wrapper padding='0px'>
        <Card
          rounded
          boxShadow={themeCardPrimary?.boxShadow}
          className={`${mb4}`}
        >
          <Div>
            <Div textAlign='center' fontWeight='bold'>
              PERJANJIAN PEMBERIAN PENDANAAN <br /> No. Perjanjian : ...
              <br />
              <br />
            </Div>
            <Div textAlign='justify'>
              Sebagai persyaratan awal sebelum Anda menandatangani Perjanjian
              Pemberian Pendanaan ini (selanjutnya disebut&nbsp;
              <b>"Perjanjian Pendanaan</b>”), Anda wajib membaca, memeriksa,
              memahami Perjanjian Pendanaan ini dengan memindahkan bilah gulir (
              <i>scroll bar</i>) atau menekan tombol persetujuan (
              <i>approval button</i>) yang tersedia pada Perjanjian Pendanaan
              ini, dengan penuh cermat dan kehati-hatian.{' '}
              <b>
                Tidak ada tuntutan/gugatan apapun oleh Anda kepada Pemberi Dana
                dan/atau JULO dari segala tanggung jawab terhadap kerugian yang
                terjadi disebabkan dari kealpaan atau kelalaian Anda dengan
                tidak membaca, memeriksa atau memahami isi seluruh perjanjian
                Pendanaan ini.
              </b>
            </Div>
            <Div>
              Perjanjian Pendanaan ini disepakati dan ditandatangani pada
              tanggal {date_today} (selanjutnya disebut “
              <b>Tanggal Penandatanganan</b>”), oleh dan antara :
            </Div>
            <table
              className={w100}
              style={{ borderCollapse: 'separate', borderSpacing: '0 0.5em' }}
            >
              <tbody>
                <tr>
                  <td className={cx(tableNumber, pr2)}>1. </td>
                  <td className={tableContent}>
                    <b>{decodeBase64(customer_name) || ''}</b> - adalah orang
                    perseorangan Warga Negara Indonesia dengan detail identitas
                    diri sebagai berikut :
                    <table className={w100}>
                      <tbody>
                        <tr>
                          <td className={cx(tableNumber, width('20px'))}>a.</td>
                          <td className={cx(textLeft, dFlex)}>Tanggal Lahir</td>
                          <td className={cx(tableNumber, width('20px'))}>:</td>
                          <td className={dFlex}>{dob}</td>
                        </tr>
                        <tr>
                          <td className={cx(tableNumber, width('20px'))}>b.</td>
                          <td className={cx(textLeft, dFlex)}>
                            No. KTP
                          </td>
                          <td className={cx(tableNumber, width('20px'))}>:</td>
                          <td className={dFlex}>
                            {decodeBase64(customer_nik) || ''}
                          </td>
                        </tr>
                        <tr>
                          <td className={cx(tableNumber, width('20px'))}>c.</td>
                          <td className={cx(textLeft, dFlex)}>
                            No. Telp
                          </td>
                          <td className={cx(tableNumber, width('20px'))}>:</td>
                          <td className={dFlex}>
                            {customer_phone}
                          </td>
                        </tr>
                        <tr>
                          <td className={cx(tableNumber, width('20px'))}>d.</td>
                          <td className={cx(pr3, dFlex, textLeft)}>Alamat</td>
                          <td className={cx(tableNumber, width('20px'))}>:</td>
                          <td className={cx(width('55%'), dFlex)}>
                            {full_address}
                          </td>
                        </tr>
                        <tr>
                          <td></td>
                          <td colspan="3">
                            (selanjutnya disebut <b>“Anda” atau “Penerima Dana”</b>
                            ).
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td className={cx(tableNumber, pr2)}>2. </td>
                  <td className={tableContent}>
                    <b>Pemberi Dana</b> yaitu perusahaan atau orang
                    perseorangan dengan detail identitas legalitas sebagai berikut :
                    <table className={w100}>
                      <tbody>
                        <tr>
                          <td className={cx(tableNumber, width('20px'))}>a.</td>
                          <td className={cx(textLeft, dFlex)}>Nama/Perusahaan</td>
                          <td className={cx(tableNumber, width('20px'))}>:</td>
                          <td className={dFlex}>PT Julo Teknologi Perdana</td>
                        </tr>
                        <tr>
                          <td className={cx(tableNumber, width('20px'))}>b.</td>
                          <td className={cx(textLeft, dFlex)}>
                            Nama Perwakilan Perusahaan
                          </td>
                          <td className={cx(tableNumber, width('20px'))}>:</td>
                          <td className={dFlex}>H. Sebastian</td>
                        </tr>
                        <tr>
                          <td className={cx(tableNumber, width('20px'))}>c.</td>
                          <td className={cx(textLeft, dFlex)}>
                            Nomor Izin Perusahaan Terkait
                          </td>
                          <td className={cx(tableNumber, width('20px'))}>:</td>
                          <td className={dFlex}>9120008631626</td>
                        </tr>
                        <tr>
                          <td className={cx(tableNumber, width('20px'))}>d.</td>
                          <td className={cx(pr3, dFlex, textLeft)}>Alamat Terdaftar</td>
                          <td className={cx(tableNumber, width('20px'))}>:</td>
                          <td className={cx(width('55%'), dFlex)}>
                            Eightyeight@kasablanka office tower Lt. 10 Unit E,
                            Jl. Casablanca Raya Kav. 88, Menteng Dalam, Tebet, DKI Jakarta
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <Div textAlign='justify'>
              Untuk selanjutnya, Penerima Dana dan Pemberi Dana secara
              bersama-sama disebut juga <b>“Para Pihak”</b> dan masing-masing
              disebut <b>"Pihak"</b>.
              <br />
              <br />
              Anda juga diwajibkan membaca{' '}
              <b>Lampiran 1. Syarat dan Ketentuan Penggunaan</b> yang disediakan
              oleh JULO dan/atau Mitra Bisnis. Dengan Anda menekan fitur
              persetujuan (<i>consent</i>) yang akan muncul pada halaman
              Aplikasi Anda pada saat pengajuan Pendanaan, maka berarti Anda
              juga telah menyetujui Syarat dan Ketentuan Penggunaan sebagaimana
              laman website diatas. Syarat dan Ketentuan Penggunaan ini
              merupakan bagian yang tidak terpisahkan dengan Perjanjian
              Pendanaan serta Syarat dan Ketentuan Penggunaan ini dapat berubah
              dari waktu ke waktu sesuai kebijakan JULO dan/atau Mitra Bisnis
              dan tanpa memerlukan persetujuan Para Pihak.
              <br />
            </Div>
            <br />
            <Div textAlign='justify'>
              Perjanjian Pendanaan mencakup hal-hal sebagai berikut:
              <br />
              <br />
            </Div>

            {/*  PERJANJIAN PENDANAAN */}
            <table
              className={`${w100}`}
              style={{ borderCollapse: 'separate', borderSpacing: '0 0.2em' }}
            >
              <tbody>
                {/* 1. */}
                <tr>
                  <td className={cx(tableNumber, fontWeight('bold'))}>1.</td>
                  <td className={tableContent}>
                    <b>KETENTUAN UMUM</b>
                    <table className={`${w100}`}>
                      <tbody>
                        <tr>
                          {/* 1.1 */}
                          <td className={tableNumber}>1.1.</td>
                          <td className={tableContent}>
                            <b>Definisi</b>
                            <table>
                              <tbody>
                                <tr>
                                  <td className={tableNumber}>a.</td>
                                  <td className={tableContent}>
                                    <b>Akun</b> adalah rekening Pendanaan yang
                                    terdaftar berisi data tentang Anda dan dapat
                                    diakses melalui Sistem Elektronik JULO dan/atau Mitra
                                    Bisnis yang Anda unduh serta ditujukan untuk
                                    membantu Anda dalam mengakses kredit secara
                                    digital, melalui Sistem Elektronik JULO dan/atau
                                    Aplikasi Mitra Bisnis.
                                  </td>
                                </tr>
                                <tr>
                                  <td className={tableNumber}>b.</td>
                                  <td className={tableContent}>
                                    <b>Sistem Elektronik JULO</b> adalah perangkat lunak yang
                                    dimiliki oleh PT. Julo Teknologi Finansial.
                                  </td>
                                </tr>
                                <tr>
                                  <td className={tableNumber}>c.</td>
                                  <td className={tableContent}>
                                    <b>Aplikasi Mitra Bisnis</b> adalah perangkat lunak yang 
                                    Sistem Elektroniknya dimiliki oleh Mitra Bisnis dengan merek 
                                    “DANA” yang bekerjasama baik secara eksklusif maupun 
                                    inklusif dengan JULO, dengan mengunduhnya melalui 
                                    akun <i>playstore</i> atau <i>appstore</i> pada masing-masing 
                                    gawai (<i>gadget/device</i>) yang Anda miliki.
                                  </td>
                                </tr>
                                <tr>
                                  <td className={tableNumber}>d.</td>
                                  <td className={tableContent}>
                                    <b>Dokumen-Dokumen Elektronik</b> adalah
                                    setiap Informasi elektronik yang dibuat,
                                    diteruskan, dikirimkan, diterima, atau
                                    disimpan, dapat dilihat, ditampilkan,
                                    dan/atau didengar melalui Sistem Elektronik
                                    JULO termasuk antara lain Perjanjian
                                    Pendanaan beserta segala
                                    Lampiran-Lampirannya, syarat dan ketentuan
                                    JULO lainnya, kebijakan-kebijakan JULO
                                    lainnya, form-form di dalam aplikasi,
                                    dan/atau informasi elektronik lainnya yang
                                    tidak tertuang dalam Perjanjian Pendanaan
                                    ini tetapi masuk dalam Sistem Elektronik
                                    yang dimiliki oleh JULO.
                                  </td>
                                </tr>
                                <tr>
                                  <td className={tableNumber}>e.</td>
                                  <td className={tableContent}>
                                    <b>Pendanaan</b> adalah sebagaimana
                                    didefinisikan dalam pasal 1 ayat 1.4 huruf a
                                    Perjanjian Pendanaan ini.
                                  </td>
                                </tr>
                                <tr>
                                  <td className={tableNumber}>f.</td>
                                  <td className={tableContent}>
                                    <b>Fitur JULO</b> adalah sebagaimana yang
                                    didefinisikan dalam pasal 9.3., Perjanjian
                                    Pendanaan ini.
                                  </td>
                                </tr>
                                <tr>
                                  <td className={tableNumber}>g.</td>
                                  <td className={tableContent}>
                                    <b>JULO</b> adalah platform dengan merek
                                    dagang resmi yang terdaftar dan Sistem
                                    Elektronik yang dimiliki oleh PT. Julo
                                    Teknologi Finansial sebagai Pihak
                                    Penyelenggara yang terdaftar dan berizin di
                                    Otoritas Jasa Keuangan sebagai Penyelenggara
                                    Layanan Pendanaan Bersama Teknologi
                                    Informasi (LPBBTI), yang dalam Perjanjian
                                    ini dipilih oleh Pemberi Dana sebagai mitra
                                    penyedia aplikasi yang menyediakan LPBBTI.
                                  </td>
                                </tr>
                                <tr>
                                  <td className={tableNumber}>h.</td>
                                  <td className={tableContent}>
                                    <b>Kode PIN</b> adalah sejumlah kode unik
                                    atau nomor digit tertentu yang digunakan
                                    Penerima Dana untuk kepentingan sebagai
                                    sarana verifikasi untuk mendukung fungsi
                                    autentikasi Dokumen-Dokumen Elektronik.
                                  </td>
                                </tr>
                                <tr>
                                  <td className={tableNumber}>i.</td>
                                  <td className={tableContent}>
                                    <b>Layanan JULO</b> adalah LPBBTI, yang mana
                                    pada pokoknya mempertemukan Pemberi Dana
                                    dengan Penerima Dana dalam melakukan
                                    pendanaan konvensional secara langsung
                                    melalui Sistem Elektronik yang dimiliki dan
                                    dikelola mutlak oleh JULO.
                                  </td>
                                </tr>
                                <tr>
                                  <td className={tableNumber}>j.</td>
                                  <td className={tableContent}>
                                    <b>Merchant</b> adalah pihak ketiga yang
                                    bekerjasama dengan JULO sebagai penjual barang
                                    dan/atau jasa yang memiliki <i>physical store</i> atau
                                    bentuk usaha toko fisik maupun toko online
                                  </td>
                                </tr>
                                <tr>
                                  <td className={tableNumber}>k.</td>
                                  <td className={tableContent}>
                                    <b>Mitra Bisnis</b> adalah pihak ketiga yang
                                    bekerjasama dengan JULO dengan pola{' '}
                                    <i>partnership</i>/ kemitraan untuk
                                    menunjang bisnis JULO dalam memberikan
                                    Layanan JULO.
                                  </td>
                                </tr>
                                <tr>
                                  <td className={tableNumber}>l.</td>
                                  <td className={tableContent}>
                                    <b>OJK</b> adalah Otoritas Jasa Keuangan,
                                    yang merupakan Lembaga yang mengatur serta
                                    mengawasi perusahaan penyelenggaraan LPBBTI.
                                  </td>
                                </tr>
                                <tr>
                                  <td className={tableNumber}>m.</td>
                                  <td className={tableContent}>
                                    <b>Pemegang Akun</b> berarti sebagaimana
                                    yang didefinisikan pada Pasal 1.2 huruf a
                                    Perjanjian Pendanaan ini.
                                  </td>
                                </tr>
                                <tr>
                                  <td className={tableNumber}>n.</td>
                                  <td className={tableContent}>
                                    <b>Penerima Dana</b> adalah perorangan atau
                                    badan hukum yang menerima Pendanaan melalui
                                    Layanan JULO.
                                  </td>
                                </tr>
                                <tr>
                                  <td className={tableNumber}>o.</td>
                                  <td className={tableContent}>
                                    <b>Pemberi Dana</b> adalah perorangan atau
                                    badan hukum yang memberikan Pendanaan
                                    melalui Layanan JULO.
                                  </td>
                                </tr>
                                <tr>
                                  <td className={tableNumber}>p.</td>
                                  <td className={tableContent}>
                                    <b>Permohonan Pengajuan Pendanaan</b> adalah
                                    Permohonan yang dilakukan oleh Penerima Dana
                                    untuk mendapatkan persetujuan dari Pemberi
                                    Dana atas sebesar Pendanaan tertentu yang
                                    tersedia bagi Penerima Dana.
                                  </td>
                                </tr>
                                <tr>
                                  <td className={tableNumber}>q.</td>
                                  <td className={tableContent}>
                                    <b>Permohonan Penggunaan Pendanaan</b>{' '}
                                    adalah permohonan yang dilakukan oleh
                                    Penerima Dana untuk penggunaan/pencairan
                                    Pendanaan.
                                  </td>
                                </tr>
                                <tr>
                                  <td className={tableNumber}>r.</td>
                                  <td className={tableContent}>
                                    <b>Pokok Pinjaman</b>{' '}
                                    adalah sejumlah pendanaan yang diperoleh
                                    dari Fasilitas Pendanaan yang diperoleh
                                    Penerima Dana, yang besarannya sama setiap
                                    angsuran per bulannya.
                                  </td>
                                </tr>
                                <tr>
                                  <td className={tableNumber}>s.</td>
                                  <td className={tableContent}>
                                    <b>Sistem Elektronik</b> adalah serangkaian
                                    perangkat dan prosedur elektronik yang
                                    berfungsi mempersiapkan, mengumpulkan,
                                    mengolah, menganalisis, menyimpan,
                                    menampilkan, mengumumkan, mengirimkan,
                                    dan/atau menyebarkan Informasi Elektronik.
                                  </td>
                                </tr>
                                <tr>
                                  <td className={tableNumber}>t.</td>
                                  <td className={tableContent}>
                                    <b>Surat Kuasa</b> adalah surat yang berisi
                                    tentang pernyataan pemberian kuasa, yang
                                    diberikan oleh Pemberi Dana kepada JULO
                                    sebagai penerima kuasa untuk penandatanganan
                                    Perjanjian Pendanaan ini. Tidak ada
                                    interpretasi lain dalam Surat Kuasa selain
                                    hanya sebagai penerima kuasa untuk
                                    menandatangani Perjanjian Pendanaan.
                                  </td>
                                </tr>
                                <tr>
                                  <td className={tableNumber}>u.</td>
                                  <td className={tableContent}>
                                    <b>Surat Keterangan Lunas</b> adalah surat
                                    yang diberikan oleh setiap Pemberi Dana kepada
                                    Penerima Dana melalui JULO yang menyatakan bahwa Penerima Dana
                                    tidak ada lagi kewajiban pembayaran yang
                                    tertunggak berdasarkan Perjanjian Pendanaan
                                    ini.
                                  </td>
                                </tr>
                                <tr>
                                  <td className={tableNumber}>v.</td>
                                  <td className={tableContent}>
                                    <b>SKRTP</b> adalah sebagaimana yang
                                    didefinisikan di dalam pasal 2.1.7.,
                                    Perjanjian Pendanaan ini.
                                  </td>
                                </tr>
                                <tr>
                                  <td className={tableNumber}>w.</td>
                                  <td className={tableContent}>
                                    <b>Tanda Tangan Elektronik</b> adalah
                                    sebagaimana yang didefinisikan di dalam
                                    pasal 9.4 huruf a, Perjanjian Pendanaan ini.
                                  </td>
                                </tr>
                                <tr>
                                  <td className={tableNumber}>x.</td>
                                  <td className={tableContent}>
                                    <b>Transaksi Pendanaan</b> adalah setiap
                                    transaksi yang dilakukan oleh Penerima Dana
                                    melalui Aplikasi.
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        {/* 1.1 */}

                        {/* 1.2 */}
                        <tr>
                          <td className={tableNumber}>1.2.</td>
                          <td className={tableContent}>
                            <b>
                              Penerbitan dan Penggunaan Akun atau Layanan JULO
                            </b>
                            <table>
                              <tbody>
                                <tr>
                                  <td className={tableNumber}>a.</td>
                                  <td className={tableContent}>
                                    Penerima Dana adalah Pemegang Akun yang mana
                                    artinya Pemegang Akun dimungkinkan untuk
                                    memiliki akun JULO dan/atau Mitra Bisnis
                                    secara bersamaan atau salah satu dari
                                    keduanya. Pemegang Akun tidak akan
                                    mengizinkan orang lain untuk menggunakan
                                    Akunnya dan akan selalu menjaga Akun dan
                                    nomor identifikasi pemilik Akun yang
                                    diterbitkan, dan menjaga kerahasiaan data
                                    lain termasuk namun tidak terbatas email dan
                                    password milik pemegang Akun.
                                  </td>
                                </tr>
                                <tr>
                                  <td className={tableNumber}>b.</td>
                                  <td className={tableContent}>
                                    Penerima Dana bertanggung jawab atas
                                    Pendanaan yang diberikan Pemberi Dana
                                    sehubungan dengan Akun dan untuk semua biaya
                                    terkait yang timbul dari Perjanjian
                                    Pendanaan ini.
                                  </td>
                                </tr>
                                <tr>
                                  <td className={tableNumber}>c.</td>
                                  <td className={tableContent}>
                                    Penerima Dana juga wajib mematuhi seluruh
                                    ketentuan penggunaan Akun sebagaimana{' '}
                                    <b>
                                      Lampiran 1. Syarat dan Ketentuan
                                      Penggunaan
                                    </b>
                                    , serta segala resiko yang timbul akibat
                                    penggunaan Akun.
                                  </td>
                                </tr>
                                <tr>
                                  <td className={tableNumber}>d.</td>
                                  <td className={tableContent}>
                                    Penerima Dana harus memberitahukan kepada
                                    Mitra Bisnis atau JULO sesegera mungkin
                                    setiap perubahan Akun termasuk namun tidak
                                    terbatas pekerjaan, alamat kantor, alamat
                                    rumah, nomor telepon Penerima Dana, dan juga
                                    dapat menyampaikan keluhan atau pengaduan
                                    terkait tentang Pendanaan, dengan cara
                                    sebagai berikut :
                                    <table className={`${w100}`}>
                                      <tbody>
                                        <tr>
                                          <td className={tableNumber}>
                                            i.
                                          </td>
                                          <td className={tableContent}>
                                            Kantor Mitra Bisnis :
                                            <table className={`${w100}`}>
                                              <tbody>
                                                <tr>
                                                  <td
                                                    className={tableNumber}
                                                  >
                                                    1.
                                                  </td>
                                                  <td
                                                    className={tableContent}
                                                  >
                                                    dapat mengirimkan pesan
                                                    melalui email :{' '}
                                                    <a
                                                      href={`mailto:${partner_email}`}
                                                    >
                                                      {partner_email}
                                                    </a>{' '}
                                                    atau
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    className={tableNumber}
                                                  >
                                                    2.
                                                  </td>
                                                  <td
                                                    className={tableContent}
                                                  >
                                                    dapat menggunakan Live Chat
                                                    pada Aplikasi atau
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    className={tableNumber}
                                                  >
                                                    3.
                                                  </td>
                                                  <td
                                                    className={tableContent}
                                                  >
                                                    cara lain yang dapat dilihat
                                                    di Aplikasi atau laman
                                                    website Mitra Bisnis.
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className={tableNumber}>
                                            ii.
                                          </td>
                                          <td className={tableContent}>
                                            Kantor JULO :
                                            <table className={`${w100}`}>
                                              <tbody>
                                                <tr>
                                                  <td
                                                    className={tableNumber}
                                                  >
                                                    1.
                                                  </td>
                                                  <td
                                                    className={tableContent}
                                                  >
                                                    dapat mengirimkan pesan
                                                    melalui email :{' '}
                                                    <a href='mailto:cs@julo.co.id'>
                                                      cs@julo.co.id
                                                    </a>{' '}
                                                    atau
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    className={tableNumber}
                                                  >
                                                    2.
                                                  </td>
                                                  <td
                                                    className={tableContent}
                                                  >
                                                    dapat menggunakan Live Chat
                                                    pada Aplikasi atau
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    className={tableNumber}
                                                  >
                                                    3.
                                                  </td>
                                                  <td
                                                    className={tableContent}
                                                  >
                                                    cara lain yang dapat dilihat
                                                    di Aplikasi atau laman
                                                    website JULO.
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td className={tableNumber}>e.</td>
                                  <td className={tableContent}>
                                    Untuk mengaktifkan Akun Mitra Bisnis
                                    yang Anda miliki, Anda
                                    wajib mengisi informasi berupa termasuk
                                    namun tidak terbatas data diri Anda untuk
                                    serangkaian proses uji tuntas nasabah (
                                    <i>customer due diligence</i>) seperti
                                    proses identifikasi, verifikasi dan
                                    pemantauan yang dilakukan Mitra Bisnis
                                    dan/atau JULO. Setelah itu, Permohonan
                                    Pengajuan Pendanaan Anda akan diproses dan
                                    dinilai terlebih dahulu oleh Mitra Bisnis
                                    dan/atau JULO sebelum disetujui oleh Pemberi
                                    Dana. Untuk mengaktifkan layanan, Anda dapat
                                    melakukan transaksi melalui Aplikasi dan
                                    mendapatkan Surat Konfirmasi
                                    Rincian Transaksi Pendanaan (selanjutnya
                                    disebut <b>“SKRTP”</b>) yang mana berfungsi
                                    sebagai ringkasan informasi untuk setiap
                                    Permohonan Penggunaan Pendanaan.
                                  </td>
                                </tr>
                                <tr>
                                  <td className={tableNumber}>f.</td>
                                  <td className={tableContent}>
                                    Persetujuan atas Permohonan Penggunaan
                                    Pendanaan dan pencairan dana akan dinyatakan
                                    berhasil dengan ditandai berhasilnya pemrosesan
                                    pembayaran transaksi Anda dan bersamaan dengan
                                    diterbitkannya Perjanjian Pendanaan ini dan SKRTP
                                    yang telah ditandatangani Pemberi Dana.
                                  </td>
                                </tr>
                                <tr>
                                  <td className={tableNumber}>g.</td>
                                  <td className={tableContent}>
                                    Setiap detail transaksi atas Pendanaan yang
                                    tertuang dalam SKRTP, yang mana dalam jumlah
                                    berapapun yang Anda gunakan dan dinyatakan
                                    berhasil ini menunjukan bahwa Anda telah
                                    sepakat, membaca, dan memahami seluruh
                                    ketentuan dalam Perjanjian Pendanaan ini
                                    maupun setiap SKRTP yang Anda terima, dengan
                                    teliti, penuh kesadaran, dan tanpa pengaruh
                                    dari pihak mana pun.
                                  </td>
                                </tr>
                                <tr>
                                  <td className={tableNumber}>h.</td>
                                  <td className={tableContent}>
                                    SKTRP yang dimaksud sebagaimana huruf e pada
                                    ayat ini adalah SKRTP yang telah Anda
                                    setujui dengan mengklik fitur persetujuan
                                    yang akan muncul di dalam Aplikasi Anda atau
                                    memasukan Kode PIN yang Anda miliki pada saat
                                    melakukan transaksi ataupun cara lain sesuai
                                    kesepakatan Para Pihak.
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        {/* 1.2 */}

                        {/* 1.3 */}
                        <tr>
                          <td className={tableNumber}>1.3.</td>
                          <td className={tableContent}>
                            <b>Sumber Pendanaan</b>
                            <p className={`${mb0}`}>
                              Sumber Pendanaan yang disalurkan kepada Anda untuk
                              melakukan transaksi Pendanaan adalah sepenuhnya
                              berasal dari dan dimiliki oleh Pemberi Dana yang
                              terdaftar dan bekerjasama pada JULO. JULO
                              hanya memfasilitasi penyaluran dana dari Pemberi Dana
                              dengan cara meneruskan dana Pendanaan tersebut
                              kepada Anda secara langsung maupun kepada Anda
                              secara tidak langsung melalui Mitra Bisnis. Oleh
                              karena itu, segala risiko yang timbul dari
                              Pendanaan sepenuhnya ditanggung oleh Anda dan
                              Pemberi Dana.
                            </p>
                          </td>
                        </tr>
                        {/* 1.3 */}

                        {/* 1.4 */}
                        <tr>
                          <td className={tableNumber}>1.4.</td>
                          <td className={tableContent}>
                            <b>Pendanaan</b>
                            <table>
                              <tbody>
                                <tr>
                                  <td className={tableNumber}>a.</td>
                                  <td className={tableContent}>
                                    Setiap jenis transaksi yang Anda lakukan
                                    (baik Transaksi Pertama atau Transaksi
                                    setelahnya) akan dianggap sebagai dan
                                    merupakan Permohonan Penggunaan Pendanaan,
                                    dan dalam hal ini disetujui berdasarkan
                                    penilaian oleh Mitra Bisnis dan/atau JULO yang mana kriteria
                                    terhadap penilaian tersebut sudah ditetapkan
                                    berdasarkan kriteria yang diberikan oleh
                                    Pemberi Dana (selanjutnya disebut{' '}
                                    <b>“Pendanaan”</b>).
                                  </td>
                                </tr>
                                <tr>
                                  <td className={tableNumber}>b.</td>
                                  <td className={tableContent}>
                                    Jenis transaksi sebagaimana yang dimaksud dapat
                                    dilakukan termasuk namun tidak terbatas penarikan
                                    atau transfer tunai, pembelian barang dan jasa
                                    melalui Merchant yang berkerjasama dengan Mitra
                                    Bisnis dan/atau JULO (jika ada) dan transaksi lain
                                    yang dibenarkan Undang-Undang sesuai dengan izin
                                    yang dimiliki Mitra Bisnis dan/atau JULO.
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        {/* 1.4 */}

                        {/* 1.5 */}
                        <tr>
                          <td className={tableNumber}>1.5.</td>
                          <td className={tableContent}>
                            <b>Keberlakuan Perjanjian Pendanaan</b>
                            <table>
                              <tbody>
                                <tr>
                                  <td className={tableNumber}>a.</td>
                                  <td className={tableContent}>
                                    Perjanjian Pendanaan ini merupakan
                                    perjanjian yang sah dan mengikat bagi Anda
                                    dan berlaku juga sebagai perjanjian antara
                                    Anda dengan Pemberi Dana.
                                  </td>
                                </tr>
                                <tr>
                                  <td className={tableNumber}>b.</td>
                                  <td className={tableContent}>
                                    Dokumen-Dokumen Elektronik merupakan
                                    satu-kesatuan dan bagian yang tidak
                                    terpisahkan satu sama lain, termasuk namun
                                    tidak terbatas Perjanjian Pendanaan ini
                                    beserta segala addendumnya.
                                  </td>
                                </tr>
                                <tr>
                                  <td className={tableNumber}>c.</td>
                                  <td className={tableContent}>
                                    Jika terdapat perbedaan makna atau
                                    penafsiran tentang segala ketentuan yang
                                    berkaitan dengan pemberian Pendanaan, yang
                                    terdapat pada Perjanjian Pendanaan, Syarat
                                    dan Ketentuan Penggunaan dan Kebijakan
                                    Privasi, maka yang berlaku adalah Perjanjian
                                    Pendanaan.
                                  </td>
                                </tr>
                                <tr>
                                  <td className={tableNumber}>d.</td>
                                  <td className={tableContent}>
                                    Jika terdapat perbedaan makna atau
                                    penafsiran tentang segala ketentuan yang
                                    berkaitan aturan penggunaan umum, yang
                                    terdapat pada Perjanjian Pendanaan, Syarat
                                    dan Ketentuan Penggunaan dan Kebijakan
                                    Privasi, maka yang berlaku adalah Syarat dan
                                    Ketentuan Penggunaan.
                                  </td>
                                </tr>
                                <tr>
                                  <td className={tableNumber}>e.</td>
                                  <td className={tableContent}>
                                    Jika terdapat perbedaan makna tentang segala
                                    ketentuan yang berkaitan aturan perlindungan
                                    penggunaan data pribadi, yang terdapat pada
                                    Perjanjian Pendanaan, Syarat dan Ketentuan
                                    Penggunaan dan Kebijakan Privasi, maka yang
                                    berlaku adalah Kebijakan Privasi.
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        {/* 1.5 */}
                      </tbody>
                    </table>
                    <br />
                  </td>
                </tr>
                {/* 1. */}

                {/* 2. */}
                <tr>
                  <td className={tableNumber}>2.</td>
                  <td className={tableContent}>
                    <b>KETENTUAN POKOK</b>
                    <table>
                      <tbody>
                        {/* 2.1 */}
                        <tr>
                          <td className={tableNumber}>2.1.</td>
                          <td className={tableContent}>
                            <b>Rincian Pendanaan</b>
                            <p className={`${mb0}`}>
                              Pendanaan yang disetujui Pemberi Dana adalah sebesar
                              jumlah Pendanaan yang dapat berubah dari waktu ke
                              waktu berdasarkan penilaian JULO dan atas
                              persetujuan Penerima Dana. <br />
                              Jika Anda setuju menggunakan Pendanaan tersebut,
                              dengan memilih, menerima, mengaktifkan dan/atau
                              menggunakan Pendanaan yang muncul pada Aplikasi,
                              maka Anda wajib mengetahui ketentuan
                              rincian Pendanaan sebagai berikut :
                            </p>
                            <br />
                            <table>
                              <tbody>
                                {/* 2.1.1 */}
                                <tr>
                                  <td className={tableNumber}>2.1.1.</td>
                                  <td className={tableContent}>
                                    <b>Pendanaan</b>
                                    <table className={mb3}>
                                      <tbody>
                                        <tr>
                                          <td className={tableNumber}>
                                            a.
                                          </td>
                                          <td className={tableContent}>
                                            Setiap persetujuan Pendanaan, Pemberi Dana
                                            memiliki wewenang menetapkan jumlah
                                            Pendanaan yang akan disalurkan kepada Anda,
                                            berdasarkan penilaian kelayakan
                                            kredit oleh JULO.
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className={tableNumber}>
                                            b.
                                          </td>
                                          <td className={tableContent}>
                                            Tanpa mengurangi ketentuan tersebut
                                            di atas dari pasal ini dan pasal
                                            lain terkait yang diatur dalam
                                            Perjanjian Pendanaan ini, Pemberi Dana, atas
                                            kebijakannya sendiri dan dari waktu
                                            ke waktu, menaikkan atau mengurangi
                                            jumlah Pendanaan yang ditetapkan,
                                            sebagai hasil dari penilaian yang
                                            wajar oleh JULO atas Akun dan/ atau
                                            informasi mengenai Penerima Dana
                                            yang relevan yang tersedia bagi
                                            JULO. Kenaikan atau pengurangan
                                            jumlah Pendanaan tersebut akan
                                            diberitahukan oleh JULO kepada
                                            Penerima Dana dari waktu ke waktu.
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className={tableNumber}>
                                            c.
                                          </td>
                                          <td className={tableContent}>
                                            Apabila jumlah Pendanaan tidak
                                            mencukupi maka persetujuan yang
                                            dimaksud pada pasal 1.1.2 huruf f
                                            secara otomatis tidak akan berlaku
                                            dan transaksi tidak dapat dilakukan
                                            dengan menggunakan Pendanaan dari
                                            Aplikasi.
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className={tableNumber}>
                                            d.
                                          </td>
                                          <td className={tableContent}>
                                            Bahwa, Pendanaan akan dapat
                                            digunakan jika setiap pembayaran
                                            kembali dilakukan oleh Penerima Dana
                                            atau saldo pada Pendanaan tersedia
                                            kembali/mencukupi untuk digunakan
                                            dalam bertransaksi.
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                {/* 2.1.1 */}

                                {/* 2.1.2 */}
                                <tr>
                                  <td className={tableNumber}>2.1.2.</td>
                                  <td className={tableContent}>
                                    <b>Manfaat Ekonomi Pendanaan</b>
                                    <table className={mb3}>
                                      <tbody>
                                        <tr>
                                          <td className={tableNumber}>
                                            a.
                                          </td>
                                          <td className={tableContent}>
                                            <b>Bunga Pendanaan</b>. Atas
                                            penggunaan Pendanaan, Anda akan
                                            dikenakan Bunga Pendanaan sesuai
                                            Bunga Pendanaan yang tercantum pada
                                            halaman Akun yang Anda miliki atau
                                            setiap SKRTP pada Aplikasi atau
                                            Aplikasi Mitra Bisnis.
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                {/* 2.1.2 */}

                                {/* 2.1.3 */}
                                <tr>
                                  <td className={tableNumber}>2.1.3.</td>
                                  <td className={tableContent}>
                                    <b>Nilai Angsuran</b>
                                    <p className={`${mb0}`}>
                                      Nilai Angsuran berarti besarnya
                                      nilai angsuran tergantung pada :
                                    </p>
                                    <table className={mb3}>
                                      <tbody>
                                        <tr>
                                          <td className={tableNumber}>
                                            a.
                                          </td>
                                          <td className={tableContent}>
                                            Total Pendanaan yang didanai;
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className={tableNumber}>
                                            b.
                                          </td>
                                          <td className={tableContent}>
                                            Jangka waktu pembayaran angsuran
                                            yang Anda pilih;
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className={tableNumber}>
                                            c.
                                          </td>
                                          <td className={tableContent}>
                                            Bunga Pendanaan yang berlaku sesuai
                                            dengan jangka waktu angsuran yang
                                            Anda pilih; Nilai Angsuran yang Anda
                                            bayarkan untuk setiap jangka waktu
                                            pembayaran angsuran tercantum pada
                                            SKRTP di Sistem Elektronik JULO 
                                            atau Aplikasi Mitra Bisnis;
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className={tableNumber}>
                                            d.
                                          </td>
                                          <td className={tableContent}>
                                            Rincian besaran angsuran terhadap
                                            Pendanaan yang telah disetujui akan
                                            dicantumkan dalam SKRTP.
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                {/* 2.1.3 */}

                                {/* 2.1.4 */}
                                <tr>
                                  <td className={tableNumber}>2.1.4.</td>
                                  <td className={tableContent}>
                                    <b>Jangka Waktu Pembayaran Angsuran</b>
                                    <p>
                                      Jangka waktu pembayaran angsuran dapat
                                      merujuk pada setiap SKRTP yang Anda
                                      terima.
                                    </p>
                                  </td>
                                </tr>
                                {/* 2.1.4 */}

                                {/* 2.1.5 */}
                                <tr>
                                  <td className={tableNumber}>2.1.5.</td>
                                  <td className={tableContent}>
                                    <b>Denda Keterlambatan</b>
                                    <p>
                                      Anda akan dikenakan Denda Keterlambatan
                                      apabila Anda lalai membayar jumlah Tagihan
                                      yang telah jatuh tempo pada Tanggal Jatuh
                                      Tempo pembayaran. Denda Keterlambatan
                                      tersebut dimulai setelah lewat Masa
                                      Tenggang dan akan diakumulasikan untuk
                                      masing-masing penggunaan Pendanaan sesuai
                                      dengan Denda yang akan tercantum (jika
                                      ada) pada halaman transaksi di Aplikasi
                                      atau Aplikasi Mitra Bisnis.
                                    </p>
                                  </td>
                                </tr>
                                {/* 2.1.5 */}

                                {/* 2.1.6 */}
                                <tr>
                                  <td className={tableNumber}>2.1.6.</td>
                                  <td className={tableContent}>
                                    <b>
                                      Riwayat Transaksi (History Transaction)
                                    </b>
                                    <p>
                                      Anda dapat mengetahui seluruh riwayat
                                      transaksi penggunaan Pendanaan yang Anda
                                      miliki dengan membaca dan memahami seluruh
                                      dokumen SKRTP yang dapat diakses pada
                                      halaman Akun Anda ataupun dengan media
                                      lain yang akan disediakan oleh JULO
                                      dan/atau Mitra Bisnis sesuai kebijakan
                                      yang berlaku di JULO dan/atau Mitra
                                      Bisnis.
                                    </p>
                                  </td>
                                </tr>
                                {/* 2.1.6 */}

                                {/* 2.1.7 */}
                                <tr>
                                  <td className={tableNumber}>2.1.7.</td>
                                  <td className={tableContent}>
                                    <b>
                                      Surat Konfirmasi Rincian Transaksi
                                      Pendanaan (SKRTP)
                                    </b>
                                    <table className={mb3}>
                                      <tbody>
                                        <tr>
                                          <td className={tableNumber}>
                                            1.
                                          </td>
                                          <td className={tableContent}>
                                            SKRTP merupakan Dokumen elektronik
                                            yang Anda akan terima pada saat Anda
                                            melakukan setiap transaksi apapun
                                            dengan menggunakan Pendanaan yang
                                            tersedia pada Aplikasi atau Aplikasi Mitra Bisnis
                                            (format SKRTP tercantum dalam{' '}
                                            <b>
                                              Lampiran 3. Contoh Surat
                                              Konfirmasi Transaksi Pendanaan
                                              (SKRTP)
                                            </b>
                                            ). SKRTP ini merupakan bagian yang
                                            tidak terpisahkan dengan Perjanjian
                                            Pendanaan dan kebijakan JULO yang
                                            dapat berubah dari waktu ke waktu
                                            sesuai kesepakatan Para Pihak.
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className={tableNumber}>
                                            2.
                                          </td>
                                          <td className={tableContent}>
                                            Seluruh dokumen SKRTP yang Anda
                                            miliki saat ini akan tetap berlaku
                                            dan mengikat sebagai bukti
                                            Permohonan Penggunaan Pendanaan
                                            Anda, sepanjang Penerima Dana masih
                                            terdapat kewajiban yang tertagih dan
                                            jangka waktu pembayarannya masih
                                            aktif.
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                {/* 2.1.7 */}

                                {/* 2.1.8 */}
                                <tr>
                                  <td className={tableNumber}>2.1.8.</td>
                                  <td className={tableContent}>
                                    <b>Pembayaran Kembali</b>
                                    <p>
                                      Setiap penggunaan Pendanaan dari
                                      Permohonan Penggunaan Pendanaan Anda
                                      beserta biaya-biaya sebagaimana pasal
                                      2.1.2, denda keterlambatan (jika ada) atau
                                      dengan kata lain setiap Angsuran Anda akan
                                      ditagihkan kepada Anda dan Anda wajib
                                      melakukan pembayaran kembali pada sebelum
                                      atau sesuai tanggal jatuh tempo
                                      sebagaimana yang dirincikan pada setiap
                                      SKRTP yang Anda miliki.
                                    </p>
                                  </td>
                                </tr>
                                {/* 2.1.8 */}

                                {/* 2.1.9 */}
                                <tr>
                                  <td className={tableNumber}>2.1.9.</td>
                                  <td className={tableContent}>
                                    <b>Pembayaran Dipercepat</b>
                                    <p>
                                      Untuk pembayaran kembali, Anda dapat
                                      melakukan pembayaran kembali lebih cepat
                                      dari tanggal jatuh tempo sebagaimana yang
                                      dirincikan pada setiap SKRTP yang Anda
                                      miliki, tanpa dikenakan biaya tambahan
                                      apapun dari JULO (kecuali ditentukan
                                      sebaliknya oleh JULO di kemudian hari
                                      dengan pemberitahuan kepada Anda).
                                    </p>
                                  </td>
                                </tr>
                                {/* 2.1.9 */}

                                {/* 2.1.10 */}
                                <tr>
                                  <td className={tableNumber}>2.1.10.</td>
                                  <td className={tableContent}>
                                    <b>Jaminan</b>
                                    <p className={`${mb0}`}>
                                      Untuk menjamin kepastian Pembayaran
                                      Kembali dengan tertib dan sebagaimana
                                      mestinya, maka Penerima Pinjaman dan/atau
                                      pihak ketiga yang ditunjuk Penerima Pinjaman
                                      dapat memberikan jaminan, selama dalam
                                      pelaksanaan Pendanaan ini dipersyaratkan
                                      atas jaminan yang ditentukan oleh Pemberi
                                      Dana yang dalam hal ini juga menjadi pihak
                                      penerima jaminan oleh karenanya Penerima
                                      Pinjaman setuju bahwa Pemberi Dana dan/atau
                                      Pihak Ketiga yang ditunjuk Pemberi Dana
                                      dapat melakukan eksekusi atas jaminan
                                      sebagaimana yang diperlukan berdasarkan
                                      Perjanjian Pendanaan ini. Penjaminan
                                      disini yaitu termasuk namun tidak terbatas
                                      penanggungan yang dilakukan baik dari
                                      perorangan maupun badan hukum dan/atau
                                      jaminan kebendaan yang diatur berdasarkan
                                      peraturan perundang-undangan meliputi
                                      gadai, fidusia, hak tanggungan, hipotek
                                      kapal dan resi gudang, yang mana beberapa
                                      atau keseluruhan penjaminan tersebut dapat
                                      menjadikan Perjanjian Pendanaan menjadi
                                      dasar penjaminan dan eksekusi jaminan,
                                      atau sebaliknya jika diperlukan ketentuan
                                      lebih lanjut Para Pihak dapat mengaturnya
                                      melalui perjanjian jaminan yang terpisah
                                      dari Perjanjian Pendanaan ini.
                                    </p>
                                  </td>
                                </tr>
                                {/* 2.1.10 */}
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        {/* 2.1 */}
                      </tbody>
                    </table>
                    <br />
                  </td>
                </tr>
                {/* 2. */}

                {/* 3. */}
                <tr>
                  <td className={tableNumber}>3.</td>
                  <td className={tableContent}>
                    <b>HAK DAN KEWAJIBAN</b>
                    <table>
                      <tbody>
                        {/* 3.1 */}
                        <tr>
                          <td className={tableNumber}>3.1.</td>
                          <td className={tableContent}>
                            <b>Hak dan Kewajiban Pemberi Dana</b>
                            <p className={`${mb0}`}>
                              Dengan tidak mengesampingkan hak-hak
                              dan kewajiban-kewajiban lain yang
                              diatur dalam Perjanjian Pendanaan ini,
                              hak dan kewajiban Pemberi Dana, adalah
                              sebagai berikut:
                            </p>
                            <table>
                              <tbody>
                                <tr>
                                  <td className={tableNumber}>a.</td>
                                  <td className={tableContent}>
                                    Wajib menyediakan Pendanaan dan mencairkan
                                    Pendanaan kepada Anda sesuai Perjanjian
                                    Pendanaan ini.
                                  </td>
                                </tr>
                                <tr>
                                  <td className={tableNumber}>b.</td>
                                  <td className={tableContent}>
                                    Wajib melaksanakan seluruh
                                    ketentuan-ketentuan dalam Perjanjian
                                    Pendanaan ini.
                                  </td>
                                </tr>
                                <tr>
                                  <td className={tableNumber}>c.</td>
                                  <td className={tableContent}>
                                    Berhak menolak atau memberikan persetujuan
                                    pemberian Pendanaan berdasarkan penilaiannya
                                    dan/atau penilaian skor kredit yang
                                    disediakan JULO.
                                  </td>
                                </tr>
                                <tr>
                                  <td className={tableNumber}>d.</td>
                                  <td className={tableContent}>
                                    Berhak menerima pembayaran secara penuh atas
                                    seluruh kewajiban pembayaran tagihan Anda
                                    termasuk namun tidak terbatas, pembayaran
                                    kembali Pendanaan, Biaya Provisi, Bunga
                                    Pendanaan, Denda Keterlambatan (Jika Ada),
                                    serta biaya-biaya lain berdasarkan
                                    Perjanjian Pendanaan ini (Jika Ada).
                                  </td>
                                </tr>
                                <tr>
                                  <td className={tableNumber}>e.</td>
                                  <td className={tableContent}>
                                    Berhak melaksanakan segala proses penagihan
                                    atas seluruh kewajiban pembayaran Anda
                                    termasuk namun tidak terbatas penagihan
                                    melalui JULO atau dengan menunjuk pihak
                                    ketiga lainnya yang ditunjuk JULO atau
                                    Pemberi Dana, serta memberikan peringatan
                                    secara tertulis dalam hal Penerima Dana
                                    mengalami keterlambatan pembayaran, Penerima
                                    Dana setuju bahwa proses penagihan dapat
                                    dilakukan melalui tata cara sebagai berikut
                                    :
                                    <table>
                                      <tbody>
                                        <tr>
                                          <td className={tableNumber}>
                                            i.
                                          </td>
                                          <td className={tableContent}>
                                            <i>Desk Collection</i>, yaitu
                                            penagihan melalui sarana komunikasi
                                            elektronik, seperti telepon, SMS,
                                            surat elektronik, dan/atau media
                                            komunikasi elektronik lainnya ke
                                            nomor telepon atau email yang
                                            terdaftar pada Sistem Elektronik JULO;
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className={tableNumber}>
                                            ii.
                                          </td>
                                          <td className={tableContent}>
                                            <i>Field Collection</i>, yaitu
                                            penagihan melalui kunjungan lapangan
                                            ke alamat Penerima Dana yang
                                            terdaftar pada Sistem Elektronik JULO;
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className={tableNumber}>
                                            iii.
                                          </td>
                                          <td className={tableContent}>
                                            Tata cara lain yang disyaratkan dan
                                            diperbolehkan oleh Asosiasi, OJK
                                            atau pemerintah yang berwenang
                                            lainnya.
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td className={tableNumber}>f.</td>
                                  <td className={tableContent}>
                                    Berhak mengambil tindakan yang diperlukan
                                    dalam hal Penerima Dana tidak menjalankan
                                    atau melakukan pelanggaran atas pelaksanaan
                                    hak dan kewajiban berdasarkan Perjanjian
                                    Pendanaan ini, termasuk namun tidak terbatas
                                    melaporkan kepada OJK ke dalam Daftar Hitam.
                                  </td>
                                </tr>
                                <tr>
                                  <td className={tableNumber}>g.</td>
                                  <td className={tableContent}>
                                    Berhak untuk memindahkan dan mengalihkan
                                    Pendanaan dan Tagihan sesuai dengan
                                    Perjanjian Pendanaan ini.
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        {/* 3.1 */}

                        {/* 3.2 */}
                        <tr>
                          <td className={tableNumber}>3.2.</td>
                          <td className={tableContent}>
                            <b>Hak dan Kewajiban Penerima Dana</b>
                            <p>
                              Dengan tidak mengesampingkan hak-hak dan
                              kewajiban-kewajiban lain yang diatur dalam
                              Perjanjian Pendanaan ini, hak dan kewajiban Anda
                              sebagai Penerima Dana adalah sebagai berikut :
                            </p>
                            <table>
                              <tbody>
                                <tr>
                                  <td className={tableNumber}>a.</td>
                                  <td className={tableContent}>
                                    Wajib membayar secara penuh kewajiban
                                    pembayaran atas Pendanaan yang diberikan
                                    pada tanggal jatuh tempo pembayaran,
                                    termasuk namun tidak terbatas untuk membayar
                                    Bunga Pendanaan dan Denda Keterlambatan
                                    (apabila ada) dan biaya-biaya relevan
                                    sebagaimana relevan berdasarkan Perjanjian
                                    Pendanaan ini.
                                  </td>
                                </tr>
                                <tr>
                                  <td className={tableNumber}>b.</td>
                                  <td className={tableContent}>
                                    Wajib memberitahukan Pemberi Dana dan/atau
                                    JULO atas setiap terjadinya perubahan data
                                    atau informasi dari Penerima Dana.
                                  </td>
                                </tr>
                                <tr>
                                  <td className={tableNumber}>c.</td>
                                  <td className={tableContent}>
                                    Wajib melaksanakan seluruh
                                    ketentuan-ketentuan dalam Perjanjian
                                    Pendanaan ini dan Hukum yang berlaku dengan
                                    itikad baik dan penuh tanggung jawab.
                                  </td>
                                </tr>
                                <tr>
                                  <td className={tableNumber}>d.</td>
                                  <td className={tableContent}>
                                    Berhak menerima Pendanaan dan menerima
                                    pencairan dana berdasarkan Perjanjian
                                    Pendanaan ini.
                                  </td>
                                </tr>
                                <tr>
                                  <td className={tableNumber}>e.</td>
                                  <td className={tableContent}>
                                    Berhak melakukan pembayaran dipercepat.
                                  </td>
                                </tr>
                                <tr>
                                  <td className={tableNumber}>f.</td>
                                  <td className={tableContent}>
                                    Berhak untuk mendapatkan informasi atau
                                    akses informasi mengenai status Pendanaan
                                    yang diterima dengan benar, akurat dan tidak
                                    menyesatkan.
                                  </td>
                                </tr>
                                <tr>
                                  <td className={tableNumber}>g.</td>
                                  <td className={tableContent}>
                                    Berhak mengajukan permohonan bukti atas
                                    seluruh kewajiban pembayaran secara penuh,
                                    yang telah dilakukan oleh Penerima Dana
                                    kepada Pemberi Dana. Permohonan bukti
                                    pembayaran ini akan diberikan dalam bentuk
                                    Surat Keterangan Lunas yang akan disampaikan
                                    secara elektronik melalui Aplikasi Mitra Bisnis 
                                    dan sesuai dengan Standar Operasional pemberian 
                                    Surat Keterangan Lunas dari JULO.
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        {/* 3.2 */}
                      </tbody>
                    </table>
                    <br />
                  </td>
                </tr>
                {/* 3. */}
                {/* 4. */}
                <tr>
                  <td className={tableNumber}>4.</td>
                  <td className={tableContent}>
                    <b>PENGALIHAN</b>
                    <table>
                      <tbody>
                        {/* 4.1 */}
                        <tr>
                          <td className={tableNumber}>4.1.</td>
                          <td className={tableContent}>
                            Anda dapat mengakui dan menyetujui bahwa Pemberi
                            Dana dapat memindahkan atau mengalihkan setiap dana
                            yang masih terutang dan Tagihan kepada pihak lain
                            termasuk namun tidak terbatas pada bank, Lembaga
                            keuangan bukan bank atau institusi keuangan lainnya
                            dengan tunduk hukum yang berlaku.
                          </td>
                        </tr>
                        {/* 4.1 */}

                        {/* 4.2 */}
                        <tr>
                          <td className={tableNumber}>4.2.</td>
                          <td className={tableContent}>
                            Penerima Dana tidak dapat mengalihkan, baik sebagian
                            maupun seluruh hak dan kewajiban yang timbul dari
                            atau terkait dengan Pendanaan berdasarkan Perjanjian
                            Pendanaan ini kepada pihak manapun, tanpa
                            persetujuan dari Pemberi Dana.
                          </td>
                        </tr>
                        {/* 4.2 */}

                        {/* 4.3 */}
                        <tr>
                          <td className={tableNumber}>4.3.</td>
                          <td className={tableContent}>
                            Penerima Dana menyetujui dan mengakui keabsahan
                            pengalihan yang dilakukan setiap Pemberi Dana
                            berdasarkan ayat 4.1 pada pasal ini, dan tidak akan
                            mengajukan keberatan atas pengalihan yang dilakukan
                            demikian.
                          </td>
                        </tr>
                        {/* 4.3 */}
                      </tbody>
                    </table>
                    <br />
                  </td>
                </tr>
                {/* 4. */}
                {/* 5. */}
                <tr>
                  <td className={tableNumber}>5.</td>
                  <td className={tableContent}>
                    <b>PAJAK, BEA MATERAI DAN BIAYA-BIAYA LAIN</b>
                    <table>
                      <tbody>
                        {/* 5.1 */}
                        <tr>
                          <td className={tableNumber}>5.1.</td>
                          <td className={tableContent}>
                            Para Pihak setuju bahwa segala kewajiban perpajakan,
                            biaya bea materai dan/atau biaya-biaya lain (Jika
                            Ada) yang dikenakan pemerintah saat ini atau yang
                            akan datang dalam bentuk apapun yang dikenakan,
                            dipungut atau dipungut oleh atau atas nama otoritas
                            pemerintahan, yang timbul berdasarkan Perjanjian
                            Pendanaan ini akan menjadi beban masing-masing Pihak
                            atau salah satu Pihak sesuai dengan ketentuan
                            perpajakan yang berlaku di negara Republik Indonesia
                            dan/atau kesepakatan Para Pihak.
                          </td>
                        </tr>
                        {/* 5.1 */}
                      </tbody>
                    </table>
                    <br />
                  </td>
                </tr>
                {/* 5. */}
                {/* 6. */}
                <tr>
                  <td className={tableNumber}>6.</td>
                  <td className={tableContent}>
                    <b>PENGGUNAAN DATA PRIBADI</b>
                    <table>
                      <tbody>
                        {/* 6.1 */}
                        <tr>
                          <td className={tableNumber}>6.1.</td>
                          <td className={tableContent}>
                            Dengan menyetujui Perjanjian Pendanaan ini, Anda
                            menyatakan bahwa Anda telah membaca dan menyetujui
                            Kebijakan Data Pribadi, yang dapat diakses pada
                            website Kami atau sebagaimana yang tercantum dalam{' '}
                            <b>Lampiran 2. Kebijakan Data Pribadi</b> . Oleh
                            karenanya, Anda wajib membaca, memahami dan mengerti
                            kebijakan Data Pribadi JULO dan/atau Mitra Bisnis.
                            Kebijakan Data Pribadi ini merupakan bagian yang
                            tidak terpisahkan dengan Perjanjian Pendanaan dan
                            kebijakan JULO dan/atau Mitra Bisnis ini dapat
                            berubah dari waktu ke waktu tanpa memerlukan
                            persetujuan Para Pihak.
                          </td>
                        </tr>
                        {/* 6.1 */}

                        {/* 6.2 */}
                        <tr>
                          <td className={tableNumber}>6.2.</td>
                          <td className={tableContent}>
                            Dengan Anda menekan fitur persetujuan (
                            <i>consent</i>) yang akan muncul pada halaman
                            Aplikasi Anda pada saat pengajuan Pendanaan, maka
                            Anda juga telah menyetujui Kebijakan Data Pribadi
                            JULO dan/atau Mitra Bisnis sebagaimana laman website diatas.
                          </td>
                        </tr>
                        {/* 6.2 */}
                      </tbody>
                    </table>
                    <br />
                  </td>
                </tr>
                {/* 6. */}
                {/* 7. */}
                <tr>
                  <td className={tableNumber}>7.</td>
                  <td className={tableContent}>
                    <b>MEKANISME PENYELESAIAN SENGKETA</b>
                    <table>
                      <tbody>
                        {/* 7.1 */}
                        <tr>
                          <td className={tableNumber}>7.1.</td>
                          <td className={tableContent}>
                            Penafsiran dan pelaksanaan Perjanjian Pendanaan ini
                            dan segala akibatnya diatur dan ditafsirkan menurut
                            hukum Republik Indonesia.
                          </td>
                        </tr>
                        {/* 7.1 */}
                        {/* 7.2 */}
                        <tr>
                          <td className={tableNumber}>7.2.</td>
                          <td className={tableContent}>
                            Apabila terjadi perselisihan atau sengketa antara
                            Para Pihak yang timbul berdasarkan Perjanjian
                            Pendanaan ini, Para Pihak sepakat untuk
                            menyelesaikannya terlebih dahulu dengan cara
                            musyawarah untuk mencapai mufakat. Apabila sengketa
                            tersebut tidak dapat diselesaikan dengan cara
                            musyawarah, Para Pihak sepakat untuk menyerahkan
                            kepada dan diselesaikan di tingkat akhir arbitrase
                            di Indonesia yang diselenggarakan oleh Lembaga
                            Alternatif Penyelesaian Sengketa Sektor Jasa
                            Keuangan (“<b>LAPS SJK</b>”), sesuai ketentuan LAPS
                            SJK yang berlaku pada saat itu. Arbitrase akan
                            dilangsungkan dengan 1 (Satu) orang arbiter dan
                            Bahasa yang digunakan dalam arbitrase adalah
                            Indonesia.
                          </td>
                        </tr>
                        {/* 7.2 */}
                      </tbody>
                    </table>
                    <br />
                  </td>
                </tr>
                {/* 7. */}
                {/* 8. */}
                <tr>
                  <td className={tableNumber}>8.</td>
                  <td className={tableContent}>
                    <b>PERNYATAAN DAN JAMINAN</b>
                    <table>
                      <tbody>
                        {/* 8.1 */}
                        <tr>
                          <td className={tableNumber}>8.1.</td>
                          <td className={tableContent}>
                            Penerima Dana dengan ini menyatakan dan menjamin
                            Pemberi Dana bahwa :
                            <table>
                              <tbody>
                                <tr>
                                  <td className={tableNumber}>a.</td>
                                  <td className={tableContent}>
                                    Penerima Dana adalah Warga Negara Indonesia
                                    dan tunduk secara sah pada hukum Republik
                                    Indonesia, yang merupakan orang perorangan
                                    yang cakap hukum untuk mengadakan dan
                                    melaksanakan Perjanjian Pendanaan ini,
                                    sesuai ketentuan perundang-undangan yang
                                    berlaku, dan telah mendapatkan seluruh
                                    persetujuan dan perizinan yang dibutuhkan
                                    (termasuk namun tidak terbatas kepada
                                    persetujuan pasangan) untuk menandatangani
                                    Perjanjian Pendanaan ini.
                                  </td>
                                </tr>
                                <tr>
                                  <td className={tableNumber}>b.</td>
                                  <td className={tableContent}>
                                    Penerima Dana telah membaca dan memahami dan
                                    telah mendapatkan saran yang diperlukan
                                    mengenai keberlakuan dari Perjanjian
                                    Pendanaan ini.
                                  </td>
                                </tr>
                                <tr>
                                  <td className={tableNumber}>c.</td>
                                  <td className={tableContent}>
                                    Seluruh fakta, data, informasi, dokumen dan
                                    keterangan yang Anda berikan untuk
                                    mendapatkan Pendanaan adalah benar, jelas,
                                    jujur, terbaru, akurat dan lengkap.
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        {/* 8.1 */}
                      </tbody>
                    </table>
                    <br />
                  </td>
                </tr>
                {/* 8. */}
                {/* 9. */}
                <tr>
                  <td className={tableNumber}>9.</td>
                  <td className={tableContent}>
                    <b>LAIN-LAIN</b>
                    <table>
                      <tbody>
                        {/* 9.1 */}
                        <tr>
                          <td className={tableNumber}>9.1.</td>
                          <td className={tableContent}>
                            Setiap komunikasi dan pemberitahuan yang
                            diisyaratkan atau diperbolehkan untuk diberikan
                            kepada Para Pihak dibuat secara tertulis melalui
                            pengumuman, surat elektronik, surat tercatat,
                            Aplikasi, Platform Penyelenggara, nomor telepon
                            resmi JULO, atau melalui media komunikasi lainnya.
                          </td>
                        </tr>
                        {/* 9.1 */}

                        {/* 9.2 */}
                        <tr>
                          <td className={tableNumber}>9.2.</td>
                          <td className={tableContent}>
                            Apabila satu atau lebih ketentuan dalam Perjanjian
                            Pendanaan ini menjadi tidak berlaku, tidak sah atau
                            tidak dapat dilaksanakan dalam cara apapun menurut
                            Hukum yang berlaku, hal tersebut tidak mempengaruhi
                            keabsahan, keberlakuan, dan dapat dilaksanakannya
                            ketentuan-ketentuan lain dalam Perjanjian Pendanaan
                            ini.
                          </td>
                        </tr>
                        {/* 9.2 */}

                        {/* 9.3 */}
                        <tr>
                          <td className={tableNumber}>9.3.</td>
                          <td className={tableContent}>
                            <b>Fitur JULO</b>, sebagaimana dijelaskan di bawah
                            ini :
                            <table className={`${w100}`}>
                              <tbody>
                                <tr>
                                  <td className={tableNumber}>a.</td>
                                  <td className={tableContent}>
                                    ialah fungsi/karakteristik dalam hal
                                    teknologi, yang dimiliki dan/atau disediakan
                                    pada Sistem Elektronik JULO dengan tujuan membantu
                                    memudahkan Penerima Dana dalam melakukan
                                    transaksi dengan Sistem Elektronik JULO.
                                  </td>
                                </tr>
                                <tr>
                                  <td className={tableNumber}>b.</td>
                                  <td className={tableContent}>
                                    Setiap fitur yang disediakan oleh JULO
                                    kepada Anda dan Fitur lainnya yang dimiliki
                                    JULO dan/atau Fitur yang diperoleh dari
                                    kerjasama dengan Mitra Bisnis, yang mana
                                    akan terus diperbaharui, ditambahkan,
                                    dihapus, diganti, dan/atau dirilis ulang,
                                    dan hal ini merupakan sepenuhnya kebijakan
                                    dan kewenangan JULO.
                                  </td>
                                </tr>
                                <tr>
                                  <td className={tableNumber}>c.</td>
                                  <td className={tableContent}>
                                    Tanpa mengurangi maksud pasal 9.4, Setiap
                                    atau beberapa penggunaan Fitur JULO oleh
                                    Anda sebagaimana yang diperlukan dalam
                                    Dokumen-Dokumen Elektronik, JULO berhak
                                    membutuhkan tindakan persetujuan tertentu di
                                    luar Perjanjian Pendanaan ini, yang
                                    menginstruksikan dan/atau mengizinkan JULO
                                    mengakses dan memproses data-data yang Anda
                                    berikan untuk tujuan penggunaan fitur
                                    tersebut, seperti termasuk namun tidak
                                    terbatas pernyataan dan persetujuan Anda,
                                    yang diperoleh secara elektronik pada
                                    Sistem Elektronik JULO dan cara lain yang akan
                                    disepakati Para Pihak. Persetujuan ini
                                    merupakan bagian dari pernyataan tambahan
                                    yang merupakan satu-kesatuan yang tidak
                                    terpisahkan dan sebagai bentuk pelaksanaan
                                    dari Perjanjian Pendanaan ini, yang sama
                                    mengikatnya dan sah secara hukum.
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        {/* 9.3 */}

                        {/* 9.4 */}
                        <tr>
                          <td className={tableNumber}>9.4.</td>
                          <td className={tableContent}>
                            <b>Tanda Tangan Elektronik.</b>
                            <table>
                              <tbody>
                                <tr>
                                  <td className={tableNumber}>a.</td>
                                  <td className={tableContent}>
                                    Tanda Tangan Elektronik adalah tanda tangan
                                    yang berupa informasi elektronik yang
                                    dilekatkan, terasosiasi atau terkait
                                    informasi elektroniknya yang digunakan
                                    sebagai alat verifikasi dan autentikasi.
                                  </td>
                                </tr>
                                <tr>
                                  <td className={tableNumber}>b.</td>
                                  <td className={tableContent}>
                                    Penggunaan tanda tangan elektronik oleh
                                    Penerima Dana pada Dokumen-Dokumen
                                    Elektronik, yang mana merupakan
                                    satu-kesatuan daripadanya adalah sah, benar
                                    dan mengikat secara hukum yang sama kuatnya
                                    dengan tanda tangan fisik.
                                  </td>
                                </tr>
                                <tr>
                                  <td className={tableNumber}>c.</td>
                                  <td className={tableContent}>
                                    Para Pihak dapat menggunakan tanda tangan
                                    elektronik untuk satu atau beberapa dokumen
                                    dari Dokumen-Dokumen Elektronik dengan
                                    klasifikasi tertentu, baik dengan, maupun
                                    tanpa menggunakan sertifikat elektronik yang
                                    dibuat oleh penyelenggara sertifikat
                                    elektronik Indonesia yang terdaftar di
                                    instansi terkait, sepanjang memenuhi
                                    persyaratan yang diatur dalam Undang-Undang
                                    mengenai informasi dan transaksi elektronik
                                    atau sejenisnya. Pengklasifikasian tersebut
                                    diatur sesuai standar operasional prosedur
                                    yang berlaku di JULO dan/atau Mitra Bisnis.
                                  </td>
                                </tr>
                                <tr>
                                  <td className={tableNumber}>d.</td>
                                  <td className={tableContent}>
                                    Dalam hal proses autentikasi tambahan, jika
                                    diperlukan, Penerima Dana dengan ini
                                    memberikan kuasa kepada Pemberi Dana untuk
                                    menyematkan tanda tangan elektronik pada
                                    setiap Perjanjian Pendanaan dan SKRTP atau
                                    Dokumen-Dokumen Elektronik lainnya, dengan
                                    tata cara yang diinstruksikan oleh JULO
                                    dan/atau Mitra Bisnis sesuai peraturan yang
                                    berlaku terkait tanda tangan elektronik,
                                    termasuk namun tidak terbatas dengan cara
                                    menekan fitur persetujuan (<i>consent</i>)
                                    yang akan muncul pada setiap SKRTP dan/atau
                                    Dokumen-Dokumen Elektronik lainnya, atau
                                    memasukan Kode PIN yang Anda miliki ataupun
                                    cara lain yang sah sesuai kesepakatan Para
                                    Pihak.
                                  </td>
                                </tr>
                                <tr>
                                  <td className={tableNumber}>e.</td>
                                  <td className={tableContent}>
                                    Para Pihak mengetahui dan sepakat bahwa
                                    Tanda Tangan Elektronik yang disematkan
                                    sebagaimana huruf d ayat ini adalah Tanda
                                    Tangan elektronik yang keabsahannya diatur
                                    dan distandarisasi oleh standar operasional
                                    prosedur yang berlaku di JULO dan/atau Mitra
                                    Bisnis.
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        {/* 9.4 */}

                        {/* 9.5 */}
                        <tr>
                          <td className={tableNumber}>9.5.</td>
                          <td className={tableContent}>
                            Pemberi Dana dan/atau JULO telah menyusun Perjanjian
                            Pendanaan ini dengan maksud menyeragamkan atau
                            menstandarisasikan isi dan bentuk Perjanjian
                            Pendanaan ini secara elektronik, terkait bentuk
                            kegiatan, skema dan/atau model Pendanaan yang
                            dilakukan antara Pemberi Dana dan Penerima Dana.
                            Apabila terdapat segala bentuk Perjanjian Pendanaan
                            lainnya yang berbeda dari isi dan bentuk Perjanjian
                            Pendanaan ini akan segera disesuaikan dengan standar
                            Perjanjian Pendanaan ini di kemudian hari.
                          </td>
                        </tr>
                        {/* 9.5 */}

                        {/* 9.6 */}
                        <tr>
                          <td className={tableNumber}>9.6.</td>
                          <td className={tableContent}>
                            Pemberi Dana dan/atau JULO dan/atau Mitra Bisnis
                            dapat memberikan akses kepada Penerima Dana untuk
                            dapat mencetak Perjanjian Pendanaan ini. Dalam hal
                            ini, Perjanjian Pendanaan bersifat elektronik,
                            sehingga memungkinkan Penerima Dana tidak dapat
                            mencetak keseluruhan lampiran berupa tautan sehingga
                            memerlukan tindakan tambahan untuk mengakses
                            terlebih dahulu lampiran-lampiran bertautan
                            tersebut.
                          </td>
                        </tr>
                        {/* 9.6 */}

                        {/* 9.7 */}
                        <tr>
                          <td className={tableNumber}>9.7.</td>
                          <td className={tableContent}>
                            Perjanjian ini telah disesuaikan dengan ketentuan
                            peraturan perundang-undangan termasuk ketentuan
                            Peraturan Otoritas Jasa Keuangan.
                          </td>
                        </tr>
                        {/* 9.7 */}

                        {/* 9.8 */}
                        <tr>
                          <td className={tableNumber}>9.8.</td>
                          <td className={tableContent}>
                            Menyimpang dari hal-hal yang bertentangan, ketentuan
                            Perjanjian Pendanaan ini dapat sewaktu-waktu diubah
                            atau diubah secara tertulis dengan persetujuan
                            bersama Para Pihak dan tidak ada modifikasi atau
                            tambahan pada bagian manapun dari Perjanjian
                            Pendanaan ini kecuali dibuat dengan
                            Adendum/Amandemen tertulis yang ditandatangani oleh
                            perwakilan resmi Para Pihak.
                          </td>
                        </tr>
                        {/* 9.8 */}
                      </tbody>
                    </table>
                    <br />
                  </td>
                </tr>
                {/* 9. */}
                {/* 10. */}
                <tr>
                  <td className={tableNumber}>10.</td>
                  <td className={tableContent}>
                    <b>
                      MEKANISME PENYELESAIAN HAK dan KEWAJIBAN SESUAI JIKA JULO
                      TIDAK DAPAT MELANJUTKAN KEGIATAN OPERASIONALNYA.
                    </b>
                    <table>
                      <tbody>
                        {/* 10.1 */}
                        <tr>
                          <td className={tableNumber}>10.1.</td>
                          <td className={tableContent}>
                            Pemberi Dana melalui JULO akan menginformasikan
                            kepada Penerima Dana mengenai rencana penghentian
                            Layanan JULO dalam jangka waktu tertentu yang akan
                            diinformasikan beserta alasan dan rencana
                            penyelesaian hak dan kewajiban baik antara JULO
                            dengan Penerima Dana maupun Pemberi Dana melalui
                            Sistem Elektronik milik JULO dan/atau media lain
                            yang relevan, sebelum rencana tersebut dilakukan.
                          </td>
                        </tr>
                        {/* 10.1 */}

                        {/* 10.2 */}
                        <tr>
                          <td className={tableNumber}>10.2.</td>
                          <td className={tableContent}>
                            Penyelesaian hak dan kewajiban JULO kepada seluruh
                            pengguna baik Penerima Dana maupun Pemberi Dana
                            dapat dilakukan melalui :
                            <table>
                              <tbody>
                                <tr>
                                  <td className={tableNumber}>a.</td>
                                  <td className={tableContent}>
                                    posisi akhir pengalihan porfolio Pendanaan
                                    yang tertunggak dari Penerima Dana;
                                  </td>
                                </tr>
                                <tr>
                                  <td className={tableNumber}>b.</td>
                                  <td className={tableContent}>
                                    tata cara atau mekanisme lain yang akan
                                    disepakati Para Pihak dalam Perjanjian
                                    Pendanaan ini.
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        {/* 10.2 */}

                        {/* 10.3 */}
                        <tr>
                          <td className={tableNumber}>10.3.</td>
                          <td className={tableContent}>
                            Tanpa mengurangi maksud pasal 10.1 dan pasal 10.2
                            Perjanjian Pendanaan ini, penyelesaian hak dan
                            kewajiban wajib diselesaikan sejak persetujuan yang
                            akan disampaikan ke OJK kepada JULO.
                          </td>
                        </tr>
                        {/* 10.3 */}

                        {/* 10.4 */}
                        <tr>
                          <td className={tableNumber}>10.4.</td>
                          <td className={tableContent}>
                            Mekanisme dan jangka waktu penyelesaian seluruh
                            kewajiban yang timbul dalam penyelenggaraan LPBBTI
                            ditetapkan oleh OJK dengan memperhatikan rencana
                            tindak lanjut yang disampaikan oleh JULO.
                          </td>
                        </tr>
                        {/* 10.4 */}

                        {/* 10.5 */}
                        <tr>
                          <td className={tableNumber}>10.5.</td>
                          <td className={tableContent}>
                            Pemberi Dana dapat melakukan mekanisme apapun yang
                            disebutkan pada pasal 10.2, dengan kesepakatan
                            terlebih dahulu dengan Penerima Dana.
                          </td>
                        </tr>
                        {/* 10.5 */}
                      </tbody>
                    </table>
                    <br />
                  </td>
                </tr>
                {/* 10. */}
                {/* 11. */}
                <tr>
                  <td className={tableNumber}>11.</td>
                  <td className={tableContent}>
                    <b>FORCE MAJEURE</b>
                    <table>
                      <tbody>
                        <tr>
                          {/* 11.1 */}
                          <td className={tableNumber}>11.1.</td>
                          <td className={tableContent}>
                            Pengertian Force Majeure adalah suatu keadaan tanpa
                            kesalahan atau kelalaian yang disebabkan oleh salah
                            satu Pihak yang terjadi di luar kendali Pihak
                            tersebut, dimana Pihak tersebut secara wajar tidak
                            dapat mencegah atau mengatasinya, termasuk namun
                            tidak terbatas pada bencana alam, wabah penyakit,
                            perang (dinyatakan atau tidak), invasi, konflik
                            bersenjata, kerusuhan, demonstrasi, revolusi atau
                            kudeta, tindakan terorisme, sabotase atau kerusakan
                            karena kriminalisme, ledakan nuklir, kontaminasi
                            radioaktif atau kimia atau radiasi ionisasi,
                            gelombang tekanan yang disebabkan oleh pesawat
                            terbang atau lainnya benda terbang yang melaju
                            dengan kecepatan suara atau di atas kecepatan suara,
                            gangguan listrik, gangguan sistem atau jaringan
                            pihak ketiga lainnya atau perubahan peraturan
                            perundang-undangan atau kebijakan pemerintah yang
                            dapat mempengaruhi kemampuan salah satu Pihak atau
                            Para Pihak. Dalam keadaan force majeure, Penerima
                            Dana tetap bertanggung jawab atas kewajibannya
                            berdasarkan Perjanjian Pendanaan ini.
                          </td>
                        </tr>
                        {/* 11.1 */}

                        {/* 11.2 */}
                        <tr>
                          <td className={tableNumber}>11.2.</td>
                          <td className={tableContent}>
                            JULO dan/atau Mitra Bisnis atas permintaan Pemberi
                            Dana atau berdasarkan kuasa Pemberi Dana, dapat
                            menghentikan layanan Pendanaan kepada Anda atau
                            mengambil tindakan atau langkah-langkah yang
                            dipandang perlu oleh JULO, setiap saat jika terjadi
                            Force Majeure sebagaimana yang disebutkan pada pasal
                            11.1 ini.
                          </td>
                        </tr>
                        {/* 11.2 */}
                      </tbody>
                    </table>
                  </td>
                </tr>
                {/* 11. */}
              </tbody>
            </table>
            {/*  END OF PERJANJIAN PENDANAAN */}
            <br />
            <Div textAlign='center' fontWeight='bold'>
              <p>Lampiran 1</p>
              <p>SYARAT DAN KETENTUAN PENGGUNAAN</p>
            </Div>
            <Div textAlign='left'>
              <table>
                <tbody>
                  <tr>
                    <td className={tableNumber}>a.</td>
                    <td className={tableContent}>
                      <a href={partner_tnc || ''} target='_blank'>
                        Syarat dan Ketentuan Mitra Bisnis
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Div>
            <br />
            <Div textAlign='center' fontWeight='bold'>
              <p>Lampiran 2</p>
              <p>KEBIJAKAN DATA PRIBADI</p>
            </Div>
            <Div textAlign='left'>
              <table>
                <tbody>
                  <tr>
                    <td className={tableNumber}>a.</td>
                    <td className={tableContent}>
                      <a href={partner_privacy_rule || ''} target='_blank'>
                        Kebijakan Privasi Mitra Bisnis
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Div>
            <br />
            <Div textAlign='center' fontWeight='bold'>
              <p>Lampiran 3</p>
              <p>SURAT KONFIRMASI RINCIAN TRANSAKSI PENDANAAN</p>
              <p>Nomor : </p>
            </Div>
            <Div textAlign='justify'>
              <p>
                Surat Konfirmasi Rincian Transaksi Pendanaan (selanjutnya
                disebut) <b>"SKRTP" </b>
                ini dibuat dan disetujui pada tanggal {date_today}, oleh dan
                antara :
              </p>
              <table
                className={`${w100}`}
                style={{ borderCollapse: 'separate', borderSpacing: '0 1em' }}
              >
                <tbody>
                  <tr>
                    <td className={cx(tableNumber, pr2)}>1. </td>
                    <td className={tableContent}>
                      <b>Pemberi Dana</b> yaitu perusahaan atau orang
                      perseorangan dengan detail identitas legalitas sebagai berikut :
                      <table className={w100}>
                        <tbody>
                          <tr>
                            <td className={cx(tableNumber, width('20px'))}>a.</td>
                            <td className={cx(textLeft, dFlex)}>Nama/Perusahaan</td>
                            <td className={cx(tableNumber, width('20px'))}>:</td>
                            <td className={dFlex}>PT Julo Teknologi Perdana</td>
                          </tr>
                          <tr>
                            <td className={cx(tableNumber, width('20px'))}>b.</td>
                            <td className={cx(textLeft, dFlex)}>
                              Nama Perwakilan Perusahaan
                            </td>
                            <td className={cx(tableNumber, width('20px'))}>:</td>
                            <td className={dFlex}>H. Sebastian</td>
                          </tr>
                          <tr>
                            <td className={cx(tableNumber, width('20px'))}>c.</td>
                            <td className={cx(textLeft, dFlex)}>
                              Nomor Izin Perusahaan Terkait
                            </td>
                            <td className={cx(tableNumber, width('20px'))}>:</td>
                            <td className={dFlex}>9120008631626</td>
                          </tr>
                          <tr>
                            <td className={cx(tableNumber, width('20px'))}>d.</td>
                            <td className={cx(pr3, dFlex, textLeft)}>Alamat Terdaftar</td>
                            <td className={cx(tableNumber, width('20px'))}>:</td>
                            <td className={cx(width('55%'), dFlex)}>
                              Eightyeight@kasablanka office tower Lt. 10 Unit E,
                              Jl. Casablanca Raya Kav. 88, Menteng Dalam, Tebet, DKI Jakarta
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td className={cx(dFlex, pr2)}>2.</td>
                    <td style={{ textAlign: 'justify' }}>
                      Anda adalah <b>Penerima Dana, </b>
                      yang memiliki identitas sebagai berikut :
                      <table className={w100}>
                        <tbody>
                          <tr>
                            <td className={cx(tableNumber, width('20px'))}>a.</td>
                            <td className={cx(textLeft, dFlex)}>Nama</td>
                            <td className={cx(tableNumber, width('20px'))}>:</td>
                            <td className={dFlex}>{decodeBase64(customer_name) || ''}</td>
                          </tr>
                          <tr>
                            <td className={cx(tableNumber, width('20px'))}>b.</td>
                            <td className={cx(textLeft, dFlex)}>
                              Tgl. Lahir
                            </td>
                            <td className={cx(tableNumber, width('20px'))}>:</td>
                            <td className={dFlex}>
                              {dob}
                            </td>
                          </tr>
                          <tr>
                            <td className={cx(tableNumber, width('20px'))}>c.</td>
                            <td className={cx(textLeft, dFlex)}>
                              No. KTP
                            </td>
                            <td className={cx(tableNumber, width('20px'))}>:</td>
                            <td className={dFlex}>
                              {decodeBase64(customer_nik) || ''}
                            </td>
                          </tr>
                          <tr>
                            <td className={cx(tableNumber, width('20px'))}>d.</td>
                            <td className={cx(textLeft, dFlex)}>
                              No. Telpon
                            </td>
                            <td className={cx(tableNumber, width('20px'))}>:</td>
                            <td className={dFlex}>
                              {customer_phone}
                            </td>
                          </tr>
                          <tr>
                            <td className={cx(tableNumber, width('20px'))}>e.</td>
                            <td className={cx(pr3, dFlex, textLeft)}>Alamat</td>
                            <td className={cx(tableNumber, width('20px'))}>:</td>
                            <td className={cx(width('55%'), dFlex)}>
                              {full_address}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p>
                Untuk selanjutnya, Penerima Dana dan JULO secara bersama-sama
                disebut juga
                <b>&nbsp;"Para Pihak"</b> dan masing-masing disebut{' '}
                <b>"Pihak"</b>.
              </p>
              <p>
                Penerima Dana menyatakan setuju untuk mengkaitkan diri kepada
                JULO atas ketentuan-ketentuan sebagai berikut:
              </p>
              <table
                className={`${w100}`}
                style={{ borderCollapse: 'separate', borderSpacing: '0 1em' }}
              >
                <tbody>
                  <tr>
                    <td style={{ verticalAlign: 'top' }} className={`${pr2}`}>
                      1.
                    </td>
                    <td style={{ textAlign: 'justify' }}>
                      Bahwa Penerima Dana mengkonfirmasi dan setuju bahwa
                      pengajuan Pendanaan yang disetujui akan diberikan dalam
                      bentuk Pendanaan berupa pemberian jumlah Pendanaan
                      tertentu kepada Penerima Dana sebagaimana yang tertuang
                      dalam Perjanjian Pendanaan No. .... Penerima Dana dapat
                      melakukan transaksi jika jumlah Pendanaan mencukupi.
                    </td>
                  </tr>
                  <tr>
                    <td className={cx(dFlex, pr2)}>2.</td>
                    <td style={{ textAlign: 'justify' }}>
                      Bahwa Penerima Dana dengan ini mengkonfirmasi untuk
                      mengajukan Permohonan Penggunaan Pendanaan dengan nomor
                      SKRTP melalui JULO, dan telah disetujui sebesar{' '}
                      {formatMoney(loan_amount)} (“Pokok
                      Pinjaman”), dan Bunga Pendanaan sebesar{' '}
                      {formatMoney(interest_amount)}. Permohonan
                      Penggunaan Pendanaan ini akan memotong jumlah Pendanaan
                      yang tersedia.
                    </td>
                  </tr>
                  <tr>
                    <td className={cx(dFlex, pr2)}>3.</td>
                    <td style={{ textAlign: 'justify' }}>
                      Bahwa Penerima Dana mengkonfirmasi dan berjanji untuk
                      melunasi Dana dengan melakukan pembayaran Nilai Angsuran
                      sesuai Tabel Angsuran berikut ini:
                      <Row className={cx(mt3, ml0, mr0)}>
                        <Col className={`${pl0}`} xs='2'>
                          <b>Cicilan</b>
                        </Col>
                        <Col xs='5'>
                          <b>Jumlah</b>
                        </Col>
                        <Col className={`${pr0}`} xs='5'>
                          <b>Jatuh Tempo</b>
                        </Col>

                        <Col className={`${pl0}`} xs='2'>
                          1
                        </Col>
                        <Col xs='5'>
                          {formatMoney(payment_amount_1) || '…'}
                        </Col>
                        <Col className={`${pr0}`} xs='5'>
                          {due_date_1 || '…'}
                        </Col>

                        <Col className={`${pl0}`} xs='2'>
                          2
                        </Col>
                        <Col xs='5'>
                          {formatMoney(payment_amount_2) || '…'}
                        </Col>
                        <Col className={`${pr0}`} xs='5'>
                          {due_date_2 || '…'}
                        </Col>

                        <Col className={`${pl0}`} xs='2'>
                          3
                        </Col>
                        <Col xs='5'>
                          {formatMoney(payment_amount_3) || '…'}
                        </Col>
                        <Col className={`${pr0}`} xs='5'>
                          {due_date_3 || '…'}
                        </Col>
                        <Col className={`${pl0}`} xs='2'>
                          4
                        </Col>
                        <Col xs='5'>
                          {formatMoney(payment_amount_4) || '…'}
                        </Col>
                        <Col className={`${pr0}`} xs='5'>
                          {due_date_4 || '…'}
                        </Col>

                        <Col className={cx(px0, mt2)} xs='12'>
                          <p className={`${mb0}`}>
                            Berdasarkan Tabel Angsuran diatas, maka jangka waktu
                            adalah 8 Minggu
                          </p>
                        </Col>
                      </Row>
                    </td>
                  </tr>
                  <tr>
                    <td className={cx(dFlex, pr2)}>4.</td>
                    <td style={{ textAlign: 'justify' }}>
                      Bahwa Penerima Dana akan mengkonfirmasi untuk melakukan
                      pembayaran setiap bulan sebelum tanggal jatuh tempo.
                      Keterlambatan akan dikenakan biaya Denda Keterlambatan
                      sebesar {late_fee_rate} % per hari, untuk setiap angsuran
                      yang terlambat, dengan total kumulatif tidak melebihi{' '}
                      {formatMoney(maximum_late_fee_amount)} .
                    </td>
                  </tr>
                  <tr>
                    <td className={cx(dFlex, pr2)}>5.</td>
                    <td style={{ textAlign: 'justify' }}>
                      Bahwa pembayaran setiap bulan akan dilakukan langsung oleh
                      Penerima Dana melalui Aplikasi Milik Mitra Bisnis.
                    </td>
                  </tr>
                  <tr>
                    <td className={cx(dFlex, pr2)}>6.</td>
                    <td style={{ textAlign: 'justify' }}>
                      Pernyataan Persetujuan
                      <table
                        className={`${w100}`}
                        style={{
                          borderCollapse: 'separate',
                          borderSpacing: '0 8px',
                        }}
                      >
                        <tbody>
                          <tr>
                            <td className={cx(dFlex, pr2)}>a.</td>
                            <td style={{ textAlign: 'justify' }}>
                              Penerima Dana dan Pemberi Dana mengerti atas hak dan
                              kewajiban masing-masing pihak, sesuai dengan yang
                              tertuang pada Perjanjian Pendanaan sesuai No. ...
                              dan akan senantiasa mematuhi ketentuan hukum yang
                              berlaku dalam melaksanakan SKRTP ini.
                            </td>
                          </tr>
                          <tr>
                            <td className={cx(dFlex, pr2)}>b.</td>
                            <td style={{ textAlign: 'justify' }}>
                              Hal yang belum dituangkan dalam SKRTP ini akan
                              diatur di kemudian hari melalui Perubahan SKRTP
                              (Addendum), yang merupakan persetujuan lebih
                              lanjut antara Pemberi Dana dan Penerima Dana, dan
                              bagian yang tidak terpisahkan dari SKRTP ini,
                              serta tidak memerlukan tanda tangan ulang.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <Div xs='12'>
                <p>
                  <b>DEMIKIAN</b>, Perjanjian Pendanaan beserta
                  Lampiran-Lampirannya , yang mana ini disetujui
                  atau ditandatangani secara elektronik
                  (termasuk menggunakan tanda tangan elektronik)
                  sesuai dengan ketentuan dalam Undang-Undang
                  Republik Indonesia No. 11 Tahun 2008 tanggal
                  21 April 2008 tentang informasi dan Transaksi
                  Elektronik berikut dengan segala perubahan/amandemennya
                  dan peraturan pelaksananya beserta segala
                  perubahan/amandemennya, dari waktu ke waktu oleh
                  Para Pihak atau perwakilannya yang sah dan mempunyai
                  kekuatan yang sama dengan perjanjian yang dibuat dan ditandatangani secara fisik.
                </p>
              </Div>
              {/* Signature Section */}
              <Row className={`${mt2}`}>
                <Col className={`${mb5}`} xs='6'>
                  Dinyatakan oleh :
                </Col>
                <Col className={`${mb5}`} xs='6'>
                  Diakui oleh :
                </Col>

                <Col className={`${mb5}`} xs='6'>
                  {' '}
                </Col>
                <Col className={`${mb5}`} xs='6'>
                  Jakarta,
                </Col>

                <Col className={`${mb5}`} xs='6'>
                  <b>Penerima Dana</b>
                </Col>
                <Col className={`${mb5}`} xs='6'>
                  <b>Pemberi Dana</b>
                  <br />
                  PT Julo Teknologi Perdana
                </Col>

                <Col className={`${mb5}`} xs='6'>
                  {' '}
                </Col>
                <Col className={`${mb5}`} xs='6'>
                  {' '}
                </Col>

                <Col className={`${mb5}`} xs='6'>
                  {decodeBase64(customer_name) || ''}
                </Col>
                <Col className={`${mb5}`} xs='6'>
                  H. Sebastian
                  <br />
                  Kuasa Direktur
                </Col>
              </Row>
            </Div>
          </Div>
        </Card>
        <Div textAlign='center' className={`${mb2}`}>
          <span className={cx(text({ size: 12 }), dBlock, mb2)}>
            Berizin dan diawasi oleh
          </span>
          <Img src={ojk} alt='ojk' />
        </Div>
      </Wrapper>
    </Layout>
  );
};
DanaContract.defaultProps = {
  customer_name: '',
  customer_nik: '',
  customer_phone: '',
  date_today: '',
  dob: '',
  due_date_1: '',
  due_date_2: '',
  due_date_3: '',
  due_date_4: '',
  full_address: '',
  interest_amount: '',
  late_fee_rate: '',
  loan_amount: '',
  maximum_late_fee_amount: '',
  partner_email: '',
  partner_privacy_rule: '',
  partner_tnc: '',
  payment_amount_1: '',
  payment_amount_2: '',
  payment_amount_3: '',
  payment_amount_4: '',
};

export default DanaContract;
