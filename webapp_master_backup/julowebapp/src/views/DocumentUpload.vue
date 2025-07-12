<template>
  <div>
    <div :class="reviewMode ? 'header headerReview' : 'header'">
      <span v-if="reviewMode">Review</span>Dokumen Pribadi
    </div>
    <div class="titleBlock">Ayo selesaikan tahap akhir formulir ini</div>
    <v-layout row wrap style="margin-bottom: 30px;">
      <v-flex xs12 sm9 md6 offset-xs0 offset-sm2 offset-md3 v-for="(h,i) in headers" :key="i">
        <v-layout>
          <v-flex xs11>
            <span class="divBlock" :id="toCamalCase(h.group)">{{h.group}}</span>
          </v-flex>
          <v-flex xs1 v-if="reviewMode">
            <j-btn
              flat
              icon
              style="margin: 0px !important;"
              @click="toReviewMode(toCamalCase(h.group))"
            >
              <v-icon>edit</v-icon>
            </j-btn>
          </v-flex>
        </v-layout>
        <div v-for="(item,j) in h.items" :key="j" class="marginTopBottom">
          <label>{{item.text}}</label>
          <small v-if="item.smallText">{{item.smallText}}</small>
          <div v-show="!reviewMode">
            <vue-dropzone
              :options="item.options"
              :id="`dropzone${item.value}`"
              :ref="`dropzone${item.value}`"
              class="smallPadding"
              :useCustomSlot="true"
              @vdropzone-success="dropZoneSuccess"
              @vdropzone-file-added="(file) => dropZoneFileAdded(file, i, j)"
              @vdropzone-drop="dropZoneDrop"
              @vdropzone-error="(file, message, xhr) =>dropZoneErr(file, message, xhr, i, j)"
              @vdropzone-removed-file="(file) => dropZoneRemove(file, i, j)"
            >
              <div class="dropzone-custom-content">
                <v-icon x-large>cloud_upload</v-icon>
                <h4 class="dropzone-custom-title">Drag and drop</h4>or
                <div>Klik untuk memilih file dari komputer Anda</div>
              </div>
            </vue-dropzone>

            <div style="color:red;">
              <div v-for="(err, k) in item.errorMessage" :key="k">
                <span v-if="err">{{err.message}}</span>
              </div>
            </div>
          </div>
          <div v-show="reviewMode">
            <div v-for="(file) in item.files" :key="file.key">
              <img
                :src="file.src"
                style="height: 200px; max-width: 100%; text-align:center;"
                v-if="file.src"
              >
              <div
                v-if="file.name"
                style="text-align:center; width:100%;height: 200px; padding-top:95px; background-color:white;border: 2px solid #E5E5E5;"
              >{{file.name}}</div>
            </div>
          </div>
        </div>
        <div class="buttonNext">
          <v-divider></v-divider>
        </div>
      </v-flex>
      <v-flex xs12 sm9 md6 offset-xs0 offset-sm2 offset-md3 style="margin-top:30px;">
        <div
          v-if="reviewMode"
        >Dengan menekan “kirim” saya menyetujui Syarat & Ketentuan dan Kebijakan Privasi JULO</div>
        <div v-else style="text-align: center;">Pastikan Seluruh data yang anda masukan benar.</div>
        <j-btn
          block
          color="primary"
          dark
          @click="saveData"
          style="margin-top:30px;"
          v-if="!reviewMode"
        >Lanjutkan</j-btn>
        <j-btn block color="primary" dark @click="sendData" style="margin-top:30px;" v-else>Kirim</j-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import statusCodeMappingRoute from "../helper/statusCode";

import vueDropzone from "vue2-dropzone";

