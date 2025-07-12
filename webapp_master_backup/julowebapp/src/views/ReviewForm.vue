<template>
  <div class="textHeader">
    <v-container grid-list-xl>
      <v-layout row wrap>
        <v-flex xs12 sm9 md6 offset-xs0 offset-sm2 offset-md3 v-for="(h, i) in headers" :key="i">
          <div class="center" style="padding-bottom: 15px;padding-top:15px;margin-right:15px;">
            <v-layout style="border: 1px solid #e5e5e5;padding-top:10px;margin-bottom:20px;">
              <v-flex xs4 class="smallPadding">
                <img :src="h.src" class="cardImage">
              </v-flex>
              <v-flex xs7 class="smallPadding">
                <div style="margin-top:17px;font-size: 16px;">{{h.group}}</div>
              </v-flex>
              <v-flex xs2 class="smallPadding">
                <router-link tag="div" :to="`/${h.segment}`" class="smallBtn">
                  <label>Edit</label>
                </router-link>
                <!-- <j-btn depressed @click="goto(h)" class="smallPadding smallBtn">edit</j-btn> -->
                <!-- <j-btn flat icon style="margin: 0px !important;" @click="goto(h)">
                  <v-icon>edit</v-icon>
                </j-btn>-->
              </v-flex>
            </v-layout>
            <v-layout wrap>
              <v-flex
                v-for="(item, j) in h.items"
                :key="j"
                class="smallPadding"
                v-bind="{ [`xs${item.half ? '6': '12'}`]: true }"
              >
                <div v-if="item.type === 'label'">
                  <label class="divBlock">{{item.text}}</label>
                </div>
                <div style="margin-bottom:7px;" v-else-if="item.type == 'textdual'">
                  <v-layout style="margin-left:1px;">
                    <v-flex xs3 text-xs-center style="padding:0px !important;">
                      <div style="margin-top:5px;border-radius: 4px;border: 1px solid #e5e5e5;">
                        <div
                          class="labelInput"
                          style="margin-top:7px;margin-bottom:7px;"
                        >{{item.text}}</div>
                      </div>
                    </v-flex>
                    <v-flex xs9 style="padding:5px 20px 0px 0px !important;">
                      <v-text-field
                        prefix="Rp. "
                        outline
                        placeholder="0,-"
                        v-model="data[h.segment][item.value]"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </div>
                <div v-else>
                  <label class="labelInput">{{item.text}}</label>
                  <div style="margin-bottom:7px;" v-if="item.type == 'date'">
                    <v-text-field
                      outline
                      readonly
                      v-model="data[h.segment][item.value]"
                      append-icon="event"
                    ></v-text-field>
                  </div>
                  <div v-else-if="item.type == 'radio'">
                    <v-radio-group row v-model="data[h.segment][item.value]" readonly>
                      <v-radio
                        color="#00acf0"
                        v-for="(ds,k) in item.dataSource"
                        :key="k"
                        :label="ds.text"
                        :value="ds.value"
                      ></v-radio>
                    </v-radio-group>
                  </div>
                  <div v-else-if="item.type == 'select'">
                    <v-text-field
                      outline
                      readonly
                      v-model="data[h.segment][item.value]"
                      append-icon="arrow_drop_down"
                    ></v-text-field>
                  </div>
                  <div v-else-if="item.type == 'btnBank'">
                    <j-btn
                      outline
                      color="#D3D3D3"
                      class="btnVerification"
                      v-for="(bank,k) in bankVerificationBtn"
                      :key="k"
                      v-if="bank.text == data[h.segment][item.value]"
                    >
                      <v-layout row>
                        <v-flex xs4 style="text-align: right !important; padding-top:17px;">
                          <img :src="bank.img" style="height:25px;max-width:100px;">
                        </v-flex>
                        <v-flex xs1>
                          <div style="text-align:center; padding-left:10px;">
                            <div class="verticalLine" style="height: 30px;"></div>
                          </div>
                        </v-flex>
                        <v-flex xs6 style="text-align: left !important; padding-top:17px;">
                          <span
                            style="text-transform: none; color: black; font-size:16px;"
                          >{{bank.text}}</span>
                        </v-flex>
                      </v-layout>
                    </j-btn>
                  </div>
                  <div v-else-if="item.type == 'image'" style="margin-bottom:10px;">
                    <img
                      :src="data[h.segment][item.value]"
                      style="width:200px;display: block; margin-left: auto; margin-right: auto;"
                    >
                  </div>
                  <div style="margin-bottom:7px;" v-else-if="item.type == 'currency'">
                    <v-text-field
                      outline
                      readonly
                      v-model="data[h.segment][item.value]"
                      prefix="Rp. "
                      placeholder="0,-"
                    ></v-text-field>
                  </div>
                  <div style="margin-bottom:7px;" v-else>
                    <v-text-field outline readonly v-model="data[h.segment][item.value]"></v-text-field>
                  </div>
                </div>
              </v-flex>
            </v-layout>
          </div>
          <!-- <div class="buttonNext">
            <v-divider></v-divider>
          </div>-->
        </v-flex>
        <v-flex xs12 sm8 md6 offset-xs0 offset-sm2 offset-md3>
          <v-divider></v-divider>
          <!-- <div>Dengan menekan “kirim” saya menyetujui Syarat & Ketentuan dan Kebijakan Privasi JULO</div> -->
          <div style="margin-top:20px;margin-bottom:20px;margin-right:15px;">
            <v-checkbox v-model="accept1" color="#00acf0">
              <div slot="label">
                Saya telah membaca dan menyentujui
                <a
                  href="https://www.julo.co.id/terms-and-conditions.html"
                >Syarat & Ketentuan</a> dan
                <a href="https://www.julo.co.id/privacy-policy.html">Kebijakan Privasi</a> JULO
              </div>
            </v-checkbox>
            <v-checkbox
              color="#00acf0"
              label="Saya setuju dengan pemeriksaan dan validasi data pribadi saya."
              v-model="accept2"
            ></v-checkbox>
          </div>
          <j-btn
            depressed
            large
            block
            @click="sendData"
            :color="(accept1 && accept2) ? 'colorbutton' : 'grey'"
            :dark="(accept1 && accept2)"
            :outline="!(accept1 && accept2)"
            :disabled="!(accept1 && accept2)"
            style="margin-bottom:30px;"
          >Kirim Formulir</j-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import _ from "lodash";
