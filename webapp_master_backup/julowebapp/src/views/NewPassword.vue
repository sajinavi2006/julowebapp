<template>
  <div class="bodyClass" :style="{ height: clientHeight + 'px' }">
    <!-- style="backgroundImage: linear-gradient(to right, #64b5f6 0%, #1e88e5 100%), url('../assets/Register Background/bg_register.svg');" -->
    <v-layout row class="subbodyClass">
      <v-flex
        xs12
        sm6
        md4
        offset-xs0
        offset-sm3
        offset-md4
        :style="{ paddingTop: ((clientHeight-550) / 2) + 'px' }"
      >
        <div class="header">
          Buat Kata Sandi Baru
          <div>
            <small>Isi kata sandi baru untuk akun JULO Anda</small>
          </div>
        </div>

        <v-text-field dark prepend-inner-icon="portrait" outline v-model="ktp" readonly class="textField"></v-text-field>
        <v-text-field
          dark
          prepend-inner-icon="mail"
          :readonly="endWithJulofinance()"
          outline
          v-model="email"
          class="textField"
        ></v-text-field>

        <v-text-field
          dark
          prepend-inner-icon="lock"
          autofocus
          outline
          v-validate="'required|min:8'"
          v-model="password"
          class="textField"
          :error-messages="errors.collect('kata sandi')"
          placeholder="Isi kata sandi baru "
          data-vv-name="kata sandi"
          required
          :type="show ? 'text' : 'password'"
          :append-icon="show ? 'visibility_off' : 'visibility'"
          @click:append="show = !show"
          @keypress="inputPassNavlog"
          id="password"
        ></v-text-field>
        <div class="error--text" style="height: 17px !important;">
          <span>{{ errors.first("kata sandi") }}</span>
          <span v-show="passErr">Password tidak boleh numerik</span>
        </div>

        <div style="margin-top: 10px; text-align:center;">
          <v-tooltip bottom :disabled="!showTooltip">
            <j-btn @click="daftar" :disabled="!latitude" slot="activator">
              <span style="color:#00ACF0">Daftar</span>
            </j-btn>
            <span>Izinkan kami mengakses lokasi Anda</span>
          </v-tooltip>
        </div>

        <div style="margin-top: 30px; text-align:center;">
          <div class="buttonNext">
            <v-divider dark></v-divider>
          </div>
          <img src="../assets/OJK_text.svg" style="width:150px;">
        </div>
      </v-flex>
    </v-layout>

    <!--privacyDialog-->
    <v-layout row justify-center>
      <v-flex xs12 sm8 md6 offset-xs0 offset-sm2 offset-md3>
        <v-dialog v-model="privacyDialog" persistent width="450">
          <v-card>
            <v-card-actions class="grey lighten-4" style="padding-bottom: 0px;">
              <v-spacer></v-spacer>
              <j-btn icon @click.native="privacyDialog = false" style="color:grey;">
                <v-icon>close</v-icon>
              </j-btn>
            </v-card-actions>
            <v-card-title class="grey lighten-4" style="padding-top:0px;">
              <img src="../assets/Illustrations/Il_scrape.svg" style="margin:auto; width:50%">
              <div
                style="text-align: center; color:rgba(0, 176, 240); font-weight: bold; font-size: 18px; width: 100%"
              >Syarat & Privasi Pengguna</div>
            </v-card-title>
            <v-card-text>
              <div style="padding-bottom:20px; padding-left: 5px;">
                <!-- <p>
                  Untuk tujuan verifikasi identitas, mencegah penipuan dan menguji kelayakan
                  kredit Anda, JULO akan menggunakan informasi berikut ini:
                  Akun Google, email, kalender, jejak jejaring sosial (tidak wajib),
                  akun bank (tidak wajib), dan akun e-commerce (tidak wajib).
                </p>
                <p>
                  Keamanan data dan privasi Anda adalah prioritas kami. JULO tidak pernah menyimpan
                  User ID / PIN / password Anda dan selalu menggunakan sistem terenkripsi. Informasi
                  Anda kami gunakan semata-mata untuk memfasilitasi verifikasi identitas dan uji
                  kelayakan kredit Anda, demi memperbesar kesempatan Anda dalam mendapatkan pinjaman JULO.
                </p>-->
                <p v-html="privacy" style="color: #5e5e5e;"></p>
              </div>
              <v-divider></v-divider>
            </v-card-text>
            <v-card-actions style="padding-bottom:20px;">
              <v-spacer></v-spacer>
              <j-btn @click="privacyDialog = false">Tidak Setuju</j-btn>
              <j-btn color="primary" @click="newPassword">Setuju</j-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
    <!--privacyDialog-->
    <!--congratsDialog-->
    <!-- <v-layout row justify-center>
      <v-flex xs12 sm8 md6 offset-xs0 offset-sm2 offset-md3>
        <v-dialog v-model="congratsDialog" persistent width="400">
          <v-card>
            <v-card-actions class="grey lighten-4 congratsDialog">
              <v-spacer></v-spacer>
              <j-btn icon @click.native="congratsDialog = false" style="color:grey;">
                <v-icon>close</v-icon>
              </j-btn>
            </v-card-actions>
            <v-card-title class="grey lighten-4 congratsDialog">
              <img src="../assets/Illustrations/il_selamat.svg" style="margin:auto; width:50%">
              <div
                style="text-align: center; color:rgba(0, 176, 240); font-weight: bold; font-size: 18px; width: 100%"
              >SELAMAT !</div>
            </v-card-title>
            <v-card-text>
              <div style="padding-bottom:20px;">
                <p style="text-align: center;">Anda telah memiliki akun JULO</p>
                <p
                  style="text-align: center;"
                >Silahkan lanjutkan dengan mengisi formulir pendaftaran. Setelah itu pilihlah produk yang sesuai dengan kebutuhan Anda</p>
              </div>
              <v-divider></v-divider>
            </v-card-text>
            <v-card-actions style="padding-bottom:20px;">
              <router-link tag="div" to="/formhead" style="width: 90%; margin:auto;">
                <j-btn block class="color1" dark>Formulir Pendaftaran</j-btn>
              </router-link>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>-->
    <!--congratsDialog-->
  </div>
