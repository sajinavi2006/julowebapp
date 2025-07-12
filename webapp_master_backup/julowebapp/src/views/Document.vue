<template>
  <div>
    <div class="headerBg">
      <div class="headerTitle">Dokumen Pendukung</div>
      <div class="headerText">Mohon Lengkapi Dokumen Pendukung Anda.</div>
      <div class="headerText">Agar Anda Berkesempatan Mendapatkan Pinjaman yang Lebih Besar</div>
    </div>

    <v-layout row wrap style="margin-bottom: 30px;padding-left:20px;padding-right:20px;">
      <v-flex
        xs12
        sm9
        md6
        offset-xs0
        offset-sm2
        offset-md3
        class="infotext"
      >Disarankan untuk menggunakan gambar dengan ukuran kurang dari 4MB</v-flex>
      <v-flex xs12 sm9 md6 offset-xs0 offset-sm2 offset-md3 v-for="(item,i) in defaultVal" :key="i">
        <div class="expandHeaderLine"></div>
        <v-expansion-panel class="expand" expand v-model="item.panel">
          <v-expansion-panel-content>
            <div slot="header">
              <v-layout>
                <v-flex xs3>
                  <img :src="item.src" style="max-width:50px; max-height:50px; text-align:left;" />
                </v-flex>
                <v-flex xs9>
                  <v-layout column>
                    <v-flex xs6 style="font-size:14px; padding-bottom:5px;">{{item.text}}</v-flex>
                    <v-flex xs6>
                      <div v-if="item.isUploaded">
                        <img
                          src="../assets/completed_2019-01-23/completed.png"
                          style="width:15px;padding-top:5px;"
                        />
                        <div
                          style="display:inline; -align:super; padding-left:7px; color:#57b8a9;"
                        >Sudah Upload</div>
                      </div>
                      <div v-else>
                        <img
                          src="../assets/null_2019-01-23/drawable-mdpi/kosong.png"
                          style="width:15px;padding-top:5px;"
                        />
                        <div
                          style="display:inline; vertical-align:super; padding-left:7px; color:#757575;"
                        >
                          <label
                            v-if="item.required"
                          >{{typeof item.required === "string"? item.required : 'Wajib'}}</label>
                          <label v-else>Tidak Wajib</label>
                        </div>
                      </div>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </div>
            <v-card>
              <v-divider></v-divider>
              <v-card-text>
                <div v-show="!item.isUploaded">
                  <vue-dropzone
                    :options="item.options"
                    :id="`dropzone${item.value}`"
                    :ref="`dropzone${item.value}`"
                    class="smallPadding"
                    :useCustomSlot="true"
                    @vdropzone-drop="(e) => dropZoneDrop(e, item.key)"
                    @vdropzone-success="dropZoneSuccess(i)"
                    @vdropzone-file-added="(file) => dropZoneFileAdded(file, i)"
                    @vdropzone-error="(file, message, xhr) =>dropZoneErr(file, message, xhr, i)"
                    @vdropzone-removed-file="(file) => dropZoneRemove(file, i)"
                  >
                    <div class="dropzone-custom-content" @click="dropZoneClick(item.key, i)">
                      <v-icon x-large>cloud_upload</v-icon>
                      <h4 class="dropzone-custom-title">Drag and drop</h4>or
                      <div>Klik untuk memilih file dari komputer Anda</div>
                    </div>
                  </vue-dropzone>
                </div>
                <div v-show="item.isUploaded">
                  <div v-for="(file) in item.files" :key="file.key" style="margin:auto;">
                    <img
                      :src="file.src"
                      style="height:200px; max-width:100%; text-align:center; display:block; margin-left:auto; margin-right:auto;"
                    />
                    <div
                      v-if="file.name"
                      style="text-align:center; width:100%; height: 200px; padding-top:95px; background-color:white; border:2px solid #E5E5E5;"
                    >{{file.name}}</div>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <div style="color:red;padding-top:10px;">
          <div v-for="(err, k) in item.errorMessage" :key="k">
            <span v-if="err">{{err.message}}</span>
          </div>
        </div>
      </v-flex>
      <!-- <v-flex xs12 sm8 md6 offset-xs0 offset-sm2 offset-md3>
        <div class="expandHeaderLine"></div>
        <v-expansion-panel class="expand">
          <v-expansion-panel-content>
            <div slot="header">
              <v-layout>
                <v-flex xs3>
                  <img
                    src="../assets/bank.png"
                    style="max-width:50px; max-height:50px; text-align:left;"
                  >
                </v-flex>
                <v-flex xs9>
                  <v-layout column>
                    <v-flex xs6 style="font-size:14px; padding-bottom:5px;">Verifikasi Bank</v-flex>
                    <v-flex xs6>
                      <div v-if="bankUploaded">
                        <img
                          src="../assets/completed_2019-01-23/completed.png"
                          style="width:15px;padding-top:5px;"
                        >
                        <div
                          style="display:inline; vertical-align:super; padding-left:7px; color:#57b8a9;"
                        >Sudah Upload</div>
                      </div>
                      <div v-else>
                        <img
                          src="../assets/null_2019-01-23/drawable-mdpi/kosong.png"
                          style="width:15px;padding-top:5px;"
                        >
                        <div
                          style="display:inline; vertical-align:super; padding-left:7px; color:#757575;"
                        >
                          <label>Tidak Wajib</label>
                        </div>
                      </div>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </div>
            //DISINI OPEN VCARD
             <v-card>
              <v-divider></v-divider>
              <v-card-text>
                <j-btn block outline color="#00B0F0" @click="bankVerificationDialog=true">
                  <v-layout row>
                    <v-flex xs3></v-flex>
                    <v-flex xs6>Verifikasi</v-flex>
                    <v-flex xs3>
                      <v-icon right dark v-if="bankUploaded">done</v-icon>
                    </v-flex>
                  </v-layout>
                </j-btn>Verifikasi Internet Banking Harus Memuat Setoran Penghasilan
              </v-card-text>
            </v-card>
            //DISINI TUTUP VCARD
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>-->
      <v-flex xs12 sm9 md6 offset-xs0 offset-sm2 offset-md3 style="margin-top:30px;">
        <j-btn
          block
          large
          :disabled="requiredFileAdded.length < requiredFileCount"
          :color="requiredFileAdded.length >= requiredFileCount ? 'color8' : '#e5e5e5'"
          :dark="requiredFileAdded.length >= requiredFileCount"
          @click="sendData"
          style="margin-top:30px;"
        >Kirim Dokumen</j-btn>
      </v-flex>
    </v-layout>

    <!--verification p1-->
    <v-layout row justify-center>
      <v-dialog v-model="bankVerificationDialog" persistent width="90%">
        <v-card>
          <v-card-actions class="grey lighten-4">
            <v-spacer></v-spacer>
            <j-btn icon @click.native="bankVerificationDialog = false">
              <v-icon>close</v-icon>
            </j-btn>
          </v-card-actions>
          <v-card-title class="grey lighten-4">
            <div
              class="buttonNext"
              style="text-align: center; color:rgba(0, 176, 240); font-weight: bold; font-size: 18px; width: 100%"
            >Verifikasi Bank</div>
            <div
              style="font-size: 14px;"
            >Untuk mendapatkan status kredit lebih, log in ke online banking pada bank utama Anda. Lewati jika Anda tidak punya)</div>
          </v-card-title>
          <v-card-text>
            <div>
              <div>
                <span style="color:red;">*</span>
                <span style="color:rgba(0, 176, 240);">Kebijakan Privasi</span>
              </div>
              <div>
                JULO
                <strong>tidak menyimpan User ID / PIN / Password</strong> akun Anda dan JULO
                <strong>tidak dapat mengendalikan akun</strong> Anda termasuk melakukan transaksi apapun. Akses hanya digunakan untuk memverifikasi data.
              </div>
            </div>

            <div class="buttonNext">
              <v-divider></v-divider>
            </div>

            <div>
              <v-container grid-list-xl style="padding: 0px 5px 0px 0px;margin-bottom:30px;">
                <v-layout wrap justify-center>
                  <v-flex
                    xs12
                    sm8
                    md7
                    v-for="(bank) in bankVerificationBtn"
                    :key="bank.id"
                    style="padding: 0px 15px 0px 5px;"
                  >
                    <j-btn
                      outline
                      color="#D3D3D3"
                      class="btnVerification"
                      @click="bankVerificationDialog2Open(bank)"
                      v-bind="{ ['disabled']: bank.tryCount==3 }"
                    >
                      <v-layout row>
                        <v-flex xs4 style="text-align: right !important;">
                          <img
                            :src="bank.img"
                            style="max-height:25px;max-width:90px;vertical-align: middle;"
                          />
                        </v-flex>
                        <v-flex xs1>
                          <div style="text-align:center; padding-left:10px;">
                            <div class="verticalLine" style="height: 30px;"></div>
                          </div>
                        </v-flex>
                        <v-flex xs6 style="text-align: left !important; padding-top:17px;">
                          <span style="text-transform: none; color: #5e5e5e;">{{bank.text}}</span>
                        </v-flex>
                      </v-layout>
                    </j-btn>
                  </v-flex>
                </v-layout>
              </v-container>
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-layout>
    <!--verification p1-->
    <!--verification p2-->
    <v-layout row justify-center>
      <v-dialog v-model="bankVerificationDialog2" persistent width="90%">
        <v-card>
          <v-card-actions class="color8">
            <j-btn icon dark @click.native="bankVerificationDialogOpen">
              <v-icon>arrow_back</v-icon>
            </j-btn>
            <v-spacer></v-spacer>
            <j-btn icon dark @click.native="bankVerificationDialog2 = false">
              <v-icon>close</v-icon>
            </j-btn>
          </v-card-actions>
          <v-card-title class="color8">
            <div
              class="buttonNext"
              style="text-align: center; color:white; font-weight: bold; font-size: 18px; width: 100%"
            >Verifikasi Bank</div>
            <v-layout justify-center>
              <img src="../assets/Julo-logo-bank.png" style="height:100px;" />
              <lottie
                :options="defaultOptions"
                :height="100"
                :width="100"
                v-on:animCreated="handleAnimation"
                style="margin-left:10px !important; margin-right:10px !important;"
              />
              <div style="padding-top:30px;">
                <img :src="currBank.img" style="height:35px; filter: brightness(0) invert(1);" />
              </div>
            </v-layout>
          </v-card-title>
          <v-card-text>
            <div>
              <form data-vv-scope="bankVerification">
                <label class="labelInput">User ID</label>
                <v-text-field
                  autofocus
                  outline
                  placeholder="User ID"
                  v-model="bankVerification.userID"
                  data-vv-delay="300"
                  v-validate="'required'"
                  :error-messages="errors.collect('User ID')"
                  data-vv-name="User ID"
                  required
                  @keypress="inputNavlog"
                  id="bank_scrape_user_id"
                ></v-text-field>
                <div class="errorInput">
                  <span>{{ errors.first(`bankVerification.${'User ID'}`) }}</span>
                </div>

                <label class="labelInput">Password / Pin</label>
                <v-text-field
                  outline
                  placeholder="Password / Pin"
                  :append-icon="showPassword ? 'visibility_off' : 'visibility'"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
                  v-model="bankVerification.pin"
                  data-vv-delay="300"
                  v-validate="'required'"
                  :error-messages="errors.collect('Pin')"
                  data-vv-name="Pin"
                  required
                  @keypress="inputPass"
                  id="bank_scrape_pin"
                ></v-text-field>
                <div class="errorInput">
                  <span>{{ errors.first(`bankVerification.${'Pin'}`) }}</span>
                </div>
                <div style="margin:auto; text-align:center;">
                  <j-btn depressed dark color="colorbutton" @click="verifyBank">Login</j-btn>
                </div>
              </form>
            </div>

            <div class="buttonNext">
              <v-divider></v-divider>
            </div>

            <div>
              JULO tidak menyimpan
              <strong>User ID / PIN / Password</strong> Internet Banking Anda. JULO menggunakan sistem koneksi terenkripsi untuk menjaga keamanan akun Anda. Privasi data Anda adalah prioritas utama kami.
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-layout>
    <!--verification p2-->
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import statusCodeMappingRoute from "../helper/statusCode";
import Lottie from "vue-lottie";
import vueDropzone from "vue2-dropzone";
import enums from "../enums";
import animationData from "../assets/lottie/animation.js";
const { types } = enums;

