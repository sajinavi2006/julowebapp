<template>
  <div>
    <div class="header">
      Pengajuan Anda
      <div>
        <small>Status terakhir pengajuan Anda</small>
      </div>
    </div>
    <v-layout row wrap align-center style="padding: 20px;" text-xs-center>
      <v-flex xs12 sm9 md6 offset-xs0 offset-sm2 offset-md3 style="padding-left:25px;">
        <img :src="result.img" style="max-width:250px;" />
      </v-flex>
      <v-flex xs12 sm8 md6 offset-xs0 offset-sm2 offset-md3>
        <div :class="result.titleClass">{{result.title}}</div>
        <div style="margin-bottom:30px">{{result.text}}</div>
      </v-flex>
      <v-flex xs12 sm8 md6 offset-xs0 offset-sm2 offset-md3 v-if="result.reapplyBtn">
        <v-tooltip bottom :disabled="!showTooltip">
          <j-btn
            :disabled="errorLocation"
            block
            depressed
            class="colorbutton"
            dark
            @click="doReapply"
            slot="activator"
          >Ajukan Sekarang</j-btn>
          <span>Izinkan kami mengakses lokasi Anda</span>
        </v-tooltip>
      </v-flex>

      <v-flex xs12 sm8 md6 offset-xs0 offset-sm2 offset-md3 v-if="result.data === 1">
        <v-divider></v-divider>
        <div
          class="titleText"
          style="padding-top: 30px;"
        >Untuk melajutkan proses pencairan dan pelunasan, silahkan lakukan tahap berikut:</div>
        <ol style="text-align:left; margin-left: 20px; font-weight:bold;">
          <li>Download Aplikasi JULO di Playstore</li>
          <li>Masuk ke akun JULO Anda</li>
          <li>Lihat informasi selanjutnya di halaman beranda dan aktivitas pinjaman</li>
        </ol>
        <a href="https://go.onelink.me/zOQD/93d068ac">
          <j-btn
            color="colorbutton"
            block
            dark
            large
            style="margin-top: 35px;margin-bottom:35px;"
          >Download JULO</j-btn>
        </a>
      </v-flex>
      <v-flex xs12 v-if="result.data === 0">Terima kasih</v-flex>
      <v-flex
        xs12
        sm8
        md6
        offset-xs0
        offset-sm2
        offset-md3
        style="margin-top:20px;"
        v-if="result.data === 2"
      >
        <v-layout style="margin-bottom:20px;">
          <v-flex xs5 style="padding-top:10px;">
            <v-divider></v-divider>
          </v-flex>
          <v-flex xs2>atau</v-flex>
          <v-flex xs5 style="padding-top:10px;">
            <v-divider></v-divider>
          </v-flex>
        </v-layout>Download dan ajukan melalui aplikasi JULO untuk peluang persetujuan yang lebih tinggi
        <a
          href="https://go.onelink.me/zOQD/93d068ac"
        >
          <j-btn
            block
            large
            color="#00ACF0"
            outline
            style="margin-top: 35px;margin-bottom:35px;"
          >Download JULO</j-btn>
        </a>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import locationPermission from "../helper/location";
import statusCodeMappingRoute from "../helper/statusCode";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import enums from "../enums";
import mapProduct from "../helper/mapProduct";
const { types } = enums;

export default {
  data() {
    return {
      loc: false,
      errorLocation: false,
      showTooltip: true,
      loanStatus: false,
      status: 141,
      product: "mini",
      result: {},
      resultMap: {
        approve: {
          data: 1,
          status: new Set([141, 160, 163, 170, 180, 162, 175]),
          imgSrc: "Il_approve.svg",
          title: "Selamat !",
          titleClass: "titleText primaryColor",
          text: "Pengajuan pinjaman JULO Mini Anda telah disetujui.",
          downloadBtn: true
        },
        reject: {
          data: 0,
          status: new Set([135, 133]),
          imgSrc: "Il_rejected.svg",
          title: "Coba Lagi",
          titleClass: "titleText error--text",
          text:
            "Pengajuan Anda di tolak karena tidak memenuhi kriteria JULO. Silahkan coba lagi dalam 3 bulan mendatang"
        },
        reapply: {
          data: 2,
          status: new Set([143, 161, 171]),
          imgSrc: "Il_reapply.svg",
          title: "Ayo Pinjam Lagi!",
          titleClass: "titleText primaryColor",
          text:
            "Penuhi kebutuhan finansial Anda dengan mengajukan pinjaman terbaik JULO",
          reapplyBtn: true,
          downloadBtn: true
        }
      }
    };
  },
  computed: {
    ...mapState(["loan", "application"])
  },
  methods: {
    ...mapGetters(["getStatusCode", "getReApply"]),
    ...mapActions(["reapply"]),
    ...mapMutations([types.SET_ERROR]),
    doReapply: async function() {
      if (this.loc) {
        const statusCode = await this.reapply(this.loc);
        if (statusCode) {
          const routename = statusCodeMappingRoute(statusCode);
          this.$router.push({ name: routename });
        }
      }
    }
  },
  async beforeMount() {
    //get status
    this.status = this.getStatusCode();
    //get reapply flag
    this.canReapply = this.getReApply();
    let lunasPage = false;

    //check able reapply
    let ableToReply = this.status == 135 && this.canReapply;
    if (this.status == 180 && this.loan.status == 250) {
      if (this.canReapply) {
        ableToReply = true;
      } else {
        lunasPage = true;
      }
    }

    if (ableToReply) {
      this.result = this.resultMap.reapply;
    } else if (lunasPage) {
      this.result = this.resultMap.approve;
      this.result.text = `Pinjaman ${
        mapProduct(this.application.product_line).label
      } Anda telah lunas`;
      this.result.downloadBtn = false;
    } else {
      for (let i in this.resultMap) {
        if (this.resultMap[i].status.has(this.status)) {
          this.result = this.resultMap[i];
          break;
        }
      }
    }

    this.result.img = require(`@/assets/Illustrations/${this.result.imgSrc}`);
    if (this.result.data === 2) {
      try {
        this.loc = await locationPermission();

        this.showTooltip = false;
      } catch (e) {
        this[types.SET_ERROR](e);
        this.errorLocation = true;
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
      rgb(0, 172, 240, 0.7) 0%,
      rgb(135, 65, 116, 0.7) 100%
    ),
    url("../assets/Header Image/140.jpg") no-repeat center center;
  background-size: 100% auto;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
.titleText {
  font-size: 16px;
  padding-bottom: 10px;
}
.bgImg {
  background: url("../assets/image.png") no-repeat center center;
  background-size: cover;
}
</style>
