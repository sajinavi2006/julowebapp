<template>
  <v-app>
    <v-toolbar
      app
      dark
      extended
      :class="{ toolbar:true, bgToolbar: !isBackgroundTransparent && !isEligibilityHeader && !isOtpHeader,
      bgTransparent: isBackgroundTransparent,
      slider:true, closed: !showToolbar, bgEligible:isEligibilityHeader || isOtpHeader }"
    >
      <img src="./assets/Julo-logo-bank.png" style="height: 130%" v-show="!isSubPage && !isOtpHeader" />
      <div v-show="isOtpHeader">

          <v-btn flat icon @click="redirectToCheckEligibility()">
            <v-icon>arrow_back</v-icon>
          </v-btn>

        <div
          style="font-size:16px; display:inline; padding-left:20px; vertical-align:sub;"
        >{{isOtpHeader.text}}</div>
      </div>
      <div v-show="isEligibilityHeader" style="width:100%;">
        <div
         class="elgCls"
        >{{isEligibilityHeader.text}}</div>
      </div>
    </v-toolbar>

    <v-content style="padding:0px;">
      <div>
        <router-view
          @makeBgTransparent="backgroundTransparent"
          @makeIsEligibilityPage="eligibilityHeader"
          @makeIsOtpPage="otpHeader"
          @makeisSubPage="subPage"
          class="content"
        />
      </div>
    </v-content>
    <v-snackbar
      :color="snackbar.color"
      v-model="snackbar.display"
      :bottom="true"
      :right="true"
      :timeout="6000"
    >
      {{ snackbar.text }}
      <v-btn color="white" flat @click="snackbar.display = false">Tutup</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import ClickOutside from "vue-click-outside";
import { mapGetters, mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "App",
  data() {
    return {
      isBackgroundTransparent: true,
      isEligibilityHeader: false,
      isOtpHeader: false,
      isSubPage: false,
      showToolbar: false,
      snackbar: {
        display: false,
        text: "",
        color: ""
      },
      isScroll: false,
      name: false,
      clearSettingDialog: false
    };
  },
  computed: { ...mapState(["error", "user", "success"]) },
  directives: { ClickOutside },
  watch: {
    error: function(err) {
      if (err.type && err.type == "location") {
        this.clearSettingDialog = true;
      } else {
        if (!err.message) {
          return;
        }
        this.snackbar.display = true;
        this.snackbar.text = err.message;
        this.snackbar.color = "error";
      }
    },
    success: function(data) {
      this.snackbar.text = data.message;
      this.snackbar.color = "success";
      this.snackbar.display = true;
    }
  },
  methods: {
    redirectToCheckEligibility: function() {
       window.location.href = "restrukturisasi";
    },
    backgroundTransparent(value) {
      this.isBackgroundTransparent = value;
    },
    eligibilityHeader(value) {
      this.isEligibilityHeader = value;
      this.subPage(false);
      this.otpHeader(false);
    },
    otpHeader(value) {
      this.isOtpHeader = value;
      //this.isEligibilityHeader(false);
      this.subPage(false);
    },
    subPage(value) {
      this.isSubPage = value;
    }
  }

};
//color: #5e5e5e;
</script>

