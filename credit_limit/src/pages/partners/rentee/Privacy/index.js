import React from "react";
import { MAX_WIDTH, MIN_WIDTH } from "constant";
import { dFlex, flexColumn } from "assets/css/stylesFix";
import { flex } from "assets/css/stylesValue";

import { Wrapper } from "assets/css/styled";
import Layout from "components/Layout";

function Privacy() {
  return (
    <Layout
      barBackType="primary"
      barBackTitle="Syarat dan Ketentuan"
    >
      <div className={`${dFlex} ${flexColumn} ${flex("1 1 100%")}`}>
         
         <Wrapper
           maxWidth={MAX_WIDTH}
           minWidth={MIN_WIDTH}
           backgroundColor="#fff"
           styles={{
             flex: "1 1 100%",
             padding: "0px",
             position: "relative",
             paddingBottom: "20px",
           }}
         >
             <div className="container policy-section">
               <div className="row">
                 <div className="col-12">
                   <ol type="1" style={{ fontWeight: "bold" }}>
                     <li>Definisi</li>
                     <br />
                     <div style={{ fontWeight: "300" }}>
                       <strong>1.1. </strong>PT Julo Teknologi Finansial,
                       selanjutnya disebut JULO, adalah perusahaan di bidang
                       teknologi finansial yang beroperasi sebagai
                       penyelenggara Layanan Pinjam Meminjam Uang Berbasis
                       Teknologi Informasi, sesuai dengan Peraturan OJK Nomor
                       77/POJK.01/2016.
                       <br />
                       <br />
                       <strong>1.2. </strong>Anda adalah Pemberi Pinjaman,
                       Penerima Pinjaman, pengguna, pengunjung atau setiap
                       orang yang menggunakan Sistem Elektronik JULO.
                       <br />
                       <br />
                       <strong>1.3. </strong>Sistem Elektronik JULO adalah
                       aplikasi yang bisa diunduh melalui smartphone ataupun
                       situs yang dapat dikunjungi melalui perangkat elektronik
                       Anda.
                       <br />
                       <br />
                       <strong>1.4. </strong>Layanan adalah pengadaan sarana
                       melalui Sistem Elektronik JULO milik PT Julo Teknologi
                       Finansial yang digunakan untuk mempertemukan Pemberi
                       Pinjaman dengan Penerima Pinjaman, untuk melaksanakan
                       kegiatan pinjaman secara langsung atau peer-to-peer
                       lending.
                       <br />
                       <br />
                       <strong>1.5. </strong>Penerima Pinjaman adalah Anda yang
                       menggunakan Layanan JULO atas nama perseorangan, badan
                       usaha mikro, kecil atau menengah, yang bermaksud untuk
                       menerima pinjaman melalui JULO.
                       <br />
                       <br />
                       <strong>1.6. </strong>Pemberi Pinjaman adalah Anda yang
                       menggunakan Layanan JULO atas nama perseorangan, badan
                       usaha, institusi, perusahaan yang menyediakan dana
                       sebagai Pinjaman, yang disalurkan oleh JULO ke Penerima
                       Pinjaman atas persetujuan Pemberi Pinjaman melalui JULO.
                       <br />
                       <br />
                       <strong>1.7. </strong>Pinjaman adalah dana yang
                       diberikan Pemberi Pinjaman kepada Penerima Pinjaman
                       melalui JULO.
                       <br />
                       <br />
                       <strong>1.8. </strong> Pihak Ketiga adalah Pihak yang
                       dimaksud di dalam ketentuan 5.15 syarat dan ketentuan
                       ini.
                       <br />
                       <br />
                       <strong>1.9. </strong>Konten Anda adalah data pribadi,
                       segala materi dan informasi yang Anda berikan, unggah,
                       publikasikan, sediakan, kirimkan dan tampilkan pada
                       Sistem Elektronik JULO.
                       <br />
                       <br />
                       <strong>1.10. </strong>Hukum adalah undang-undang,
                       peraturan, surat keputusan dan kebijakan yang memiliki
                       kekuatan hukum, baik di daerah, provinsi, wilayah,
                       kotamadya, kabupaten, pusat maupun pemerintahan
                       regional, otoritas gabungan pemerintahan dan swasta;
                       baik dari pemerintah Republik Indonesia dan yuridiksi
                       terkait lainnya, termasuk kementerian, departemen,
                       komisi, biro, dewan, administratif dan/atau lembaga atau
                       badan lainnya.
                       <br />
                       <br />
                       <strong>1.11. </strong>Surat Perjanjian Hutang Piutang
                       adalah perjanjian pinjam meminjam antara Pemberi
                       Pinjaman dan Penerima Pinjaman, dimana Penerima Pinjaman
                       berjanji akan membayar kembali semua Pinjaman beserta
                       bunga dalam kurun waktu yang telah disetujui kedua belah
                       pihak.
                       <br />
                       <br />
                     </div>
                     <br />
                     <br />
                     <br />
                     <li>Layanan JULO</li>
                     <br />
                     <div style={{ fontWeight: "300" }}>
                       <strong>2.1. </strong>Layanan JULO bersifat
                       administratif dan JULO bertindak sebagai penyelenggara
                       Layanan Pinjam Meminjam Uang Berbasis Teknologi
                       Informasi{" "}
                       <a style={{ fontStyle: "italic" }}>
                         (peer-to-peer lending).
                       </a>
                       <br />
                       <br />
                       <strong>2.2. </strong>JULO tidak memihak siapapun, baik
                       Penerima Pinjaman maupun Pemberi Pinjaman, dalam
                       perjanjian pinjam meminjam.
                       <br />
                       <br />
                       <strong>2.3. </strong>JULO memegang wewenang tunggal dan
                       absolut untuk menerima dan menolak Pemberi Pinjaman
                       dan/atau Penerima Pinjaman. Apabila Anda ditolak, JULO
                       tidak akan menyediakan Layanan atau kewajiban apapun
                       kepada Anda.
                       <br />
                       <br />
                       <strong>2.4. </strong>Ketentuan Layanan JULO tunduk pada
                       Hukum dan Syarat dan Ketentuan Umum ini. JULO tidak
                       bertanggung jawab atas tindakan yang diambil oleh pihak
                       manapun dalam rangka mematuhi Hukum dan Syarat dan
                       Ketentuan Umum ini, kecuali memperoleh persetujuan
                       terlebih dahulu dari pihak JULO.
                       <br />
                       <br />
                       <strong>2.5. </strong>JULO tidak akan menyediakan
                       layanan simpanan atau deposito dalam bentuk apapun,
                       dan/atau layanan penyimpanan/penghimpunan dana, dan/atau
                       mengadakan kegiatan perbankan, pasar modal atau kegiatan
                       lainnya seperti yang diatur oleh OJK dan BI
                       <br />
                       <br />
                       <strong>2.6. </strong>Layanan yang disediakan oleh JULO
                       dapat termasuk memfasilitasi Pinjaman dan/atau jenis
                       layanan produk pinjaman lain yang dapat ditambahkan
                       sewaktu-waktu.
                       <br />
                       <br />
                       <strong>2.7. </strong>PT Julo Teknologi Finansial
                       didirikan berdasarkan Hukum Republik Indonesia dan
                       merupakan badan hukum yang terdaftar dan diawasi oleh
                       OJK.
                       <br />
                       <br />
                       <strong>2.8 </strong>Apabila terdapat pertentangan atau
                       perbedaan antara Syarat dan Ketentuan Umum ini dan
                       Perjanjian lainnya, maka yang berlaku adalah Perjanjian
                       atau Syarat dan Ketentuan yang berlaku secara spesifik.
                     </div>
                     <br />
                     <br />
                     <br />
                     <li>Penggunaan Umum</li>
                     <br />
                     <div style={{ fontWeight: "300" }}>
                       Dengan mengunduh dan menggunakan Layanan JULO, Anda
                       menyatakan dan mengakui bahwa:
                       <br />
                       <br />
                       <strong>3.1. </strong>Anda telah membaca, memahami dan
                       menyetujui semua yang tertera dalam Syarat dan Ketentuan
                       Umum ini.
                       <br />
                       <br />
                       <strong>3.2. </strong>Anda adalah pengguna Layanan JULO
                       yang berusia di atas 21 tahun.
                       <br />
                       <br />
                       <strong>3.3. </strong>Perangkat yang Anda gunakan untuk
                       mengunduh, menggunakan, mengisi dan mengajukan pinjaman
                       melalui Sistem Elektronik JULO adalah: (1) perangkat
                       milik Anda pribadi dan digunakan untuk kebutuhan Anda
                       sehari hari, atau (2) perangkat yang bukan milik Anda
                       pribadi, namun digunakan untuk kebutuhan Anda
                       sehari-hari sehingga data dalam perangkat tersebut
                       adalah data Anda.
                       <br />
                       <br />
                       <strong>3.4. </strong>Anda tidak diperbolehkan untuk
                       memanfaatkan Layanan JULO untuk keperluan-keperluan yang
                       bertentangan dengan Hukum.
                       <br />
                       <br />
                       <strong>3.5. </strong>Anda tidak diperbolehkan untuk
                       menggunakan, mengakses, mengumpulkan dan/atau mengambil
                       data pada Sistem Elektronik JULO.
                       <br />
                       <br />
                       <strong>3.6. </strong>Anda tidak diperbolehkan untuk
                       menggunakan sarana dan/atau program otomatis apapun
                       untuk mengakses Sistem Elektronik JULO dan/atau
                       mengumpulkan informasi dari Sistem Elektronik JULO
                       <br />
                       <br />
                       <strong>3.7. </strong>Anda tidak diperbolehkan untuk
                       mengunggah, mempublikasikan, mengirim email dan
                       menyediakan iklan, promosi, junk mail, spam dan/atau
                       segala bentuk apapun lainnya baik untuk komersial
                       ataupun non-komersial, pada Sistem Elektronik JULO
                       dan/atau pihak manapun.
                       <br />
                       <br />
                       <strong>3.8. </strong>Anda tidak diperbolehkan untuk
                       mengubah tampilan pada Sistem Elektronik JULO.
                       <br />
                       <br />
                       <strong>3.9. </strong>Anda tidak diperbolehkan untuk
                       membuat <a style={{ fontStyle: "italic" }}>pop-up</a>
                       untuk setiap akses terhadap Sistem Elektronik JULO.
                       <br />
                       <br />
                       <strong>3.10. </strong>Anda tidak diperbolehkan untuk
                       melakukan hal-hal lain yang dapat merugikan JULO
                       dan/atau fasilitas dalam Sistem Elektronik JULO.
                       <br />
                       <br />
                       <strong>3.11. </strong>Anda sepakat bahwa apabila
                       terdapat pelanggaran yang Anda lakukan atas Syarat dan
                       Ketentuan Umum ini, atau terhadap Hukum yang berlaku,
                       maka JULO dapat menghapus akun Anda pada Sistem
                       Elektronik JULO secara sepihak dan tanpa pemberitahuan,
                       serta membatasi atau melarang Anda menggunakan Sistem
                       Elektronik JULO dan mengakhiri Layanan kepada Anda. Anda
                       sepakat bahwa segala kerugian materiil maupun
                       non-materiil yang timbul dari penghapusan akun dan/atau
                       pembatasan akses Anda sebagaimana dimaksud diatas
                       merupakan sepenuhnya tanggung jawab Anda.
                     </div>
                     <br />
                     <br />
                     <br />
                     <li>
                       Persetujuan Terhadap Penggunaan Transaksi Elektronik
                     </li>
                     <br />
                     <div style={{ fontWeight: "300" }}>
                       <strong>4.1. </strong>Dengan menggunakan Sistem
                       Elektronik JULO, Anda memahami dan menyetujui bahwa
                       segala bentuk komunikasi dari JULO berkaitan dengan
                       Layanan kepada Anda melalui Sistem Elektronik JULO, akan
                       diberikan secara elektronik baik melalui sms, email,
                       <a style={{ fontStyle: "italic" }}>
                         WhatsApp, WhatsApp Call, in-app chat,
                       </a>{" "}
                       telepon atau publikasi (
                       <a style={{ fontStyle: "italic" }}>push notification</a>
                       ) dari Sistem Elektronik JULO.
                       <br />
                       <br />
                       <strong>4.2. </strong>Anda sepakat untuk memberikan dan
                       menerima seluruh dokumen, pemberitahuan dan perjanjian
                       secara elektronik yang timbul atas penggunaan Layanan
                       dan Sistem Elektronik JULO, termasuk Layanan sebagai
                       Pemberi Pinjaman dan/atau sebagai Penerima Pinjaman.
                       Segala persetujuan dari Anda terhadap setiap dokumen,
                       pemberitahuan dan perjanjian secara elektronik yang
                       timbul karena penggunaan Layanan dan Sistem Elektronik
                       JULO, diberikan dengan melakukan tanda tangan secara
                       elektronik.
                       <br />
                       <br />
                       <strong>4.3. </strong>Anda mengerti dan menyetujui bahwa
                       Anda menggunakan Aplikasi menurut kehendak dan
                       berdasarkan penilaian Anda sendiri dan sepakat bahwa
                       JULO tidak dapat:
                       <ol
                         style={{ fontWeight: "bold", listStyleType: "disc" }}
                       >
                         <li>
                           <a style={{ fontWeight: "300" }}>
                             Menjamin keabsahan dan ketepatan informasi apa pun
                             yang Anda berikan pada Aplikasi berkaitan data
                             informasi Anda, sehingga JULO menerima informasi
                             tersebut atas dasar apa adanya yang berasal dari
                             penyerahan Anda secara langsung kepada JULO.
                           </a>
                         </li>
                         <li>
                           <a style={{ fontWeight: "300" }}>
                             Menjamin aplikasi akan tersedia pada setiap waktu
                             dan akan beroperasi tanpa eror atau bahwa akses
                             dan layanan tidak akan mengalami gangguan.
                           </a>
                         </li>
                         <li>
                           <a style={{ fontWeight: "300" }}>
                             Aplikasi atau konten apa pun bebas dari virus dan
                             perangkat perusak lainnya yang hal diakibatkan
                             oleh baik perangkat keras ataupun perangkat lunak
                             milik Anda.
                           </a>
                         </li>
                       </ol>
                       <br />
                       <strong>4.4. </strong>Anda dengan tegas membebaskan
                       Perusahaan dan direktur, pejabat serta perwakilannya
                       dari biaya, kerugian, kewajiban atau konsekuensi lain
                       apa pun yang disebabkan oleh Penggunaan Aplikasi oleh
                       Anda atau tindakan-tindakan Anda yang dapat merugikan
                       Anda atau akun Anda sendiri seperti namun tidak terbatas
                       memberikan data informasi pribadi seperti kata sandi,
                       kode OTP, Pin, mentransfer dana dan mengikuti instruksi
                       dari pihak lain yang mengatasnamakan JULO dan tidak
                       bertanggung jawab melalui kanal manapun dengan metode
                       komunikasi yang tidak resmi dan tidak dibenarkan oleh
                       JULO.
                       <br />
                       <br />
                       <strong>4.5. </strong>Seluruh persetujuan yang telah
                       Anda berikan secara elektronik melalui Sistem Elektronik
                       JULO adalah sepenuhnya tanggung jawab Anda dan mengikat
                       Anda selaku pengguna Layanan, baik hal maupun kewajiban
                       yang timbul atas persetujuan tersebut.
                     </div>
                     <br />
                     <br />
                     <br />
                     <li>Konten Anda dan Perlindungan Privasi</li>
                     <br />
                     <div style={{ fontWeight: "300" }}>
                       <strong>5.1. </strong>Perangkat yang Anda gunakan untuk
                       mengunduh, menggunakan, mengisi dan mengajukan Pinjaman
                       melalui Sistem Elektronik JULO adalah (1) perangkat
                       milik Anda pribadi yang Anda gunakan untuk kebutuhan
                       Anda sehari-hari, atau (2) perangkat yang bukan milik
                       Anda, namun Anda gunakan untuk kebutuhan sehari-hari dan
                       data yang terdapat dalam perangkat tersebut adalah data
                       Anda. Anda secara sukarela dan bertanggung-jawab
                       sepenuhnya atas segala materi dan informasi yang Anda
                       kirimkan, berikan, unggah, publikasikan, sediakan atau
                       tampilkan pada Sistem Elektronik JULO (“Konten Anda”).
                       <br />
                       <br />
                       <strong>5.2. </strong>Dengan menggunakan Layanan JULO,
                       Anda memberikan persetujuan dan hak pada JULO untuk
                       mengumpulkan, menyimpan, menyalin, memproses, memformat
                       ulang, membuka informasi, mengakses, mentransfer,
                       mengkaji, mengungkap dan menggunakan Konten Anda untuk
                       tujuan lain dan/atau terkait dengan penggunaan Sistem
                       Elektronik JULO, secara terus-menerus, sesuai Hukum yang
                       berlaku.
                       <br />
                       <br />
                       <strong>5.3. </strong>Anda berhak untuk menarik Konten
                       Anda setiap saat. Apabila Anda menarik Konten Anda dari
                       Sistem Elektronik JULO, segala hak yang telah Anda
                       berikan pada JULO sebagaimana dimaksud diatas, masih
                       tetap berlaku.
                       <br />
                       <br />
                       <strong>5.4. </strong>Anda berhak untuk meminta JULO
                       untuk menghapus data yang Anda kumpulkan terkait dengan
                       pengajuan permohonan Pinjaman Anda. Anda dapat
                       menghubungi JULO melalui berbagai media komunikasi
                       termasuk telepon, chat, dan email. JULO bertanggungjawab
                       untuk menghapus data-data terkait dalam waktu 15 hari
                       kerja
                       <br />
                       <br />
                       <strong>5.5. </strong>Dengan menggunakan Layanan JULO,
                       Anda secara sukarela menyetujui dan memberikan hak
                       kepada JULO untuk memproses pengajuan Pinjaman Anda
                       dengan menggunakan Konten Anda yang diperoleh melalui
                       cara yang termasuk, namun tidak terbatas pada:
                       <br />
                       <br />
                       <ol type="i" style={{ fontWeight: "bold" }}>
                         <li>
                           <a style={{ fontWeight: "300" }}>
                             Informasi dan formulir pengajuan Pinjaman yang
                             termasuk namun tidak terbatas pada nama, tanggal
                             lahir, KTP, paspor atau nomor atau keterangan
                             identifikasi lain, alamat, alamat email, nomor
                             telepon, rincian kontak, informasi keuangan atau
                             informasi dari e-banking dan kartu kredit,
                             deskripsi dan foto pribadi, informasi portofolio
                             produk dan layanan, pola dan perilaku transaksi,
                             latar belakang keuangan, sejarah pendanaan, latar
                             belakang pendidikan dan data kependudukan.
                           </a>
                         </li>
                         <br />
                         <li>
                           <a style={{ fontWeight: "300" }}>
                             Seluruh dokumen tentang Anda dan/atau individu
                             yang relevan sehingga dapat mengidentifikasikan
                             Anda, yang diunggah dan dikumpulkan namun tidak
                             terbatas pada foto kartu identitas diri, foto
                             diri, informasi keuangan seperti slip gaji
                             (bersifat pilihan), rekening koran 3 bulan
                             terakhir(bersifat pilihan), dan iuran BPJS
                             (bersifat pilihan).
                           </a>
                         </li>
                         <br />
                         <li>
                           <a style={{ fontWeight: "300" }}>
                             Informasi dari media sosial seperti Facebook
                             dan/atau referensi pihak ketiga lainnya.
                           </a>
                         </li>
                         <br />
                         <li>
                           <a style={{ fontWeight: "300" }}>
                             Informasi mengenai tempat usaha, tempat bekerja
                             dan tempat tinggal Anda berdasarkan teknologi GPS
                             (Global Positioning System).
                           </a>
                         </li>
                         <br />
                         <li>
                           <a style={{ fontWeight: "300" }}>
                             Informasi pada perangkat Anda yang dikumpulkan
                             saat Anda menggunakan Sistem Elektronik JULO.
                           </a>
                         </li>
                         <br />
                         <li>
                           <a style={{ fontWeight: "300" }}>
                             Informasi yang didapatkan pada pihak ketiga
                             dan/atau sumber relevan lainnya mengenai Anda,
                             yang sesuai dengan Hukum yang berlaku, yang dapat
                             digunakan oleh JULO untuk menyediakan informasi
                             yang dibutuhkan oleh JULO terkait fasilitas
                             Pinjaman yang diberikan.
                           </a>
                         </li>
                         <br />
                         <li>
                           <a style={{ fontWeight: "300" }}>
                             Informasi dan data mengenai Penerima Pinjaman dan
                             rekening-rekeningnya, dan/atau kartu kredit yang
                             dimiliki (jika ada), dan/atau informasi lain yang
                             dipandang penting oleh JULO di:
                           </a>
                           <ol type="a" style={{ fontWeight: "bold" }}>
                             <li>
                               <a style={{ fontWeight: "300" }}>
                                 Kantor perwakilan dan cabang, dan/atau
                                 perusahaan atau perusahaan asosiasi terkait
                                 Penerima Pinjaman, pada yuridiksi manapun;
                               </a>
                             </li>
                             <li>
                               <a style={{ fontWeight: "300" }}>
                                 Pemerintah atau badan pemerintahan atau badan
                                 otoritas;
                               </a>
                             </li>
                             <li>
                               <a style={{ fontWeight: "300" }}>
                                 Setiap calon pengalihan hak Penerima Pinjaman
                                 dan/atau pihak yang telah atau dapat memiliki
                                 hubungan kontraktual dengan Penerima Pinjaman
                                 dalam kaitannya dengan fasilitas Pinjaman;
                               </a>
                             </li>
                             <li>
                               <a style={{ fontWeight: "300" }}>
                                 Biro kredit, termasuk anggota biro kredit
                                 tersebut;
                               </a>
                             </li>
                             <li>
                               <a style={{ fontWeight: "300" }}>
                                 Setiap pihak ketiga, suami, istri, keluarga,
                                 teman, atasan, bawahan, rekan kerja, penyedia
                                 jasa, agen, dan/atau partner bisnis (termasuk,
                                 tidak terbatas pada, referensi kredit atau
                                 agen evaluasi) dimanapun situasinya mungkin
                                 terjadi; dan
                               </a>
                             </li>
                             <li>
                               <a style={{ fontWeight: "300" }}>
                                 Kepada pihak yang membuka informasi yang
                                 diperbolehkan oleh Hukum untuk membuka
                                 informasi.
                               </a>
                             </li>
                           </ol>
                         </li>
                       </ol>
                       <br />
                       <br />
                       <strong>5.6. </strong>Anda memahami bahwa Anda tidak
                       wajib untuk memberikan akses ke data akun media sosial
                       maupun akses ke data-data di perangkat Anda. Anda
                       diperkenankan untuk melanjutkan pengajuan Pinjaman tanpa
                       data tersebut. Namun, dengan memberikan akses ke data
                       akun media sosial dan data-data perangkat Anda, Anda
                       akan meningkatkan kesempatan Anda untuk mendapatkan
                       produk Pinjaman lebih baik dari JULO. Data-data tersebut
                       mendukung Konten Anda termasuk, namun tidak terbatas
                       pada:
                       <br />
                       <br />
                       <ol type="i" style={{ fontWeight: "bold" }}>
                         <li>
                           <a style={{ fontWeight: "300" }}>
                             Verifikasi identitas
                           </a>
                         </li>
                         <br />
                         <li>
                           <a style={{ fontWeight: "300" }}>
                             Mitigasi risiko penipuan identitas.
                           </a>
                         </li>
                         <br />
                         <li>
                           <a style={{ fontWeight: "300" }}>
                             Penilaian risiko kredit untuk proses underwriting
                             Pinjaman
                           </a>
                         </li>
                         <br />
                         <li>
                           <a style={{ fontWeight: "300" }}>
                             Analisis statistik/kuantitatif
                           </a>
                         </li>
                         <br />
                         <li>
                           <a style={{ fontWeight: "300" }}>
                             Melakukan kontrol regulasi.
                           </a>
                         </li>
                         <br />
                         <li>
                           <a style={{ fontWeight: "300" }}>
                             Memberikan informasi dan menjawab pertanyaan
                           </a>
                         </li>
                         <br />
                         <li>
                           <a style={{ fontWeight: "300" }}>
                             Mencegah penipuan, pencucian uang dan kegiatan
                             kriminal lainnya.
                           </a>
                         </li>
                       </ol>
                       <br />
                       <br />
                       <strong>5.7. </strong>JULO tidak akan berbagi dan/atau
                       menjual data Anda secara langsung ataupun tidak langsung
                       kepada pihak ketiga yang tidak berkepentingan melalui
                       proses Pinjaman kepada JULO.
                       <br />
                       <br />
                       <strong>5.8. </strong>Penggunaan Konten Anda yang
                       dikumpulkan melalui Sistem Elektronik JULO dimaksudkan
                       untuk beberapa tujuan yang dapat dipertanggung-jawabkan:
                       <br />
                       <br />
                       <ol type="i" style={{ fontWeight: "bold" }}>
                         <li>
                           <a style={{ fontWeight: "300" }}>
                             Memverifikasi dan mengesahkan identitas Anda untuk
                             tujuan pencegahan penipuan/fraud.
                           </a>
                         </li>
                         <br />
                         <li>
                           <a style={{ fontWeight: "300" }}>
                             Menaksir sejarah kredit, menguji kelayakan,
                             reputasi kredit dan kemampuan simpan pinjam Anda.
                           </a>
                         </li>
                         <br />
                         <li>
                           <a style={{ fontWeight: "300" }}>
                             Mengkonfirmasi pekerjaan Anda.
                           </a>
                         </li>
                         <br />
                         <li>
                           <a style={{ fontWeight: "300" }}>
                             Mengelola akurasi dan memverifikasi informasi
                             mengenai Anda, sesuai dengan pertimbangan tunggal
                             dan absolut JULO jika dianggap perlu.
                           </a>
                         </li>
                         <br />
                         <li>
                           <a style={{ fontWeight: "300" }}>
                             Memformulasikan data statistik mengenai Anda
                             melalui tindakan penjelajahan dan pola pemakaian
                             perangkat Anda.
                           </a>
                         </li>
                         <br />
                         <li>
                           <a style={{ fontWeight: "300" }}>
                             Menghubungi pihak ketiga, misalkan atasan tempat
                             Anda bekerja, suami/istri, keluarga, teman, yang
                             telah Anda ajukan untuk mengkonfirmasi tentang
                             diri Anda.
                           </a>
                         </li>
                         <br />
                         <li>
                           <a style={{ fontWeight: "300" }}>
                             Membuat analisa dan meningkatkan model statistik
                             JULO untuk memperkirakan risiko Pinjaman.
                           </a>
                         </li>
                         <br />
                         <li>
                           <a style={{ fontWeight: "300" }}>
                             Mengidentifikasi Anda ketika Anda menghubungi JULO
                             dan/atau menggunakan Sistem Elektronik JULO.
                           </a>
                         </li>
                         <br />
                         <li>
                           <a style={{ fontWeight: "300" }}>
                             Mengidentifikasi produk JULO atau rekan JULO yang
                             menarik bagi Anda.
                           </a>
                         </li>
                         <br />
                         <li>
                           <a style={{ fontWeight: "300" }}>
                             Mencegah dan mendeteksi penipuan.
                           </a>
                         </li>
                         <br />
                         <li>
                           <a style={{ fontWeight: "300" }}>
                             Menghubungi Anda terkait dengan permintaan Anda.
                           </a>
                         </li>
                         <br />
                         <li>
                           <a style={{ fontWeight: "300" }}>
                             Memutakhirkan model statistik dan Sistem
                             Elektronik JULO guna memenuhi kebutuhan pengguna
                             di masa mendatang.
                           </a>
                         </li>
                         <br />
                         <li>
                           <a style={{ fontWeight: "300" }}>
                             Memastikan bahwa konten pada Sistem Elektronik
                             JULO disajikan dengan penyajian yang paling
                             efektif untuk Anda.
                           </a>
                         </li>
                         <br />
                         <li>
                           <a style={{ fontWeight: "300" }}>
                             Mengizinkan Anda berpartisipasi dalam berbagai
                             fitur Layanan yang ditawarkan oleh JULO.
                           </a>
                         </li>
                         <br />
                         <li>
                           <a style={{ fontWeight: "300" }}>
                             Mengevaluasi keefektifan dari pemasaran produk
                             JULO, untuk pengecekan berkala dan riset
                             pemasaran.
                           </a>
                         </li>
                         <br />
                         <li>
                           <a style={{ fontWeight: "300" }}>
                             Memberitahu Anda tentang perubahan Layanan.
                           </a>
                         </li>
                         <br />
                         <li>
                           <a style={{ fontWeight: "300" }}>
                             Mengizinkan badan keuangan, badan otoritas,
                             dan/atau pihak ketiga yang berwenang guna
                             mengadakan pengecekan terbatas pada status Anda
                             dalam database atau Layanan JULO.
                           </a>
                         </li>
                         <br />
                         <li>
                           <a style={{ fontWeight: "300" }}>
                             Yang pada akhirnya untuk keperluan bisnis JULO
                             secara umum, yaitu memroses transaksi Pinjaman,
                             membuat keputusan dan memberi fasilitas Pinjaman
                             yang sesuai untuk Anda sesuai dengan keputusan
                             dari Pemberi Pinjaman.
                           </a>
                         </li>
                         <br />
                         <li>
                           <a style={{ fontWeight: "300" }}>
                             Mencegah dan mendeteksi tindak pidana pencucian
                             uang dan pendanaan terorisme.
                           </a>
                         </li>
                       </ol>
                       <br />
                       <br />
                       <strong>5.9. </strong>JULO menyetujui, merahasiakan,
                       menjaga dan menghormati privasi Konten Anda. JULO tidak
                       pernah dan tidak akan pernah menjual Konten Anda ke
                       pihak manapun yang tidak berkepentingan. Namun, dengan
                       ketentuan bahwa hal tersebut diatas tidak berlaku untuk
                       Konten Anda yang: (1) terjadi pengakuan secara sah atas
                       kepemilikannya terhadap Konten Anda sebelum pengungkapan
                       oleh pihak tersebut; (2) Konten Anda telah diketahui
                       publik dan waktu itu belum diketahui pelanggaran Hukum
                       yang berlaku; (3) Konten Anda diketahui publik melalui
                       tanpa adanya kesalahan pihak tersebut; (4) Konten Anda
                       diperoleh secara sah oleh pihak tersebut tanpa larangan
                       kerahasiaan dari sumber-sumber lain; (5) Konten Anda
                       disyaratkan untuk diungkap oleh perintah pengadilan
                       dan/atau menurut Hukum yang berlaku; atau (6) Konten
                       Anda diungkapkan dalam proses litigasi apapun.
                       <br />
                       <br />
                       <strong>5.10. </strong>Konten Anda disimpan dengan aman.
                       JULO memberikan Anda (atau Anda telah memilih) sebuah
                       kata sandi yang memudahkan Anda untuk mengakses bagian
                       tertentu dari Sistem Elektronik JULO, dan Anda
                       bertanggung-jawab untuk memberlakukan sandi tersebut
                       sebagai sesuatu yang sangat rahasia dan tidak membagi
                       sandi tersebut kepada pihak yang tidak berkepentingan.
                       <br />
                       <br />
                       <strong>5.11. </strong>Pengiriman informasi melalui
                       internet tidak sepenuhnya aman. Meskipun JULO telah
                       melakukan hal yang terbaik untuk melindungi Konten Anda,
                       JULO tidak dapat menjamin keamanan Konten Anda yang
                       dikirim melalui Sistem Elektronik JULO. Pengiriman
                       apapun adalah tanggung jawab Anda. Ketika JULO menerima
                       informasi Anda, JULO akan menggunakan prosedur yang
                       ketat dan fitur keamanan sebagai usaha untuk mencegah
                       akses yang tidak bertanggung jawab.
                       <br />
                       <br />
                       <strong>5.12. </strong> Sistem keamanan JULO telah
                       memenuhi/melampaui standar industri dan JULO senantiasa
                       mengamati perkembangan teknologi guna memastikan sistem
                       JULO berkembang seperti yang disyaratkan. JULO juga
                       melakukan tes terhadap sistem secara berkala untuk
                       memastikan mekanisme keamanan JULO selalu mutakhir. JULO
                       tunduk kepada hukum perlindungan privasi data di
                       Indonesia dan sepenuhnya mematuhi serta memberikan rasa
                       hormat terbesar.
                       <br />
                       <br />
                       <strong>5.13. </strong>Anda memahami dan menyetujui
                       bahwa JULO berhak, namun tidak berkewajiban, atas
                       kebijakannya sendiri, meninjau dan/atau menghapus (tanpa
                       pemberitahuan) segala Konten Anda termasuk, namun tidak
                       terbatas pada, Konten Anda yang atas kebijakan JULO
                       digolongkan sebagai pelanggaran atas Syarat dan
                       Ketentuan umum, bertentangan dengan Hukum yang berlaku,
                       dan/atau dapat melanggar atau membahayakan hak dan
                       keamanan pengguna lain.
                       <br />
                       <br />
                       <strong>5.14. </strong>JULO sewaktu-waktu dapat
                       melakukan modifikasi data Penerima Pinjaman yang
                       terdapat dalam database. Hal ini termasuk, namun tidak
                       terbatas pada, pembaruan informasi Penerima Pinjaman,
                       Konten Anda, dan mengunggah dokumen tambahan yang
                       berkaitan dengan data Penerima Pinjaman.
                       <br />
                       <br />
                       <strong>5.15. </strong> Anda memberikan persetujuan dan
                       hak kepada JULO untuk membagi informasi dan data yang
                       kami dapatkan dari Anda kepada kepada Pihak Ketiga yang
                       bekerjasama dengan kami termasuk tetapi tidak terbatas
                       pada :
                       <br />
                       <ol type="i">
                         <li>
                           para mitra usaha, pemasok dan sub-kontraktor untuk
                           pelaksanaan setiap kontrak yang kami adakan dengan
                           mereka atau Anda
                         </li>
                         <li>
                           para pengiklan dan jaringan-jaringan iklan yang
                           memerlukan data dengan tujuan untuk memilih dan
                           menyediakan iklan yang relevan kepada Anda dan orang
                           lain. Kami tidak mengungkapkan informasi tentang
                           individu yang dapat diidentifikasi kepada para
                           pengiklan, tetapi kami dapat memberikan mereka
                           informasi agregat tentang Para Pengguna kami. Kami
                           dapat menggunakan informasi atau data yang
                           dikumpulkan dari Anda untuk memungkinkan kami
                           memenuhi keinginan para pengiklan kami dengan
                           menampilkan iklan mereka kepada audiens yang menjadi
                           target;
                           <li>
                             penyedia analisis dan mesin pencari yang tujuannya
                             membantu kami dalam peningkatan dan optimalisasi
                             situs kami;
                           </li>
                           <li>
                             agen, kontraktor atau penyedia layanan pihak
                             ketiga yang menyediakan administrasi, pengiriman
                             pos, telemarketing, telekomunikasi penjualan
                             langsung, call center, proses bisnis, perjalanan,
                             visa, manajemen pengetahuan, sumber daya manusia,
                             pengolahan data, teknologi informasi, komputer,
                             pembayaran, penagihan utang, referensi kredit atau
                             pemeriksaan-pemeriksaan latar belakang lain atau
                             layanan-layanan lain kepada JULO sehubungan dengan
                             pengoperasian bisnis dari JULO atau JULO Group,
                             maupun penagihan hutang. Vendor penagihan hutang
                             yang bekerjasama dengan JULO saat ini:
                             AsiaCollect, MBA Consulting, Telmark, SIM, Selaras
                             dan Collmatra.
                           </li>
                           <li>
                             orang atau entitas yang merupakan bagian dari JULO
                             walaupun hanya terbatas diperlukan untuk memenuhi
                             tujuan yang relevan dengan transaksi peminjaman;
                           </li>
                           <li>
                             lembaga keuangan yang dengannya Anda memiliki atau
                             mengajukan untuk memiliki urusan terkait dengan
                             setiap Produk dan/atau Layanan;
                           </li>
                           <li>
                             lembaga keuangan, agen proses, biro jasa
                             perkreditan yang terdaftar di OJK atau pihak lain
                             yang akan terlibat dalam transaksi untuk
                             pengiriman uang atau kegiatan perbankan/keuangan
                             apapun
                           </li>
                         </li>
                       </ol>
                     </div>
                     <br />
                     <br />
                     <br />
                     <li>Keakuratan Data</li>
                     <br />
                     <div style={{ fontWeight: "300" }}>
                       <strong>6.1. </strong>Anda setuju bahwa dengan mengakses
                       Sistem Elektronik JULO dan menggunakan Layanan, Anda
                       menjamin keaslian dan keakuratan seluruh data yang Anda
                       berikan melalui Sistem Elektronik JULO. Seluruh data
                       yang Anda berikan adalah data yang benar, akurat,
                       lengkap, terbaru dan tidak menyesatkan.
                       <br />
                       <br />
                       <strong>6.2. </strong>Anda memahami kewajiban Anda
                       seperti:
                       <br />
                       <br />
                       <ol type="i" style={{ fontWeight: "bold" }}>
                         <li>
                           <a style={{ fontWeight: "300" }}>
                             Memperbarui dan menginformasikan kepada JULO atas
                             setiap data yang mengalami perubahan, segera
                             setelah perubahan tersebut.
                           </a>
                         </li>
                         <br />
                         <li>
                           <a style={{ fontWeight: "300" }}>
                             Menjaga sandi dan data pribadi Anda.
                           </a>
                         </li>
                         <br />
                         <li>
                           <a style={{ fontWeight: "300" }}>
                             Apabila JULO menemukan, baik langsung maupun tidak
                             langsung, di kemudian hari bahwa data-data yang
                             Anda berikan tidak benar, diduga palsu dan/atau
                             tidak akurat, maka JULO berhak untuk melarang
                             akses Anda terhadap Sistem Elektronik JULO. Anda
                             akan bertanggung jawab penuh terhadap setiap
                             kerusakan yang timbul maupun yang akan timbul,
                             baik materiil maupun non materiil, atas setiap
                             ketidakakuratan data yang Anda berikan. JULO bisa
                             mencatat hal tersebut ke dalam sejarah kredit Anda
                             dan mungkin membagikan informasi tersebut ke badan
                             hukum yang tepat atau pihak yang berwenang
                             dan/atau agensi pencegah penipuan.
                           </a>
                         </li>
                       </ol>
                     </div>
                     <br />
                     <br />

                     <li>Pernyataan dan Jaminan dari Penerima Pinjaman</li>
                     <br />
                     <div style={{ fontWeight: "300" }}>
                       <strong>7.1. </strong>Penerima Pinjaman adalah individu
                       atau pelaku usaha yang didirikan berdasarkan Hukum di
                       Indonesia.
                       <br />
                       <br />
                       <strong>7.2. </strong>Perangkat yang digunakan Penerima
                       Pinjaman untuk mengunduh, menggunakan, mengisi dan
                       mengajukan Pinjaman melalui Sistem Elektronik JULO
                       adalah: (1) perangkat milik Penerima Pinjaman sendiri
                       dan digunakan untuk kebutuhan Penerima Pinjaman
                       sehari-hari, atau (2) perangkat yang bukan milik
                       Penerima Pinjaman, namun digunakan untuk kebutuhan
                       Penerima Pinjaman sehari-hari, sehingga data yang
                       terdapat dalam perangkat tersebut adalah data-data
                       Penerima Pinjaman sendiri.
                       <br />
                       <br />
                       <strong>7.3. </strong>Penerima Pinjaman mampu membayar
                       hutang dan tidak ada alasan yang menyatakan bahwa
                       Penerima Pinjaman tidak mampu membayar hutangnya ketika
                       jatuh tempo.
                       <br />
                       <br />
                       <strong>7.4. </strong>Penerima Pinjaman memiliki
                       kapasitas hukum dan telah memperoleh perizinan dan/atau
                       persetujuan yang diperlukan berdasarkan Hukum dan/atau
                       perjanjian lain, dimana Penerima Pinjaman terikat pada
                       Syarat dan Ketentuan umum dan melaksanakan kewajiban
                       yang tertera pada Syarat dan Ketentuan Umum dan
                       perjanjian lain yang terkait. Selanjutnya, Penerima
                       Pinjaman harus sudah mengambil langkah yang diperlukan
                       untuk mengikatkan dirinya dalam Syarat dan Ketentuan
                       umum dan perjanjian lain yang terkait.
                       <br />
                       <br />
                       <strong>7.5. </strong>Kewajiban yang diasumsikan
                       mengikat Penerima Pinjaman dalam Syarat dan Ketentuan
                       umum dan perjanjian lain yang terkait, dianggap legal,
                       sah, mengikat dan dapat ditegakkan kepada Penerima
                       Pinjaman.
                       <br />
                       <br />
                       <strong>7.6. </strong>Semua informasi dan
                       dokumen-dokumen yang diberikan Penerima Pinjaman kepada
                       JULO adalah benar, akurat, asli, resmi dan sah secara
                       materi dan sesuai dengan tanggal dokumen diberikan atau
                       tanggal tertera pada dokumen.
                       <br />
                       <br />
                       <strong>7.7. </strong>Tidak ada tindakan hukum, gugatan,
                       atau proses hukum atau didepan pengadilan, sidang, badan
                       pemerintahan, agensi atau badan resmi atau arbitrator
                       (baik dalam proses atau akan diajukan) yang dapat
                       berdampak pada legalitas, keabsahan, atau penegakan
                       Syarat dan Ketentuan umum ini atau perjanjian lain yang
                       terkait, atau mempengaruhi kemampuan Penerima Pinjaman
                       untuk menjalankan kewajiban.
                       <br />
                       <br />
                       <strong>7.8</strong> Penerima Pinjaman bukan merupakan
                       ataupun terkait dengan Orang yang Populer secara Politis
                       (PEP) menurut definisi Peraturan OJK NOMOR 12
                       /POJK.01/2017. JULO berhak melakukan analisa lebih jauh
                       atau menolak applikasi pinjaman atas status atau
                       hubungan anda dengan PEP.
                     </div>

                     <br />
                     <br />
                     <br />
                     <li>Pembayaran oleh Penerima Pinjaman</li>
                     <br />
                     <div style={{ fontWeight: "300" }}>
                       <strong>8.1. </strong>Pinjaman melalui Sistem Elektronik
                       JULO adalah sah dan mengikat. Hubungan pinjam-meminjam
                       antara Pemberi Pinjaman dan Penerima Pinjaman diatur
                       dalam Surat Perjanjian Hutang Piutang yang disepakati
                       oleh para pihak dan merupakan hubungan keperdataan.
                       <br />
                       <br />
                       <strong>8.2. </strong>Dinyatakan dalam KUHP (Kitab
                       Undang-undang Hukum Perdata) Pasal 1754 KUH, bahwa
                       Penerima Pinjaman harus mengembalikan Pinjaman kepada
                       Pemberi Pinjaman.
                       <br />
                       <br />
                       <strong>8.3. </strong>Setelah menandatangani Surat
                       Perjanjian Hutang Piutang, Penerima Pinjaman setuju
                       untuk mengikatkan diri dalam perjanjian dan dokumen lain
                       yang terkait fasilitas Pinjaman dalam jangka waktu yang
                       sudah ditentukan. Pembayaran kembali Pinjaman, dengan
                       bunga, harus dilakukan secara berkala dan tepat waktu.
                       <br />
                       <br />
                       <strong>8.4. </strong>Penerima Pinjaman setuju bahwa
                       kegagalan dalam mengikatkan diri dalam perjanjian atau
                       dokumen lain terkait dalam jangka waktu tersebut,
                       termasuk namun tidak terbatas pada gagal bayar,
                       berakibat pada Penerima Pinjaman wajib membayar denda
                       keterlambatan. Skema pembayaran kembali Pinjaman dapat
                       di-restrukturisasi sesuai dengan peraturan yang ada.
                       <br />
                       <br />
                       <strong>8.5. </strong>JULO sebagai fasilitator Pinjaman,
                       dapat menggunakan jasa pihak ketiga untuk melakukan
                       penagihan dan dapat melakukan tindakan hukum dalam
                       proses penyelesaian.
                       <br />
                       <br />
                       <strong>8.6. </strong>Penerima Pinjaman memahami dan
                       setuju untuk mematuhi dan membayar setiap pengaturan
                       fasilitas Pinjaman, biaya lain-lain dalam melakukan
                       pengaturan dan administratif fasilitas Pinjaman dan
                       Surat Perjanjian Hutang Piutang terkait. Sebagai
                       tambahan, Penerima Pinjaman sepakat untuk membayar semua
                       denda, biaya keterlambatan, biaya penagihan, dan biaya
                       lainnya.
                     </div>
                     <br />
                     <br />
                     <br />
                     <li>Pernyataan dan Jaminan dari JULO</li>
                     <br />
                     <div style={{ fontWeight: "300" }}>
                       <strong>9.1. </strong>JULO terdaftar dengan nama PT Julo
                       Teknologi Finansial di negara Republik Indonesia dan
                       telah mendaftarkan kantor di 88@Kasablanka Tower A Lt.
                       10E, Jalan Casablanca Raya Kav. 88, Jakarta Selatan.
                       <br />
                       <br />
                       <strong>9.2. </strong>JULO adalah sebuah perusahaan yang
                       didirikan secara sah dan diatur menurut Hukum Indonesia
                       dan mematuhi semua Hukum yang berlaku
                       <br />
                       <br />
                       <strong>9.3. </strong>JULO adalah penyedia Sistem
                       Elektronik JULO yang melakukan kegiatan sebagai
                       penyelenggara Layanan Pinjam Meminjam Uang Berbasis
                       Teknologi Informasi{" "}
                       <a style={{ fontStyle: "italic" }}>
                         (peer-to-peer lending)
                       </a>{" "}
                       sesuai dengan Peraturan OJK Nomor 77/POJK.01/2016. Dalam
                       hal ini, Pinjaman langsung diberikan oleh Pemberi
                       Pinjaman kepada Penerima Pinjaman, dan JULO bertindak
                       hanya sebagai penyedia sarana.
                       <br />
                       <br />
                       <strong>9.4. </strong>Pinjaman yang terdapat dalam
                       Sistem Elektronik JULO adalah berdasarkan Surat
                       Perjanjian Hutang Piutang dan tidak dianggap sebagai
                       dampak sebagaimana yang dimaksud dalam UU No.8 Th.1995
                       tentang Pasar Modal. Oleh karena itu, penawaran atas
                       Pinjaman yang terdapat dalam Sistem Elektronik JULO juga
                       bukan merupakan suatu penawaran sebagaimana yang
                       dimaksud dalam UU No.8 Th.1995 tentang Pasar Modal,
                       melainkan hanya merupakan penawaran bersifat perdata.
                       <br />
                       <br />
                       <strong>9.5. </strong>JULO tidak melakukan tindakan
                       penghimpunan maupun pengelolaan dana masyarakat, baik
                       untuk simpanan dan/atau investasi.
                       <br />
                       <br />
                       <strong>9.6. </strong>JULO tidak memberikan janji,
                       pernyataan dan jaminan mengenai hasil apapun yang dapat
                       diperoleh melalui penggunaan Sistem Elektronik JULO.
                       Segala keputusan yang diambil oleh Anda dalam
                       menggunakan Layanan pada Sistem Elektronik JULO adalah
                       sepenuhnya keputusan Anda.
                     </div>
                     <br />
                     <br />
                     <br />

                     <li>Hak Kekayaan Intelektual</li>
                     <br />
                     <div style={{ fontWeight: "300" }}>
                       <strong>10.1. </strong>Hak kekayaan intelektual dalam
                       situs dan Sistem Elektronik JULO seluruhnya merupakan
                       kepemilikan JULO. Hak kekayaan intelektual ini meliputi
                       hak cipta, hak basis, paten, merek dagang, desain
                       terdaftar dan juga semua hak cipta yang terdapat pada
                       konten Sistem Elektronik JULO.
                       <br />
                       <br />
                       <strong>10.2. </strong>Merek dagang JULO (baik terdaftar
                       ataupun tidak), gambar grafis, logo, desain, header,
                       halaman, ikon, tulisan dan nama layanan milik JULO yang
                       ditampilkan pada Sistem Elektronik JULO adalah aset
                       milik JULO yang secara tegas dilindungi oleh JULO
                       dan/atau pihak ketiga yang relevan.
                       <br />
                       <br />
                       <strong>10.3. </strong>Semua produk, data, asumsi,
                       model, model statistik, formula, angka/ranking/score,
                       machine learning dan semua pembelajaran sebagai hasil
                       dari proses uji kelayakan underwriting secara saintifik,
                       seluruh statistik dan teknologinya, merupakan aset milik
                       JULO yang secara tegas dilindungi oleh JULO dan/atau
                       pihak ketiga yang relevan.
                       <br />
                       <br />
                       <strong>10.4. </strong>Akses pada konten Sistem
                       Elektronik dan Layanan JULO tidak dianggap sebagai
                       pemberian, sehingga apabila menginginkan
                       pengerjaan/pengembangan/penggunaan konten tersebut,
                       diharuskan untuk meminta persetujuan tertulis terlebih
                       dahulu dari JULO dan/atau pihak ketiga yang relevan.
                       <br />
                       <br />
                       <strong>10.5. </strong>Penggunaan nama dan merek dagang
                       JULO, termasuk dalam iklan, publisitas atau sebagai
                       hyperlink, harus dengan persetujuan tertulis terlebih
                       dahulu dari JULO dan/atau pihak ketiga yang relevan.
                       Segala hal yang berhubungan dengan JULO merupakan aset
                       milik JULO yang secara tegas dilindungi oleh JULO
                       dan/atau pihak ketiga yang relevan.
                       <br />
                       <br />
                       <strong>10.6. </strong>Nama domain untuk situs JULO
                       merupakan hak milik JULO dan pengadopsian dan/atau
                       penggunaan kembali nama domain tersebut sama sekali
                       tidak diizinkan.
                       <br />
                       <br />
                       <strong>10.7. </strong>Akses serta penggunaan Sistem
                       Elektronik JULO untuk mengunduh dan/atau mencetak
                       salinan dari bagian manapun dari Sistem Elektronik JULO
                       untuk penggunaan pribadi, diperbolehkan selama tidak
                       melanggar hak kekayaan intelektual milik JULO. Anda
                       wajib memelihara semua hak cipta atau memberitahu
                       kepemilikan dari salinan dan/atau unduhan tersebut.
                       Status JULO sebagai penulis konten pada Sistem
                       Elektronik JULO harus selalu diakui.
                       <br />
                       <br />
                       <strong>10.8. </strong>Lisensi terbatas saat mengakses
                       Sistem Elektronik JULO ini sewaktu-waktu dapat
                       dibatalkan tanpa pemberitahuan atau alasan. Penggunaan
                       Sistem Elektronik tanpa izin tertulis dari JULO dan/atau
                       pihak ketiga yang relevan, sangat dilarang dan lisensi
                       yang diberikan dalam Syarat dan Ketentuan Umum harus
                       diakhiri. Penggunaan tidak sah tersebut melanggar Hukum
                       yang berlaku, termasuk undang-undang hak cipta dan
                       merek, peraturan dan undang-undang komunikasi yang
                       berlaku, yang dapat dituntut secara hukum kepada Anda.
                       <br />
                       <br />
                       <strong>10.9. </strong>Penggunaan merek, Sistem
                       Elektronik dan Layanan JULO yang melanggar Syarat dan
                       Ketentuan Umum, akan dikenakan sanksi berupa
                       pemberhentian penggunaan. Anda berkewajiban untuk
                       mengembalikan dan/atau memusnahkan materi yang telah
                       Anda salin.
                     </div>
                     <br />
                     <br />
                     <br />

                     <li>Ganti Rugi</li>
                     <br />
                     <div style={{ fontWeight: "300" }}>
                       <strong>11.1. </strong>Anda sepakat untuk melepaskan,
                       membebaskan dan mengganti kerugian JULO, afiliasinya,
                       pemegang sahamnya, direktur, komisaris, karyawan,
                       subkontraktor, pemasok, agen, dari segala bentuk
                       tuntutan, gugatan, klaim, kerugian, ganti rugi, termasuk
                       kerugian, pajak, biaya, biaya hukum dan kewajiban (saat
                       ini, akan datang, kontingensi dan/atau apapun yang
                       berbasis ganti rugi), yang diderita oleh JULO sebagai
                       hasil atau hubungan dari pelanggaran Syarat dan
                       Ketentuam Umum dan/atau perjanjian lain yang terkait,
                       yang dilakukan oleh Anda, dan/atau tindakan yang
                       dilakukan oleh JULO ketika terjadi pelanggaran Syarat
                       dan Ketentuan Umum dan/atau perjanjian lain yang terkait
                       oleh Anda.
                       <br />
                       <br />
                       <strong>11.2. </strong>Anda setuju untuk mengganti rugi
                       baik kepada JULO maupun Pihak lain yang menderita
                       kerugian dan membebaskan JULO, direktur, pemegang saham,
                       pejabat, karyawan dan agennya, dari klaim, kerugian,
                       kerusakan atau biaya apa pun yang timbul dari (i)
                       penggunaan Anda atas Aplikasi dan kontennya, (ii)
                       pelanggaran Ketentuan Penggunaan oleh Anda atau (iii)
                       tindakan atau kelalaian Anda sebagaimana yang dijelaskan
                       pada pasal 4.4. Syarat dan Ketentuan Umum ini (iv)
                       pelanggaran sebagaimana yang tertuang pada pasal 7
                       Syarat dan Ketentuan Umum ini.
                       <br />
                       <br />
                       <strong>11.3. </strong>Ganti rugi yang dimaksud berupa
                       termasuk namun tidak terbatas penggantian biaya dengan
                       nilai yang sama sesuai kelalaian dan pelanggaran yang
                       Anda timbulkan sebagaimana yang dijelaskan pasal 11.2,
                       menonaktifkan dan membekukan akun Anda jika tingkat
                       dampak yang ditimbulkan dapat merugikan JULO, dan
                       tindakan-tindakan lain yang dapat JULO ambil baik dengan
                       mengajukan tuntutan dan gugatan melalui lembaga
                       sebagaimana yang disebut pada pasal 15.2 Syarat dan
                       Ketentuan Umum ini.
                     </div>
                     <br />
                     <br />
                     <br />
                     <li>Tanggung Jawab JULO</li>
                     <br />
                     <div style={{ fontWeight: "300" }}>
                       <strong>12.1. </strong>JULO menjunjung tinggi tanggung
                       jawab sosial terhadap masyarakat.
                       <br />
                       <br />
                       <strong>12.2. </strong>Dengan misi inklusi finansial,
                       JULO menguji kelayakan kredit Penerima Pinjaman yang
                       tidak termasuk dalam cakupan bank dan seringkali
                       termasuk ke dalam cakupan rentenir, agar Penerima
                       Pinjaman mempunyai kesempatan untuk menperoleh Pinjaman
                       dengan biaya yang layak, dengan tujuan untuk
                       meningkatkan status sosial, ekonomi dan kesejahteraan
                       masyarakat Indonesia.
                       <br />
                       <br />
                       <strong>12.3. </strong>Dengan menggunakan teknologi,
                       formula, model statistik dan informasi yang diterima,
                       JULO menguji kelayakan kredit Penerima Pinjaman dan
                       hanya meminjamkan kepada Anda yang mampu dan mau untuk
                       membayar kembali hutangnya.
                       <br />
                       <br />
                       <strong>12.4. </strong>JULO bertanggung jawab penuh
                       kepada Anda dengan memberikan informasi, peraturan dan
                       perjanjian Pinjaman secara jelas dan transparan, serta
                       memberikan Layanan kepada Anda secara adil, jujur dan
                       hormat.
                       <br />
                       <br />
                       <strong>12.5. </strong>JULO memberikan informasi secara
                       jelas dan transparan kepada Penerima Pinjaman mengenai
                       jumlah total biaya Pinjaman dan biaya lainnya (jika
                       ada). Penerima Pinjaman tidak dibebankan biaya apapun
                       yang tidak terdapat dalam Surat Perjanjian Hutang
                       Piutang.
                       <br />
                       <br />
                       <strong>12.6. </strong>JULO memberikan kebebasan kepada
                       Penerima Pinjaman untuk dapat melakukan pembayaran
                       sebelum jatuh tempo, tanpa pengurangan ataupun
                       penambahan biaya (tanpa penalti).
                       <br />
                       <br />
                       <strong>12.7. </strong>JULO berkomitmen untuk
                       bekerjasama dengan Penerima Pinjaman apabila Penerima
                       Pinjaman belum dapat membayar sesuai dengan tanggal
                       jatuh tempo, dan memberikan konseling secara cuma-cuma
                       apabila Penerima Pinjaman menginginkan Layanan tersebut.
                       <br />
                       <br />
                       <strong>12.8. </strong>JULO berkomitmen untuk tidak
                       pernah dan tidak akan pernah menjual Konten Anda kepada
                       pihak manapun yang tidak berkepentingan, karena JULO
                       menjunjung tinggi privasi Anda.
                       <br />
                       <br />
                       <strong>12.9. </strong>JULO berkomitmen untuk tidak
                       menggunakan metode kriminal atau quasi-pidana kepada
                       konsumen pada saat penarikan dan/atau penagihan
                       pinjaman.
                     </div>
                     <br />
                     <br />
                     <br />
                     <li>Batasan Tanggung Jawab</li>
                     <br />
                     <div style={{ fontWeight: "300" }}>
                       <strong>13.1. </strong>Sebagai penyedia Sistem
                       Elektronik JULO, tanggung jawab JULO hanya sebatas
                       memfasilitasi kebutuhan dan keluhan antara pengguna
                       (antara Pemberi Pinjaman dengan Penerima Pinjaman). JULO
                       menyediakan fasilitas customer service untuk melayani
                       pengguna dalam Layanan yang diberikan melalui Sistem
                       Elektronik JULO.
                       <br />
                       <br />
                       <strong>13.2. </strong>JULO dan afiliasinya, pemegang
                       saham, direktur, komisaris, karyawan, subkontraktor,
                       pemasok, agen, tidak bertanggung jawab secara
                       kontraktual ketika terjadi pelanggaran pada Surat
                       Perjanjian Hutang Piutang (termasuk kelalaian dan/atau
                       pelanggaran kewajiban), untuk (1) terjadinya kehilangan
                       keuntungan, bisnis dan/atau pendapatan, (2) setiap biaya
                       atau beban, atau secara tidak langsung ataupun langsung,
                       diderita atau disebabkan oleh Penerima Pinjaman sebagai
                       hasil atau hubungan dengan ketentuan penyedia Layanan.
                     </div>
                     <br />
                     <br />
                     <br />
                     <li>Perubahan Atas Syarat dan Ketentuan Umum</li>
                     <br />
                     <div style={{ fontWeight: "300" }}>
                       <strong>14.1. </strong>JULO berhak untuk mengubah Syarat
                       dan Ketentuan Umum sewaktu-waktu atas kebijakan sendiri,
                       dan memberikan pemberitahuan kepada Penerima Pinjaman
                       atas terjadinya amendemen, perubahan, revisi, tambahan,
                       dan/atau perubahan lain melalui surat, surat elektronik,
                       dan/atau cara lain yang dianggap sesuai oleh JULO.
                       <br />
                       <br />
                       <strong>14.2. </strong>Segala perubahan atas Syarat dan
                       Ketentuan Umum akan berlaku sejak tanggal yang
                       ditentukan dalam pemberitahuan, atau apabila tanggal
                       tersebut tidak ditulis, maka berlaku sejak tanggal
                       terjadinya pemberitahuan.
                       <br />
                       <br />
                       <strong>14.3. </strong>Tanpa mengurangi ketentuan
                       sebelumnya, dimulainya/berlanjutnya Layanan setelah
                       terjadi perubahan, akan dianggap sebagai persetujuan
                       dari Penerima Pinjaman atas pemberlakuan perubahan
                       tersebut.
                     </div>
                     <br />
                     <br />
                     <br />
                     <li>Hukum yang Berlaku</li>
                     <br />
                     <div style={{ fontWeight: "300" }}>
                       <strong>15.1. </strong>Syarat dan Ketentuan Umum dan
                       ketentuan lain yang ditetapkan oleh JULO, diatur oleh
                       dan ditafsirkan sesuai dengan hukum Republik Indonesia.
                       <br />
                       <br />
                       <strong>15.2. </strong>Anda sepakat bahwa tindakan hukum
                       apapun dan/atau sengketa yang mungkin timbul dari,
                       berhubungan dengan, penggunaan Sistem Elektronik JULO,
                       akan tunduk pada yuridiksi Badan Arbitrase Nasional
                       Indonesia (BANI) dan diselesaikan secara non-eksklusif,
                       baik dalam yuridiksi Pengadilan Negeri Jakarta Selatan
                       Republik Indonesia atau pengadilan manapun di setiap
                       yuridiksi yang kompeten.
                     </div>
                     <br />
                     <br />
                     <br />
                     <li>Hubungi JULO</li>
                     <br />
                     <div style={{ fontWeight: "300" }}>
                       <strong>16.1 </strong>Untuk informasi lebih lanjut,
                       hubungi JULO melalui email: info@julofinance.com.
                     </div>
                   </ol>
                 </div>
               </div>
             </div>
         </Wrapper>
       </div>
    </Layout>
    // <Container>
    //   <div className="global-wrapper">
        
    //   <NavBar />

    //   <BarBack
    //         backgroundColor={theme?.helperBar?.backgroundColor}
    //         color={theme?.helperBar?.color}
    //         img={theme?.helperBar?.iconBack}
    //         title="Syarat dan Ketentuan"
    //       />
    //   <Wrapper
    //     height={"100%"}
    //     minHeight={"100vh"}
    //     className={`${padding("125px 0px 0px 0px")}`}
    //     backgroundColor={`${theme?.colors?.backgroundColorPrimary}`}
    //     style={{
    //       display: "flex",
    //       position: "relative",
    //     }}
    //   >
        
    //   </Wrapper>
    //   </div>
    // </Container>
  );
}

export default Privacy;
