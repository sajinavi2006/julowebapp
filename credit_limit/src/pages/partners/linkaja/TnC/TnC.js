import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { cx } from '@emotion/css';

import themeLinkAja from 'themes/Partner/linkaja';

import faq from 'assets/img/icon/ic-faq.svg';
import ojk from 'assets/img/OJK.svg';

import Layout from 'components/Layout';

import { Button, Div, Img, Li, Ol, Wrapper } from 'assets/css/styled';
import { text } from 'assets/css/stylesValue';
import { my3, my4 } from 'assets/css/stylesFix';

const TnC = () => {
  const themeText = themeLinkAja?.text;
  const themeColor = themeLinkAja?.color;
  const bottomPage = useRef(null);
  const history = useHistory();

  const handleAction = async (value) => {
    if (value) {
      history.replace('/linkaja/application/personal_identity');
    } else {
      history.goBack();
    }
  };

  return (
    <Layout hideBarBack>
      <Div textAlign='center'>
        <Img width='200px' src={faq} alt='Syarat dan Ketentuan' />
      </Div>
      <Div className={cx(text({ size: 16, color: themeText?.primary }))}>
        Untuk tujuan verifikasi identitas, mencegah penipuan dan menguji
        kelayakan kredit Anda, JULO akan menggunakan informasi berikut ini: ID
        perangkat, fitur hardware, interaksi pada aplikasi JULO, lokasi, daftar
        aplikasi, IMEI perangkat, jejak jejaring sosial (tidak wajib), akun bank
        (tidak wajib), dan akun e-commerce (tidak wajib).
        <br />
        <br />
        Keamanan data dan privasi Anda adalah prioritas kami. JULO tidak pernah
        menyimpan User ID/ PIN/ password Anda dan selalu menggunakan sistem
        terenkripsi. Informasi Anda kami gunakan semata-mata untuk memfasilitasi
        verifikasi identitas dan uji kelayakan kredit Anda, demi memperbesar
        kesempatan Anda dalam mendapatkan pinjaman JULO.
      </Div>
      <Div>
        <Div
          className={cx(
            text({ size: 14, weight: 'bold', color: themeColor?.black }),
            my4
          )}
        >
          PERHATIAN
        </Div>
        <Wrapper>
          <Ol
            type='1'
            className={cx(text({ size: 16, color: themeText?.primary }))}
          >
            <Li className={my3}>
              Layanan Pinjam Meminjam Berbasis Teknologi Informasi merupakan
              kesepakatan perdata antara Pemberi Pinjaman dengan Penerima
              Pinjaman, sehingga segala risiko yang timbul dari kesepakatan
              tersebut ditanggung sepenuhnya oleh masing-masing pihak.
            </Li>
            <Li className={my3}>
              Risiko kredit atau gagal bayar ditanggung sepenuhnya oleh Pemberi
              Pinjaman. Tidak ada lembaga atau otoritas negara yang bertanggung
              jawab atas risiko gagal bayar ini.
            </Li>
            <Li className={my3}>
              Penyelenggara dengan persetujuan dari masing-masing Pengguna
              (Pemberi Pinjaman dan/atau Penerima Pinjaman) mengakses,
              memperoleh, menyimpan, mengelola dan/atau menggunakan data pribadi
              Pengguna (&apos;Pemanfaatan Data&apos;) pada atau di dalam benda,
              perangkat elektronik (termasuk smartphone atau telepon seluler),
              perangkat keras (hardware) maupun lunak (software), dokumen
              elektronik, aplikasi atau sistem elektronik milik Pengguna atau
              yang dikuasai Pengguna, dengan memberitahukan tujuan, batasan dan
              mekanisme Pemanfaatan Data tersebut kepada Pengguna yang
              bersangkutan sebelum memperoleh persetujuan yang dimaksud.
            </Li>
            <Li className={my3}>
              Pemberi Pinjaman yang belum memiliki pengetahuan dan pengalaman
              pinjam meminjam, disarankan untuk tidak menggunakan layanan ini.
            </Li>
            <Li className={my3}>
              Penerima Pinjaman harus mempertimbangkan tingkat bunga pinjaman
              dan biaya lainnya sesuai dengan kemampuan dalam melunasi pinjaman.
            </Li>
            <Li className={my3}>
              Setiap kecurangan tercatat secara digital di dunia maya dan dapat
              diketahui masyarakat luas di media sosial.
            </Li>
            <Li className={my3}>
              Pengguna harus membaca dan memahami informasi ini sebelum membuat
              keputusan menjadi Pemberi Pinjaman atau Penerima Pinjaman.
            </Li>
            <Li className={my3}>
              Pemerintah yaitu dalam hal ini Otoritas Jasa Keuangan, tidak
              bertanggung jawab atas setiap pelanggaran atau ketidakpatuhan oleh
              Pengguna, baik Pemberi Pinjaman maupun Penerima Pinjaman (baik
              karena kesengajaan atau kelalaian Pengguna) terhadap ketentuan
              peraturan perundang-undangan maupun kesepakatan atau perikatan
              antara Penyelenggara dengan Pemberi Pinjaman dan/atau Penerima
              Pinjaman.
            </Li>
            <Li className={my3}>
              Setiap transaksi dan kegiatan pinjam meminjam atau pelaksanaan
              kesepakatan mengenai pinjam meminjam antara atau yang melibatkan
              Penyelenggara, Pemberi Pinjaman dan/atau Penerima Pinjaman wajib
              dilakukan melalui escrow account dan virtual account sebagaimana
              yang diwajibkan berdasarkan Peraturan Otoritas Jasa Keuangan Nomor
              77/POJK.01/2016 tentang Layanan Pinjam Meminjam Uang Berbasis
              Teknologi Informasi dan pelanggaran atau ketidakpatuhan terhadap
              ketentuan tersebut merupakan bukti telah terjadinya pelanggaran
              hukum oleh Penyelenggara sehingga Penyelenggara wajib menanggung
              ganti rugi yang diderita oleh masing-masing Pengguna sebagai
              akibat langsung dari pelanggaran hukum tersebut di atas tanpa
              mengurangi hak Pengguna yang menderita kerugian menurut Kitab
              Undang-Undang Hukum Perdata.
            </Li>
          </Ol>
        </Wrapper>
      </Div>
      <Div>
        <Div className='bordered-bottom-light py-5'>
          <Button
            onClick={() => handleAction(true)}
            className='btn btn-blue w-100 py-3 mb-2'
          >
            Setuju
          </Button>
          <Button
            onClick={() => handleAction(false)}
            className='btn btn-secondary w-100 py-3'
          >
            Tidak Setuju
          </Button>
        </Div>
        <Div ref={bottomPage} className='w-100 text-center py-3'>
          <span className='d-block text-sm mb-2'>Berizin dan diawasi oleh</span>
          <Img src={ojk} alt='' />
        </Div>
      </Div>
    </Layout>
  );
};

export default TnC;
