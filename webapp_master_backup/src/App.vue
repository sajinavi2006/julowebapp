<template>
  <v-app>
    <!-- <v-navigation-drawer
      persistent
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
      v-if="isMobile"
    >
      <v-list>
        <v-list-tile value="true" v-for="(item, i) in items" :key="i">
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>-->
    <!-- style="background: rgba(255, 255, 255, 0.0); color: white;" -->
    <!-- style="background-image: linear-gradient(to right, #00ACF0 0%, #13637B 100%);" -->
    <v-toolbar
      app
      dark
      extended
      v-if="!isBoostHeader"
      :class="{ toolbar:true, bgToolbar: !isBackgroundTransparent && !isEligibilityHeader && !isOtpHeader,
      bgTransparent: isBackgroundTransparent,
      slider:true, closed: !showToolbar, bgEligible:isEligibilityHeader || isOtpHeader }"
    >
      <img src="./assets/Julo-logo-bank.png" style="height: 130%" v-show="!isSubPage && !isOtpHeader && !isBoostHeader" />
      <div v-show="isSubPage">
        <router-link tag="div" :to="`/${isSubPage.url}`" style="display:inline;">
          <j-btn flat icon>
            <v-icon>arrow_back</v-icon>
          </j-btn>
        </router-link>
        <div
          style="font-size:16px; display:inline; padding-left:20px; vertical-align:sub;"
        >{{isSubPage.text}}</div>
      </div>
      <div v-show="isOtpHeader">

          <j-btn flat icon @click="redirectToCheckEligibility()">
            <v-icon>arrow_back</v-icon>
          </j-btn>

        <div
          style="font-size:16px; display:inline; padding-left:20px; vertical-align:sub;"
        >{{isOtpHeader.text}}</div>
      </div>
      <div v-show="isEligibilityHeader" style="width:100%;">
        <div
         class="elgCls"
        >{{isEligibilityHeader.text}}</div>
      </div>

      <v-spacer></v-spacer>
      <!-- <v-list>

      <v-list-group
        value="true"
        no-action
      >
        <v-list-tile slot="activator">
          <v-icon dark>reorder</v-icon>
        </v-list-tile>

        <v-list-tile>
            <v-list-tile-title v-text="'sdfdsfsdf'"></v-list-tile-title>
            <v-list-tile-action>
              <v-icon v-text="'dfdsfsdfs'"></v-icon>
            </v-list-tile-action>
          </v-list-tile>
      </v-list-group>
      </v-list>-->
      <v-toolbar-side-icon @click.stop="showToolbar = !showToolbar"
      v-if="isMobile && !isEligibilityHeader && !isOtpHeader && !isBoostHeader"></v-toolbar-side-icon>
      <v-toolbar-items v-if="!isMobile && !isEligibilityHeader && !isOtpHeader && !isBoostHeader">
        <!-- <j-btn flat>Beranda</j-btn>
        <j-btn flat>Produk</j-btn>
        <j-btn flat>Tentang</j-btn>
        <j-btn flat>Blog</j-btn>
        <j-btn flat>FAQ</j-btn>-->

        <j-btn flat>
          <a
            href="https://go.onelink.me/zOQD/93d068ac"
            style="color: white; text-decoration: none;"
          >Download</a>
        </j-btn>

        <div style="width:230px;" v-if="isEmpty(user)">
          <div style="margin-top:17px;">
            <div class="verticalLine" style="height: 30px;"></div>
          </div>

          <j-btn outline style="margin-right:20px; margin-left:20px; height: 30px;">
            <router-link
              tag="div"
              to="/signin"
              style="width: 100%; height:100%; padding-top:5px;"
            >Masuk</router-link>
          </j-btn>
          <j-btn color="white" style="color:#00ACF0; height: 30px;">
            <router-link
              tag="div"
              to="/signup"
              style="width: 100%;  height:100%; padding-top:5px;"
            >Daftar</router-link>
          </j-btn>
        </div>
        <v-layout text-xs-center v-else>
          <v-flex xs8>
            <div style="margin-top:13px;">
              <strong>Hi {{user.fullname}}!</strong>
            </div>
          </v-flex>
          <v-flex x4>
            <v-menu transition="slide-y-transition" bottom>
              <j-btn flat icon slot="activator">
                <v-icon>more_horiz</v-icon>
              </j-btn>
              <v-card width="250" height="110">
                <div style="padding-top:10px;padding-bottom:10px;text-align: center;">
                  <div>{{user.fullname? user.fullname : user.email }}</div>
                  <div>
                    <small>{{user.email}}</small>
                  </div>
                </div>
                <v-divider></v-divider>
                <div style="margin-left:75px;">
                  <j-btn flat small @click="logout">Keluar</j-btn>
                </div>
              </v-card>
            </v-menu>
          </v-flex>
        </v-layout>
      </v-toolbar-items>
      <!-- v-click-outside="showToolbar=false" -->
      <!--  :class="{slider: true, closed:!showToolbar}" -->
      <!-- transition="fade-transition" -->
      <div slot="extension" style="height:1px; width:100%" v-show="showToolbar">
        <!-- <j-btn flat block href="https://www.julo.co.id/">Beranda</j-btn>
        <j-btn flat block href="https://www.julo.co.id/">Produk</j-btn>
        <j-btn flat block href="https://www.julo.co.id/">Tentang</j-btn>
        <j-btn flat block href="https://www.julo.co.id/">Blog</j-btn>
        <j-btn flat block>FAQ</j-btn>-->
        <a href="https://go.onelink.me/zOQD/93d068ac" style="height: 45px;">
          <j-btn flat block>Download</j-btn>
        </a>

        <v-divider dark></v-divider>

        <v-layout style="padding-top: 10px;" text-xs-center v-if="isEmpty(user)">
          <v-flex xs6>
            <j-btn
              outline
              style="margin-right:20px; margin-left:20px; height: 30px;"
              @click="showToolbar=false"
            >
              <router-link tag="div" to="/signin" style="width: 100%;">Masuk</router-link>
            </j-btn>
          </v-flex>
          <v-flex xs6>
            <j-btn color="white" style="color:#00ACF0; height: 30px;" @click="showToolbar=false">
              <router-link tag="div" to="/signup" style="width: 100%;">Daftar</router-link>
            </j-btn>
          </v-flex>
        </v-layout>
        <div v-else style="padding-top:10px;padding-bottom:10px;">
          <div class="textCenter">{{user.fullname}}</div>
          <div class="textCenter">
            <small>{{user.email}}</small>
          </div>
          <v-divider></v-divider>
          <j-btn flat block @click="logout">Keluar</j-btn>
        </div>
      </div>
    </v-toolbar>
    <!--style="padding-top:32px;"-->
    <v-content style="padding:0px;">
      <div>
        <router-view
          @makeBgTransparent="backgroundTransparent"
          @makeIsBoostPage="boostHeader"
          @makeIsEligibilityPage="eligibilityHeader"
          @makeIsOtpPage="otpHeader"
          @makeBgExpand="backgroundExpand"
          @makeisSubPage="subPage"
          class="content"
          @hook:mounted="pageMounted"
          @hook:destroyed="pageDestroyed"
          @hook:beforeMount="pageBeforeMount"
          @hook:beforeDestroy="pageBeforeDestroy"
        />
      </div>
    </v-content>
    <!-- <v-navigation-drawer temporary :right="right" v-model="rightDrawer" v-if="isMobile" app>
      <v-list>
        <v-list-tile @click="right = !right">
          <v-list-tile-action>
            <v-icon>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>-->
    <v-footer :fixed="false" v-if="false" app>
      <span>&copy; 2017</span>
    </v-footer>

    <div class="vld-parent">
      <loading
        :active.sync="isLoading"
        loader="spinner"
        color="#00ACF0"
        :width="60"
        :height="60"
        :opacity="0.7"
        is-full-page
      ></loading>
    </div>

    <v-snackbar
      :color="snackbar.color"
      v-model="snackbar.display"
      :bottom="true"
      :right="true"
      :timeout="6000"
    >
      {{ snackbar.text }}
      <j-btn color="white" flat @click="snackbar.display = false">Tutup</j-btn>
    </v-snackbar>

    <!--dialog clear location setting-->
    <v-layout row justify-center>
      <v-flex xs12 sm8 md6 offset-xs0 offset-sm2 offset-md3>
        <v-dialog v-model="clearSettingDialog" persistent width="400">
          <v-card>
            <v-card-text>
              <div
                style="text-align: center; width: 100%; margin-bottom:30px; margin-top:30px;"
              >Untuk melajutkan pengajuan, Anda harus menghapus situs data browser anda dan Ijinkan Kami mengakses lokasi Anda</div>
              <div v-if="browser == 'chrome'" style="margin-bottom:30px;">
                <div v-if="os=='android'">
                  <ol>
                    <li>
                      Klik tombol dengan gambar
                      <img
                        src="./assets/websetting.png"
                        style="height: 18px;"
                      /> di atas kanan
                    </li>
                    <li>Klik `Setelan`</li>
                    <li>Klik `Setelan Situs`</li>
                    <li>Klik `Semua Situs`</li>
                    <li>Cari dan Pilih `app.julo.co.id`</li>
                    <li>Klik tombol `Hapus & Setel Ulang`</li>
                    <li>Klik tombol `Hapus & Setel Ulang` lagi</li>
                    <li>Refresh halaman website</li>
                    <li>Klik `Izinkan`</li>
                  </ol>
                </div>

                <div v-else-if="os=='ios'">
                  <ol>
                    <li>
                      Klik tombol dengan gambar
                      <img
                        src="./assets/websetting.png"
                        style="height: 18px;"
                      /> di atas kanan
                    </li>
                    <li>Klik `Setelan`</li>
                    <li>Klik `Privasi`</li>
                    <li>Klik `Hapus Browsing Data`</li>

                    <li>Centang `Cookies, Site Data`</li>
                    <li>Klik `Hapus Browsing Data`</li>
                    <li>Klik `Hapus Browsing Data`</li>
                    <li>Refresh halaman website</li>
                    <li>Klik `Izinkan`</li>
                  </ol>
                </div>
                <div v-else>
                  <ol>
                    <li>
                      Klik tombol dengan gambar
                      <img
                        src="./assets/block-location.png"
                        style="width: 20px;"
                      /> di atas kanan
                    </li>
                    <li>Klik `Clear these settings for future visits`</li>
                    <li>Refresh halaman website</li>
                    <li>Klik `Izinkan`</li>
                  </ol>
                </div>
              </div>

              <j-btn block large class="color8" dark @click="clearSettingDialog=false">Mengerti</j-btn>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
    <!--dialog clear location setting-->
  </v-app>
