<template>
  <div>
    <div class="overlay" v-if="showLoader">
      <div class="helper"></div>
      <img src="../assets/waiting_logo.gif" class="waitingImgs">
    </div>
    <v-flex xs12 sm6 md4 offset-xs0 offset-sm3 offset-md4>
      <div class="innerBox" v-if="!showOtp">
        <div class="row">
          <div class="col-xs-12 col-md-12 mt-3 banner">
            <carousel  :perPage="1"
            :autoplay="true"
            :paginationPadding=3
            :autoplayTimeout=5000
            :navigationEnabled="true"
            :touchDrag="true"
            :navigationClickTargetSize=10>
              <slide>
                <img :src=sliderImg1  class="bannerImg" />
              </slide>
              <slide>
                <img :src=sliderImg2  class="bannerImg" />
              </slide>
              <slide>
                <img :src=sliderImg3  class="bannerImg" />
              </slide>
              <slide>
                <img :src=sliderImg4  class="bannerImg" />
              </slide>
            </carousel>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-md-12 mt-3 txt boldTxt1">
          Cek dan ajukan di sini
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-md-12 txt boldTxt2">
          Apakah saya berhak mendapatkan restrukturisasi?
          </div>
        </div>
        <div class="row">
          <div class="table-responsive pad4">
            <table class="table table-striped table-hover mx-auto w-auto">
              <tr>
                <td colspan="2" class="txt txt1">&nbsp;&nbsp;Masukkan nomor HP yang terdaftar di JULO
                </td>
              </tr>
              <tr >
                <td valign="bottom" colspan="2">
                  <v-card-actions class="justify-center">
                    <v-text-field
                    autofocus
                    outline
                    style="height:35px !important;"
                    required
                    data-vv-name="Phone"
                    v-model="phone"
                    v-on:keyup="checkEligibilityValidation(1)"
                    @keyup.enter="checkEligibility"
                    id="phone"
                    ></v-text-field>
                    <v-btn :disabled="!phone"
                    v-bind:class="[isCheckActive ? activeBtnClass : '']"
                    @click="checkEligibility">Check</v-btn>
                </v-card-actions>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <div class="error--text" v-if="!successValidation">
                    <span class="errorTxt">&nbsp;&nbsp;{{ errText }}</span>
                  </div>
                  <br/>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div class="row">
          <div class="table-responsive">
            <table class="table table-striped table-hover mx-auto w-auto">
              <tr>
                <td class="txt txt2">Sudah tidak menggunakan nomor HP yang terdaftar? </td>
              </tr>
              <tr>
                <td class="txt txt3">Hubungi CS JULO untuk memperbarui nomor telepon </td>
              </tr>
              <tr>
                <td>
                  <table class="table table-striped table-hover mx-auto w-auto" style="border-collapse: separate; border-spacing: 10px;">
                    <tr>
                      <td><img src="../assets/whatsapp.png"  class="socialIcons"/></td>
                      <td class="social">WhatsApp:</td>
                      <td><a href="https://wa.me/6281317782070?text=Restrukturisasi%20Pinjaman%20JULO&utm_source=refinancing%20web"
                       target="_blank" class="social1">0813-1778-2070</a></td>
                    </tr>
                    <tr>
                      <td><img src="../assets/gmail.png"  class="socialIcons"/></td>
                      <td class="social">Email:</td>
                      <td><a href="mailto:collections@julo.co.id" class="social1">collections@julo.co.id</a></td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>
        </div>
      <div class="pad1">
        <v-expansion-panel class="expand">
          <v-expansion-panel-content>
            <div slot="header">
              <v-layout>
                <v-flex xs12>
                  <v-layout column>
                     <v-flex xs12 style="padding-bottom:5px;" class="toggleTxt">Apa yang dimaksud dengan Restrukturisasi Pinjaman JULO?
                     </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </div>
            <v-card>
              <v-divider></v-divider>
              <v-card-text>
                <v-layout row>
                  <v-flex xs12>
                    <img :src=offerImg1  class="toggleImage"/>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-divider></v-divider>
        <v-expansion-panel class="expand">
          <v-expansion-panel-content>
            <div slot="header">
              <v-layout>
                <v-flex xs12>
                  <v-layout column>
                    <v-flex xs12 style="padding-bottom:5px;" class="toggleTxt">Siapa saja yang berhak mendapatkan Restrukturisasi Pinjaman?
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </div>
            <v-card>
              <v-divider></v-divider>
              <v-card-text>
                <v-layout row>
                  <v-flex xs12>
                    <img :src=offerImg2  class="toggleImage"/>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-divider></v-divider>
        <v-expansion-panel class="expand">
          <v-expansion-panel-content>
            <div slot="header">
              <v-layout>
                <v-flex xs12>
                  <v-layout column>
                    <v-flex xs12 style="padding-bottom:5px;" class="toggleTxt">Bagaimana cara mendapatkan Restrukturisasi Pinjaman JULO?
                    </v-flex>
                  </v-layout>
                </v-flex>
               </v-layout>
            </div>
            <v-card>
              <v-divider></v-divider>
              <v-card-text>
                <v-layout row>
                  <v-flex xs12>
                    <img :src=offerImg3  class="toggleImage"/>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-divider></v-divider>
        <v-expansion-panel class="expand">
          <v-expansion-panel-content>
            <div slot="header">
              <v-layout>
                <v-flex xs12>
                  <v-layout column>
                    <v-flex xs12 style="padding-bottom:5px;" class="toggleTxt">Saya membutuhkan restrukturisasi pinjaman, namun nomor saya tidak terdaftar.
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </div>
            <v-card>
              <v-divider></v-divider>
                <v-card-text>
                  <v-layout row>
                    <v-flex xs12>
                      <img :src=offerImg4  class="toggleImage"/>
                    </v-flex>
                  </v-layout>
                </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
        </div>
        <div class="row pad2" >
          <img :src=footerImg class="footerImg" />
        </div>
      </div>
      <div class="overlayOtp" v-if="showOtp">
        <div class="helper"></div>
        <div class="center txtBolds">
          Masukkan Kode Verifikasi
        </div>
        <div class="center txtNormals">
         Kami telah mengirimkan kode OTP ke nomor Anda.<br/> Masukkan kode OTP untuk konfirmasi
        </div>
        <div class="center pad3">
          <v-otp-input
          inputClasses="otp-input"
          :numInputs="6"
          separator=""
          ref="otpInput"
          :shouldAutoFocus="true"
          @on-complete="handleOnComplete"
          @on-change="handleOnChange"
          :is-input-num="isInputNum"
          />
        </div>
        <div class="center pad3">
           <img v-bind:src="require('../assets/' + imgUrl)" class="timerImg" alt="timer" />
           <span class="timerCls" v-bind:style="{ color: counterColor }">{{ timeLeft }}</span>
        </div>
        <div class="center" >
           <span v-if="invalidOtp" class="invalidOtp">{{ invalidOtpError }}</span>
        </div>
        <div class="center">
          <v-btn rounded  :disabled="!isOtpBtnEnable"
          v-bind:class="[isOtpBtnEnable ? activeBtnClass : '']"
          @click="checkEligibility">  MINTA KODE VERIFIKASI  </v-btn>
        </div>
        <!--<div class="center">
           <img src="../assets/logo_small.png" />
        </div>-->
      </div>
    </v-flex>
    <v-layout row justify-center>
      <v-flex xs12 sm9 md6 offset-xs0 offset-sm2 offset-md3>
        <v-dialog v-model="informationNotify" persistent width="400">
          <v-card>
            <v-card-text>
              <div style="padding-bottom:0px; margin-left: 10px; margin-right: 5px; ">
                 <div style="padding-top:10px; margin-left: 10px; margin-right: 5px; ">
                  <div class="logoAlign">
                    <img src="../assets/oops.png"/>
                  </div>
                 </div>
                <p class="txtPopUps"><br/>Mohon maaf, menurut analisa sistem kami, Anda belum memenuhi syarat restrukturisasi pinjaman.
                Harap membayarkan cicilan Anda sesuai tanggal jatuh tempo.<br/><br/>
                Pastikan Anda telah memasukan nomor HP yang terdaftar pada aplikasi JULO</p>
              </div>
              <div style="margin-left: 5px; margin-right: 5px; ">
                <div class="table-responsive">
                  <table class="table table-striped table-hover mx-auto w-auto">
                    <tr>
                      <td class="txt txt2" style="padding-top:13px;font-weight: bold !important;">Sudah tidak menggunakan nomor HP yang terdaftar? </td>
                    </tr>
                    <tr>
                      <td class="txt txt3">Hubungi CS JULO untuk memperbarui nomor telepon</td>
                    </tr>
                    <tr>
                      <td>
                        <table class="table table-striped table-hover mx-auto w-auto" style="border-collapse: separate; border-spacing: 10px;">
                          <tr>
                            <td><img src="../assets/whatsapp.png"  class="socialIcons"/></td>
                            <td class="social">WhatsApp:</td>
                             <td><a href="https://wa.me/6281317782070?text=Restrukturisasi%20Pinjaman%20JULO&utm_source=refinancing%20web"
                                target="_blank" class="social1">0813-1778-2070</a></td>
                          </tr>
                          <tr>
                            <td><img src="../assets/gmail.png"  class="socialIcons"/></td>
                            <td class="social">Email:</td>
                            <td><a href="mailto:collections@julo.co.id" class="social1">collections@julo.co.id</a></td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </v-card-text>
            <v-card-actions style="padding-bottom:10px;">
              <v-btn block large class="color8" dark @click="informationNotify = false">Kembali</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
  import { mapActions } from "vuex";
  import { Carousel, Slide } from 'vue-carousel';
  export default {
    props: {
      isInputNum: {
        type: Boolean,
         default: true,
      }
    },
    components: {
      Carousel,
      Slide
    },
    data() {
      return {
        showLoader: false,
        showOtp: false,
        phone: "",
        timeInterval: 120, //in seconds
        time: 0,
        imgUrl: 'timer.png',
        timer: null,
        request_id: '',
        isOtpBtnEnable: false,
        counterColor: '#ff0000',
        informationNotify: false,
        otpVerification: {},
        invalidOtp: true,
        invalidOtpError: '',
        errorMsg: '',
        attempt: 0,
        otp: "",
        successValidation: false,
        isCheckActive: false,
        activeBtnClass: 'color8',
        errText: '',
        offerImg1: '',
        offerImg2: '',
        offerImg3: '',
        offerImg4: '',
        sliderImg1: '',
        sliderImg2: '',
        sliderImg3: '',
        sliderImg4: '',
        footerImg: ''
      };
    },

    methods: {
       ...mapActions(["checkUserEligibility", "checkUserEligibilityVerifyOtpCode"]),
      checkEligibilityValidation(type) {
        if (this.phone) {
          this.isCheckActive = true;
          this.successValidation = true;
          this.errText = '';
          if(type == 2) {
            var numbers = /^[0-9]+$/;
            var firstTwo = /^08/;
            if(!(this.phone.match(numbers))) {
              this.successValidation = false;
              this.errText = 'Mohon diisi dengan format 08xxxxxxxx';
              return false;
            } else if(!(this.phone.match(firstTwo))) {
              this.successValidation = false;
              this.errText = 'Mohon diisi dengan format 08xxxxxxxx';
              return false;
            } else if(this.phone.length < 10) {
              this.successValidation = false;
              this.errText = 'Mohon pastikan nomor HP Anda sudah benar';
              return false;
            } else if(this.phone.length > 14) {
              this.successValidation = false;
              this.errText = 'Mohon pastikan nomor HP Anda sudah benar';
              return false;
            } else {
              return true;
            }
          }
        } else {
          this.successValidation = true;
          this.isCheckActive = false;
          this.errText = '';
          return false;
        }
      },
      checkEligibility: async function() {
        const valid = this.checkEligibilityValidation(2);
        if (this.isOtpBtnEnable) {
          this.$refs.otpInput.clearInput();
           this.invalidOtp = false;
           this.invalidOtpError = '';
        }
       // const valid = await this.$validator.validateAll();
        if (valid) {
          this.successValidation = true;
          this.errText = '';
          this.showLoader = true;
          const result = await this.checkUserEligibility(this.phone);
          if (result) {
            this.showLoader = false;
            if (result.status == 400) {
                var msg = result.msg.split(":");
                if(msg[0].trim() == 'Mobile_phone Nomor telepon tidak valid') {
                  this.successValidation = false;
                  //this.errText = msg[0].trim();
                  this.errText = 'Mohon diisi dengan format 08xxxxxxxx';
                } else {
                  if (msg[1].trim() == 'tidak valid') {
                     this.successValidation = false;
                     this.errText = msg[1].trim();
                  } else {
                    this.informationNotify = true;
                  }
                }
            } else {
              var res = result.data;
              if (res && res.data.request_id) {
                this.showOtp = true;
                this.request_id = res.data.request_id;
                this.time = this.timeInterval;
                this.imgUrl = 'timer1.png';
                this.counterColor = '#5e5e5e';
                this.timer = setInterval(this.decrementOrAlert, 1000);
                this.isOtpBtnEnable = false;
                this.$emit("makeIsEligibilityPage", false);
                this.$emit("makeIsOtpPage", {text: "Masukkan Kode OTP", url: "restrukturisasi"});
              } else {
                 this.informationNotify = true;
              }
            }
          } else {
             this.showLoader = false;
             this.successValidation = true;
             this.errText = '';
          }
        }
      },
      enableButton: function() {
        this.isOtpBtnEnable = true;
        this.invalidOtp = false;
        this.invalidOtpError = '';
        this.$refs.otpInput.clearInput();
      },
      checkUserEligibilityVerifyOtp: async function() {
        if (this.otp && this.request_id) {
          this.attempt = 1;
          this.otpVerification.code = this.otp;
          this.otpVerification.requestId = this.request_id;
          this.errorMsg =  'Kode yang Anda masukkan salah.';
          const result = await this.checkUserEligibilityVerifyOtpCode(this.otpVerification);
          this.showLoader = true;
          this.invalidOtp = false;
          this.invalidOtpError = '';
          if (result) {
            this.showLoader = false;
            if (result.status == 400) {
              var msg = result.msg.split(":");
              this.invalidOtp = true;
              //this.invalidOtpError = msg[1].trim();
              this.invalidOtpError = this.errorMsg;
            } else {
              var res = result.data;
              if (res && res.data.url) {
                window.location.href = res.data.url;
              } else {
                this.invalidOtp = true;
                this.invalidOtpError = this.errorMsg;
                this.showLoader = false;
              }
            }
          } else {
            this.invalidOtp = true;
            this.invalidOtpError = this.errorMsg;
            this.showLoader = false;
          }
        }
      },
      decrementOrAlert () {
        if (this.time > 0) {
          this.time--;
          return;
        } else {
          this.imgUrl = 'timer.png';
          this.counterColor = '#ff0000';
          this.enableButton(true);
        }
        clearInterval(this.timer);
      },
      handleOnComplete(value) {
        if(!this.isOtpBtnEnable) {
          this.otp = value;
          if (this.time == 0) {
            this.time = this.timeInterval;
            this.imgUrl = 'timer1.png';
            this.counterColor = '#5e5e5e';
            this.timer = setInterval(this.decrementOrAlert, 1000)
          }
          if (this.attempt === 0) {
            this.checkUserEligibilityVerifyOtp();
          }
        }
      },
      handleOnChange(value) {
        this.otp = '';
        this.attempt = 0;
        //this.invalidOtp = false;
        //this.invalidOtpError = '';
      }
    },
    computed: {
      timeLeft () {
        return `${this.minutes} : ${this.seconds}`
      },
      minutes () {
        return String(Math.floor(this.time / 60)).padStart(2, '0')
      },
      seconds () {
        return String(this.time % 60).padStart(2, '0')
      }
    },
    async beforeMount() {
      this.$emit("makeBgTransparent", false);
      this.$emit("makeIsEligibilityPage", {text: "Restrukturisasi Pinjaman JULO"});
      this.offerImg1 = localStorage.getItem('pic1');
      this.offerImg2 = localStorage.getItem('pic2');
      this.offerImg3 = localStorage.getItem('pic3');
      this.offerImg4 = localStorage.getItem('pic4');
      this.sliderImg1 = localStorage.getItem('pic5');
      this.sliderImg2 = localStorage.getItem('pic6');
      this.sliderImg3 = localStorage.getItem('pic7');
      this.sliderImg4 = localStorage.getItem('pic8');
      this.footerImg = localStorage.getItem('pic0');
    },
  };
