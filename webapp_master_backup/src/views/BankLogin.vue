<template>
  <div class="">
    <div class="overlay_login" v-if="showLoader">
      <div class="helper_login"></div>
      <img src="../assets/waiting.gif" class="waitingImg">
        <br/>
    <div class="center txtBold">
      MOHON TUNGGU
    </div>
    <div class="center txtNormal">
      Kami sedang memproses data Anda. Proses ini membutuhkan waktu beberapa saat.
    </div>
    </div>
     <div class="redBoxFailure" v-if="showFailure">
      {{ errorMsg }}
     </div>
     <div v-if="!showLoader">
        <div class="textHeader blueBoxMandiri" v-if="bankName === 'mandiri'">
          <div class="logoAlign">
            <img src="../assets/Mandiri.png"
            class="logoCls"/>
          </div>
        </div>
        <div class="textHeader blueBoxBCA" v-if="bankName === 'bca'">
          <div class="logoAlign">
            <img src="../assets/bca_logo.png"  class="logoCls"/>
          </div>
        </div>
        <div class="textHeader blueBoxBRI" v-if="bankName === 'bri'">
          <div class="logoAlign">
            <img src="../assets/bri.png"  class="logoCls"/>
          </div>
        </div>
        <div class="textHeader orangeBoxBNI" v-if="bankName === 'bni'">
          <div class="logoAlign">
            <img src="../assets/bni.png"  class="logoClsBni"/>
          </div>
        </div>
        <div class="lightBlueBox">
         <v-layout row
         class="subbodyClass">
            <v-flex xs12 sm6 md4 offset-xs0 offset-sm3 offset-md4>
              <table>
                <tr>
                  <td class="lBox">
                    <img src="../assets/info_icon.png"  class="iconCls"/>
                  </td>
                  <td class="rBox">
                    Salah memasukan User ID / Password dapat beresiko akun Anda
                    diblokir oleh Bank.
                  </td>
                </tr>
              </table>
            </v-flex>
          </v-layout>
        </div>
        <div class="logBox">
          <v-layout row class="subbodyClass">
            <v-flex xs12 sm6 md4 offset-xs0 offset-sm3 offset-md4>
               <label class="labelInput logBoxLabel">User ID</label>
               <v-text-field
                  autofocus
                  outline
                  class="textField"
                  :error-messages="errors.collect('User ID')"
                  v-validate="'required|alpha_num|min:4|max:15'"
                  data-vv-name="User ID"
                  required
                  v-model="username"
                  id="username"
                  @keyup.enter="bankLogIn"
                  v-on:blur="checkLoginValidation()"
                  v-on:change="checkLoginValidation()"
                  v-on:keyup="checkLoginValidation()"
                ></v-text-field>
                <div class="error--text">
                  <span>{{ errors.first("User ID") }}</span>
                </div>
                <label class="labelInput logBoxLabel">{{pwdText}}</label>
                <v-text-field
                  outline
                  v-validate="isPassword ? 'required|min:8|max:12|alpha_num' : 'required|min:4|numeric|max:15'"
                  class="textField"
                  :error-messages="errors.collect('Password')"
                  data-vv-name="Password"
                  required
                  :type="show ? 'text' : 'password'"
                  @click:append="show = !show"
                  v-model="password"
                  id="password"
                  @keyup.enter="bankLogIn"
                  v-on:blur="checkLoginValidation()"
                  v-on:change="checkLoginValidation()"
                  v-on:keyup="checkLoginValidation()"
                  :append-icon="show ? 'visibility_off' : 'visibility'"
                ></v-text-field>
                <div class="error--text">
                  <span>{{ errors.first("Password") }}</span>
                </div>
          </v-flex>
        </v-layout>
        </div>
        <div class="txtBlue">
          <a @click="informationNotify=true">Kenapa Anda layak mempercayakan data Anda?</a>
        </div>
        <div>
            <v-layout row class="subbodyClass txtGrey">
              <v-flex xs12 sm6 md4 offset-xs0 offset-sm3 offset-md4>
                <b>Info Penting:</b>
                <ul>
                  <li>JULO hanya akan mengakses data mutasi rekening Bank yang Anda daftarkan.</li>
                  <li>Anda akan menerima email dari {{bankNameCaps}} saat kami mengakses mutasi rekening Bank Anda.</li>
                </ul>
              </v-flex>
            </v-layout>
        </div>
         <div class="logButton">
          <v-layout row class="subbodyClass">
            <v-flex xs12 sm6 md4 offset-xs0 offset-sm3 offset-md4>
                <v-btn block large :disabled="!password || !username || !errorTxt"
                    v-bind:class="[isLoginActive ? activeLoginBtnClass : '']"
                    @click="bankLogIn">Login</v-btn>
            </v-flex>
          </v-layout>
        </div>
     </div>
    <v-layout row justify-center>
      <v-flex xs12 sm9 md6 offset-xs0 offset-sm2 offset-md3>
        <v-dialog v-model="informationNotify" persistent width="400">
          <v-card>
            <v-card-text>
              <div style="padding-bottom:0px; margin-left: 10px; margin-right: 5px; ">
                <p  style="text-align: left; font-size: 14px; width: 100%;
                font-weight: bold;" class="primaryColor">Mengapa kami membutuhkan password Anda?</p>
                 <hr/><br/>
                <p class="txtPopUpBold">Sertifikasi Keamanan</p>
                <p class="txtPopUp">Kami mengutamakan perlindungan seluruh data nasabah JULO.
                Untuk memastikan data Anda aman dari oknum-oknum yang tidak bertanggung jawab,
                Kami menggunakan system perlindungan GoDaddy Verified & Secured</p>
              </div>
              <div style="padding-top:10px; margin-left: 10px; margin-right: 5px; ">
                <p class="txtPopUpBold">Enkripsi Data</p>
                <p class="txtPopUp">Tim Kami tidak dapat melihat ID maupun password yang Anda masukkan.
                 Semua standar enkripsi data telah terbukti keamanannya.</p>
              </div>
              <div style="padding-top:10px; margin-left: 10px; margin-right: 5px; ">
                <p class="txtPopUpBold">Tim yang Berpengalaman</p>
                <p class="txtPopUp">Tim JULO terdiri dari orang-orang yang berpengalaman di bidangnya,
                sehingga Anda tidak perlu khawatir dengan keamanan data-data Anda.</p>
              </div>
              <div style="padding-top:10px; margin-left: 10px; margin-right: 5px; ">
                <div class="logoAlign">
                  <img src="../assets/godaddy.png"  class="godaddyCls"/>
                </div>
              </div>
            </v-card-text>
            <v-card-actions style="padding-bottom:10px;padding-right:15px;">
              <j-btn block large class="color8" dark @click="informationNotify = false">Lanjutkan</j-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
  </div>

