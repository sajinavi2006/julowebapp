<template>
  <div class="textHeader">
    <v-container grid-list-xl>
      <v-layout row>
        <v-flex xs12 sm8 md6 offset-xs0 offset-sm2 offset-md3 style="text-align:center;">
          <img :src="imgSrc" style="width:350px; margin-bottom:20px; ">
          <div style="padding-right:15px;">
            <div style="margin-bottom: 20px; font-size:16px;" class="labelInput">{{title}}</div>
            <div style="margin-bottom: 10px;">{{text}}</div>
            <div v-if="dataTable" class="divTable">
              <table>
                <tr>
                  <td>No Kontak</td>
                  <td style="padding-right: 10px;">:</td>
                  <td>{{dataTable.contract_number}}</td>
                </tr>
                <tr>
                  <td>Jumlah Pinjaman</td>
                  <td style="padding-right: 10px;">:</td>
                  <td>{{dataTable.loan_amount}}</td>
                </tr>
              </table>
            </div>
            <div style="padding-top: 10px;">{{footer}}</div>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: { ...mapState(["application"]) },
  data() {
    return {
      imgSrc: "",
      title: "",
      text: "",
      dataTable: false,
      footer: ""
    };
  },
  methods: { ...mapActions(["partnerLoan"]) },
  async mounted() {
    this.$emit("makeBgTransparent", false);

    if (this.application.status == 129) {
      this.imgSrc = require("../assets/bfi-in-progress@3x.png");
      this.title = "Informasi Pengajuan";
      this.text =
        "Data pengajuan pinjaman Anda telah diterima dan saat ini sedang diverifikasi oleh BFI.";
      this.footer = "Silahkan hubungi Customer Service BFI di 1500018";
    } else if (this.application.status == 189) {
      this.imgSrc = require("../assets/bfi-approved@3x.png");
      this.title = "Selamat !";
      this.text =
        "Aplikasi Anda telah disetujui oleh BFI dengan informasi sebagai berikut:";

      this.dataTable = await this.partnerLoan();
      this.footer =
        "Silahkan hubungi Customer Service BFI di 1500018 untuk informasi lebih lanjut.";
    }
  }
};
</script>

<style scoped>
.textHeader {
  width: 100%;
  position: absolute;
  min-height: 100% !important;
  height: auto;
  padding-left: 0px;
}
table {
  width: 100%;
  text-align: left;
  padding: 15px;
}
td {
  height: 23px;
}
.divTable {
  margin: 0 auto;
  width: 80%;
  height: 80px;
  border-radius: 7px;
  border: 1px solid #00acf0;
}
</style>