</script>
<style>
  * {
    font-family: "Nunito";
    font-size: 12px;
    caret-color: #00acf0;
  }
  .banner {
    padding-top: 30px;
  }
  .innerBox {
    background-color: #effbff;
  }
  .boldTxt1 {
    height: 20px;
    font-size: 15px !important;
    font-weight: bold;
    line-height: 1.33;
    text-align: center;
    color: #00acf0 !important;
  }
  .boldTxt2 {
    height: 19px;
    text-align: center;
    font-size: 13px !important;
    line-height: 1.38;
  }
  .txt1 {
    opacity: 0.65;
    text-align: left;
    height: 18px;
    font-size: 13px !important;
    line-height: 2.15;
  }
  .txt {
    font-family: Nunito;
    font-size: 12px;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    color: #182940;
  }
  .txt2 {
    height: 16px;
    line-height: 1.54;
    text-align: center;
    font-size: 13px !important;
  }
  .txt3 {
    height: 16px;
    line-height: 1.54;
    text-align: center;
    font-weight: normal;
    font-size: 13px !important;
  }
  .social {
    height: 18px;
    font-weight: normal;
    line-height: 1.46;
    text-align: left;
    color: #3a3a3a;
    font-size: 13px !important;
  }
  .social1 {
    height: 18px;
    font-weight: 600;
    line-height: 1.46;
    text-align: left;
    color: #00acf0;
    font-size: 13px !important;
  }
  .expand {
    border-radius: 7px;
    box-shadow: 0 2px 4px 0 rgba(195, 163, 163, 0.2);
  }
  .expandHeaderLine {
    margin-top: 20px;
    height: 6px;
    border-radius: 7px 7px 0px 0px;
    background-image: linear-gradient(91deg, #00acf0, #0b80a9);
  }
  .toggleImage {
    width: 100%;
    height: auto;
    aspect-ratio: attr(width) / attr(height);
  }
  .pad1 {
    padding-left: 0px;
    padding-right: 0px;
    padding-top: 10px;
  }
  .pad2 {
    padding-top: 20px;
  }
  .pad3 {
    padding-bottom: 15px !important;
  }
  .pad4 {
    padding-top: 5px !important;
  }
  .footerImg {
    width: 100%;
    height: auto;
    aspect-ratio: attr(width) / attr(height);
  }
  .bannerImg {
    width: 100%;
    height: 500px;
    aspect-ratio: attr(width) / attr(height);
  }
  .VueCarousel-navigation-prev{
    transform: translateY(0%) translateX(0%) !important;
  }
  .VueCarousel-navigation-next{
    transform: translateY(0%) translateX(0%) !important;
  }
  .VueCarousel-dot-container {
    margin: 0px !important;
  }
  .VueCarousel-dot {
    background-color: #bec3c5 !important;
  }
  .VueCarousel-dot--active {
    background-color: #00acf0 !important;
  }
  @media screen and (max-width: 992px) {
    .pad1 {
      padding-left: 15px;
      padding-right: 15px;
    }
    .bannerImg {
      height: 360px;
    }
  }
  .waitingImgs {
    margin: 0 auto;
    max-width: 100%;
    max-height: 100%;
    display: block;
    z-index: 1000;
  }
  .helper {
    height:50%;
    width:100%;
    margin-bottom:-240px;
    min-height: 240px;
  }
  .overlay {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    cursor: pointer;
    opacity: 0.5;
    background-color: #5e5e5e;
    z-index: 1;
  }
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .overlayOtp {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    background-color: #ffffff;
  }
  .otp-input {
    width: 25px;
    height: 35px;
    padding: 5px;
    margin: 0 10px;
    font-size: 20px;
    border-radius: 4px;
    border-bottom: 5px solid #ccc;
    text-align: center;
    &.error {
      border: 1px solid red !important;
    }
  }
  .otp-input::-webkit-inner-spin-button,
  .otp-input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .error {
    border: 1px solid red !important;
  }
  .txtNormals {
    font-size: 13px !important;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.38;
    letter-spacing: 0.22px;
    text-align: center;
    color: #182940 !important;
    height: 50px;
    font-family: Nunito !important;
  }
  .toggleTxt {
    height: 35px;
    font-family: "Montserrat", sans-serif !important;
    font-size: 13px !important;
    font-weight: 300px;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.46;
    letter-spacing: normal;
    text-align: left;
    color: #182940;
  }
  .txtBolds {
    font-size: 14px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.29;
    letter-spacing: 0.23px;
    text-align: center;
    color: #00acf0;
  }
  .timer {
    margin: 10px;
  }
  .timerImg {
    width: 12px;
    margin-right: 5px;
  }
  .informationNotify {
    border-radius: 7px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    background-color: #ffffff;
  }
  .v-dialog {
    padding: 0px;
    margin: 0px;
    margin-left: 35px !important;
    margin-right: 35px !important;
  }
  .txtPopUps {
    height: 114px;
    opacity: 0.85;
    font-family: Nunito;
    font-size: 13px;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.23;
    letter-spacing: normal;
    text-align: center;
    color: #182940;
  }
  .logoAlign {
    text-align : center;
  }
  .v-input input {
    max-height: 33px !important;
    font-family: Nunito !important;
    font-size: 15px !important;
    font-weight: bold !important;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.87 !important;
  }
  .v-btn__content {
    font-family: Montserrat;
    font-size: 13px;
    font-weight: bold !important;
    font-stretch: normal;
    font-style: normal;
    line-height: 2.15 !important;
    letter-spacing: normal;
    text-align: center;
    color: #ffffff !important;
  }
  .invalidOtp {
    height: 15px;
    font-family: Montserrat !important;;
    font-size: 13px !important;;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.23;
    letter-spacing: normal;
    text-align: center;
    color: #db4d3d !important;;
  }
  .v-btn {
    margin: 0px !important;
    margin-left: 6px !important;
  }
  .errorTxt {
    height: 18px !important;
    font-family: Nunito !important;
    font-size: 13px !important;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.38;
    letter-spacing: normal;
    text-align: left;
    color: #ff4646 !important;
  }
  .timerCls {
    height: 17px;
    font-family: Montserrat !important;
    font-size: 14px !important;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.29;
    letter-spacing: normal;
    text-align: center;
    color: #5e5e5e;
  }
  .v-expansion-panel__container--active .toggleTxt {
    color: #00acf0 !important;
  }
  .theme--light.v-expansion-panel .v-expansion-panel__container--active
  .v-expansion-panel__header .v-expansion-panel__header__icon .v-icon {
    color: #00acf0 !important;
  }
  .v-expansion-panel__container--active {
    border-left: 3px solid #00acf0;
  }
  @media screen and (max-width: 481px) {
    .VueCarousel-navigation {
      display: none;
    }
  }
</style>