const dropzoneOptions = {
  url: "https://httpbin.org/post",
  thumbnailWidth: 200,
  addRemoveLinks: true,
  maxFiles: 1,
  autoProcessQueue: false,
  clickable: true
};
export default {
  data() {
    return {
      successCount: 0,
      dataCount: 0,
      errCount: 0,
      reviewMode: false,
      headers: [
        {
          group: "Dokumen Identitas",
          items: [
            {
              key: "ktp",
              text: "Foto KTP",
              value: "ktp",
              options: dropzoneOptions
            },
            {
              key: "kk",
              text: "Foto Kartu Keluarga",
              smallText: "(Tidak Wajib)",
              value: "kk",
              options: dropzoneOptions
            }
          ]
        },
        {
          group: "Dokumen Keuangan",
          items: [
            {
              key: "slip_gaji",
              text: "Foto slip gaji bulan ini / bulan lalu",
              value: "slipGaji",
              options: dropzoneOptions
            },
            {
              key: "batch",
              text: "Kartu ID pegawai",
              smallText: "(Tidak Wajib)",
              value: "idCard",
              options: dropzoneOptions
            }
          ]
        },
        {
          group: "Dokumen Foto Diri",
          items: [
            {
              key: "selfie",
              text: "Foto anda dan KTP anda",
              value: "youKtp",
              options: dropzoneOptions
            }
          ]
        }
      ]
    };
  },
  components: { vueDropzone },
  methods: {
    ...mapActions(["saveDoc", "notifyDocumentDone", "getDocuments"]),
    ...mapGetters(["nextStatusCode"]),
    toCamalCase: function(data) {
      return _.camelCase(data);
    },
    dropZoneErr: function(file, message, xhr, i, j) {
      let errorMessage = this.headers[i].items[j].errorMessage;
      if (!errorMessage) {
        errorMessage = [];
      }
      errorMessage.push({ message, id: file.upload.uuid });
      this.$set(this.headers[i].items, j, {
        ...this.headers[i].items[j],
        errorMessage
      });
    },
    dropZoneRemove: function(file, i, j) {
      if (this.headers[i].items[j].errorMessage) {
        if (this.headers[i].items[j].errorMessage.length > 0) {
          const k = this.headers[i].items[j].errorMessage.findIndex(x => {
            return x.id == file.upload.uuid;
          });
          if (k != -1) {
            let errorMessage = this.headers[i].items[j].errorMessage;
            errorMessage.splice(k, 1);
            this.$set(this.headers[i].items, j, {
              ...this.headers[i].items[j],
              errorMessage
            });
          }
        }
      }
    },
    dropZoneFileAdded: function(file, i, j) {
      let files = this.headers[i].items[j].file;
      if (!files) {
        files = [];
      }
      const typeFile = file.type.split("/");
      if (typeFile[0] == "image") {
        var reader = new FileReader();
        reader.onload = e => {
          files.push({
            src: e.target.result,
            file,
            key: this.headers[i].items[j].key
          });
          this.$set(this.headers[i].items, j, {
            ...this.headers[i].items[j],
            files
          });
        };
        reader.readAsDataURL(file);
      } else {
        files.push({
          name: file.name,
          file,
          key: this.headers[i].items[j].key
        });
        this.$set(this.headers[i].items, j, {
          ...this.headers[i].items[j],
          files
        });
      }
    },
    saveData: function() {
      this.errCount = 0;
      for (var i in this.headers) {
        for (var j in this.headers[i].items) {
          let item = this.headers[i].items[j];
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
              this.$set(this.headers[i].items, j, {
                ...this.headers[i].items[j],
                errorMessage: item.errorMessage
              });
            }
          } else {
            if (
              this.$refs[`dropzone${item.value}`][0].getRejectedFiles().length >
              0
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
                  this.$set(this.headers[i].items, j, {
                    ...this.headers[i].items[j],
                    errorMessage: item.errorMessage
                  });
                }
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
            // this.headers.forEach(h=>{
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
    sendData: async function() {
      // this.headers.forEach(h => {
      //   h.items.forEach(item => {
      //     this.$refs[`dropzone${item.value}`][0].processQueue();
      //     this.dataCount++;
      //   });
      // });
      const fileProcess = [];
      for (let h of this.headers) {
        if (h.items) {
          for (let item of h.items) {
            if (item.files) {
              for (let file of item.files) {
                fileProcess.push(
                  this.saveDoc({ key: file.key, file: file.file })
                );
              }
            }
          }
        }
      }
      const result = await Promise.all(fileProcess);
      if (result) {
        //get statusCode
        const statusCode = await this.notifyDocumentDone();
        const routename = statusCodeMappingRoute(statusCode);
        this.$router.push({ name: routename });
      }
      // this.headers.forEach(async h => {
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
    dropZoneDrop: function(event) {
      if (this.reviewMode) {
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
    },
    dropZoneSuccess: function() {
      this.successCount++;
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
    }
  },
  async mounted() {
    const docs = await this.getDocuments();
    const ktp = docs.filter(x => x.image_type === "ktp");
    if (ktp) {
    }
  }
};
</script>

<style scoped>
.header {
  height: 240px;
  padding-top: 130px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background: linear-gradient(
      to bottom right,
      rgb(95, 59, 142, 0.7) 0%,
      rgb(135, 65, 116, 0.7) 100%
    ),
    url("../assets/Header Image/Form.jpg") no-repeat center center;
  /* background-repeat: no-repeat;
  background-size: 100%; */
  background-size: 100% auto;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
.headerReview {
  background: linear-gradient(
      to bottom right,
      rgb(31, 136, 209, 0.7) 0%,
      rgb(62, 99, 177, 0.7) 100%
    ),
    url("../assets/Header Image/Form.jpg") no-repeat center center;
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
</style>
// @vdropzone-complete="afterComplete"
//this.$refs.dogDropzone.processQueue()
//this.$refs.fileUploadZone.dropzone.processQueue();