</template>

<script>
import { mapActions } from "vuex";
import moment from "moment";
export default {
  data() {
    return {
      informationNotify:false,
      username: "",
      password: "",
      show: false,
      bankName: '',
      bankNameCaps: '',
      errorTxt: '',
      bankLoginVerification: {},
      countTry: 0,
      limitTry: 10,
      showLoader: false,
      jobId: '',
      showFailure: false,
      errorMsg: '',
      pwdText: 'Password',
      isPassword: false,
      isLoginActive: false,
      activeLoginBtnClass: 'color8',
    };
  },
  methods: {
    ...mapActions(["userBankLogin", "bankScrapeDetails"]),
     checkLoginValidation() {
        var alphaNum = /^[0-9a-zA-Z]+$/;
        var number = /^[0-9]+$/;
         if(!(this.username.match(alphaNum))) {
            this.errorTxt = '';
            this.isLoginActive = false;
          } else if(this.username.length < 4) {
            this.errorTxt = '';
            this.isLoginActive = false;
          } else if(this.username.length > 15) {
            this.errorTxt = '';
            this.isLoginActive = false;
          } else if((!(this.password.match(alphaNum)) && this.isPassword) || (!(this.password.match(number)) && !this.isPassword)) {
            this.errorTxt = '';
            this.isLoginActive = false;
          } else if((this.password.length < 4 && !this.isPassword) || (this.password.length < 8 && this.isPassword) ) {
            this.errorTxt = '';
            this.isLoginActive = false;
          } else if((this.password.length > 15 && !this.isPassword) || (this.password.length > 12 && this.isPassword) ) {
            this.errorTxt = '';
            this.isLoginActive = false;
          } else {
            this.errorTxt = 'success';
            this.isLoginActive = true;
          }
        return true;
     },
     bankScrape: async function() {
       setTimeout(async () => {
        try {
          this.countTry++;
          if (this.countTry <= this.limitTry) {
            const details = await this.bankScrapeDetails(this.jobId);
            if (details) {
              if (details.status === 'scrape_success' || details.status === 'auth_success' || details.status === 'load_success'
              || details.status === 'scrape_failed' || details.status === 'load_failed') {
                  this.$router.push({ name: "success" });
              } else if (details.status === 'setup_failed' || details.status === 'auth_failed') {
                  if (details.status === 'auth_failed') {
                    this.errorMsg = 'User Id atau Password yang Anda masukan salah';
                  } else {
                    this.errorMsg = 'Mohon coba kembali dalam beberapa saat';
                  }
                  this.showLoader = false;
                  this.showFailure = true;
                  this.countTry = 0;
              } else {
                  this.bankScrape();
              }
            } else {
              console.log("error");
              this.bankScrape();
            }
          } else {
            this.showLoader = false;
            this.showFailure = true;
            this.countTry = 0;
            this.errorMsg = 'Mohon coba kembali dalam beberapa saat';
          }
        } catch (err) {
          console.log('error'+err);
          this.bankScrape();
        }
      }, 3000);
    },
    bankLogIn: async function() {
      const valid = await this.$validator.validateAll();
      if (valid) {
        this.bankLoginVerification.data_type = this.bankName;
        this.bankLoginVerification.username = this.username;
        this.bankLoginVerification.password = this.password;
        this.bankLoginVerification.appId = this.$route.params.appId;
        this.showLoader = true;
        const result = await this.userBankLogin(this.bankLoginVerification);
        this.showFailure = false;
        this.errorMsg = '';
        if (result) {
          if (result.status === 'initiated') {
              this.jobId = localStorage.jobId = result.id;
              this.bankScrape();
          } else if (result.status === 'setup_failed' || result.status === 'auth_failed') {
            this.showLoader = false;
            this.showFailure = true;
            if (result.status === 'auth_failed') {
              this.errorMsg = 'User Id atau Password yang Anda masukan salah';
            } else {
              this.errorMsg = 'Mohon coba kembali dalam beberapa saat';
            }
          } else {
              this.errorMsg = 'User Id atau Password yang Anda masukan salah';
              this.showLoader = false;
              this.showFailure = true;
          }
        } else {
          this.showLoader = false;
          this.showFailure = true;
          this.errorMsg = 'User Id atau Password yang Anda masukan salah';
        }
      } else {
        this.isLoginActive = false;
        this.errorTxt = '';
      }
    },
  },
  async beforeMount() {
    this.$emit("makeBgTransparent", false);
    this.$emit("makeIsBoostPage", {text: "Login"});
  },
  mounted () {
    this.bankName = this.$route.query.bank;
    this.bankName = this.bankName.toLowerCase().trim();
    this.bankNameCaps = this.bankName.toUpperCase().trim();
    if (this.bankName === 'bri' || this.bankName === 'bni') {
      this.isPassword = true;
    }
    if (this.bankName === 'mandiri') {
      this.bankNameCaps = 'Mandiri';
    }
    localStorage.token = this.$route.params.token;
    localStorage.appId = this.$route.params.appId;
  }
};
</script>