const yImg = require("@/assets/il_centang.png");
const xImg = require("@/assets/exc_mark_red.png");

const dropzoneOptions = {
  url: "https://httpbin.org/post",
  thumbnailWidth: 200,
  addRemoveLinks: true,
  maxFiles: 1,
  autoProcessQueue: false,
  clickable: true
};
//defaultVal.filter(x => x.required).length
export default {
  data() {
    return {
      requiredFileAdded: [],
      requiredFileCount: 3,
      successCount: 0,
      dataCount: 0,
      errCount: 0,
      reviewMode: false,
      defaultVal: [
        {
          key: "ktp",
          text: "Foto KTP",
          value: "ktp",
          options: dropzoneOptions,
          imgUrl: "ktp@2x.png",
          required: true,
          panel: [true]
        },
        {
          key: "ktp_self",
          text: "Foto Selfie dengan KTP",
          value: "youKtp",
          options: dropzoneOptions,
          imgUrl: "selfie_ktp.png",
          required: true,
          panel: [true]
        },
        {
          key: "slip_gaji",
          text: "Slip Gaji / Bukti Penghasilan",
          value: "slipGaji",
          options: dropzoneOptions,
          imgUrl: "slip_gaji.png",
          required: true,
          panel: [true]
        },
        {
          key: "kk",
          text: "Foto Kartu Keluarga",
          value: "kk",
          options: dropzoneOptions,
          imgUrl: "kartu_keluarga.png",
          panel: [true]
        },
        {
          key: "batch",
          text: "Kartu ID pegawai",
          value: "idCard",
          options: dropzoneOptions,
          imgUrl: "id_card_pegawai.png",
          panel: [true]
        }
      ],
      //bankVerify: '',
      imgbankVerification: [yImg, xImg],
      bankVerificationRes: {},
      bankVerification: {},
      currBank: {},
      bankVerificationBtn: enums.banklist,
      bankVerificationDialog: false,
      bankVerificationDialog2: false,
      bankUploaded: false,
      defaultOptions: {
        animationData: animationData,
        loop: true,
        autoplay: true
      },
      anim: "",
      showPassword: false,
      verification: false,
      payslipSetting: true
    };
  },
  components: {
    vueDropzone,
    Lottie
  },
  methods: {
    ...mapMutations([types.SET_ERROR]),
    ...mapActions([
      "saveDoc",
      "notifyDocumentDone",
      "getDocuments",
      "bankverification",
      "getPayslipSetting"
    ]),
    ...mapGetters(["nextStatusCode"]),
    toCamalCase: function(data) {
      return _.camelCase(data);
    },
    dropZoneErr: function(file, message, xhr, i) {
      let errorMessage = this.defaultVal[i].errorMessage;
      if (!errorMessage) {
        errorMessage = [];
      }
      errorMessage.push({ message, id: file.upload.uuid });
      //this.defaultVal[i].errorMessage = errorMessage;
      this.$set(this.defaultVal, i, {
        ...this.defaultVal[i],
        errorMessage
      });
      // this.$set(this.defaultVal[i].items, j, {
      //   ...this.defaultVal[i],
      //   errorMessage
      // });
    },
    dropZoneRemove: function(file, i) {
      if (this.defaultVal[i].errorMessage) {
        if (this.defaultVal[i].errorMessage.length > 0) {
          const k = this.defaultVal[i].errorMessage.findIndex(x => {
            return x.id == file.upload.uuid;
          });
          if (k != -1) {
            let errorMessage = this.defaultVal[i].errorMessage;
            errorMessage.splice(k, 1);
            this.defaultVal[i].errorMessage = errorMessage;
            // this.$set(this.defaultVal[i].items, j, {
            //   ...this.defaultVal[i],
            //   errorMessage
            // });
          }
        }
      }
    },
    dropZoneFileAdded: function(file, i) {
      let files = this.defaultVal[i].file;
      files = [];
      // if (!files) {
      //   files = [];
      // }
      const typeFile = file.type.split("/");
      if (typeFile[0] == "image") {
        var reader = new FileReader();
        reader.onload = e => {
          var uploadedImg = new Image();
          uploadedImg.src = e.target.result;

          uploadedImg.onload = () => {
            files.push({
              src: e.target.result,
              file,
              key: this.defaultVal[i].key
            });
            this.defaultVal[i].files = files;
          };

          uploadedImg.onerror = () => {
            this.$refs[`dropzone${this.defaultVal[i].value}`][0].removeFile(
              file
            );
            this[types.SET_ERROR]({
              message:
                "Mohon maaf, terjadi kesalahan pada gambar yang Anda upload. Silahkan upload ulang."
            });
          };
        };
        reader.readAsDataURL(file);
      } else {
        files.push({
          name: file.name,
          file,
          key: this.defaultVal[i].key
        });
        this.defaultVal[i].files = files;
        // this.$set(this.defaultVal[i].items, j, {
        //   ...this.defaultVal[i],
        //   files
        // });
      }

      //
      if (this.defaultVal[i].required) {
        if (this.requiredFileAdded.indexOf(this.defaultVal[i].key) == -1) {
          this.requiredFileAdded.push(this.defaultVal[i].key);
        }
      }
    },
    dropZoneClick: function(label, i) {
      const action = `List: "${label}", clicked item: position: ${i}, openDirectPhotoChooser`;
      const obj = this.$navlog.mappingObj(this.$route.name, action);
      this.$navlog.save(obj);
    },
    saveData: function() {
      this.errCount = 0;
      for (var i in this.defaultVal) {
        let item = this.defaultVal[i];
        if (
          this.$refs[`dropzone${item.value}`][0].getQueuedFiles().length == 0
        ) {
          this.errCount++;
          let k = -1;
          if (!item.errorMessage) {
            item.errorMessage = [];
          } else {
            if (item.errorMessage.length > 0) {
              k = item.errorMessage.findIndex(x => {
                return x.id == "requiredId";
              });
            }
          }
          if (k == -1) {
            item.errorMessage.push({
              id: "requiredId",
              message: `${item.text} is required`
            });
            //this.defaultVal[i].errorMessage = item.errorMessage;
            this.$set(this.defaultVal, i, {
              ...this.defaultVal[i],
              errorMessage: item.errorMessage
            });
            // this.$set(this.defaultVal[i].items, j, {
            //   ...this.defaultVal[i],
            //   errorMessage: item.errorMessage
            // });
          }
        } else {
          if (
            this.$refs[`dropzone${item.value}`][0].getRejectedFiles().length > 0
          ) {
            this.errCount++;
          }
          if (item.errorMessage) {
            if (item.errorMessage.length > 0) {
              let k = item.errorMessage.findIndex(x => {
                return x.id == "requiredId";
              });
              if (k != -1) {
                item.errorMessage.splice(k, 1);
                this.defaultVal[i].errorMessage = item.errorMessage;
                // this.$set(this.defaultVal[i].items, j, {
                //   ...this.defaultVal[i],
                //   errorMessage: item.errorMessage
                // });
              }
            }
          }
        }
      }
      this.reviewMode = true;
      if (this.errCount == 0) {
        setTimeout(
          function() {
            this.reviewMode = true;
            // this.defaultVal.forEach(h=>{
            //   h.items.forEach(item => {
            //     //this.$refs[`dropzone${item.value}`][0].disable();
            //     this.$refs[`dropzone${item.value}`][0].setOption('clickable', false)
            //   });
            // });
            this.$vuetify.goTo(0, {
              duration: 300,
              offset: 0,
              easing: "easeInOutCubic"
            });
          }.bind(this),
          300
        );
      }
    },
    try: function() {},
    sendData: async function() {
      //saveData
      // this.defaultVal.forEach(h => {
      //   h.items.forEach(item => {
      //     this.$refs[`dropzone${item.value}`][0].processQueue();
      //     this.dataCount++;
      //   });
      // });

      const fileProcess = [];
      for (let item of this.defaultVal) {
        if (item.files && !item.isUploaded) {
          for (let file of item.files) {
            fileProcess.push(this.saveDoc({ key: file.key, file: file.file }));
          }
        }
      }
      const result = await Promise.all(fileProcess);
      if (result) {
        for (let i in result) {
          if (result[i]) {
            //this.defaultVal[i].isUploaded = true;
            const itemI = this.defaultVal.findIndex(x => x.key == result[i]);
            this.$set(this.defaultVal, itemI, {
              ...this.defaultVal[itemI],
              isUploaded: true,
              panel: [false]
            });
          }
        }
        //get statusCode
        const statusCode = await this.notifyDocumentDone();
        const routename = statusCodeMappingRoute(statusCode);
        this.$router.push({ name: routename });
      }

      // this.defaultVal.forEach(async h => {
      //   h.items.forEach(async item => {
      //     console.log(this.$refs[`dropzone${item.value}`][0]);
      //     item.files.forEach(async file => {
      //       const result = await this.saveDoc({ key: "ktp", file: file.file });
      //       console.log(result);
      //     });
      //   });
      // });
    },
    toReviewMode: function(id) {
      setTimeout(
        function() {
          this.reviewMode = false;
          this.$router.push({ hash: `#${id}` });
        }.bind(this),
        300
      );
    },
    dropZoneDrop: function(event, label) {
      if (this.reviewMode) {
        event.preventDefault();
        event.stopPropagation();
        return false;
      } else {
        const action = `Drag Drop : Document "${label}"`;
        const obj = this.$navlog.mappingObj(this.$route.name, action);
        this.$navlog.save(obj);
      }
    },
    dropZoneSuccess: function(i) {
      //this.defaultVal[i].isUploaded = true;
      this.$set(this.defaultVal, i, {
        ...this.defaultVal[i],
        isUploaded: true,
        panel: [false]
      });
      this.successCount++;
    },
    setImage: function(docs, key) {
      const img = docs.find(x => x.image_type === key);
      if (img && img.image_status === 0) {
        const i = this.defaultVal.findIndex(x => x.key === key);
        this.$set(this.defaultVal, i, {
          ...this.defaultVal[i],
          isUploaded: true,
          panel: [false],
          files: [{ src: img.image_url_api }]
        });
        if (this.requiredFileAdded.indexOf(this.defaultVal[i].key) == -1) {
          this.requiredFileAdded.push(this.defaultVal[i].key);
        }
      }
    },
    //verify bank
    bankVerificationDialogOpen: function() {
      this.bankVerificationDialog = true;
      this.bankVerificationDialog2 = false;
    },
    bankVerificationDialog2Open: function(bank) {
      this.bankVerificationDialog = false;
      this.bankVerificationDialog2 = true;
      this.currBank = _.pick(bank, ["img", "text", "id"]);
    },
    verifyBank: async function() {
      //cek user login failed or success
      //console.log(this.bankVerification);
      this.bankVerification.bankcode = this.currBank.id;
      const valid = await this.bankverification(this.bankVerification);
      if (valid) {
        this.bankVerificationRes = {
          imgsrc: this.imgbankVerification[0],
          title: "Berhasil!",
          text: "Verifikasi Internet Banking Berhasil.",
          btnText: "Lanjutkan",
          btnColor: "primary"
        };
        const currentBankI = this.bankVerificationBtn.findIndex(data => {
          return data.id == this.currBank.id;
        });
        this.bankVerificationBtn[currentBankI].tryCount++;
        this.bankVerificationDialog2 = false;
        this.popup = true;
        this.bankUploaded = this.currBank.text;
      }
    },
    handleAnimation: function(anim) {
      this.anim = anim;
    },
    inputNavlog: function(e) {
      this.$navlog.inputNavlog(e, "BankLoginFragment");
    },
    inputPass: function(e) {
      this.$navlog.inputPass(e, "BankLoginFragment");
    }
  },
  watch: {
    successCount: function(val) {
      if (this.dataCount == this.successCount) {
        //send to another page
        const statusCode = this.nextStatusCode();
        const routename = statusCodeMappingRoute(statusCode);
        this.$router.push({ name: routename });
      }
    },
    bankVerificationDialog2: function(val) {
      let action;
      if (val) {
        action = "Screen opened";
        // console.log(
        //   document.getElementsByClassName("v-dialog__content--active")
        // );
        // document
        //   .getElementsByClassName("v-dialog__content--active")[0]
        //   .addEventListener("scroll", function(event) {
        //     console.log(5555555555555555555);
        //     console.log(event);
        //   });
      } else {
        action = "Screen closed";
      }

      const obj = this.$navlog.mappingObj("BankLoginFragment", action);
      this.$navlog.save(obj);
    }
  },
  async mounted() {
    // /// apuusss
    // this.bankVerification = {
    //   userID: "faushang0209",
    //   pin: "654321"
    // };
    // ///

    //get uploaded data
    const docs = await this.getDocuments();

    //set image
    for (let item of this.defaultVal) {
      this.setImage(docs, item.key);
    }

    // load image icon
    for (let item of this.defaultVal) {
      item.src = require(`../assets/${item.imgUrl}`);
    }

    //load image for bank
    this.bankVerificationBtn.forEach(bank => {
      bank.img = require(`@/assets/${bank.src}`);
      bank.tryCount = 0;
    });

    //get setting payslip
    // ga tau napa broken
    // this.payslipSetting = await this.getPayslipSetting();
    // if (this.payslipSetting === false) {
    //   const i = this.defaultVal.findIndex(x => x.value == "slipGaji");
    //   this.defaultVal[i].required = this.payslipSetting;
    // }
    this.requiredFileCount = this.defaultVal.filter(x => x.required).length;
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
.titleBlock {
  margin-top: 30px;
  display: block;
  font-size: 16px;
  text-align: center;
  margin-bottom: 15px;
}
.divBlock {
  margin-top: 10px;
  display: block;
  font-weight: bold;
  margin-bottom: 10px;
}
.smallPadding {
  padding: 5px !important;
}
.marginTopBottom {
  margin-top: 10px;
  margin-bottom: 10px;
}
.buttonNext {
  margin-top: 25px;
  margin-bottom: 25px;
}
/* .dropzone-custom-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.dropzone-custom-title {
  margin-top: 0;
  color: #00b782;
}

.subtitle {
  color: #314b5f;
} */
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
.btnVerification {
  width: 100%;
  height: 60px;
}
.verticalLine {
  width: 2px;
  background-color: #d3d3d3;
  height: 100%;
  float: left;
}
.infotext {
  color: rgb(117, 117, 117);
  font-size: 10px;
  text-align: center;
  padding-top: 20px;
}
</style>
// @vdropzone-complete="afterComplete"
//this.$refs.dogDropzone.processQueue()
//this.$refs.fileUploadZone.dropzone.processQueue();
