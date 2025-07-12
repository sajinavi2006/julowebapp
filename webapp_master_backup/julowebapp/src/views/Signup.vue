<template>
  <div class="bg" :style="{ height: clientHeight + 'px' }">
    <!-- style="backgroundImage: linear-gradient(to right, #64b5f6 0%, #1e88e5 100%), url('../assets/Register Background/bg_register.svg');" -->
    <v-layout row class="subbodyClass">
      <v-flex xs12 sm6 md4 offset-xs0 offset-sm3 offset-md4>
        <div :style="{ paddingTop: ((clientHeight-500) / 2) + 'px' }">
          <div class="header">Buat Akun Baru</div>
          <label
            style="color:white; padding-left: 35px;"
            class="textAttr"
          >Isi nomor KTP untuk validasi kewarganegaraan</label>
          <v-text-field
            dark
            prepend-inner-icon="portrait"
            :counter="16"
            autofocus
            outline
            v-validate="'required|numeric|max:16|min:16'"
            v-model="ktp"
            :error-messages="errors.collect('ktp')"
            placeholder="Isi nomor KTP "
            data-vv-name="ktp"
            required
            @input="checkKtp"
            class="textField"
            @keypress="checkNumber"
            id="ktp"
          ></v-text-field>
          <div class="error--text textAttr" style="height: 17px !important; padding-left: 35px;">
            <span
              style="height: 17px; font-weight: bold !important;"
            >{{ errors.first("ktp") }}{{errKtp}}</span>
          </div>

          <div style="margin-top: 10px;text-align:center;" class="textAttr">
            <v-layout row justify-center>
              <v-flex xs12 sm9>
                <googleSignIn @done="signIn" :disabled="disabledGoogle" />
              </v-flex>
            </v-layout>
          </div>

          <div style="margin-top: 30px; text-align:center;">
            <router-link tag="a" to="/signin" style="color:white;">Saya sudah punya akun</router-link>
            <div class="buttonNext">
              <v-divider dark></v-divider>
            </div>
            <img src="../assets/OJK_text.svg" style="width:150px;" />
          </div>
        </div>
      </v-flex>
    </v-layout>

    <v-layout row justify-center>
      <v-flex xs12 sm9 md6 offset-xs0 offset-sm2 offset-md3>
        <v-dialog v-model="dialogNotify" persistent width="400">
          <v-card>
            <v-card-title style="padding-top:10px;">
              <img src="../assets/android-only@3x.png" style="margin:auto; width:100%;" />
              <div
                class="primaryColor"
                style="text-align: center; font-size: 14px; width: 100%;"
              >Pastikan Anda Menggunakan Smartphone Android Pribadi Anda dan Izinkan Kami mengakses lokasi Anda</div>
            </v-card-title>
            <v-card-text>
              <div>
                <p
                  style="text-align: center;"
                >Untuk dapat mengajukan Pinjaman di JULO, pastikan Anda memiliki smartphone Android.</p>
              </div>
            </v-card-text>
            <v-card-actions v-if="osName.toLowerCase() !=='ios'">
              <j-btn block large class="color8" dark @click="dialogNotify = false">Mengerti</j-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
  </div>
</template>


<script>
import enums from "../enums";
import { mapMutations } from "vuex";
import localforage from "localforage";
import moment from "moment";
import Bowser from "bowser";
import checkNumber2 from "../helper/checkNumber";
const { types } = enums;
const thisYear = moment().format("YYYY");

const browser = Bowser.getParser(window.navigator.userAgent).parse();
const osName = browser.parsedResult.os.name;
export default {
  data() {
    return {
      ktp: "",
      errKtp: "",
      disabledGoogle: true,
      osName,
      dialogNotify: osName !== "Android",
      clientHeight: document.documentElement["clientHeight"]
    };
  },
  methods: {
    ...mapMutations([types.LOGOUT]),
    checkNumber: function(e) {
      checkNumber2(e, this.$route.name);
    },
    signIn: async function(user) {
      const valid = await this.$validator.validateAll();
      if (valid) {
        const email = user.getBasicProfile().getEmail();
        const googleToken = user.getAuthResponse().id_token;
        const ktp = this.ktp;
        const params = {
          ktp,
          email,
          googleToken
        };
        await localforage.setItem("signupParams", params);
        this.$router.push({
          name: "newPassword",
          params
        });
      }
    },
    checkKtp: async function() {
      this.errKtp = "";
      const valid = await this.$validator.validateAll();
      if (valid) {
        const dateB = parseInt(this.ktp.substring(6, 8));
        const monthB = parseInt(this.ktp.substring(8, 10));
        const yearB = parseInt(this.ktp.substring(10, 12));
        const allowYear1 = thisYear - 55;
        const allowYear2 = thisYear - 21;
        if (
          (dateB >= 32 && dateB <= 40) ||
          (dateB >= 71 && dateB <= 99) ||
          (monthB >= 13 && monthB <= 99) ||
          !(
            yearB >= parseInt(allowYear1.toString().substring(2, 4)) &&
            monthB <= parseInt(allowYear2.toString().substring(2, 4))
          )
        ) {
          this.errKtp = "KTP invalid";
          return false;
        }
      }
      this.disabledGoogle = !valid;
    }
  },
  beforeMount() {
    /////DELETE AJAH top
    //this.ktp = "317506430795000";
    //this.checkKtp();
    /////DELETE AJAH bottom
    this[types.LOGOUT]();
  },
  mounted() {
    const dict = {
      custom: {
        ktp: {
          required: "Mohon diisi",
          min: "Anda harus mengisi 16 angka",
          max: "Anda harus mengisi 16 angka"
        }
      }
    };
    this.$validator.localize("id", dict);
  }
};
</script>

<style scoped>
.header {
  height: 75px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  color: white;
}
.buttonNext {
  margin-top: 20px;
  margin-bottom: 20px;
  color: white;
}
.bodyClass {
  background-image: url("../assets/verifikasi-login-toolbar-background.png");
  background-repeat: repeat;
  background-size: cover;
}
.subbodyClass {
  padding-top: 60px;
  padding-bottom: 20px;
}
.textField {
  margin-left: 5% !important;
  margin-right: 6% !important;
}
.textAttr {
  max-width: 90%;
  margin-left: 5%;
}
.dialogNotify {
  border-radius: 7px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
}
.bg {
  /* The image used */
  background-image: url("../assets/verifikasi-login-toolbar-background.png");

  /* Full height */
  height: 100%;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