<style scoped>
.blueBoxMandiri {
  width: 100%;
  height: 120px;
  background-color: #64b1ea;
  padding-top: 35px !important;
}
.blueBoxBCA {
  width: 100%;
  height: 120px;
  background-image: linear-gradient(to bottom, #015ea2, #004e8e);
  padding-top: 35px !important;
}
.blueBoxBRI {
  width: 100%;
  height: 120px;
  background-color: #005aaa;
  padding-top: 35px !important;
}
.orangeBoxBNI {
  width: 100%;
  height: 120px;
  background-color: #ee4e14;
  padding-top: 35px !important;
}
.lightBlueBox {
  width: 100%;
  height: 44px;
  background-color: #f3fcff;
}
.lBox {
  padding-top: 10px;
  padding-right: 5px;
  padding-left: 15px;
  padding-bottom: 10px;
}
.rBox {
  opacity: 0.85;
  font-size: 10px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: normal;
  text-align: left;
  color: #00acf0;
  padding-top: 10px;
  padding-right: 5px;
  padding-bottom: 10px;
}
.boxIcon {
  width: 16.7px;
  height: 16.7px;
  opacity: 0.41;
  background-color: #00acf0;
}
.logoAlign {
  text-align : center;
}
.logoCls {
  width: 139px;
  height: 42px;
}
.logoClsBni {
  width: 113px;
  height: 42px;
}
.iconAlign {
  text-align : center;
}
.iconCls {
  width: 22px;
  height: 22px;
}
.logBox {
  width: 100%;
  padding-top: 15px;
  padding-right: 20px;
  padding-left: 20px;
}
.logButton {
  width: 100%;
  padding-top: 15px;
  padding-right: 40px !important;
  margin-left: 15px !important;
}
.logBoxLabel {
  font-size: 10px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.3;
  letter-spacing: normal;
  text-align: left;
  color: #5e5e5e;
}
.txtBlue {
  font-size: 10px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: normal;
  text-align: center;
  color: #00acf0;
  padding-top: 15px;
  padding-bottom: 40px;
}
.txtGrey {
  opacity: 0.85;
  text-align: left;
  font-size: 10px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: normal;
  color: #5e5e5e;
  padding-left: 20px;
  padding-right: 20px;
}
li {
  padding-top:5px !important;
  font-size: 10px !important;
}
a {
  color: #00acf0;
  cursor: pointer;
}
.v-btn{
  border-radius:28px!important;
}
.v-text-field.v-text-field--enclosed {
  padding-bottom: 10px !important;
  padding-top: 10px !important;
}
.informationNotify {
  border-radius: 7px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
}
.v-dialog {
  padding: 0px !important;
  margin: 0px !important;
}
.txtPopUp {
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: left;
  color: #5e5e5e;
}
.txtPopUpBold {
  font-size: 14px;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #00acf0;
}
p {
  margin-bottom: 5px !important;
}
.godaddyCls {
  width: 50%;
  height: 50%;
}
.helper_login {
    height:50%;
    width:100%;
    margin-bottom:-240px;
    min-height: 240px;
}
.overlay_login {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    cursor: pointer;
    background-color: #ffffff;
}
.waitingImg {
    margin: 0 auto;
    max-width: 100%;
    max-height: 100%;
    display: block;
}
.redBoxFailure {
  width: 100%;
  height: 30px;
  text-align: center;
  color: #ffffff;
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: red;
  font-size: 12px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
}
ul {
  padding-left: 15px !important;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.txtNormal {
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: 0.19px;
  text-align: center;
  color: #5e5e5e;
  padding-left: 20px;
  padding-right: 20px;
}
.txtBold {
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.29;
  letter-spacing: 0.23px;
  text-align: center;
  color: #00acf0;
  padding-top:35px;
}
</style>