</template>

<script>
import MobileDetect from "mobile-detect";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import ClickOutside from "vue-click-outside";
import Bowser from "bowser";

import { mapGetters, mapState, mapMutations, mapActions } from "vuex";
import _ from "lodash";
import navlog from "./helper/navlog";
import enums from "./enums";
import { setTimeout } from "timers";
import { form } from "./enums/url";
const { types } = enums;
const md = new MobileDetect(window.navigator.userAgent);
const browser = Bowser.parse(window.navigator.userAgent);
export default {
  name: "App",
  data() {
    return {
      isBackgroundTransparent: true,
      isBoostHeader: false,
      isBackgroundTransparentDefault: true,
      isBackgroundExpand: false,
      isEligibilityHeader: false,
      isOtpHeader: false,
      isSubPage: false,
      //drawer: false,
      isMobile: md.mobile() || md.tablet(),
      // items: [
      //   {
      //     icon: "bubble_chart",
      //     title: "Inspire"
      //   }
      // ],
      // miniVariant: false,
      // right: true,
      //rightDrawer: false,
      showToolbar: false,
      snackbar: {
        display: false,
        text: "",
        color: ""
      },
      isLoading: false,
      isScroll: false,
      name: false,
      email: "",
      clearSettingDialog: false,
      os: browser.os.name.toLowerCase(),
      browser: browser.browser.name.toLowerCase()
    };
  },
  computed: { ...mapState(["loading", "error", "user", "success"]) },
  components: { Loading },
  directives: { ClickOutside },
  watch: {
    loading: function(newValue) {
      this.isLoading = newValue;
    },
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
    },
    // user: function(user) {
    //   coonsole.log(1111111);
    //   console.log(user);
    //   if (!_.isEmpty(user)) {
    //     this.name = user.fullname;
    //     this.email = user.email;
    //   }
    // },
    isMobile: function(mode) {
      if (mode) {
        this.isBackgroundTransparent = false;
      }
    },
    $route: function(to, from) {
      this.isLoading = true;
      this.fromRoute = from.name;
      if (
        to.name !== "form1" ||
        to.name !== "form2" ||
        to.name !== "form3" ||
        to.name !== "form4"
      ) {
        this.subPage(false);
      }
      history.pushState(null, null, location.href);
      window.onpopstate = function() {
        history.go(1);
      };
    }
  },
  methods: {
    ...mapActions(["sendNavlog"]),
    ...mapMutations([types.ACTIVATE_LOADING, types.LOGOUT,types.DEACTIVATE_LOADING]),
    changeLoading: function() {
      //this[types.ACTIVATE_LOADING]();
    },
    redirectToCheckEligibility: function() {
       window.location.href = "restrukturisasi";
    },
    isEmpty: function(data) {
      return _.isEmpty(data);
    },
    logout: function() {
      this[types.LOGOUT]();
      this.showToolbar = false;
      this.$router.push({ name: "signIn" });
    },
    backgroundTransparent(value) {
      this.isBackgroundTransparent = value;
      this.isBackgroundTransparentDefault = value;
    },
    boostHeader(value) {
      this.isBoostHeader = value;
      this.subPage(false);
    },
    backgroundExpand(value) {
      this.isBackgroundExpand = value;
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
    },
    // buttonClicked(value){
    //   console.log(11111111111)
    //   console.log(value)
    // },
    async updateScroll() {
      if (!this.isScroll) {
        this.isScroll = true;
        setTimeout(async () => {
          this.$navlog.scrollNavlog(
            this.$route.name,
            window.scrollY,
            document.body["scrollHeight"],
            document.documentElement["clientHeight"]
          );
          let navlogData = JSON.parse(localStorage.navlog);

          if (navlogData.length > 10) {
            await this.sendNavlog(navlogData);
          }
          this.isScroll = false;
        }, 500);
      }

      if (
        !this.isMobile &&
        !this.isSubPage &&
        this.isBackgroundTransparentDefault
      ) {
        this.isBackgroundTransparent = window.scrollY <= 100;
      }
    },
    saveNavlog: function(action) {
      // const navlog = localStorage.navlog ? JSON.parse(localStorage.navlog) : [];
      // navlog.push({
      //   page: this.$route.name,
      //   type
      // })
      // localStorage.navlog = JSON.stringify(navlog);
    },
    pageMounted: async function() {
      //this.saveNavlog('Screen opened');
      const obj = navlog.mappingObj(this.$route.name, "Screen opened");
      navlog.save(obj);
      let navlogData = JSON.parse(localStorage.navlog);
      if (navlogData.length >= 10) {
        await this.sendNavlog(navlogData);
      }

      this.$nextTick(() => {
        this[types.DEACTIVATE_LOADING]();
      });
    },
    pageDestroyed: async function() {
      // let navlogData = localStorage.navlog
      //   ? JSON.parse(localStorage.navlog)
      //   : [];
      // // const page =
      // //   this.fromRoute.length > 0 ? this.fromRoute : this.$route.name;
      // const obj = navlog.mappingObj(
      //   this.fromRoute || this.$route.name,
      //   "Screen closed"
      // );
      // navlogData.push(obj);

      // console.log(7777777);
      // if (navlogData.length > 10) {
      //   const result = await this.sendNavlog(navlogData);
      //   if (result) {
      //     navlogData = [];
      //   }
      // }
      // localStorage.navlog = JSON.stringify(navlogData);

      const obj = this.$navlog.mappingObj(
        this.fromRoute || this.$route.name,
        "Screen closed"
      );
      this.$navlog.save(obj);
      let navlogData = JSON.parse(localStorage.navlog);
      await this.sendNavlog(navlogData);
    },
    pageBeforeDestroy: function() {
      this[types.ACTIVATE_LOADING]();
    },
    pageBeforeMount: function() {}
  },
  beforeMount() {
    //this.isMobile = true;
  },
  mounted() {
    window.addEventListener("scroll", this.updateScroll);
    // console.log(document.getElementsByClassName("v-dialog--active"));
    // document
    //   .getElementsByClassName("v-dialog--active")[0]
    //   .addEventListener("scroll", this.updateScroll);
    if (this.isMobile) {
      this.isBackgroundTransparent = false;
    }
    this.$vuetify.theme.error = "#d52b2b";
  },
  created() {
    window.addEventListener("beforeunload", async () => {
      await this.pageDestroyed();
    });
    history.pushState(null, null, location.href);
    window.onpopstate = function() {
      history.go(1);
    };
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
/* .v-input__control {
  height: 40px;
} */
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
.table-footer-props > .v-table__overflow > .v-datatable > tfoot {
  background-color: #f7f7f7;
}
.table-props  > .v-table__overflow > .v-table {
  background-color: transparent;
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
.tick-label-color span {
  font-size: 18px;
  font-weight: bold;
  color: black;
}
.btn-continue > .v-btn__content {
  font-size: 14px;
  font-weight: bold;
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
.j-btn__content {
  white-space: normal;
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
.header {
  height: 300px;
  width: 100%;
  background: linear-gradient(
      to right,
      rgb(31, 136, 209, 0.7) 0%,
      rgb(62, 99, 177, 0.7) 100%
    ),
    url("./assets/Header Image/Form.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
}
.header2 {
  height: 300px;
  width: 100%;
  background: linear-gradient(
      to right,
      rgb(62, 99, 177, 0.7) 0%,
      rgb(95, 59, 142, 0.7) 100%
    ),
    url("./assets/Header Image/Form.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
}
.header2 {
  height: 300px;
  width: 100%;
  background: linear-gradient(
      to right,
      rgb(95, 59, 142, 0.7) 0%,
      rgb(135, 65, 116, 0.7) 100%
    ),
    url("./assets/Header Image/Form.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
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
/* height: 380px; */
</style>