</template>


<script>
import { mapActions, mapMutations } from "vuex";
import _ from "lodash";
import localforage from "localforage";
import enums from "../enums";
import locationPermission from "../helper/location";
import statusCodeMappingRoute from "../helper/statusCode";

const { types } = enums;

export default {
  data() {
    return {
      ktp: "",
      email: "",
      show: false,
      password: "",
      privacyDialog: false,
      privacy: {},
      congratsDialog: false,
      latitude: 0,
      longitude: 0,
      detailPrivacy: false,
      passErr: false,
      showTooltip: true,
      clientHeight: document.documentElement["clientHeight"]
    };
  },
  methods: {
    ...mapActions(["register", "browserData", "getprivacytext"]),
    ...mapMutations([types.LOGOUT, types.SET_ERROR]),
    newPassword: async function() {
      const valid = await this.$validator.validateAll();

      if (valid && !this.errGeoLoc) {
        let sendData = _.pick(this, [
          "password",
          "email",
          "ktp",
          "latitude",
          "longitude"
        ]);

        const statusCode = await this.register({
          web_version: enums.webVersion,
          gmail_auth_token: this.googleToken,
          ...sendData
        });
        if (statusCode) {
          const browserData = await this.browserData("user_register");
          if (browserData) {
            this.privacyDialog = false;
            //this.congratsDialog = true;
            await localforage.removeItem("signupParams");
            const routename = statusCodeMappingRoute(statusCode);
            this.$router.push({ name: routename });
          }
        }
      }
    },
    getLocation: async function() {
      try {
        const loc = await locationPermission();
        this.showTooltip = false;
        for (let i in loc) {
          this[i] = loc[i];
        }
      } catch (e) {
        this[types.SET_ERROR](e);
      }
    },
    inputPassNavlog: function(e) {
      this.$navlog.inputPass(e, this.$route.name);
    },
    endWithJulofinance: function() {
      const check = this.email.endsWith("@julofinance.com");
      return !check;
    },
    daftar: function() {
      this.passErr = this.password && !isNaN(this.password);
      if (!this.passErr) {
        this.privacyDialog = true;
      }
    }
  },
  async beforeMount() {
    let params = false;
    if (!_.isEmpty(this.$route.params)) {
      params = this.$route.params;

      //////////delete aja
      // const aaa = email.split("@");
      // this.email = aaa.join("2@");
      /////////delete aja
    } else {
      params = await localforage.getItem("signupParams");
    }
    if (params) {
      const { ktp, email, googleToken } = params;
      this.ktp = ktp;
      this.email = email;
      this.googleToken = googleToken;
    }
  },
  async mounted() {
    this.getLocation();
    this[types.LOGOUT]();

    this.privacy = (await this.getprivacytext()).preface;
  },
  watch: {
    privacyDialog: function(val) {
      let action = val ? "Screen opened" : "Screen closed";

      const obj = this.$navlog.mappingObj("PrivacyAgreementFragment", action);
      this.$navlog.save(obj);
    }
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
.congratsDialog {
  background-image: url("../assets/background/bg_blue.png");
  background-repeat: repeat;
  background-size: cover;
}
.textField {
  max-width: 90%;
  margin-left: 5%;
}

.slide-leave-active,
.slide-enter-active {
  transition: 1s;
}
.slide-enter {
  transform: translate(100%, 0);
}
.slide-leave-to {
  transform: translate(-100%, 0);
}
</style>
