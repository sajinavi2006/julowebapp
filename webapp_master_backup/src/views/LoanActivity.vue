<template>
  <div>
    <!-- <div class="header">
      Pengajuan Anda
      <div>
        <small>Status terakhir pengajuan Anda</small>
      </div>
    </div>-->
    <v-container grid-list-xl style="margin-top: 30px;">
      <v-layout row>
        <v-flex xs12 sm8 md6 offset-xs0 offset-sm2 offset-md3>
          <!-- loan -->
          <v-card class="card-separator">
            <v-layout column class="text-center">
              <v-flex xs6 class="loan-product">{{product.label}}</v-flex>
              <v-flex xs6>
                <v-layout row>
                  <v-flex xs4>
                    <div>
                      <small>Status</small>
                    </div>
                    <span
                      :class="{
                        primaryColor: loan.loan_status_label.toLowerCase() == 'lancar',
                        'error--text': loan.loan_status_label.toLowerCase() == 'terlambat' }"
                    >{{loan.loan_status_label}}</span>
                  </v-flex>
                  <v-flex xs4 @click="showDialog('loan')">
                    <div>
                      <small>Cicilan</small>
                    </div>
                    <div>{{unpaidPayment.due_amount | currency('Rp. ', 0, { thousandsSeparator: '.' })}}</div>
                  </v-flex>
                  <v-flex xs4>
                    <div v-if="loan.loan_status_label.toLowerCase() == 'lancar'">
                      <small>Bayar lagi dalam</small>
                    </div>
                    <div
                      v-else-if="loan.loan_status_label.toLowerCase() == 'terlambat'"
                    >Anda Terlambat</div>
                    <div>
                      <span
                        :class="{'error--text': loan.loan_status_label.toLowerCase() == 'terlambat'}"
                      >{{daysLeft}} Hari</span>
                    </div>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-card>
          <!-- loan -->

          <!-- cashback -->
          <div v-if="product.type == 'MTL'">
            <v-card class="text-center card-separator" @click="cashbackDialog=true">
              <div
                class="table-column"
              >Cashback yang terkumpul: {{loan.cashback_earned_total | currency('Rp. ', 0, { thousandsSeparator: '.' })}}</div>
              <div style="margin: 0px 20px;">
                <v-progress-linear v-model="installmentPercent"></v-progress-linear>
              </div>
            </v-card>
          </div>
          <!-- cashback -->

          <!-- payment method -->
          <div class="card-separator">
            <div class="card-separator table-column">
              <span>Metode Pembayaran</span>
              <hr
                style="margin-left:5px; margin-right:5px; width: calc(100% - 223px); display:inline-block;"
              />
              <a
                href="https://www.julo.co.id/cara-membayar.html"
                style="display:inline;"
                target="_blank"
              >Cara bayar ></a>
            </div>
            <v-card class="card-separator">
              <v-layout wrap row>
                <v-flex xs3 style="margin-left: 10px;" class="no-indent">
                  <img :src="paymentMethod.image_logo_url" style="width: 100%;" />
                </v-flex>

                <v-flex xs7 style="margin: auto 10px;" class="no-indent">
                  Transfer ke
                  <span class="primaryColor">{{paymentMethod.bank_virtual_name}}</span>
                </v-flex>
                <v-flex
                  xs3
                  class="no-indent"
                  style="margin-left:calc(3vh + 5px);"
                  v-if="paymentMethod.bank_code"
                >Kode Bank</v-flex>
                <v-flex
                  xs8
                  class="no-indent"
                  v-if="paymentMethod.bank_code"
                >{{paymentMethod.bank_code}}</v-flex>

                <v-flex
                  xs3
                  class="no-indent"
                  style="margin-left:calc(3vh + 5px);"
                  v-if="paymentMethod.bank_code"
                >Nomer VA</v-flex>
                <v-flex xs8 class="no-indent" v-if="paymentMethod.bank_code">
                  <div
                    v-clipboard:copy="paymentMethod.virtual_account"
                    v-clipboard:success="copyVASuccess"
                    style="background-color: #00acf0; width: 90%; padding: 3px; color: white; border-radius: 2px;"
                  >
                    <strong>{{paymentMethod.virtual_account.match(/.{1,4}/g).join(" ")}}</strong>
                    <v-icon small dark style="padding-left: 15px;">filter_none</v-icon>
                  </div>
                </v-flex>

                <v-flex
                  style="margin-left:20px;"
                  xs5
                  class="no-indent"
                  v-if="!paymentMethod.bank_code"
                >Kode Pembayaran</v-flex>
                <v-flex
                  xs6
                  class="no-indent"
                  v-if="!paymentMethod.bank_code"
                >{{paymentMethod.virtual_account}}</v-flex>
                <v-flex xs12>
                  <j-btn
                    block
                    style="width: 90%; margin:6px 5%;"
                    class="text-center"
                    outline
                    color="#00acf0"
                    @click="paymentMethodDialog = true"
                  >Pilih Metode Lain</j-btn>
                </v-flex>
              </v-layout>
            </v-card>
          </div>
          <!-- payment method -->

          <!-- disbursement -->
          <v-card class="card-separator" @click="showDialog('disbursement')">
            <h4 class="title-text">Pencairan</h4>
            <div class="card-inside">
              <v-layout row>
                <v-flex xs2 class="circle-wrap-2" style="padding-bottom: 3px !important;">
                  <v-icon large color="#00acf0">check_circle_outline</v-icon>
                </v-flex>
                <v-flex xs5 style="padding-bottom: 3px !important;">
                  <div>
                    <small>Tanggal Pencairan</small>
                  </div>
                  <div>{{moment(loan.fund_transfer_ts).locale('id').format("DD MMM YYYY")}}</div>
                </v-flex>
                <v-flex xs4 style="padding-bottom: 3px !important;">
                  <div>
                    <small>Jumlah</small>
                  </div>
                  <div>{{loan.loan_disbursement_amount | currency('Rp. ', 0, { thousandsSeparator: '.' })}}</div>
                </v-flex>
              </v-layout>
            </div>
          </v-card>
          <!-- disbursement -->

          <div class="separator"></div>

          <!-- repayment -->
          <v-card class="card-separator">
            <v-layout row>
              <v-flex xs9 class="no-indent left-indent">
                <h4 class="title-text">Pembayaran</h4>
              </v-flex>
              <v-flex xs1 class="title-indent">
                <v-icon
                  small
                  :color="(paidPaymentCount/payments.length) == 1 ? '#00acf0' : 'grey'"
                >check_circle_outline</v-icon>
              </v-flex>
              <v-flex xs1 class="title-indent">{{paidPaymentCount}}/{{payments.length}}</v-flex>
            </v-layout>
            <div
              v-for="(p,i) in payments"
              :key="i"
              :class="{'card-inside':true, 'card-red': !p.payment_status_label.toLowerCase().includes('lunas') && p.payment_status_label.toLowerCase().includes('terlambat') }"
            >
              <v-layout row>
                <v-flex
                  xs1
                  class="circle-wrap small-bottom-indent"
                  @click="showDialog('repayment',p)"
                >
                  <v-icon color="#00acf0" v-if="p.status >=330">check_circle_outline</v-icon>
                  <div class="circle" v-else>{{p.payment_number}}</div>
                </v-flex>
                <v-flex xs8 class="small-bottom-indent" @click="showDialog('repayment',p)">
                  <v-layout column>
                    <v-flex class="small-bottom-indent" style="padding-right: 0px;">
                      <v-layout row class="small-left-indent top-indent">
                        <v-flex xs6 class="no-indent">
                          <div>
                            <small>Jatuh Tempo</small>
                          </div>
                          <div
                            :class="!p.payment_status_label.toLowerCase().includes('lunas') && p.payment_status_label.toLowerCase().includes('terlambat') ? 'error--text' : ''"
                          >{{ moment(p.due_date).locale('id').format("DD MMM YYYY")}}</div>
                        </v-flex>
                        <v-flex xs6 class="no-indent">
                          <div>
                            <small>Jumlah</small>
                          </div>
                          <div
                            :class="!p.payment_status_label.toLowerCase().includes('lunas') && p.payment_status_label.toLowerCase().includes('terlambat') ? 'error--text' : ''"
                          >{{(p.payment_status_label.toLowerCase().includes('lunas') ? p.paid_amount : p.due_amount) | currency('Rp. ', 0, { thousandsSeparator: '.' })}}</div>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex class="no-indent">
                      <hr />
                    </v-flex>
                    <!-- <v-flex class="small-indent" :xs6="p.paid_date">
                      <div>
                        <small>Status</small>
                      </div>
                      <div>{{p.payment_status_label}}</div>
                    </v-flex>
                    <v-flex class="small-indent" v-if="p.paid_date" xs6>
                      <div>
                        <small>Tanggal</small>
                      </div>
                      <div>{{p.paid_date}}</div>
                    </v-flex>-->
                    <v-flex class="small-bottom-indent" style="padding-right: 0px;">
                      <v-layout row>
                        <v-flex :xs6="p.paid_date" class="no-indent">
                          <div>
                            <small>Status</small>
                          </div>
                          <div
                            :class="!p.payment_status_label.toLowerCase().includes('lunas') && p.payment_status_label.toLowerCase().includes('terlambat') ? 'error--text' : ''"
                          >{{p.payment_status_label}}</div>
                        </v-flex>
                        <v-flex xs6 class="no-indent" v-if="p.paid_date">
                          <div>
                            <small>Tanggal</small>
                          </div>
                          <div>{{ moment(p.paid_date).locale('id').format("DD MMM YYYY")}}</div>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs3 class="circle-wrap-2" style="padding: 0px;">
                  <div v-if="getPaymentImage(p.id)">
                    <img
                      :src="getPaymentImage(p.id).image_url_api"
                      style="max-width: 90%; max-height: 120px;"
                    />
                  </div>
                  <vue-dropzone
                    v-else
                    :options="dropzoneOptions"
                    id="dropzonefotoktp"
                    ref="dropzonefotoktp"
                    class="no-indent"
                    style="border: none; min-height: auto; width: 90%;"
                    useCustomSlot
                    @vdropzone-file-added="file=>dropZoneFileAdded(file, p.id)"
                  >
                    <div class="dropzone-custom-content" @click="dropZoneClick(p.id)">
                      <v-btn
                        fab
                        dark
                        color="#00acf0"
                        style="width: 50px; height: 50px; margin-left: 0px !important; margin-right: 0px !important;"
                      >
                        <v-icon large dark>cloud_upload</v-icon>
                      </v-btn>
                    </div>
                  </vue-dropzone>
                </v-flex>
              </v-layout>
            </div>
          </v-card>
          <!-- repayment -->
        </v-flex>
      </v-layout>

      <!-- dialog -->
      <v-dialog v-model="dialogIsShow" width="300px">
        <v-card>
          <div class="card-title">{{dialog.title}}</div>
          <v-card-text v-html="dialog.content"></v-card-text>
        </v-card>
      </v-dialog>
      <!-- dialog -->

      <!-- payment method dialog -->
      <v-dialog v-model="paymentMethodDialog" fullscreen>
        <v-card style="background-color:#fafafa;">
          <v-toolbar class="bgToolbar" style="    box-shadow: none;">
            <v-btn flat icon color="white" @click="paymentMethodDialog= false">
              <v-icon>arrow_back</v-icon>
            </v-btn>

            <v-toolbar-title class="white--text" style="font-size:16px; ">Metode Pembayaran</v-toolbar-title>
          </v-toolbar>
          <v-card style="padding: 15px;">Pilih salah satu metode pembayaran Anda</v-card>
          <v-container grid-list-xl>
            <v-layout row>
              <v-flex xs12 sm8 md6 offset-xs0 offset-sm2 offset-md3>
                <div v-for="(p, i) in paymentMethods" :key="i" @click="choosePaymentMethod(p)">
                  <v-card class="card-separator">
                    <v-layout wrap row>
                      <v-flex xs4 style="padding-bottom: 0px; margin-bottom: 0px;">
                        <img :src="p.image_logo_url" style="width: 100%;" />
                      </v-flex>
                      <v-flex
                        xs8
                        style="padding-bottom: 0px; margin-bottom: 0px; margin: auto;"
                      >Transfer ke {{p.bank_virtual_name}}</v-flex>
                      <v-flex xs4 class="left-indent" style="padding-top: 0px; margin-top: 0px;">
                        <div v-show="p.bank_code">Kode Bank</div>
                        <div>
                          <strong>{{p.bank_code}}</strong>
                        </div>
                      </v-flex>
                      <v-flex xs7 style="padding-top: 0px; margin-top: 0px;">
                        <div>{{p.bank_code ? 'Nomer VA' : 'Kode Pembayaran'}}</div>
                        <div>
                          <strong>{{p.virtual_account}}</strong>
                        </div>
                      </v-flex>
                    </v-layout>
                  </v-card>
                  <div class="separator"></div>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-dialog>
      <!-- payment method dialog -->

      <!-- cashback dialog -->
      <v-dialog v-model="cashbackDialog" width="350px">
        <v-card @click="cashbackDialog = false">
          <div style>
            <img
              src="../assets/il_cashback-mdpi.png"
              style="width:120px; display: block; margin:auto; padding-top: 20px;"
            />
          </div>

          <div class="card-title">Cashback {{product.label}}</div>
          <v-card-text>
            <div>
              Sukses Terkumpul:
              <br />
              <span
                class="primaryColor"
              >{{loan.cashback_earned_total | currency('Rp. ', 0, { thousandsSeparator: '.' })}}</span>
              <br />
              <br />
              <span style="color: red;">*</span>
              cashback dapat digunakan setelah seluruh pinjaman terbayar lunas
            </div>
            <br />
            <hr />
            <div style="font-size:14px;">Perhitungan</div>
            <div class="card-inside">
              Total cashback yang dapat dicapai ketika seluruh cicilan dibayar
              <br />
              <br />5 hari sebelum jatuh tempo:
              <br />
              <strong>3% dari total pinjaman</strong>
              <br />
              <br />3% dari total pinjaman:
              <br />
              <strong>3% dari total pinjaman</strong>
              <br />
              <br />tepat pada jatuh tempo:
              <br />
              <strong>1% dari total pinjaman</strong>
              <br />
              <br />
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>
      <!-- cashback dialog -->
    </v-container>
  </div>
