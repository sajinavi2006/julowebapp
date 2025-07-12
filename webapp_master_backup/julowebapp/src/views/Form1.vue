<template>
  <div class="textHeader">
    <v-container grid-list-xl>
      <v-layout row>
        <v-flex xs12 sm8 md6 offset-xs0 offset-sm2 offset-md3>
          <div class="center">
            <form data-vv-scope="personalDataForm">
              <span class="divBlock">Identitas Diri</span>

              <label class="labelInput">Foto KTP</label>
              <img
                :src="fotoKtp.src"
                v-if="fotoKtp.editMode === false"
                @click="changeKTPDialog=true"
                style="width:200px;display: block; margin-left: auto; margin-right: auto;"
              />

              <vue-dropzone
                v-else
                :options="dropzoneOptions"
                id="dropzonefotoktp"
                ref="dropzonefotoktp"
                class="smallPadding"
                useCustomSlot
                @vdropzone-file-added="dropZoneFileAdded"
                @vdropzone-error="dropZoneErr"
                @vdropzone-removed-file="dropZoneRemove"
                @vdropzone-drop="dropZoneDrop"
              >
                <div class="dropzone-custom-content" @click="dropZoneClick">
                  <v-icon x-large>cloud_upload</v-icon>
                  <h4 class="dropzone-custom-title">Drag and drop</h4>atau
                  <div>Klik untuk memilih file dari komputer Anda</div>
                </div>
              </vue-dropzone>

              <div v-show="fotoKtp.src && !fotoKtp.editMode">
                <div
                  class="buttonNext"
                >Pastikan Informasi yang Anda masukan sesuai dengan Informasi yang tertera pada KTP Anda</div>

                <label class="labelInput">Nomor KTP</label>
                <v-text-field outline v-model="personalData.nik" readonly></v-text-field>

                <label class="labelInput">Nama Lengkap</label>
                <v-text-field
                  @keypress="checkValidName"
                  autofocus
                  outline
                  data-vv-delay="300"
                  v-validate="'required'"
                  v-model="personalData.name"
                  :error-messages="errors.collect('Nama Lengkap')"
                  placeholder="Nama Lengkap"
                  data-vv-name="Nama Lengkap"
                  required
                  id="name"
                  style="text-transform: capitalize;"
                  @input="e=> checkValidNamePaste('name', e)"
                ></v-text-field>
                <div class="errorInput">
                  <span>{{ errors.first(`personalDataForm.${'Nama Lengkap'}`) }}</span>
                </div>

                <!-- <label class="labelInput">Tempat Lahir</label>
                <v-autocomplete
                  @keypress="checkValidName"
                  :search-input.sync="personalData.birthPlaceSearch"
                  :items="birthPlace"
                  placeholder="Tempat Lahir"
                  v-model="personalData.birthPlace"
                  outline
                  v-validate="'required'"
                  :error-messages="errors.collect('Tempat Lahir')"
                  data-vv-name="Tempat Lahir"
                  required
                  :menu-props="{ closeOnClick:true, closeOnContentClick:true }"
                  id="birthPlace"
                >
                  <template slot="no-data">
                    <v-list-tile @click="selectNoDataBirthPlace">
                      <v-list-tile-title>{{personalData.birthPlaceSearch}}</v-list-tile-title>
                    </v-list-tile>
                  </template>
                </v-autocomplete>
                <div class="errorInput">
                  <span>{{ errors.first(`personalDataForm.${'Tempat Lahir'}`) }}</span>
                </div>-->

                <label class="labelInput">Tanggal Lahir</label>
                <v-menu
                  ref="menuDob"
                  :close-on-content-click="false"
                  v-model="menuDob"
                  :return-value.sync="dob"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <v-text-field
                    outline
                    slot="activator"
                    v-model="personalData.formatedDob"
                    append-icon="event"
                    readonly
                    v-validate="'required'"
                    :error-messages="errors.collect('Tanggal Lahir')"
                    placeholder="DD/MM/YYYY"
                    data-vv-name="Tanggal Lahir"
                    required
                    id="dob"
                  ></v-text-field>
                  <v-date-picker
                    ref="dobpicker"
                    v-model="personalData.dob"
                    @input="$refs.menuDob.save(dob)"
                    min="1950-01-01"
                    :max="moment().format('YYYY-MM-DD')"
                  ></v-date-picker>
                </v-menu>
                <div class="errorInput">
                  <span>{{ errors.first(`personalDataForm.${'Tanggal Lahir'}`) }}</span>
                </div>

                <label class="labelInput">Jenis Kelamin</label>
                <v-radio-group
                  row
                  v-model="personalData.sex"
                  class="marginBottom"
                  v-validate="'required'"
                  :error-messages="errors.collect('Jenis Kelamin')"
                  data-vv-name="Jenis Kelamin"
                >
                  <v-radio color="#00acf0" label="Pria" value="1"></v-radio>
                  <v-radio color="#00acf0" label="Wanita" value="2"></v-radio>
                </v-radio-group>
                <div class="errorInput">
                  <span>{{ errors.first(`personalDataForm.${'Jenis Kelamin'}`) }}</span>
                </div>

                <!-- <label class="labelInput">Bahasa lain yang digunakan</label>
                <j-select
                  class="marginBottom"
                  :items="languages"
                  item-text="name"
                  item-value="name"
                  placeholder="Bahasa lain yang digunakan"
                  v-model="personalData.language"
                  outline
                  v-validate="'required'"
                  :error-messages="errors.collect('Bahasa lain yang digunakan')"
                  data-vv-name="Bahasa lain yang digunakan"
                  required
                  id="language"
                ></j-select>
                <div class="errorInput">
                  <span>{{ errors.first(`personalDataForm.${'Bahasa lain yang digunakan'}`) }}</span>
                </div>-->

                <span class="divBlock" id="biodata">Informasi Domisili</span>

                <label class="labelInput">
                  Alamat tempat tinggal saat ini
                  <v-tooltip right color="rgba(0, 0, 0, 0.3)">
                    <template v-slot:activator="{ on }">
                      <v-icon small color="#00acf0" v-on="on">info</v-icon>
                    </template>
                    <span
                      style="font-size: 10px;"
                    >Anda dapat memasukan kode pos untuk pengisian otomatis</span>
                  </v-tooltip>
                </label>
                <v-layout wrap style="padding:0px;">
                  <v-flex xs12 class="paddingBottomZero">
                    <v-text-field
                      outline
                      v-model="personalData.alamat"
                      placeholder="Alamat"
                      id="alamat"
                      v-validate="'required'"
                      :error-messages="errors.collect('Alamat')"
                      data-vv-name="Alamat"
                      required
                    ></v-text-field>
                    <div class="errorInput">
                      <span>{{ errors.first(`personalDataForm.${'Alamat'}`) }}</span>
                    </div>
                  </v-flex>
                  <v-flex xs6 class="paddingBottomZero">
                    <j-select
                      :items="provinces"
                      placeholder="Provinsi"
                      v-model="personalData.province"
                      outline
                      v-validate="'required'"
                      :error-messages="errors.collect('Provinsi')"
                      data-vv-name="Provinsi"
                      required
                      @change="filterRegency"
                      id="province"
                    ></j-select>
                    <div class="errorInput">
                      <span>{{ errors.first(`personalDataForm.${'Provinsi'}`) }}</span>
                    </div>
                  </v-flex>
                  <v-flex xs6 class="paddingBottomZero">
                    <j-select
                      :items="regencies"
                      placeholder="Kabupaten"
                      v-model="personalData.regency"
                      outline
                      v-validate="'required'"
                      :error-messages="errors.collect('Kabupaten')"
                      data-vv-name="Kabupaten"
                      required
                      @change="filterVillage"
                      id="regency"
                    ></j-select>
                    <div class="errorInput">
                      <span>{{ errors.first(`personalDataForm.${'Kabupaten'}`) }}</span>
                    </div>
                  </v-flex>
                  <v-flex xs6 class="paddingBottomZero">
                    <j-select
                      :items="villages"
                      placeholder="Kecamatan"
                      v-model="personalData.village"
                      outline
                      v-validate="'required'"
                      :error-messages="errors.collect('Kecamatan')"
                      data-vv-name="Kecamatan"
                      required
                      @change="filterSubdistrict"
                      id="village"
                    ></j-select>
                    <div class="errorInput">
                      <span>{{ errors.first(`personalDataForm.${'Kecamatan'}`) }}</span>
                    </div>
                  </v-flex>
                  <v-flex xs6 class="paddingBottomZero">
                    <j-select
                      :items="subdistricts"
                      placeholder="Kelurahan"
                      v-model="personalData.subdistrict"
                      outline
                      v-validate="'required'"
                      :error-messages="errors.collect('Kelurahan')"
                      data-vv-name="Kelurahan"
                      required
                      @change="filterPostalcode"
                      id="subdistrict"
                    ></j-select>
                    <div class="errorInput">
                      <span>{{ errors.first(`personalDataForm.${'Kelurahan'}`) }}</span>
                    </div>
                  </v-flex>

                  <v-flex xs12 class="paddingBottomZero">
                    <v-text-field
                      outline
                      v-model="personalData.postalcode"
                      placeholder="Kode Pos"
                      @keypress="checkNumber"
                      @input="checkKodePos"
                      data-vv-name="Kode Pos"
                      v-validate="'required|numeric'"
                      :error-messages="errors.collect('Kode Pos')"
                      id="postalcode"
                    ></v-text-field>
                    <div class="errorInput">
                      <span>{{ errors.first(`personalDataForm.${'Kode Pos'}`) }}</span>
                    </div>
                  </v-flex>
                  <v-flex xs6 class="smallPadding">
                    <label class="labelInput">Ditempat Sejak</label>
                    <v-menu
                      ref="menuOccupiedSince"
                      :close-on-content-click="false"
                      v-model="menuOccupiedSince"
                      :return-value.sync="occupiedSince"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="290px"
                    >
                      <v-text-field
                        outline
                        slot="activator"
                        v-model="personalData.occupiedSinceformated"
                        append-icon="event"
                        readonly
                        placeholder="DD/MM/YYYY"
                        id="occupiedSince"
                        required
                        v-validate="'required'"
                        :error-messages="errors.collect('Ditempat Sejak')"
                        data-vv-name="Ditempat Sejak"
                      ></v-text-field>
                      <v-date-picker
                        min="1950-01-01"
                        :max="moment().format('YYYY-MM-DD')"
                        v-model="personalData.occupiedSince"
                        @input="$refs.menuOccupiedSince.save(occupiedSince)"
                      ></v-date-picker>
                    </v-menu>
                    <div class="errorInput">
                      <span>{{ errors.first(`personalDataForm.${'Ditempat Sejak'}`) }}</span>
                    </div>
                  </v-flex>
                  <v-flex xs6 class="smallPadding">
                    <label class="labelInput">Status Domisili</label>
                    <j-select
                      :items="domicileStatus"
                      item-text="name"
                      item-value="name"
                      placeholder="Status Domisili"
                      v-model="personalData.domicileStatus"
                      outline
                      v-validate="'required'"
                      :error-messages="errors.collect('Status Domisili')"
                      data-vv-name="Status Domisili"
                      required
                      id="domicileStatus"
                    ></j-select>
                    <div class="errorInput">
                      <span>{{ errors.first(`personalDataForm.${'Status Domisili'}`) }}</span>
                    </div>
                  </v-flex>
                  <v-flex xs6 class="smallPadding">
                    <label class="labelInput">Status Sipil</label>
                    <j-select
                      :items="civilStatus"
                      item-text="name"
                      item-value="name"
                      placeholder="Status Sipil"
                      v-model="personalData.civilStatus"
                      outline
                      v-validate="'required'"
                      :error-messages="errors.collect('Status Sipil')"
                      data-vv-name="Status Sipil"
                      required
                      id="civilStatus"
                    ></j-select>
                    <div class="errorInput">
                      <span>{{ errors.first(`personalDataForm.${'Status Sipil'}`) }}</span>
                    </div>
                  </v-flex>
                  <v-flex xs6 class="smallPadding">
                    <label class="labelInput">Jumlah Tanggungan</label>
                    <j-select
                      :items="dependencyNum"
                      placeholder="Jumlah Tanggungan"
                      v-model="personalData.dependencyNum"
                      outline
                      v-validate="'required'"
                      :error-messages="errors.collect('Jumlah Tanggungan')"
                      data-vv-name="Jumlah Tanggungan"
                      required
                      id="dependencyNum"
                    ></j-select>
                    <div class="errorInput">
                      <span>{{ errors.first(`personalDataForm.${'Jumlah Tanggungan'}`) }}</span>
                    </div>
                  </v-flex>
                </v-layout>

                <span class="divBlock">Informasi Kontak Pribadi</span>

                <label class="labelInput">Nomor HP Utama</label>
                <v-layout>
                  <v-flex xs7 style="padding-bottom:0px;">
                    <!-- v-validate="'required|numeric|min:10|max:15|, regex: /\\.(js|ts)$/'"
                    -->
                    <v-text-field
                      outline
                      v-model="personalData.hpnum"
                      :error-messages="errors.collect('Nomor HP Utama')"
                      placeholder="Nomor HP Utama"
                      data-vv-name="Nomor HP Utama"
                      required
                      block
                      v-validate="{ required: true, numeric: true, min:10, max:15, regex: /^(08.*$).*/, phoneNumberDistict: this.getPhoneNumbers('hpnum', {hpnum2: personalData.hpnum2})  }"
                      @keypress="checkNumber"
                      @input="checkHp('personalData', 'Nomor HP Utama', 'hpnum')"
                      id="hpnum"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs5 style="padding-bottom:0px;">
                    <j-btn
                      depressed
                      small
                      :color="verificationActive || personalData.verified ? 'color8' : '#e5e5e5'"
                      :dark="verificationActive"
                      @click="hpVerification"
                      :disabled="!verificationActive"
                      style="margin-top:1px;float:left;"
                    >{{personalData.verified? 'Terverifikasi': 'Verifikasi'}}</j-btn>
                  </v-flex>
                </v-layout>
                <div class="errorInput">
                  <span>{{ errors.first(`personalDataForm.${'Nomor HP Utama'}`) }}</span>
                  <span>{{otpErr && !errors.has(`personalDataForm.${'Nomor HP Utama'}`) ? 'Mohon untuk mengverifikasi nomer hp utama anda' : '' }}</span>
                </div>
                <div v-if="personalData.verified">
                  <!-- @input="checkHp2('personalData', 'Nomor HP Sekunder', 'hpnum2')" -->
                  <label class="labelInput">Nomor HP Sekunder</label>
                  <v-text-field
                    outline
                    v-model="personalData.hpnum2"
                    :error-messages="errors.collect('Nomor HP Sekunder')"
                    placeholder="Nomor HP Sekunder"
                    data-vv-name="Nomor HP Sekunder"
                    @keypress="checkNumber"
                    v-validate="{ numeric: true, min:10, max:15, regex: /^(08.*$).*/, phoneNumberDistict: this.getPhoneNumbers('hpnum2', {hpnum2: personalData.hpnum})  }"
                    id="hpnum2"
                  ></v-text-field>
                  <div class="errorInput">
                    <span>{{ errors.first(`personalDataForm.${'Nomor HP Sekunder'}`) }}</span>
                  </div>
                </div>

                <label class="labelInput">Apakah anda menggunakan smartphone milik sendiri?</label>
                <v-radio-group
                  row
                  v-model="personalData.isPersonalPhone"
                  v-validate="'required'"
                  :error-messages="errors.collect('Smartphone milik sendiri')"
                  data-vv-name="Smartphone milik sendiri"
                >
                  <v-radio color="#00acf0" label="Ya" value="0"></v-radio>
                  <v-radio color="#00acf0" label="Tidak" value="1"></v-radio>
                </v-radio-group>
                <div class="errorInput">
                  <span>{{ errors.first(`personalDataForm.${'Smartphone milik sendiri'}`) }}</span>
                </div>
                <div class="buttonNext" style="margin-right:12px;">
                  <j-btn @click="saveData" color="colorbutton" block dark large>Simpan</j-btn>
                </div>
              </div>
            </form>
          </div>
        </v-flex>
      </v-layout>
    </v-container>

    <!--otp dialog-->
    <v-layout row justify-center>
      <v-dialog v-model="otpDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <!-- <j-btn slot="activator" color="primary" dark>Open Dialog</j-btn> -->
        <v-card>
          <v-toolbar
            color="elevation-0"
            style="color:#00acf0; background-color:white;padding-top:15px;padding-bottom:15px;"
          >
            <j-btn icon @click="resetOtp" style="color:#00acf0;">
              <v-icon>arrow_back</v-icon>
            </j-btn>
            <v-toolbar-title style="margin-left:20px; font-size:16px;">Masukan Kode Verifikasi</v-toolbar-title>
          </v-toolbar>

          <!-- <v-list three-line subheader>
          <v-subheader>User Controls</v-subheader>
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title>Content filtering</v-list-tile-title>
              <v-list-tile-sub-title>Set the content filtering level to restrict apps that can be downloaded</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          </v-list>-->
          <v-layout row>
            <v-flex xs12 sm8 md6 offset-xs0 offset-sm2 offset-md3>
              <div style="margin-left:30px; margin-right:20px;">
                <div>Harap masukkan kode verifikasi yang telah kami kirim ke nomor {{personalData.hpnum}} untuk melanjutkan proses pendaftaran</div>

                <div
                  v-if="browser.parsedResult.os.name.toLowerCase() == 'ios'"
                  style="margin-top:30px; margin-bottom:20px;"
                >
                  <!-- iphone -->
                  <v-text-field
                    autofocus
                    solo
                    class="otpIphoneText"
                    @input="verifyOtpCode"
                    v-model="otpcodeTxt"
                    @keypress="e=> checkNumber(e, 'PDOTPFragment')"
                  ></v-text-field>
                </div>
                <div v-else>
                  <input
                    autofocus
                    id="otp"
                    type="text"
                    ref="otpTxt"
                    @input="showOtpCode"
                    v-model="otpcodeTxt"
                    @keypress="e=> checkNumber(e, 'PDOTPFragment')"
                    style="opacity: 0;"
                  />
                  <!-- @touchstart="setOtpTxtFocus" -->
                  <!-- @keyup="keyOtpCode" -->
                  <v-layout style="margin-top:20px;margin-bottom:20px;">
                    <v-flex xs2 v-for="(code, i) in otpcode" :key="i" @click="setOtpTxtFocus">
                      <div v-if="code == -1" class="pinInput"></div>
                      <div
                        v-else
                        style="font-size:18px !important;padding-top:15px;"
                        :class="{errorInput: !verifyOtp}"
                      >{{code}}</div>
                    </v-flex>
                  </v-layout>
                </div>

                <div
                  v-show="verifyOtp"
                  style="text-align:center; margin-bottom:30px;"
                  :class="{ errorInput: otpSecondsErr }"
                >
                  <img src="../assets/timer@3x.png" style="width:18px;" v-show="!otpSecondsErr" />
                  <img src="../assets/red@3x.png" style="width:18px;" v-show="otpSecondsErr" />
                  <div
                    style="display:inline; vertical-align:super; padding-left:20px;"
                  >{{otpSecondsTxt}}</div>
                </div>
                <div
                  v-show="!verifyOtp"
                  class="errorInput"
                  style="height: 60px; padding-top: 30px; text-align: center; font-size: 14px;"
                >PIN yang Anda masukan salah</div>
                <div
                  style="padding-top:20px; text-align:center; text-decoration:underline;"
                  :style="{ color: otpSecondsErr ? '#00acf0' : 'grey' }"
                  @click="hpVerification"
                >Kirim Ulang Kode Verifikasi</div>
              </div>
            </v-flex>
          </v-layout>
        </v-card>
      </v-dialog>
    </v-layout>
    <!--otp dialog-->

    <!--dialog change KTP photo-->
    <v-layout row justify-center>
      <v-flex xs12 sm8 md6 offset-xs0 offset-sm2 offset-md3>
        <v-dialog v-model="changeKTPDialog" persistent width="400">
          <v-card class="grey lighten-3">
            <v-card-actions>
              <v-spacer></v-spacer>
              <j-btn icon @click.native="changeKTPDialog = false" style="color:grey;">
                <v-icon>close</v-icon>
              </j-btn>
            </v-card-actions>
            <v-card-text
              style="text-align: center;"
            >Apakah Anda yakin ingin mengubah Foto KTP Anda ?</v-card-text>
            <v-card-actions style="padding-right: 20px; padding-bottom: 20px;">
              <v-spacer></v-spacer>
              <j-btn @click="fotoKtp.editMode = true; changeKTPDialog = false">Ya</j-btn>
              <j-btn class="color8" dark @click="changeKTPDialog = false">Tidak</j-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
    <!--dialog change KTP photo-->
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import getPhoneNumbers from "../helper/getPhoneNumbers";
import vueDropzone from "vue2-dropzone";
import moment from "moment";
import LZString from "lz-string";
import localforage from "localforage";
import Bowser from "bowser";
import enums from "../enums";
import base64ToBlobToFile from "../helper/base64ToBlobToFile";
import formatDate from "../helper/formatDatePicker";
import checkValidName2 from "../helper/checkValidName";
import checkNumber2 from "../helper/checkNumber";
import checkValidMobilePhone from "../helper/checkMobilePhone";
import deleteErrorBag from "../helper/deleteErrorBagManual";

