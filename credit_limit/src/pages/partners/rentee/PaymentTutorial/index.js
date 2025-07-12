import React from "react";
import Layout from "components/Layout";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Bca from "assets/img/bank-logo/bca.png";
import KlikBca from "assets/img/bank-logo/klikbca.png";
import MBca from "assets/img/bank-logo/mbca.png";
import Permata from "assets/img/bank-logo/permata.png";
import MPermata from "assets/img/bank-logo/permatamobile.png";
import PermataNet from "assets/img/bank-logo/permatanet.png";

import {
  BankTitle,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  DetailWrapper,
  ImgBank,
} from "./styles";

const PaymentTutorial = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Layout barBackType="secondary" barBackTitle="Cara Pembayaran">
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <ImgBank src={Bca} />
          <BankTitle>ATM BCA</BankTitle>
        </AccordionSummary>
        <AccordionDetails>
          <DetailWrapper>
            <ol>
              <li>
                Pilih <b>&quot;Transaksi Lainnya&quot;</b>
              </li>
              <li>
                Pilih <b>&quot;Transfer&quot;</b>
              </li>
              <li>
                Pilih <b>&quot;Ke Rek. BCA Virtual Account&quot;</b>
              </li>
              <li>
                Masukkan nomor Virtual Account, lalu tekan{" "}
                <b>&quot;Benar&quot;</b>
              </li>
              <li>
                Masukan jumlah total yang ditagihkan ke Anda, lalu tekan{" "}
                <b>&quot;Benar&quot;</b>
              </li>
              <li>Pastikan data yang telah Anda masukkan telah benar, lalu</li>
              <li>
                tekan <b>&quot;Ya&quot;</b> untuk membayar. Terima kasih,
                transaksi Anda telah selesai
              </li>
            </ol>
          </DetailWrapper>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <ImgBank src={KlikBca} />
          <BankTitle>KlikBCA</BankTitle>
        </AccordionSummary>
        <AccordionDetails>
          <DetailWrapper>
            <ol>
              <li>
                Pada menu di bagian kiri layar, pilih{" "}
                <b>&quot;Transfer Dana&quot;</b>
              </li>
              <li>
                Pada menu di bagian kiri layar, pilih{" "}
                <b>&quot;Transfer ke Rek BCA Virtual Account&quot;</b>
              </li>
              <li>
                Masukkan nomor BCA Virtual Account atau pilih dari daftar
                transfer
              </li>
              <li>Masukkan jumlah yang ingin dibayarkan</li>
              <li>Validasi pembayaran</li>
              <li>Transaksi Anda telah selesai</li>
            </ol>
          </DetailWrapper>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <ImgBank src={MBca} />
          <BankTitle>m-BCA</BankTitle>
        </AccordionSummary>
        <AccordionDetails>
          <DetailWrapper>
            <ol>
              <li>
                Pilih menu <b>&quot;m-BCA&quot;</b>
              </li>
              <li>
                Pilih menu <b>&quot;m-Transfer&quot;</b>
              </li>
              <li>
                Pilih <b>&quot;BCA Virtual Account&quot;</b>
              </li>
              <li>Masukkan nomor Virtual Account</li>
              <li>
                Pada tampilan konfirmasi klik <b>&quot;Send&quot;</b>
              </li>
              <li>
                Periksa kembali data Anda lalu tekan <b>&quot;OK&quot;</b> untuk
                membayar
              </li>
              <li>
                Masukkan PIN Anda, kemudian tekan <b>&quot;OK&quot;.</b> Setelah
                itu transaksi Anda telah selesai
              </li>
            </ol>
          </DetailWrapper>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <ImgBank src={Permata} />
          <BankTitle>ATM permata</BankTitle>
        </AccordionSummary>
        <AccordionDetails>
          <DetailWrapper>
            <ol>
              <li>
                Pilih <b>&quot;Transaksi Lainnya&quot;</b>
              </li>
              <li>
                Pilih <b>&quot;Pembayaran&quot;</b>
              </li>
              <li>
                Pilih <b>&quot;Pembayaran Lainnya&quot;</b>
              </li>
              <li>
                Pilih <b>&quot;Virtual Account&quot;</b>
              </li>
              <li>
                Masukkan 16 digit nomor Virtual Account, lalu tekan{" "}
                <b>&quot;Benar&quot;</b>
              </li>
              <li>
                Masukkan jumlah total yang ditagihkan ke Anda, lalu tekan{" "}
                <b>&quot;Benar&quot;</b>
              </li>
              <li>
                Pilih rekening <b>&quot;Tabungan&quot;</b> Anda
              </li>
              <li>Transaksi Anda telah selesai</li>
            </ol>
          </DetailWrapper>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <ImgBank src={PermataNet} />
          <BankTitle>PermataNet</BankTitle>
        </AccordionSummary>
        <AccordionDetails>
          <DetailWrapper>
            <ol>
              <li>
                Pada menu di bagian kiri layar, pilih{" "}
                <b>&quot;Pembayaran&quot;</b>
              </li>
              <li>
                Pada menu di bagian kiri layar, pilih{" "}
                <b>&quot;Pembayaran Tagihan&quot;</b>
              </li>
              <li>
                Pada menu di bagian kiri layar, pilih{" "}
                <b>&quot;Virtual Account&quot;</b>
              </li>
              <li>
                Pilih rekening tabungan Anda, dan masukkan 16 digit nomor
                Virtual Account
              </li>
              <li>
                Setelah itu tekan <b>&quot;Lanjut&quot;</b>
              </li>
              <li>
                Masukkan otentikasi transaksi, setelah itu tekan{" "}
                <b>&quot;Lanjut&quot;</b> dan transaksi Anda akan selesai
              </li>
            </ol>
          </DetailWrapper>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel6"}
        onChange={handleChange("panel6")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <ImgBank src={MPermata} />
          <BankTitle>Permata Mobile</BankTitle>
        </AccordionSummary>
        <AccordionDetails>
          <DetailWrapper>
            <ol>
              <li>
                Pilih <b>&quot;Pembayaran Tagihan&quot;</b>
              </li>
              <li>
                Pilih <b>&quot;Virtual Account&quot;</b>
              </li>
              <li>
                Masukkan 16 digit nomor Virtual Account, lalu tekan{" "}
                <b>&quot;Lanjut&quot;</b>
              </li>
              <li>
                Klik tombol <b>&quot;Konfirmasi&quot;</b>
              </li>
              <li>
                Masukkan nominal pembayaran, lalu klik tombol{" "}
                <b>&quot;Konfirmasi&quot;</b>
              </li>
              <li>
                Masukkan token otentikasi transaksi, lalu klik{" "}
                <b>&quot;Konfirmasi&quot;</b>
              </li>
              <li>Transaksi Anda telah selesai</li>
            </ol>
          </DetailWrapper>
        </AccordionDetails>
      </Accordion>
    </Layout>
  );
};

export default PaymentTutorial;