<style>
* {
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  font-weight: 500;
  caret-color: #00acf0;
}
.bgToolbar {
  background-image: linear-gradient(to right, #00acf0 0%, #13637b 100%);
  z-index: 2;
}
.bgEligible {
  background-color: #00acf0 !important;
  z-index: 2;
}
.no-indent {
  padding: 0px !important;
}
.no-indent .dz-preview {
  margin: 0px !important;
}
.no-indent .dz-image {
  width: 75px !important;
  height: 100px !important;
}
img[data-dz-thumbnail] {
  height: 100px !important;
}
.theme--light.v-text-field--outline .v-input__slot {
  border: 1px solid rgba(189, 189, 189, 0.54) !important;
  color: blue;
}
.theme--light.v-text-field--outline:not(.v-input--is-focused)
  .v-input__slot:hover {
  border: 1px solid rgba(0, 176, 240, 0.54) !important;
}
.theme--light.v-text-field--outline.v-input--is-focused .v-input__slot {
  border: 1px solid rgba(0, 176, 240, 0.54) !important;
}
.v-text-field--box input,
.v-text-field--outline input {
  margin-top: 0px !important;
}
.v-text-field--box .v-input__slot,
.v-text-field--outline .v-input__slot {
  min-height: 20px !important;
}
.v-input__slot {
  margin-bottom: 0px !important;
}
.v-input input {
  max-height: 32px !important;
  font-size: 12px !important;
}
.v-text-field.v-text-field--enclosed .v-input__append-inner,
.v-text-field.v-text-field--enclosed .v-input__append-outer,
.v-text-field.v-text-field--enclosed .v-input__prepend-inner,
.v-text-field.v-text-field--enclosed .v-input__prepend-outer {
  margin-top: 6px !important;
}
.v-input--selection-controls {
  margin-top: 0px !important;
}
.v-input--radio-group .v-radio:not(:last-child):not(:only-child) {
  margin-bottom: 0px;
}
.v-input--selection-controls.v-input .v-label {
  font-size: 12px !important;
}
.v-textarea.v-text-field--box .v-text-field__prefix,
.v-textarea.v-text-field--box textarea,
.v-textarea.v-text-field--enclosed .v-text-field__prefix,
.v-textarea.v-text-field--enclosed textarea {
  margin-top: 0px !important;
}
.v-text-field--outline.v-input--is-dirty .v-text-field__prefix,
.v-text-field--outline.v-input--is-focused .v-text-field__prefix,
.v-text-field--outline.v-text-field--placeholder .v-text-field__prefix {
  margin-top: 0px !important;
}
.v-select.v-text-field--enclosed:not(.v-text-field--single-line)
  .v-select__selections {
  padding-top: 0px !important;
}
.v-list__tile__title {
  font-size: 12px !important;
}
.v-select__selection {
  font-size: 12px !important;
  color: #5e5e5e !important;
}
.dropzone .dz-message {
  margin: 5px !important;
}
.dropzone {
  min-height: 100px;
}
.theme--light.v-input--slider .v-slider__ticks {
  color: white !important;
}
.v-input--slider {
  margin-top: 2px !important;
}
.v-btn {
  text-transform: none !important;
  padding: 0px !important;
  display: inline !important;
}
.v-btn__content {
  width: 100% !important;
  height: 100% !important;
  white-space: pre-wrap !important; /* css-3 */
  white-space: -moz-pre-wrap !important; /* Mozilla, since 1999 */
  white-space: -pre-wrap !important; /* Opera 4-6 */
  white-space: -o-pre-wrap !important; /* Opera 7 */
  word-wrap: break-word !important; /* Internet Explorer 5.5+ */
}
.toolbar {
  -webkit-box-shadow: none;
  box-shadow: none;
  /* border-bottom: 1px solid #e0e0e0; */
}
.v-text-field .v-counter {
  margin-left: 0px;
  margin-top: 5px;
}
.v-text-field__details {
  text-align: right;
  display: inline;
}
.v-messages {
  display: none;
}
.theme--light.v-input:not(.v-input--is-disabled) input,
.theme--light.v-input:not(.v-input--is-disabled) textarea {
  color: #5e5e5e !important;
}
.theme--dark.v-stepper {
  background: rgba(250, 250, 250);
}

.theme--light.v-stepper .v-stepper__label {
  color: #bdbdbd;
}
.theme--light.v-stepper .v-stepper__step--complete .v-stepper__label {
  color: white;
}
.theme--light.v-stepper .v-stepper__header .v-divider {
  color: white;
  border-color: white;
}
.theme--light.v-stepper .v-stepper__step__step,
.theme--light.v-stepper .v-stepper__step__step .v-icon {
  background-color: white !important;
  color: #00acf0;
}
.theme--light.v-stepper
  .v-stepper__step:not(.v-stepper__step--active):not(.v-stepper__step--complete):not(.v-stepper__step--error)
  .v-stepper__step__step {
  background-color: #eeeeee !important;
  color: #1f88d1;
}

@media only screen and (max-width: 959px) {
  .v-stepper:not(.v-stepper--vertical) .v-stepper__label {
    display: inline-block;
  }
}
.v-toolbar__extension {
  height: 1px !important;
}
.v-toolbar__content {
  height: 48px !important;
}

.bigBtn {
  height: 50px;
}
.primaryColor {
  color: #00acf0;
}
.textHeader {
  padding-top: 50px;
  padding-left: 15px;
  background-color: #ffffff;
  color: #5e5e5e;
}
.center {
  margin: auto;
  padding-bottom: 30px;
  padding-right: 12px;
}
.errorInput {
  color: #d52b2b;
  font-size: 10px !important;
  /* height: 12px; */
  margin-bottom: 5px;
}
.errorInput span {
  color: #d52b2b;
  font-size: 10px !important;
  /* height: 12px; */
  margin-bottom: 5px;
}
.theme--dark.v-counter {
  width: 100% !important;
}
.error--text {
  color: #d52b2b !important;
  caret-color: #d52b2b !important;
}
.textCenter {
  text-align: center;
}
.v-select__slot {
  height: 36px !important;
}
.v-text-field__prefix {
  color: #5e5e5e;
  width: 25px !important;
}
.v-text-field__suffix {
  color: #5e5e5e;
}
.otpIphoneText {
  width: 93%;
}
.color1 {
  background-image: linear-gradient(to bottom right, #00acf0 0%, #1f88d1 100%);
}
.color2 {
  background-image: linear-gradient(to bottom right, #1f88d1 0%, #3e63b1 100%);
}

/* rgb(95,59,142, .5)
rgb(135,65,116, .5) */

.color3 {
  background-image: linear-gradient(to bottom right, #3e63b1 0%, #5f3b8e 100%);
}
.color4 {
  background-image: linear-gradient(to bottom right, #5f3b8e 0%, #874174 100%);
}
.color5 {
  background-image: linear-gradient(to bottom right, #874174 0%, #b14758 100%);
}
.color6 {
  background-image: linear-gradient(to bottom right, #b14758 0%, #db4d3d 100%);
}
.color7 {
  background-image: linear-gradient(to bottom right, #00acf0 0%, #3e63b1 100%);
}
.color8 {
  background-image: linear-gradient(to right, #00acf0, #1f88d1);
}
.color13 {
  background-image: linear-gradient(to bottom right, #00acf0 0%, #5f3b8e 100%);
}
.colorbutton {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  background-image: linear-gradient(99deg, #00acf0, #0b80a9);
}
.labelInput {
  color: #00acf0;
  text-transform: capitalize;
}
.labelInput[word="per"] {
  text-transform: lowercase;
}
.divBlock {
  color: #5e5e5e;
  margin-top: 10px;
  display: block;
  font-size: 14px;
  margin-bottom: 10px;
}
.textHeader {
  padding-top: 50px;
  padding-left: 15px;
  background-color: #ffffff;
  color: #5e5e5e;
}
.center {
  margin: auto;
  padding-bottom: 30px;
  padding-right: 12px;
}
.errorInput {
  color: #d52b2b;
  font-size: 10px !important;
  /* height: 12px; */
  margin-bottom: 5px;
}
.errorInput span {
  color: #d52b2b;
  font-size: 10px !important;
  /* height: 12px; */
  margin-bottom: 5px;
}
.theme--dark.v-counter {
  width: 100% !important;
}
.error--text {
  color: #d52b2b !important;
  caret-color: #d52b2b !important;
}
.textCenter {
  text-align: center;
}
.v-select__slot {
  height: 36px !important;
}
.v-text-field__prefix {
  color: #5e5e5e;
  width: 25px !important;
}
.v-text-field__suffix {
  color: #5e5e5e;
}
.otpIphoneText {
  width: 93%;

  text-align: center;
}
.otpIphoneText input[type="text"] {
  letter-spacing: 1em;
  font-size: 23px !important;
  text-align: center;
}
.v-text-field.v-text-field--enclosed .v-text-field__details {
  margin-bottom: 3px !important;
}
</style>
<style scoped>
.verticalLine {
  width: 2px;
  background-color: #d3d3d3;
  height: 20px;
  float: left;
}
.bgTransparent {
  background: rgba(255, 255, 255, 0);
  z-index: 2;
}
.expandToolbar {
  height: 200px;
}
.slider {
  overflow-y: hidden;
  max-height: 500px; /* approximate max height */
  height: 200px;
  transition-property: all;
  transition-duration: 0.5s;
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}
.slider.closed {
  max-height: 50px;
}
.elgCls {
  font-family: Montserrat;
  font-size: 12px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.5;
  letter-spacing: normal;
  text-align: right;
  color: #ffffff;
}
</style>
