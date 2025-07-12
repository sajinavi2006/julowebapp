<template>
  <div>
    <div class="headerBg">
      <div class="headerTitle">Registrasi</div>
      <div class="headerText">Selamat Datang di JULO</div>
      <div class="headerText">Silahkan Lengkapi Formulir Aplikasi Pinjaman Anda.</div>
    </div>
    <v-container grid-list-xl>
      <v-layout row>
        <v-flex xs12 sm8 md6 offset-xs0 offset-sm2 offset-md3>
          <router-link
            tag="div"
            :to="step.url"
            v-for="(step, i) in stepper"
            :key="i"
            :class="{card: true, disableCard: !disableCard(step, i)}"
            @click="cardClick(step.url)"
          >
            <div class="cardHeaderLine"></div>
            <v-layout>
              <v-flex xs3>
                <img :src="step.src" class="cardImage">
              </v-flex>
              <v-flex xs7>
                <div class="cardText">{{step.text}}</div>
              </v-flex>
              <v-flex xs2>
                <img :src="img[step.fill]" class="null">
              </v-flex>
            </v-layout>
          </router-link>

          <div class="buttonNext">
            <j-btn
              @click="saveData"
              block
              large
              :color="disableReview? 'grey' :'color8'"
              :dark="!disableReview"
              :disabled="disableReview"
            >Lanjutkan</j-btn>
          </div>
          <!--congratsDialog-->
          <v-layout row justify-center>
            <v-flex xs12 sm9 md6 offset-xs0 offset-sm2 offset-md3>
              <v-dialog v-model="formHead" persistent width="400">
                <v-card>
                  <v-card-title style="padding-top:30px;">
                    <img src="../assets/teaser@3x.png" style="margin:auto; width:100%;">
                    <div
                      class="primaryColor"
                      style="text-align: center; font-size: 14px; width: 100%;"
                    >Formulir Registrasi JULO</div>
                  </v-card-title>
                  <v-card-text>
                    <div style="padding-bottom:0px; margin-left: 10px; margin-right: 10px; ">
                      <p
                        style="text-align: center;"
                      >Silahkan lengkapi informasi Anda pada formulir registrasi untuk melanjutkan proses pengajuan pinjaman Anda</p>
                    </div>
                  </v-card-text>
                  <v-card-actions style="padding-bottom:10px;">
                    <j-btn block large class="color8" dark @click="formHead = false">Lanjutkan</j-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-flex>
          </v-layout>
          <!--congratsDialog-->
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import LZString from "lz-string";
import jsonpack from "jsonpack";
import localforage from "localforage";
import reviewHeader from "../helper/reviewDataForm.js";

const nullImg = require("@/assets/null_2019-01-23/drawable-hdpi/kosong.png");
const completedImg = require("@/assets/completed_2019-01-23/completed@2x.png");
const incompleteImg = require("@/assets/incomplete_2019-01-23/drawable-hdpi/incomplete.png");

