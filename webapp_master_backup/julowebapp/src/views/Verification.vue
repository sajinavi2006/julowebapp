<template>
  <div>
    <div class="header">
      Tahapan Verifikasi Data
      <div>
        <small>Kami sedang menilai kelayakan kredit Anda</small>
      </div>
    </div>
    <v-layout row wrap align-center text-xs-center>
      <v-flex xs12 sm9 md6 offset-xs0 offset-sm2 offset-md3 style="padding-left:25px;">
        <img src="../assets/Illustrations/Il_verification2.svg" style="width:150px; margin: 30px">
      </v-flex>
      <v-flex xs12 sm8 md6 offset-xs0 offset-sm2 offset-md3>
        <div class="titleText">Proses Verifikasi Data</div>
        <div style="margin-bottom:30px">
          {{words}}
          <v-tooltip bottom :disabled="!showTooltip">
            <j-btn
              depressed
              dark
              block
              color="colorbutton"
              v-if="btn"
              style="margin-top:20px;"
              @click="btnOnClick"
              slot="activator"
              :disabled="errorLocation"
            >{{btn}}</j-btn>
            <span>Izinkan kami mengakses lokasi Anda</span>
          </v-tooltip>
        </div>
      </v-flex>
    </v-layout>
    <v-layout
      row
      wrap
      align-center
      style="padding: 30px; color:white;"
      class="bgImg"
      text-xs-center
    >
      <v-flex xs12 sm8 md6 offset-xs0 offset-sm2 offset-md3>
        <a href="https://go.onelink.me/zOQD/93d068ac">
          <j-btn block outline color="white" style="margin-bottom:15px;">Download JULO</j-btn>
        </a>
        <div
          class="titleText"
          style="width:70%; margin: auto;"
        >Pantau Proses Pengajuan Anda melalui aplikasi JULO</div>
        <div>1. Download Aplikasi JULO di Playstore</div>
        <div>2. Masuk ke akun JULO Anda</div>
        <div>3. Pantau prosesnya melalui laman beranda</div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import statusCodeMappingRoute from "../helper/statusCode";
import locationPermission from "../helper/location";
import enums from "../enums";
const { types } = enums;
export default {
  data() {
    return {
      words:
        "Kami akan segera menghubungi Anda melalui nomor telepon yang tercantum pada forumulir pengajuan. Pastikan telepon Anda dalam keadaan siap.",
      btn: "Unggah Dokumen di Apps",
      btnOnClickName: "returnToDoc",
      showTooltip: false,
      errorLocation: false,
      loc: false
    };
  },
  methods: {
    ...mapGetters(["getStatusCode"]),
    ...mapActions(["reapply"]),
    ...mapMutations([types.SET_ERROR]),
    btnOnClick: async function() {
      const routename = await this[this.btnOnClickName]();
      if (routename) {
        this.$router.push({ name: routename });
      }
    },
    doReApply: async function() {
      if (this.loc) {
        const statusCode = await this.reapply(this.loc);
        if (statusCode) {
          const routename = statusCodeMappingRoute(statusCode);
          return routename;
        }
      }
    },
    returnToDoc: function() {
      return "document";
    }
  },
  async beforeMount() {
    this.btn = false;
    if (this.getStatusCode() === 131) {
      this.btn = "Unggah Dokumen di Apps";
      this.btnOnClickName = "returnToDoc"; //ubah status ke 132
      this.words =
        "Data pengajuan Anda tidak lengkap. Silahkan kembali ke proses pengajuan dengan mengunggah foto - foto dokumen yang masih kurang.";
    } else if (
      [106, 111, 136, 137, 139, 142, 143, 152].indexOf(this.getStatusCode()) !=
      -1
    ) {
      this.btn = "Ajukan Pinjaman Baru";
      this.btnOnClickName = "doReApply";
      this.showTooltip = true;
      this.words =
        "Pengajuan kalduluarsa karena referensi tidak dapat dihubungi. apabila Anda hendak mengajukan kembalim sertakan nama & nomor telepon referensi yang mudah di hubungi.";
      try {
        this.loc = await locationPermission();
        this.showTooltip = false;
      } catch (e) {
        this.errorLocation = true;
        this[types.SET_ERROR](e);
      }
    }
  }
};
</script>

<style scoped>
.header {
  height: 240px;
  padding-top: 130px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background: linear-gradient(
      to bottom right,
      rgb(97, 97, 97, 0.7) 0%,
      rgb(33, 33, 33, 0.7) 100%
    ),
    url("../assets/Header Image/verifikasi.jpg") no-repeat center center;
  background-size: 100% auto;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
.titleText {
  font-weight: bold;
  font-size: 16px;
  padding-bottom: 10px;
}
.bgImg {
  background: url("../assets/image.png") no-repeat center center;
  background-size: cover;
}
</style>
