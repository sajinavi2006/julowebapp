<template>
  <div class="greyBg">
    <!-- new UI -->
    <v-layout>
      <v-flex xs12 sm6 md4 offset-xs0 offset-sm3 offset-md4>
        <v-card>
          <v-img class="white--text" height="700px" :src="imgBg">
            <v-container fill-height fluid style="margin-top: 100px;">
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <div class="header">
                    Lanjutkan Pengisian
                    <div>
                      <small>Lengkapi formulir pengajuan Anda</small>
                    </div>
                  </div>
                  <div>
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
                    ></v-text-field>
                    <div class="error--text">
                      <span>{{ errors.first("email") }}</span>
                    </div>

                    <v-text-field
                      dark
                      prepend-inner-icon="lock"
                      outline
                      v-validate="'required'"
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
                    <div class="error--text">
                      <span>{{ errors.first("kata sandi") }}</span>
                    </div>
                  </div>

                  <div style="margin-top: 20px; text-align:center;">
                    <j-btn @click="signIn" :disabled="!latitude">Masuk</j-btn>
                    <p style="margin-top: 20px;">
                      <router-link
                        tag="a"
                        to="/forgotPassword"
                        style="color:white;"
                      >Lupa kata sandi?</router-link>
                    </p>
                  </div>
                  <div style="margin-top: 40px; text-align:center;">
                    <router-link tag="a" to="/signup" style="color:white;">Saya belum mendaftar</router-link>
                  </div>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>
        </v-card>
      </v-flex>
    </v-layout>
    <!-- new UI -->

    <!--dialog application from android-->
    <v-layout row justify-center>
      <v-flex xs12 sm8 md6 offset-xs0 offset-sm2 offset-md3>
        <v-dialog v-model="androidAppDialog" persistent width="400">
          <v-card>
            <v-card-text>
              <div style="text-align: center; width: 100%; margin-bottom:30px; margin-top:30px;">
                Kami mendeteksi pengajuan Anda melalui aplikasi.
                <br>Silahkan lanjutkan pengajuan Anda di aplikasi JULO untuk mendapatkan skor yang lebih baik.
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
import { mapActions, mapMutations } from "vuex";
import statusCodeMappingRoute from "../helper/statusCode";
import locationPermission from "../helper/location.js";
import enums from "../enums";
import imgBg from "../assets/verifikasi-login-toolbar-background.png";
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

      imgBg
    };
  },
  methods: {
    ...mapMutations([types.LOGOUT, types.SET_ERROR]),
    ...mapActions(["login", "browserData"]),
    signIn: async function() {
      const valid = await this.$validator.validateAll();
      if (valid && !this.errGeoLoc) {
        let result = await this.login({
          username: this.email,
          password: this.password,
          web_version: enums.webVersion,
          latitude: this.latitude,
          longitude: this.longitude
        });
        let statusCode = result.status;

        if (statusCode) {
          const browserData = await this.browserData("user_login");
          if (statusCode < 105 && result.app_version) {
            this.androidAppDialog = true;
          } else if (browserData) {
            const routename = statusCodeMappingRoute(statusCode);
            this.$router.push({ name: routename });
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
        for (let i in loc) {
          this[i] = loc[i];
        }
      } catch (e) {
        this[types.SET_ERROR](e);
      }
    }
  },
  mounted() {
    /////DELETE AJAH top
    //this.email = "annissa.putri+auto1419@julofinance.com";
    //this.email = "3581200102050505";
    //this.password = "qwerqwer";
    this.email = "juliecajulo@julofinance.com";
    this.password = "123dutchang";
    /////DELETE AJAH bottom

    this.getLocation();
    this[types.LOGOUT]();
  }
};
</script>

<style scoped>
.header {
  height: 100px;
  padding-top: 15px;
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
  max-width: 80%;
  margin: auto !important;
}
.borderCard {
  top: 35%;
  border-radius: 15px;
}
.greyBg {
  background: #e0e0e0;
}
</style>