import jsonpack from "jsonpack";
import LZString from "lz-string";
import localforage from "localforage";
import enums from "../enums";
import base64ToBlobToFile from "../helper/base64ToBlobToFile";
import statusCodeMappingRoute from "../helper/statusCode";
import parseCurrencyToInt from "../helper/parseCurrencytoInt";
const { types } = enums;
const now = new Date();

export default {
  data() {
    return {
      data: {
        bankVerificationBtn: enums.banklist,
        personalData: {}
      },
      headers: [],
      rawData: {},
      accept1: false,
      accept2: false
    };
  },
  methods: {
    ...mapActions(["saveForm", "saveDoc", "browserData"]),
    ...mapMutations([
      types.REMOVE_LOCALSTORAGE_FORM,
      types.ACTIVATE_LOADING,
      types.DEACTIVATE_LOADING
    ]),
    // goto: function(h) {
    //   const { group, stepper } = h;
    //   const to = {
    //     name: "formulirPengajuan",
    //     hash: `#${_.camelCase(group)}`,
    //     params: { stepper, rawData: this.rawData }
    //   };
    //   this.$router.push(to);
    // },
    sendData: async function() {
      this[types.ACTIVATE_LOADING]();
      //send db
      //SAVE KTP
      const uploaddocumentCheck = await this.saveDoc({
        key: this.fotoKtp.key,
        file: this.fotoKtp.file
      });

      //save data form

      const data = { ...this.data };
      //removing formating in currency
      for (let formi in data) {
        for (let i in data[formi]) {
          data[formi][i] = parseCurrencyToInt(data[formi][i]);
        }
      }
      if (uploaddocumentCheck) {
        const browserData = await this.browserData("update_application");
        if (browserData) {
          const statusCode = await this.saveForm(data);
          if (statusCode) {
            const routename = statusCodeMappingRoute(statusCode);
            //delete form data
            this[types.REMOVE_LOCALSTORAGE_FORM]();
            await localforage.removeItem("fotoKtp");
            this.$router.push({ name: routename });
          }
        }
      }
      this[types.DEACTIVATE_LOADING]();
    }
  },
  beforeMount() {
    if (!_.isEmpty(this.$route.params)) {
      this.data = this.$route.params.data;
      this.headers = this.$route.params.headers;
      this.rawData = this.$route.params.rawData;
      this.bankVerificationBtn = enums.banklist;
    } else if (localStorage.reviewForm) {
      const reviewForm = JSON.parse(localStorage.reviewForm);
      this.data = reviewForm.data;
      this.headers = reviewForm.headers;
    }
    // } else if (localStorage.form) {
    //   this.rawData = JSON.parse(localStorage.form);

    //   ///apus aja
    //   this.data = JSON.parse(localStorage.data);
    //   this.headers = JSON.parse(localStorage.headers);
    //   this.bankVerificationBtn = enums.banklist;
    // }
  },
  watch: {
    accept1: function(val) {
      const action = `Checkbox: "Saya telah membaca dan menyentujui Syarat & Ketentuan dan Kebijakan Privasi JULO", clicked: ${
        val ? "checked" : "unchecked"
      }`;
      const obj = this.$navlog.mappingObj(this.$route.name, action);
      this.$navlog.save(obj);
    },
    accept2: function(val) {
      const action = `Checkbox: "Saya setuju dengan pemeriksaan dan validasi data pribadi saya", clicked: ${
        val ? "checked" : "unchecked"
      }`;
      const obj = this.$navlog.mappingObj(this.$route.name, action);
      this.$navlog.save(obj);
    }
  },
  async mounted() {
    this.$emit("makeBgTransparent", false);
    this.$emit("makeisSubPage", {
      text: "Review",
      url: "formhead"
    });

    //this.$emit("makeBgExpand", "../assets/Header Image/Form.jpg");
    // if (localStorage.fotoKtp) {
    //   const fotoKtp = JSON.parse(LZString.decompress(localStorage.fotoKtp));

    //const fotoKtp = JSON.parse(localStorage.fotoKtp);
    const fotoKtp = await localforage.getItem("fotoKtp");
    if (fotoKtp && fotoKtp.appId == localStorage.appId) {
      //const fotoKtp = jsonpack.unpack(localStorage.fotoKtp);
      const file = await base64ToBlobToFile(fotoKtp.src);
      this.fotoKtp = {
        ...fotoKtp,
        file
      };
    }
  }
};
</script>

<style scoped>
.smallPadding {
  padding-left: 5px !important;
  padding-right: 5px !important;
  padding-top: 0px !important;
  padding-bottom: 2px !important;
}
/* .divBlock {
  margin-top: 10px;
  display: block;
  font-weight: bold;
  margin-bottom: 10px;
} */
.buttonNext {
  margin-top: 25px;
  margin-bottom: 25px;
}
.btnVerification {
  width: 98%;
  height: 60px;
}
.verticalLine {
  width: 2px;
  background-color: #d3d3d3;
  height: 100%;
  float: left;
}
.cardImage {
  width: 60px;
  height: 60px;
  object-fit: contain;
  margin-left: 10px;
}

.smallBtn {
  margin-top: 17px;
  width: 30px;
  color: grey;
}
.smallBtn > label {
  cursor: pointer;
}
</style>