import jsonpack from "jsonpack";
let addresses = [];
const { types } = enums;
var jsscompress = require("js-string-compression");
var hm = new jsscompress.Hauffman();
const browser = Bowser.getParser(window.navigator.userAgent).parse();

export default {
  components: { vueDropzone },
  data() {
    return {
      ...mapState(["user"]),
      clonedPersonalData: {},
      personalData: {},
      fotoKtp: {},
      doneMounted: false,

      //dropdown list
      addresses: [],
      provinces: [],
      regencies: [],
      villages: [],
      subdistricts: [],
      domicileStatus: [],
      civilStatus: [],
      languages: [],
      dependencyNum: _.range(10),
      birthPlace: [],

      //other
      verificationActive: true, //verification status for otp
      menuDob: false,
      menuOccupiedSince: false,
      dob: null,
      occupiedSince: null,
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 200,
        addRemoveLinks: true,
        maxFiles: 1,
        autoProcessQueue: false,
        clickable: true
      },
      fotoKtpErr: "",
      otpDialog: false,
      otpSeconds: 0,
      otpSecondsTxt: "",
      otpcode: [-1, -1, -1, -1, -1, -1],
      otpcodeTxt: "",
      otpErr: false,
      otpSecondsErr: true,
      verifyOtp: true,
      hasAddbirthPlace: false,

      changeKTPDialog: false,
      limittouchstart: 0,
      browser
    };
  },
  methods: {
    ...mapMutations([types.ACTIVATE_LOADING, types.SET_ERROR]),
    ...mapActions(["otp", "dropdown", "verifyotp", "getOtpSetting"]),
    checkValidMobilePhone,
    getPhoneNumbers,
    checkValidName: function(e) {
      checkValidName2(e, this.$route.name);
    },
    checkValidNamePaste: function(i, e) {
      const newVal = e.replace(/[^a-zA-Z' ]/g, "");
      this.personalData[i] = newVal;
    },
    checkNumber: function(e, page) {
      checkNumber2(e, page || this.$route.name);
    },
    saveData: async function() {
      this[types.ACTIVATE_LOADING]();
      localStorage.form1Valid = 2;

      //checking if civilStatus changes
      if (localStorage.form1 && localStorage.form1.length > 0) {
        const form1Old = JSON.parse(localStorage.form1);
        if (
          (form1Old.civilStatus.toLowerCase() == "menikah" ||
            this.personalData.civilStatus.toLowerCase() == "menikah") &&
          form1Old.civilStatus != this.personalData.civilStatus
        ) {
          //delete version
          const supportingData = JSON.parse(localStorage.form2);
          delete supportingData.spouseName;
          delete supportingData.spouseNo;
          delete supportingData.dobSpouse;
          delete supportingData.parentsName;
          delete supportingData.parentsNo;
          localStorage.form2Valid = 2;
          localStorage.form2 = JSON.stringify(supportingData);

          //saved data version
          // if (this.personalData.civilStatus.toLowerCase() == "menikah") {
          //   if (
          //     !(
          //       supportingData.spouseName &&
          //       supportingData.spouseNo &&
          //       supportingData.dobSpouse
          //     )
          //   ) {
          //     localStorage.form2Valid = 2;
          //   } else {
          //     localStorage.form2Valid = 1;
          //   }
          // } else {
          //   if (!(supportingData.parentsName && supportingData.parentsNo)) {
          //     localStorage.form2Valid = 2;
          //   } else {
          //     localStorage.form2Valid = 1;
          //   }
          // }
        }
      }

      localStorage.form1 = JSON.stringify(this.personalData);

      //localStorage.fotoKtp = LZString.compress(JSON.stringify(this.fotoKtp));
      //localStorage.fotoKtp = JSON.stringify(this.fotoKtp);
      //localStorage.fotoKtp = jsonpack.pack(this.fotoKtp);
      //localStorage.fotoKtp = hm.compress(JSON.stringify(this.fotoKtp));
      const fotoKtp = { ...this.fotoKtp, appId: localStorage.appId };
      await localforage.setItem("fotoKtp", fotoKtp);

      if (!this.fotoKtp) {
        this.fotoKtpErr = "mohon untuk mengupload foto ktp anda";
      }
      if (!this.personalData.verified) {
        this.otpErr = true;
      }
      const valid = await this.$validator.validateAll("personalDataForm");
      if (valid && !this.fotoKtpErr && !this.otpErr) {
        localStorage.form1Valid = 1;
      }

      this.$router.push({ name: "formHead" });
    },
    checkHp: async function(sub, field, value) {
      this.personalData.verified = false;
      const valid = await this.$validator.validate(`${sub}Form.${field}`);
      this.verificationActive = valid;
    },

    hpVerification: async function() {
      if (this.otpSecondsErr) {
        const checkOtpSetting = await this.getOtpSetting();
        if (checkOtpSetting === true || checkOtpSetting === "true") {
          const time = await this.otp(this.personalData.hpnum);
          if (time) {
            this.otpSecondsErr = false;
            this.otpDialog = true;
            this.verifyOtp = true;
            this.otpcode = [-1, -1, -1, -1, -1, -1];
            this.otpcodeTxt = "";
            this.otpSeconds = time;
            this.setOtpTxtFocus();
            this.intevalOtp = setInterval(() => {
              var timetxt = new Date(null);
              timetxt.setSeconds(this.otpSeconds);
              this.otpSecondsTxt = timetxt.toISOString().substr(14, 5);
              if (this.otpSeconds == 0) {
                this.otpSecondsErr = true;
                clearInterval(this.intevalOtp);
              }
              this.otpSeconds--;
            }, 1000);
          }
        } else {
          this.verificationActive = false;
          this.personalData.verified = true;
          this.otpErr = false;
        }
      }
    },
    setOtpTxtFocus: function() {
      // this.$nextTick(() => {
      //   //if iphone
      //   if (browser.parsedResult.os.name.toLowerCase() == "ios") {
      //     var inputElement = document.getElementById("otp");
      //     console.log(inputElement);
      //     inputElement.style.opacity = 1;
      //     inputElement.style.visibility = "visible"; // unhide the input
      //     inputElement.focus(); // focus on it so keyboard pops
      //     inputElement.style.visibility = "hidden"; // hide it again
      //   } else if (this.$refs.otpTxt) {
      //     this.$refs.otpTxt.style.visibility = "visible";
      //     this.$refs.otpTxt.focus();
      //     //this.$refs.otpTxt.select();
      //     this.$refs.otpTxt.click();

      //     this.$refs.otpTxt.dispatchEvent(new Event("touchstart"));
      //     // this.$refs.otpTxt.touchstart();
      //     this.$refs.otpTxt.style.visibility = "hidden";
      //   }
      // });

      setTimeout(() => {
        if (browser.parsedResult.os.name.toLowerCase() == "ios") {
          var inputElement = document.getElementById("otp");
          if (this.otpDialog) {
            inputElement.style.opacity = 1;
            inputElement.style.visibility = "visible"; // unhide the input
            inputElement.focus(); // focus on it so keyboard pops

            // inputElement.dispatchEvent(new Event("touchstart"));
            // inputElement.addEventListener("touchstart", this.setOtpTxtFocus());
            // inputElement.touchstart();

            inputElement.style.visibility = "hidden"; // hide it again
          } else {
            this.setOtpTxtFocus();
          }
        } else if (this.$refs.otpTxt) {
          this.$refs.otpTxt.focus();
          //this.$refs.otpTxt.select();
          this.$refs.otpTxt.click();

          this.$refs.otpTxt.dispatchEvent(new Event("touchstart"));
          // this.$refs.otpTxt.touchstart();
        }
      }, 0);
    },
    dropZoneErr: function(file, message, xhr) {
      this.fotoKtpErr = message;
    },
    dropZoneRemove: function(file) {
      if (this.fotoKtpErr) {
        this.fotoKtpErr = "";
      }
    },
    dropZoneFileAdded: function(file) {
      const reader = new FileReader();
      reader.onload = e => {
        const uploadedImg = new Image();
        uploadedImg.src = e.target.result;

        uploadedImg.onload = () => {
          this.fotoKtp = {
            ...this.fotoKtp,
            src: e.target.result,
            file,
            key: "ktp",
            editMode: false
          };
        };
        uploadedImg.onerror = () => {
          this.$refs.dropzonefotoktp.removeFile(file);

          this[types.SET_ERROR]({
            message:
              "Mohon maaf, terjadi kesalahan pada gambar yang Anda upload. Silahkan upload ulang."
          });
        };
      };
      reader.readAsDataURL(file);
    },
    dropZoneDrop: function() {
      const action = "Drag Drop : Document 'ktp_photo'";
      const obj = this.$navlog.mappingObj(this.$route.name, action);
      this.$navlog.save(obj);
    },
    dropZoneClick: function() {
      const action =
        'List: "ktp_photo", clicked item: position: 0, openDirectPhotoChooser';
      const obj = this.$navlog.mappingObj(this.$route.name, action);
      this.$navlog.save(obj);
    },
    filterRegency: function() {
      this.regencies = [
        ...new Set(
          addresses
            .filter(x => x.province === this.personalData.province)
            .map(x => x.regency)
        )
      ];
      //reset other dropdown
      this.villages = [];
      this.subdistricts = [];
      //reset other selection
      this.personalData.postalcode = "";
    },
    filterVillage: function() {
      this.villages = [
        ...new Set(
          addresses
            .filter(x => x.regency === this.personalData.regency)
            .map(x => x.village)
        )
      ];

      //reset other dropdown
      this.subdistricts = [];
      //reset other selection
      this.personalData.postalcode = "";
    },
    filterSubdistrict: function() {
      this.subdistricts = [
        ...new Set(
          addresses
            .filter(x => x.village === this.personalData.village)
            .map(x => x.subdistrict)
        )
      ];

      //reset other selection
      this.personalData.postalcode = "";
    },
    filterPostalcode: function() {
      const postalcodes = [
        ...new Set(
          addresses
            .filter(x => x.subdistrict === this.personalData.subdistrict)
            .map(x => x.postalcode)
        )
      ];

      //reset other selection
      this.personalData.postalcode = postalcodes[0];
      //deleteing error message postal code
      this.errors.items = deleteErrorBag(
        "kode pos",
        "personalDataForm",
        this.errors.items
      );
    },
    keyOtpCode: async function($event) {
      //checking number
      if (this.otpcodeTxt.length > 6) return;
      const number = /^[0-9]+$/;
      const i = this.otpcodeTxt.length - 1;
      if ($event.keyCode == 8) {
        //this.$set(this.otpcode, i + 1, -1);
      }
      // else if ($event.key.match(number)) {
      //   //this.$set(this.otpcode, i, $event.key);
      //   //this.otpcode[i] = $event.key;
      //   console.log(new Date());
      // }
      if (this.otpcodeTxt.length == 6) {
        //send verify
        this.verifyOtp = await this.verifyotp(this.otpcodeTxt);
        clearInterval(this.intevalOtp);
        if (this.verifyOtp) {
          this.otpDialog = false;
          this.verificationActive = false;
          this.personalData.verified = true;
          this.otpErr = false;
        } else {
          this.otpSecondsErr = true;
        }
      }
    },
    showOtpCode: async function() {
      if (this.otpcodeTxt.length > 6) return;

      // change the UI OTP Code
      this.otpcode = this.otpcodeTxt
        .split("")
        .concat(new Array(6 - this.otpcodeTxt.length).fill(-1));
      this.verifyOtpCode();
    },
    verifyOtpCode: async function() {
      // send code to verify
      if (this.otpcodeTxt.length == 6) {
        //send verify
        this.verifyOtp = await this.verifyotp(this.otpcodeTxt);
        clearInterval(this.intevalOtp);
        if (this.verifyOtp == true) {
          this.otpDialog = false;
          this.verificationActive = false;
          this.personalData.verified = true;
          this.otpErr = false;
        } else {
          this.otpSecondsErr = true;
        }
      }
    },
    resetOtp: function() {
      clearInterval(this.intevalOtp);
      this.verificationActive = true;
      this.personalData.verified = false;
      this.otpErr = false;
      this.otpSecondsErr = true;
      this.otpDialog = false;

      this.otpSeconds = 0;
      this.otpSecondsTxt = "";
      this.otpcode = [-1, -1, -1, -1, -1, -1];
      this.otpcodeTxt = "";
      this.otpSecondsErr = true;
      this.verifyOtp = false;
    },
    inputNavlog: function(e) {
      this.$navlog.inputKey(e, this.$route.name);
    },
    checkKodePos: function(e) {
      if (this.personalData.postalcode.length == 5) {
        //search postalcode
        const data = addresses.find(
          x => x.postalcode == this.personalData.postalcode
        );
        if (data) {
          for (let i in data) {
            //this.$set(this.personalData, i, data[i]);
            this.personalData[i] = data[i];
          }
          this.errors.items = deleteErrorBag(
            "provinsi",
            "personalDataForm",
            this.errors.items
          );
          this.errors.items = deleteErrorBag(
            "kabupaten",
            "personalDataForm",
            this.errors.items
          );
          this.errors.items = deleteErrorBag(
            "kecamatan",
            "personalDataForm",
            this.errors.items
          );
          this.errors.items = deleteErrorBag(
            "kelurahan",
            "personalDataForm",
            this.errors.items
          );

          //adding dropdown if data exist
          this.filterAddress();

          //this.personalData = { ...this.personalData, ...data };
          //console.log(this.personalData);
        } else {
          const resetData = ["subdistrict", "village", "regency", "province"];
          for (let i in resetData) {
            //this.$set(this.personalData, i, data[i]);
            delete this.personalData[resetData[i]];
          }
        }
      }
    },
    selectNoDataBirthPlace: function() {
      let i = this.birthPlace.length;
      if (this.hasAddbirthPlace) {
        i--;
      }
      this.$set(this.birthPlace, i, this.personalData.birthPlaceSearch);
      this.personalData.birthPlace = this.birthPlace[i];
      this.hasAddbirthPlace = true;
    },
    filterAddress: function() {
      if (this.personalData.province) {
        this.filterRegency();
      }
      if (this.personalData.regency) {
        this.filterVillage();
      }
      if (this.personalData.village) {
        this.filterSubdistrict();
      }
      if (this.personalData.subdistrict) {
        this.filterPostalcode();
      }
    },
    checkHp2: function() {
      checkValidMobilePhone(
        this.errors,
        "personalDataForm",
        "Nomor HP Sekunder",
        this.personalData.hpnum2
      );
      if (this.personalData.hpnum2 == this.personalData.hpnum) {
        this.errors.add({
          scope: "personalDataForm",
          field: `personalDataForm.${"Nomor HP Sekunder"}`,
          msg: `${"Nomor HP Sekunder"} sudah terdaftar untuk Nomor HP Utama`
        });
      } else {
        const i = this.errors.items.findIndex(
          x =>
            x.field === `personalDataForm.${"Nomor HP Sekunder"}` &&
            x.scope === "personalDataForm" &&
            x.msg ===
              `${"Nomor HP Sekunder"} sudah terdaftar untuk Nomor HP Utama`
        );
        if (i > -1) {
          this.errors.items.splice(i, 1);
        }
      }
    }

    // checkValidName: function($event) {
    //   //accepted
    //   const alpha = /^[A-Za-z]+$/;
    //   if (
    //     !(
    //       $event.key.match(alpha) ||
    //       $event.code === "Space" ||
    //       $event.keyCode === 39
    //     )
    //   ) {
    //     $event.preventDefault();
    //   }
    //   return true;
    // }
  },

  async mounted() {
    this.$emit("makeBgTransparent", false);
    this.$emit("makeisSubPage", { text: "Identitas Diri", url: "formhead" });

    this.personalData.name = this.user().fullname;
    this.personalData.nik = this.user().nik;

    //if (localStorage.fotoKtp) {
    const fotoKtp = await localforage.getItem("fotoKtp");
    if (fotoKtp && fotoKtp.appId == localStorage.appId) {
      //const fotoKtp = JSON.parse(LZString.decompress(localStorage.fotoKtp));
      //const fotoKtp = JSON.parse(localStorage.fotoKtp);

      //const fotoKtp = jsonpack.parse(localStorage.fotoKtp);
      //const fotoKtp = JSON.parse(hm.decompress(localStorage.fotoKtp));
      const file = await base64ToBlobToFile(fotoKtp.src);
      this.fotoKtp = {
        ...fotoKtp,
        file
      };
    }
    if (localStorage.form1) {
      this.personalData = JSON.parse(localStorage.form1);
    }
    //dropdown
    //get dropdown
    const dropdownList = await this.dropdown();
    this.birthPlace = dropdownList["birth_places"];
    //this.languages = dropdownList.dialects;
    this.civilStatus = dropdownList.marital_statuses;
    this.domicileStatus = dropdownList.home_statuses;
    //address
    if (Array.isArray(dropdownList.addresses)) {
      addresses = dropdownList.addresses.map((x, i) => {
        const arr = x.split(",");
        //add to province
        const checkprovinces = this.provinces.indexOf(arr[4]);
        if (checkprovinces == -1) {
          this.provinces.push(arr[4]);
        }

        return {
          postalcode: arr[0],
          subdistrict: arr[1],
          village: arr[2],
          regency: arr[3],
          province: arr[4]
        };
      });
      //adding dropdown if data exist
      this.filterAddress();
    }

    if (this.personalData.verified) {
      this.verificationActive = false;
    }

    //
    this.clonedPersonalData = { ...this.personalData };
    this.doneMounted = true;

    //validate
    if (localStorage.form1Valid == 2) {
      await this.$validator.validateAll("personalDataForm");
      if (!this.personalData.verified) {
        this.otpErr = true;
      }
    }
  },
  watch: {
    ["personalData.dob"](val) {
      this.personalData.formatedDob = formatDate(val);
      this.errors.items = deleteErrorBag(
        "tanggal lahir",
        "personalDataForm",
        this.errors.items
      );
    },
    ["personalData.occupiedSince"](val) {
      this.personalData.occupiedSinceformated = formatDate(val);
      this.errors.items = deleteErrorBag(
        "ditempat sejak",
        "personalDataForm",
        this.errors.items
      );
    },
    menuDob(val) {
      if (val) {
        const label = this.$navlog.getConstantByKey("dob");
        const action = `DatePicker : "${label}" clicked`;
        const obj = this.$navlog.mappingObj(this.$route.name, action);
        this.$navlog.save(obj);
      }
      val && this.$nextTick(() => (this.$refs.dobpicker.activePicker = "YEAR"));
    },
    menuOccupiedSince(val) {
      if (val) {
        const label = this.$navlog.getConstantByKey("occupiedSince");
        const action = `DatePicker : "${label}" clicked`;
        const obj = this.$navlog.mappingObj(this.$route.name, action);
        this.$navlog.save(obj);
      }
    },
    personalData: {
      handler: function(val) {
        if (this.doneMounted) {
          let key = "",
            value = "";
          for (let i in val) {
            if (val[i] != this.clonedPersonalData[i]) {
              key = i;
              value = val[i];
              break;
            }
          }
          if (!key || !value) {
            return;
          }
          // console.log(this.clonedPersonalData[key]);
          // console.log(4444444444);
          //filter type
          const action = this.$navlog.filterTypeByKey(key, value);
          const obj = this.$navlog.mappingObj(this.$route.name, action);
          this.$navlog.save(obj);
          //last step
          this.clonedPersonalData = { ...val };
        }
      },
      deep: true
    },
    otpDialog: function(val) {
      let action = val ? "Screen opened" : "Screen closed";

      const obj = this.$navlog.mappingObj("PDOTPFragment", action);
      this.$navlog.save(obj);
    }
  }
};
</script>

<style scoped>
.divBlock {
  margin-top: 10px;
  display: block;
  margin-bottom: 10px;
}
.labelInput:hover:focus {
  color: #00acf0;
}
/* .errorInput {
  color: red;
  font-size: 12px;
  height: 14px;
  margin-bottom: 5px;
} */
.buttonNext {
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 14px;
}
.textHeader {
  padding-top: 50px;
  padding-left: 15px;
  background-color: #ffffff;
}
.divBlock {
  margin-top: 10px;
  display: block;
  font-size: 14px;
  margin-bottom: 10px;
}
.pinInput {
  width: 40px;
  height: 3px;
  background: lightgray;
  margin-top: 30px;
  margin-bottom: 30px;
}
.marginBottom {
  margin-bottom: 10px;
}
.paddingBottomZero {
  padding-bottom: 0px !important;
  padding-top: 5px !important;
}
.smallPadding {
  padding: 5px !important;
}
</style>