export default {
  data() {
    return {
      rawData: [],
      img: [nullImg, completedImg, incompleteImg],
      formHead: !localStorage.formHead,
      stepCount: 0,
      stepper: [
        {
          imgHeader: "identitas-diri_2019-01-23/identitas-diri.png",
          text: "Identitas Diri",
          fill: 1,
          url: "form1"
        },
        {
          imgHeader: "informasi-keluarga_2019-01-23/informasi-keluarga.png",
          text: "Informasi Keluarga",
          fill: 0,
          url: "form2"
        },
        {
          imgHeader: "pekerjaan_2019-01-23/pekerjaan.png",
          text: "Pekerjaan & Pendidikan",
          fill: 1,
          url: "form3"
        },
        {
          imgHeader: "keuangan_2019-01-23/keuangan.png",
          text: "Keuangan",
          fill: 2,
          url: "form4"
        }
      ],
      disableReview: true
    };
  },
  methods: {
    saveData: async function() {
      //ke review
      const data = this.rawData;
      // if (localStorage.fotoKtp) {
      //   data.form1.fotoKtp = JSON.parse(
      //     LZString.decompress(localStorage.fotoKtp)
      //   ).src;

      //   //data.form1.fotoKtp = JSON.parse(localStorage.fotoKtp).src;
      //   //data.form1.fotoKtp = jsonpack.unpack(localStorage.fotoKtp).src;
      // }

      const fotoKtp = await localforage.getItem("fotoKtp");
      if (fotoKtp && fotoKtp.appId == localStorage.appId) {
        data.form1.fotoKtp = fotoKtp.src;
      }

      //const data = { ...rawData };

      const headers = reviewHeader(data);
      //set image to headers
      for (let h of headers) {
        h.src = this.stepper.find(x => x.url == h.segment).src;
      }
      localStorage.reviewForm = JSON.stringify({ headers, data });
      this.$router.push({
        name: "reviewForm",
        params: { headers, data }
      });
    },
    check: function() {
      const rawData = {};
      let check = 0;

      for (let step of this.stepper) {
        if (localStorage[`${step.url}Valid`] == 1) {
          check++;
        }
        if (localStorage[step.url]) {
          rawData[step.url] = JSON.parse(localStorage[step.url]);
        }
      }
      this.rawData = rawData;

      if (this.stepper.length == check) {
        this.disableReview = false;
      }
    },
    cardClick: function(url) {
      const text = "Bio section";
      switch (url) {
        case "form2":
          text = "Family section";
          break;
        case "form3":
          text = "Jobs section";
          break;
        case "form4":
          text = "Financial section";
          break;
      }

      const action = `Button : "${text}" clicked`;
      const obj = this.$navlog.mappingObj(this.$route.name, action);
      this.$navlog.save(obj);
    },
    disableCard: function(step, i) {
      //step.url !== 'form1' && (stepper[i-1].fill == 1 || !step.fill)
      if (step.url == "form1") {
        return true;
      }
      if (this.stepper[i - 1].fill == 1 || step.fill) {
        return true;
      }
      return false;
    }
  },
  mounted() {
    //give flag that ever going here
    localStorage.formHead = true;
    //
    for (let step of this.stepper) {
      step.fill = localStorage[`${step.url}Valid`] || 0;
    }

    this.stepper.forEach(step => {
      //srcset="img/identitas-diri@2x.png 2x, img/identitas-diri@3x.png 3x"
      const url = step.imgHeader.split(".");
      let srcset = [];
      for (let i = 2; i <= 3; i++) {
        srcset.push(url.join(`@${i}x.`) + ` ${i}x`);
      }
      const aaa = srcset[0].substring(0, srcset[0].length - 3);

      step.src = require(`@/assets/${aaa}`);
      step.srcset = srcset.join(", ");
    });
    this.check();
  }
};
</script>

<style scoped>
.headerBg {
  height: 220px;
  padding-top: 130px;
  font-size: 16px;
  color: white;
  background: url("../assets/city.png") no-repeat center center;
  /* background-repeat: no-repeat;
  background-size: 100%; */
  background-size: 100% auto;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
.headerTitle {
  font-size: 16px;
  color: white;
  margin-left: 20px;
}
.headerText {
  color: white;
  margin-left: 20px;
}
.cardHeaderLine {
  height: 6px;
  border-radius: 7px 7px 0px 0px;
  background-image: linear-gradient(91deg, #00acf0, #0b80a9);
}
/* width: 320px; */
.card {
  margin-bottom: 20px;
  height: 100px;
  border-radius: 7px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  cursor: pointer;
}
.cardImage {
  width: 60px;
  height: 60px;
  object-fit: contain;
  margin-left: 13px;
  margin-top: 7px;
}
.cardText {
  padding-top: 25px;
  font-size: 16px;
}
.disableCard {
  background-color: #e5e5e5;
  color: grey;
  pointer-events: none;
}
.null {
  margin-top: 27px;
  width: 25px;
  height: 25px;
  object-fit: contain;
  color: white;
}
.buttonNext {
  margin-top: 60px;
  margin-bottom: 20px;
}
</style>
