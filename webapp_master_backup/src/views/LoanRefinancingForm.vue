<template>
  <div class="main-body">
    <v-container fluid>
      <v-layout row>
        <v-flex xs12 sm12>
          <div style="display: flex; justify-content: space-between;">
            <h3 class="title font-weight-bold">Jadwal pembayaran pinjaman Anda saat ini</h3>
            <p class="sub-title text-helper"><v-icon style="margin-right: 2px;" small color="#00acf0">error_outline</v-icon>Bantuan</p>
          </div>
          <v-divider class="divider-props"></v-divider>
          <v-data-table
            :headers="tableHeaders"
            :items="paymentList"
            :hide-actions="true"
            class="table-footer-props table-props"
          >
            <template v-slot:items="props">
              <td v-for="(header, index) in tableHeaders"
                  :key="index"
                  :style="{ background: props.item.dueAmount === 0 ? '#d9ffe3' :
                            new Date(props.item.dueDate).getTime() < new Date().getTime() ? '#E8ECF1' : 'white' }"
              >
                <div class="text-xs-center" v-if="header.type === 'currency'">
                  Rp. {{props.item[header.value].toLocaleString()}}
                </div>
                <div class="text-xs-center" v-else-if="header.type === 'date'">
                  {{moment(props.item[header.value]).locale('id').format('LL')}}
                </div>
                <div class="text-xs-center" v-else>
                  {{props.item[header.value]}}
                </div>
              </td>
            </template>
            <template v-slot:footer>
              <td :colspan="1" style="color: #666666">Total:</td>
              <td :colspan="1"></td>
              <td :colspan="1"></td>
              <td class="text-xs-center footer-txt" :colspan="1">Rp. {{totalLateFeeAmount.toLocaleString()}}</td>
              <td class="text-xs-center footer-txt" :colspan="1">Rp. {{totalDueAmount.toLocaleString()}}</td>
              <td :colspan="1"></td>
              <td class="text-xs-center footer-txt" :colspan="1">Rp. {{totalRemainingPrincipal.toLocaleString()}}</td>
            </template>
          </v-data-table>
          <h3 class="title font-weight-bold" style="margin-top: 60px">Perpanjangan Tenor Pinjaman</h3>
          <p class="subheading" style="opacity: 0.65">Silahkan pilih tenor yang Anda inginkan</p>
          <v-divider class="divider-props"></v-divider>
          <v-slider
            :tick-labels="tenureDuration"
            v-model="tenureChoice"
            always-dirty
            :max="tenureDuration.length - 1"
            step="1"
            tick-size="3"
            ticks="always"
            color="#00acf0"
            class="tick-label-color"
          ></v-slider>
          <p class="caption" style="margin-bottom: 4px; margin-top: 36px;">Cicilan</p>
          <div style="margin-bottom: 60px;">
            <div class="tenor-container">
              <span class="currency-text">Rp</span>
              <span class="vertical-line"></span>
              <span class="title font-weight-bold">Rp </span>
              <span class="title font-weight-bold" style="margin-right: 30px;">{{chosenDueAmount.toLocaleString()}}</span>
              <span class="currency-text">per bulan</span>
            </div>
            <v-btn color="#00acf0" class="white--text btn-continue" @click="showRefinancingSummary">Lanjut</v-btn>
          </div>
          <div v-show="isRefinancingFormShowed">
            <h3 class="title font-weight-bold">Jadwal pembayaran pinjaman Anda sekarang</h3>
            <v-divider class="divider-props"></v-divider>
            <div style="margin-bottom: 60px;">
              <v-data-table
                :headers="tableNewLoanHeaders"
                :items="chosenRefinancingStruct"
                :hide-actions="true"
                class="table-footer-props table-props"
              >
                <template v-slot:items="props">
                  <td v-for="(header, index) in tableNewLoanHeaders"
                      :key="index"
                  >
                    <div class="text-xs-center" v-if="header.type === 'currency'">
                      Rp. {{props.item[header.value].toLocaleString()}}
                    </div>
                    <div class="text-xs-center" v-else-if="header.type === 'date'">
                      {{moment(props.item[header.value]).locale('id').format('LL')}}
                    </div>
                    <div class="text-xs-center" v-else>
                      {{props.item[header.value]}}
                    </div>
                  </td>
                </template>
                <template v-slot:footer>
                  <td :colspan="1" class="footer-txt">Total:</td>
                  <td :colspan="1"></td>
                  <td class="text-xs-center footer-txt" :colspan="1">Rp. {{totalChosenDueAmount.toLocaleString()}}</td>
                </template>
              </v-data-table>
            </div>
            <div class="julo-promo-info-header">
              <p class="headline font-weight-bold"
              >Informasi mengenai Denda Keterlambatan, Cashback, dan Promosi Anda</p>
            </div>
            <div class="julo-promo-info-content subheading">
              <p
                class="subheading"
              >Julo ingin meringankan beban angsuran Anda dengan cara menghapuskan denda keterlambatan sebesar Rp. {{totalLateFeeAmount.toLocaleString()}} dan memperpanjang tenor angsuran.</p>
              <p
                class="subheading"
              >Namun, saat refinancing berlangsung Anda akan menerima konsekuensi sebagai berikut:</p>
              <ul>
                <li
                  class="body-1"
                >Seluruh cashback yang Anda miliki saat ini akan hilang. Tetapi, Jika Anda membayar cicilan tepat waktu Anda akan tetap mendapatkan cashback pada pembayaran selanjutnya.</li>
                <li
                  class="body-1"
                >Anda tidak dapat meningkatkan poin dan mengikuti promosi yang sedang berjalan.</li>
              </ul>
              <p
                  class="subheading"
                  style="margin-top: 20px;"
                >Kami berharap Anda dapat segera melunasi pinjaman ini.</p>
              <div class="warning-box">
                <p class="subheading font-weight-bold"><v-icon style="margin-right: 2px;" small color="#e2574c">error_outline</v-icon>Anda wajib membayar angsuran pertama paling lambat 5 hari setelah penawaran ini disetujui. Jika Anda melewati batas waktu yang telah ditentukan proses refinancing dibatalkan.</p>
              </div>
            </div>
            <div class="summary">
              <div class="summary-header-title">
                <p class="title font-weight-bold" style="color: white; padding-top: 15px;">Ringkasan</p>
              </div>
              <table>
                <tbody>
                  <tr>
                    <th scope="row">Cicilan</th>
                    <td><span class="seperator">:</span>Rp. {{chosenDueAmount.toLocaleString()}}</td>
                  </tr>
                  <tr>
                    <th scope="row">Tenor</th>
                    <td><span class="seperator">:</span>Diperpanjang {{chosenTenure}} bulan</td>
                  </tr>
                  <tr>
                    <th scope="row">Jumlah denda yang dihapuskan</th>
                    <td><span class="seperator">:</span>Rp. {{totalLateFeeAmount.toLocaleString()}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="text-xs-center text-sm-center text-md-center">
              <v-btn
                color="#00acf0"
                class="white--text btn-submit-tenor"
                @click="submitLoanRefinancing"
              >Permintaan Perpanjangan Tenor Pinjaman</v-btn>
            </div>
             <v-dialog v-model="successModal" persistent max-width="480">
              <v-card class="rounded-card">
                <v-card-title class="headline justify-center"><v-icon large color="#A7E2FA" style="margin-right: 8px;">check_circle</v-icon>Berhasil</v-card-title>
                <v-card-text class="text-center body-1" style="color: #727272;">Permintaan berhasil disubmit. Jika Permintaan Anda disetujui kami akan memberitahu Anda lewat email.</v-card-text>
                <v-spacer></v-spacer>
                <v-card-actions class="justify-center">
                  <v-btn color="#00acf0" @click="goToSuccessPage" class="white--text">Ok</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapGetters , mapState } from "vuex";
