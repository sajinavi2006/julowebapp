<template>
  <div class="bg" :style="{ height: clientHeight + 'px' }">
    <!-- style="backgroundImage: linear-gradient(to right, #64b5f6 0%, #1e88e5 100%), url('../assets/Register Background/bg_register.svg');" -->

    <v-layout row class="subbodyClass">
      <v-flex xs12 sm6 md4 offset-xs0 offset-sm3 offset-md4>
        <div :style="{ paddingTop: ((clientHeight-500) / 2) + 'px' }">
          <div class="header">
            Lanjutkan Pengisian
            <div>
              <small>Lengkapi formulir pengajuan Anda</small>
            </div>
          </div>
          <div style="margin-left: 20px;margin-right: 10px;">
            <v-text-field
              dark
              prepend-inner-icon="mail"
              autofocus
              outline
              v-model="email"
              class="textField"
              v-validate="'required'"
              :error-messages="errors.collect('email')"
              placeholder="Isi email / nomor KTP"
              data-vv-name="Username"
              required
              @keypress="inputNavlog"
              id="username"
              @keyup.enter="signIn"
            ></v-text-field>
            <div class="error--text">
              <span>{{ errors.first("email") }}</span>
            </div>

            <v-text-field
              dark
              prepend-inner-icon="lock"
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
              @keyup.enter="signIn"
            ></v-text-field>
            <div class="error--text">
              <span>{{ errors.first("kata sandi") }}</span>
            </div>
          </div>

          <div style="margin-top: 20px; text-align:center;">
            <v-tooltip bottom :disabled="!showTooltip">
              <j-btn @click="signIn" :disabled="!latitude" slot="activator">Masuk</j-btn>
              <span>Izinkan kami mengakses lokasi Anda</span>
            </v-tooltip>
            <p style="margin-top: 20px;">
              <router-link tag="a" to="/forgotPassword" style="color:white;">Lupa kata sandi?</router-link>
            </p>
          </div>
          <div style="margin-top: 80px; text-align:center;">
            <router-link tag="a" to="/signup" style="color:white;">Saya belum mendaftar</router-link>
          </div>
        </div>
      </v-flex>
    </v-layout>

    <!--dialog application from android-->
    <v-layout row justify-center>
      <v-flex xs12 sm8 md6 offset-xs0 offset-sm2 offset-md3>
        <v-dialog v-model="androidAppDialog" persistent width="400">
          <v-card>
            <v-card-text>
              <div style="text-align: center; width: 100%; margin-bottom:30px; margin-top:30px;">
                Kami mendeteksi pengajuan Anda melalui aplikasi.
                <br />Silahkan lanjutkan pengajuan Anda di aplikasi JULO untuk mendapatkan skor yang lebih baik.
              </div>
              <a href="https://go.onelink.me/zOQD/93d068ac">
                <j-btn block large class="color8" dark>Mengerti</j-btn>
              </a>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
    <!--dialog application from android-->
  </div>
</template>


<script>
import { mapActions, mapMutations, mapState } from "vuex";
import statusCodeMappingRoute from "../helper/statusCode";
import locationPermission from "../helper/location";
import enums from "../enums";
const { types } = enums;

export default {
  data() {
    return {
      email: "",
      show: false,
      password: "",

      latitude: 0,
      longitude: 0,

      androidAppDialog: false,
      showTooltip: true,
      clientHeight: document.documentElement["clientHeight"],
      errGeoLoc: true
    };
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    ...mapMutations([types.LOGOUT, types.SET_ERROR]),
    ...mapActions(["login", "browserData", "getLoan"]),
    signIn: async function() {
      const valid = await this.$validator.validateAll();
      if (valid && !this.errGeoLoc) {
        const result = await this.login({
          username: this.email,
          password: this.password,
          web_version: enums.webVersion,
          latitude: this.latitude,
          longitude: this.longitude
        });
        const statusCode = result.status;

        if (statusCode) {
          const browserData = await this.browserData("user_login");
          if (statusCode < 105 && result.app_version) {
            this.androidAppDialog = true;
          } else if (browserData) {
            let loanStatus = 200;
            if (statusCode == 180) {
              const loan = await this.getLoan();
              loanStatus = loan.status;
            }
            const routeName = statusCodeMappingRoute(
              statusCode,
              this.user.can_reapply,
              loanStatus
            );
            this.$router.push({ name: routeName });
          }
        }
      }
    },
    inputNavlog: function(e) {
      this.$navlog.inputKey(e, this.$route.name);
    },
    inputPassNavlog: function(e) {
      this.$navlog.inputPass(e, this.$route.name);
    },
    getLocation: async function() {
      try {
        const loc = await locationPermission();
        this.errGeoLoc = false;
        this.showTooltip = false;
        for (let i in loc) {
          this[i] = loc[i];
        }
      } catch (e) {
        this[types.SET_ERROR](e);
      }
    }
  },
  async mounted() {
    /////DELETE AJAH top
    //this.email = "annissa.putri+auto1419@julofinance.com";
    //this.email = "3581200102050505";

    // this.email = "rayhan+auto1560415190@julofinance.com";
    // this.password = "qwerqwer";
    // this.email = "ridhanda@julofinance.com";
    // this.password = "ayamayam";
    //this.email = "juliecajulo@julofinance.com";
    //this.password = "123dutchang";
    /////DELETE AJAH bottom

    await this.getLocation();
    this[types.LOGOUT]();
  }
};
</script>

<style scoped>
body,
html {
  height: 100%;
  margin: 0;
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
.header {
  /* height: 175px;
  padding-top: 70px; */
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
  padding-bottom: 100px;
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
.contain {
  margin: auto auto;
  max-width: 300px;
}
</style>