</template>

<script>
("use strict");
import Vue from "vue";
import { mapActions, mapMutations, mapState } from "vuex";
import moment from "moment";
import vueDropzone from "vue2-dropzone";
import mapProduct from "../helper/mapProduct";
import enums from "../enums";
const { types, url } = enums;

const nearestPayment = payments => {
  return payments
    .filter(x => x.status < 330)
    .sort((x, y) => x.payment_number - y.payment_number);
};

export default {
  components: { vueDropzone },
  data() {
    return {
      cashbackDialog: false,
      dialog: {},
      dialogIsShow: false,
      paymentMethodDialog: false,
      installmentPercent: 75,
      //loan: {
      // id: 3000001242,
      // status: 220,
      // cashback_monthly: 11250,
      // late_fee_amount: 67500.0,
      // interest_rate_monthly: 0.05,
      // loan_status_label: "LANCAR",
      // cdate: "2019-06-19T11:40:38.566499Z",
      // udate: "2019-06-21T10:33:06.362199Z",
      // loan_amount: 4500000,
      // loan_duration: 4,
      // sphp_sent_ts: "2019-06-19T11:40:50.534858Z",
      // sphp_accepted_ts: "2019-06-19T11:47:42.866687Z",
      // first_installment_amount: 1290000,
      // installment_amount: 1350000,
      // cashback_earned_total: 33750,
      // initial_cashback: 0,
      // loan_disbursement_amount: 4275000,
      // loan_disbursement_method: null,
      // fund_transfer_ts: "2019-06-19T11:54:18.756231Z",
      // julo_bank_name: "PERMATA Bank",
      // julo_bank_branch: "",
      // julo_bank_account_number: "87733220736663",
      // cycle_day: 11,
      // cycle_day_change_date: null,
      // cycle_day_requested: null,
      // cycle_day_requested_date: null,
      // is_ignore_calls: false,
      // name_bank_validation_id: 498,
      // disbursement_id: 492,
      // application: 2000004694,
      // offer: 1297,
      // product: 41,
      // application_xid: null,
      // agent: null,
      // agent_2: null,
      // agent_3: null,
      // partner: null
      //},
      paymentMethod: {},
      paymentMethods: [],
      payments: [],
      paymentImages: [],
      product: "",
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 200,
        addRemoveLinks: true,
        maxFiles: 1,
        autoProcessQueue: false,
        clickable: true
      },
      unpaidPayment: {}
    };
  },
  computed: {
    ...mapState(["loan", "application"]),
    daysLeft: function() {
      // const todayDate = moment().day();
      // let days = moment().daysInMonth() - todayDate + this.loan.cycle_day;
      // if (todayDate <= this.loan.cycle_day) {
      //   days = this.loan.cycle_day - todayDate;
      // }
      // return todayDate;

      const dueDate = moment(this.unpaidPayment.due_date);
      // console.log(this.unpaidPayment.due_date);
      // console.log(dueDate.fromNow("dd"));
      // return dueDate.fromNow("dd").split(" ")[0];
      const now = moment();
      const diff = dueDate.diff(now, "days", true);
      return Math.abs(diff < 0 ? Math.floor(diff) : Math.ceil(diff));
    },
    paidPaymentCount: function() {
      return this.payments.filter(x => x.status >= 330).length;
    },
    dialogTexts: function() {
      return {
        loan: () => {
          const loanAmount = this.$options.filters.currency(
            this.loan.installment_amount,
            "Rp. ",
            0,
            { thousandsSeparator: "." }
          );
          const lateFeeAmount = this.$options.filters.currency(
            this.loan.late_fee_amount,
            "Rp. ",
            0,
            { thousandsSeparator: "." }
          );
          return {
            title: "Cicilan",
            content: `Bunga Anda per bulan adalah ${this.loan
              .interest_rate_monthly * 100}%.
            Cicilan Anda per bulan adalah ${loanAmount}.
            <br /><br />
            Cicilan dibayarkan lebih dari 4 hari setelah jatuh tempo akan dikenakan
            biaya keterlambatan sebesar ${lateFeeAmount}. Biaya keterlambatan akan
            dikenakan setiap bulan bila cicilan dibayarkan terlambat.`
          };
        },
        disbursement: () => {
          const loanAmount = this.$options.filters.currency(
            //this.loan.loan_amount,
            this.loan.loan_disbursement_amount,
            "Rp. ",
            0,
            { thousandsSeparator: "." }
          );
          return {
            title: "Pencairan",
            content: `Saat ini Anda dalam aktivitas pinjaman ${
              this.product.label
            } dengan detail pinjaman: <br/><br/>
            <p>Jumlah pinjaman:<br/> ${loanAmount}</p>
            <p>Lama cicilan pinjaman:<br/> ${this.loan.loan_duration} bulan</p>
            <p>Tanggal pencairan:<br/> ${moment(this.loan.fund_transfer_ts)
              .locale("id")
              .format("DD MMMM YYYY")}</p>`
          };
        },
        repayment: data => {
          const amount = this.$options.filters.currency(
            data.payment_status_label.toLowerCase().includes("lunas")
              ? data.paid_amount
              : data.due_amount,
            "Rp. ",
            0,
            { thousandsSeparator: "." }
          );
          return {
            title: `Pembayaran ke ${data.payment_number}`,
            content: `<p>Status Pembayaran:<br/> ${
              data.payment_status_label
            }</p>
          <p>Jumlah yang harus dibayarkan:<br/> ${
            data.paid_date ? "-" : amount
          }</p>
          <p>Tanggal maksimal pembayaran:<br/> ${moment(data.due_date)
            .locale("id")
            .format("DD MMMM YYYY")}</p>
          <p>Tanggal pembayaran Anda:<br/> ${
            data.paid_date
              ? moment(data.paid_date)
                  .locale("id")
                  .format("DD MMMM YYYY")
              : "-"
          }</p>`
          };
        }
      };
    }
  },
  methods: {
    ...mapActions([
      "getPaymentMethod",
      "getPayments",
      "getMTLCashback",
      "saveDoc",
      "getDocuments"
    ]),
    ...mapMutations([types.SET_ERROR, types.SET_SUCCESS]),
    mapProduct,
    dropZoneClick: function(id) {
      const action = `List: "RECEIPT_${id}", clicked item: position: 0, openDirectPhotoChooser`;
      const obj = this.$navlog.mappingObj(this.$route.name, action);
      this.$navlog.save(obj);
    },
    dropZoneFileAdded: async function(file, id) {
      //SAVE IMAGE
      const uploadDocCheck = await this.saveDoc({
        key: `RECEIPT_${id}`,
        file: file
      });
      if (uploadDocCheck) {
        //send ui success
        this[types.SET_SUCCESS]({
          message: "upload bukti pembayaran berhasil"
        });

        var reader = new FileReader();
        reader.onload = e => {
          this.paymentImages.push({
            image_type: `RECEIPT_${id}`,
            image_url_api: e.target.result
          });
        };
        reader.readAsDataURL(file);
      }
    },
    copyVASuccess: function() {
      this[types.SET_SUCCESS]({ message: "Nomor VA telah tersalin" });
    },
    getPaymentImage: function(id) {
      return this.paymentImages.find(x =>
        x.image_type.startsWith(`RECEIPT_${id}`)
      );
    },
    showDialog: function(i, data) {
      this.dialog = this.dialogTexts[i](data);
      this.dialogIsShow = true;
    },
    choosePaymentMethod: function(p) {
      this.paymentMethod = p;
      this.paymentMethodDialog = false;

      const action = `Payment method name : ${p.payment_method_name} - Payment bank code : ${p.bank_code} - Payment VA : ${p.bank_virtual_name}`;
      const obj = this.$navlog.mappingObj(this.$route.name, action);
      this.$navlog.save(obj);
    }
  },
  async mounted() {
    this.$emit("makeBgTransparent", false);

    const results = await Promise.all([
      this.getPaymentMethod(),
      await this.getPayments(),
      this.getDocuments()
    ]);
    this.paymentMethods = results[0];
    this.payments = results[1].sort(function(a, b) {
      return a.payment_number - b.payment_number;
    });
    const docs = results[2];
    this.paymentMethod =
      this.paymentMethods.find(x => x.is_preferred || x.is_primary) ||
      this.paymentMethods[0];

    // console.log("paymentMethods", this.paymentMethods);
    // console.log(
    //   "hahaha",
    //   this.paymentMethods.find(x => x.is_preferred || x.is_primary)
    // );
    // console.log("payments", this.payments);
    // console.log("loan", this.loan);
    // console.log("docs", docs);
    // docs[0].image_type = "RECEIPT_4000005837";
    this.paymentImages = docs;
    const unpaidPayments = nearestPayment(this.payments);
    if (unpaidPayments.length > 0) {
      this.unpaidPayment = unpaidPayments[0];
    }
    this.product = mapProduct(this.application.product_line);
    if (this.product.type == "MTL") {
      const cashback = await this.getMTLCashback();
      this.loan.cashback_earned_total = cashback.cashback;
      this.installmentPercent =
        (cashback.number_ontime_installment / cashback.installment_duration) *
        100;
    }
  },
  watch: {
    cashbackDialog: function(val) {
      let action = val ? "opened" : "closed";
      const obj = this.$navlog.mappingObj("cashback dialog", action);
      this.$navlog.save(obj);
    },
    dialogIsShow: function(val) {
      let action = val ? "Screen opened" : "Screen closed";
      const obj = this.$navlog.mappingObj(
        `${this.dialog.title} dialog`,
        action
      );
      this.$navlog.save(obj);
    },
    paymentMethodDialog: function(val) {
      let action = val ? "Screen opened" : "Screen closed";
      const obj = this.$navlog.mappingObj("paymentMethodDialog", action);
      this.$navlog.save(obj);
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
      rgb(0, 172, 240, 0.7) 0%,
      rgb(135, 65, 116, 0.7) 100%
    ),
    url("../assets/Header Image/140.jpg") no-repeat center center;
  background-size: 100% auto;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
.text-center {
  text-align: center;
}
.card-separator {
  margin-top: 10px;
  margin-bottom: 10px;
  padding-bottom: 10px;
}
.table-column {
  padding-bottom: 10px;
  padding-top: 10px;
}
.left-indent {
  margin-left: 10px;
}
.small-left-indent {
  padding-left: 5px;
}
.indent {
  margin-left: 10px;
  margin-right: 10px;
}

.small-indent {
  padding: 5px !important;
}
.small-bottom-indent {
  padding-bottom: 7px !important;
}
.top-indent {
  padding-top: 15px;
}
.card-inside {
  border-color: #bbb;
  border-radius: 10px !important;
  border-style: solid;
  border-width: thin;
  margin: 5px 10px;
  padding: 5px;
}
.card-red {
  border-color: #d52b2b;
}
.circle {
  height: 30px;
  width: 30px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  padding: 5px 12px;
}
.circle-wrap {
  margin: auto 15px;
}
.circle-wrap-2 {
  margin: auto 0px;
}
.title-text {
  font-size: 15px;
  padding: 5px 10px !important;
}
.title-indent {
  padding: 10px !important;
}
.separator {
  height: 5px;
}
.card-title {
  padding-top: 15px;
  padding-left: 16px;
  font-size: 15px;
  text-align: center;
  color: #00acf0;
}
.payment-method-hr {
  display: inline-block;
  width: 100%;
}
.loan-product {
  background-image: url(../assets/image.png);
  margin-left: 12px;
  margin-right: 12px;
  color: white;
  font-weight: bold;
  font-size: 14px;
}
.container.grid-list-xl :not(:only-child) .layout:last-child {
  margin-bottom: 0px !important;
}
.container.grid-list-xl :not(:only-child) .layout:first-child {
  margin-bottom: 0px !important;
}
.container.grid-list-xl :not(:only-child) .layout:first-child {
  margin-bottom: 0px !important;
}
.container.grid-list-xl .layout:only-child {
  margin-bottom: 0px !important;
}
</style>