import moment from 'moment';
import camelCase from 'lodash/camelCase';
import enums from '../enums';
const { types } = enums;
export default {
  data() {
    return {
      tenureChoice: 0,
      isRefinancingFormShowed: false,
      tenureDuration: [],
      tableHeaders: [
        { text: 'Pembayaran#', value: 'paymentNumber', sortable: false, class: 'text-xs-center font-weight-bold' },
        { text: 'Jatuh Tempo', value: 'dueDate', type:'date', sortable: false, class: 'text-xs-center font-weight-bold' },
        { text: 'Tanggal Pembayaran', value: 'paidDate', sortable: false, class: 'text-xs-center font-weight-bold' },
        { text: 'Biaya Keterlambatan', value: 'lateFeeAmount', type: 'currency', sortable: false, class: 'text-xs-center font-weight-bold' },
        { text: 'Total', value: 'dueAmount', type: 'currency', sortable: false, class: 'text-xs-center font-weight-bold' },
        { text: 'Terbayar', value: 'paidAmount', type: 'currency', sortable: false, class: 'text-xs-center font-weight-bold' },
        { text: 'Pokok Terhutang', value: 'remainingPrincipal', type: 'currency', sortable: false, class: 'text-xs-center font-weight-bold' }
      ],
      paymentList: [],
      items: [],
      tableNewLoanHeaders: [
        { text: "Pembayaran#", value: 'paymentNumber', sortable: false, class: 'text-xs-center font-weight-bold' },
        { text: "Jatuh Tempo", value: 'dueDate', type: 'date', sortable: false, class: 'text-xs-center font-weight-bold' },
        { text: "Total", value: 'dueAmount', type: 'currency', sortable: false, class: 'text-xs-center font-weight-bold' }
      ],
      totalDueAmount: 0,
      totalLateFeeAmount: 0,
      totalRemainingPrincipal: 0,
      chosenDueAmount: 0,
      chosenTenure: 0,
      totalChosenDueAmount: 0,
      tenureProbabilities: {},
      chosenRefinancingStruct: [],
      successModal: false
    };
  },
  beforeMount() {
    this[types.ACTIVATE_LOADING]();
  },
  async mounted() {
    const data = await this.populateLoanRefinacingOffer();
    this.convertApiResponseKeyToCamelCase(data.current_payment_structures);
    this.convertApiResponseDictToCamelCase(data.new_tenure_offers);
    this.paymentList = data.current_payment_structures;
    this.tenureDuration = this.construct_tenure_duration(Object.keys(data.new_tenure_offers));
    this.tenureProbabilities = data.new_tenure_offers;
    const { totalDueAmount, totalLateFee, totalRemainingPrincipal } = this.getSumOfCurrentUnpaidPayment(data.current_payment_structures);
    this.getSumOfUnpaidPayments(totalDueAmount, totalLateFee, totalRemainingPrincipal);
    this.setInitialValueForPayment();
  },
  watch: {
    tenureChoice(newValue, oldValue) {
      this.chosenTenure = this.tenureDuration[newValue];
      this.chosenDueAmount = this.tenureProbabilities[this.chosenTenure][0]['dueAmount'];
      this.chosenRefinancingStruct = this.tenureProbabilities[this.chosenTenure];
      this.totalChosenDueAmount = this.getSumOfCurrentUnpaidPayment(
        this.chosenRefinancingStruct)['totalDueAmount'];
    }
  },
  methods: {
    ...mapActions(["autoLogin", "getTenureProbabilities", "submitLoanRefinancingOffer"]),
    ...mapMutations([types.ACTIVATE_LOADING, types.DEACTIVATE_LOADING, types.LOGOUT]),
    ...mapGetters(["getMainRefinancingReason", "getSubRefinancingReason", "getAdditionalReason"]),
    ...mapState(["application"]),
    construct_tenure_duration(data) {
      const duration_arr = data.filter((element) => {
        let parsedNumber = Number(element) || false;

        if (parsedNumber) {
          return element;
        }
      });

      return duration_arr;
    },
    setInitialValueForPayment() {
      this.chosenTenure = this.tenureDuration[0];
      this.chosenDueAmount = this.tenureProbabilities[this.chosenTenure][0]['dueAmount'];
      this.chosenRefinancingStruct = this.tenureProbabilities[this.chosenTenure];
      this.totalChosenDueAmount = this.getSumOfCurrentUnpaidPayment(
        this.chosenRefinancingStruct)['totalDueAmount'];
    },
    getSumOfUnpaidPayments(dueAmount, lateFeeAmount, remainingPrincipal) {
      this.totalDueAmount = dueAmount;
      this.totalLateFeeAmount = lateFeeAmount;
      this.totalRemainingPrincipal = remainingPrincipal;
    },
    getSumOfCurrentUnpaidPayment(data) {
      return data.reduce((acc, curr) => {
          acc["totalDueAmount"] += curr.dueAmount;
          acc["totalLateFee"] += curr.lateFeeAmount;
          acc["totalPaidPrincipal"] += curr.paidPrincipal;
          acc["totalRemainingPrincipal"] += curr.remainingPrincipal;

          return acc;
        },
        {
          totalDueAmount: 0,
          totalLateFee: 0,
          totalPaidPrincipal: 0,
          totalRemainingPrincipal: 0
        }
      );
    },
    convertApiResponseDictToCamelCase(response) {
      Object.keys(response).forEach(key => {
        if (response[key] instanceof Array)
          this.convertApiResponseKeyToCamelCase(response[key]);
      });

      return response;
    },
    convertApiResponseKeyToCamelCase(response) {
      response.forEach(element => {
        this.defineCamelCaseProps(element);
      });

      return response;
    },
    defineCamelCaseProps(obj) {
      const props = {};
      Object.keys(obj).forEach((key) => {
        props[camelCase(key)] = {
          get: () => obj[key],
          set: (input) => {
            obj[key] = input;
          }
        };
      });

      Object.defineProperties(obj, props);

      return obj;
    },
    showRefinancingSummary() {
      this.isRefinancingFormShowed = true;
    },
    async populateLoanRefinacingOffer() {
      const response = await this.getTenureProbabilities();

      if (!response) {
         this.$router.push({ name: 'signIn' });
      }
      return response.data;
    },
    async submitLoanRefinancing() {
      const payload = {
        application_id: this.application().id,
        due_amount: this.chosenDueAmount,
        tenure_extension: parseInt(this.chosenTenure),
        late_fee_amount: this.totalLateFeeAmount,
        main_reason: this.getMainRefinancingReason(),
        sub_reason: this.getSubRefinancingReason(),
        additional_reason: this.getAdditionalReason()
      };

      const isRefinancingSuccess = await this.submitLoanRefinancingOffer(payload);

      if (isRefinancingSuccess) {
        this.successModal = true;
      }
    },
    goToSuccessPage() {
      this.successModal = false;
      this.$router.push({
        name: 'loanRefinancingSuccess'
      });
    }
  }
};
</script>
<style scoped>
.main-body {
  margin-top: 70px;
}
.sub-title {
  display: inline;
}
.text-helper {
  color: #00acf0;
  font-weight: bold;
  margin-bottom: 0px;
}
.divTable {
  width: 100%;
  height: 80px;
  border-radius: 7px;
  border: 1px solid #00acf0;
}
.divider-props {
  margin-top: 16px;
  margin-bottom: 41px;
}
.tenor-container {
  width: 320px;
  height: 48px;
  border-radius: 5px;
  border: solid 1px #c6cbda;
  padding: 12px;
  margin-bottom: 60px;
  display: inline;
}
.vertical-line {
  border-left: solid 1px #e0e0e0;
  height: 24px;
  margin: 0 16px;
}
.currency-text {
  font-size: 16px;
  color: #5e5e5e;
  font-weight: bold;
  opacity: 0.65;
}
.julo-promo-info-header {
  height: 52px;
  background-color: #ffbc33;
  padding: 11px 40px;
  color: #fffdf8;
}
.julo-promo-info-content {
  background-color: #fffdf8;
  padding: 24px 40px;
}
.summary {
  margin-top: 60px;
  height: 232px;
}
.summary-header-title {
  height: 52px;
  background-image: linear-gradient(to bottom, #0f5b72 -15%, #094f64);
  display: flex;
  justify-content: center;
  align-items: center;
}
.seperator {
  margin-right: 24px;
}
.btn-submit-tenor {
  width: 348px !important;
  margin-top: 60px;
  border-radius: 5px;
  height: 48px;
}
.btn-continue {
  width: 115px;
  display: inline;
  height: 45px;
  border-radius: 5px;
  margin-left: 16px;
}
.footer-txt {
  color: #666666;
  font-weight: bold;
}
table,th,tr {
  border-top: solid 1px #e4e7ea;
  border-bottom: solid 1px #e4e7ea;
  border-collapse: collapse;
  padding: 20px 0px 20px 32px;
}
table {
  width: 100%;
}
th {
  border-left: solid 1px #e4e7ea;
  width: 18%;
  text-align: left;
}
tr {
  height: 60px;
}
.rounded-card {
  height: 245px;
  border-radius: 19px;
  padding: 28px 36px;
}
.warning-box {
  border-top: solid 3px #e2574c;
  background-color: #ffefee;
  height: 85px;
  padding: 20px 40px;
  color: #e2574c;
}
</style>
