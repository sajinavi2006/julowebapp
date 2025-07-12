<template>
  <div class="main-body">
    <v-container fluid>
      <v-layout row>
        <v-flex xs12 sm8 md6 offset-xs0 offset-sm2 offset-md3>
          <h1 class="title font-weight-bold">Selamat Datang, {{user.fullname}}</h1>
          <div class="julo-card">
            <p class="font-weight-bold subheading main-header">Apa itu Refinancing?</p>
            <p class="content" style="opacity: 0.65;">Pendanaan ulang untuk melunasi hutang yang Anda miliki dengan cicilan lebih ringan</p>
            <p class="font-weight-bold sub-header subheading">Informasi penting tentang fitur Refinancing:</p>
            <ul>
              <li style="opacity: 0.65;">Cashback yang Anda miliki saat ini akan hilang Tetapi Anda tetap bisa mendapatkan cashback pada pembayaran selanjutnya.</li>
              <li style="opacity: 0.65;">Anda tidak dapat meningkatkan poin dan mengikuti promosi yang sedang berjalan pada aplikasi JULO.</li>
            </ul>
          </div>
          <h2 class="body-1" style="opacity: 0.65; margin-bottom: 16px;"
          >Mohon untuk berikan alasan lebih detail sebelum memulai aplikasi Refinancing Anda.</h2>
          <v-select
            :items="mainReasons"
            :menu-props="{ bottom: true, offsetY: true }"
            placeholder="Pilih alasan Anda melakukan Refinancing"
            :full-width="true"
            :style="{ marginBottom: reasonSize + 'px' }"
            :dense="true"
            :single-line="true"
            v-model="selectedReason"
            outline
          ></v-select>
          <div :style="isShownAdditionalContent">
            <v-radio-group v-model="selectedAdditionalReason" column style="margin-bottom: 24px">
              <v-radio
                :label="reason"
                :value="reason"
                v-for="(reason, index) in subReasons"
                :key="index"
              ></v-radio>
            </v-radio-group>
            <v-textarea
              outline
              placeholder="Ceritakan detail lebih lanjut..."
              v-model="reasonDetail"
            ></v-textarea>
            <p style="color: #ff6060;" :style="{ display: isErrorMessage }">Minimal 30 karakter</p>
          </div>
          <div class="text-xs-center text-sm-center text-md-center">
            <v-btn
              class="white--text"
              :class="[isDataCompleted ? activeSaveBtn : inactiveSaveBtn]"
              style="width: 452px; height: 48px;"
              :disabled="!isDataCompleted"
              @click="saveCustomerReasons">
              Lanjut
            </v-btn>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import enums from "../enums";
import { mapActions, mapMutations, mapState } from "vuex";
const { types } = enums;
export default {
  data() {
    return {
      isShownAdditionalContent: { display: "None", marginBottom: "15px" },
      reasonSize: 80,
      selectedReason: "",
      selectedAdditionalReason: "",
      reasonDetail: "",
      isErrorMessage: "block",
      activeSaveBtn: 'active-save-btn',
      inactiveSaveBtn: 'inactive-save-btn',
      mainReasons: [],
      subReasons: [],
      combinedMainAndSubReasons: {},
      customerFullName: ''
    };
  },
  mounted() {
    this.$emit("makeBgTransparent", false);
    this.signIn();
  },
  watch: {
    selectedReason(newValue, oldValue) {
      if (newValue !== null) {
        this.isShownAdditionalContent["display"] = "block";
        this.reasonSize = 0;
        this.isShownAdditionalContent["marginBottom"] = 80;
        this.subReasons = this.combinedMainAndSubReasons[newValue];
      }
    },
    reasonDetail(newValue, oldValue) {
      newValue.length >= enums.validation.MINIMUM_LOAN_REFINANCING_REASON_LENGTH
        ? (this.isErrorMessage = "none")
        : (this.isErrorMessage = "block");
    },
  },
  computed: {
    ...mapState(["user"]),
    isDataCompleted() {
      if (this.selectedReason === "" ||
        this.reasonDetail.length < enums.validation.MINIMUM_LOAN_REFINANCING_REASON_LENGTH) {
          return false;
      }
      return true;
    }
  },
  methods: {
    ...mapActions(['autoLogin', 'getLoanRefinancingReasons']),
    ...mapMutations([types.SET_MAIN_AND_SUB_REASONS]),
    async signIn() {
      const loginResponse = await this.autoLogin({
        encryptedCustomerData: this.$route.params.encryptedCustomerData
      })

      if (!loginResponse) {
        this.$router.push({ name: 'signIn' })
      }

      const reasonResponse = await this.getLoanRefinancingReasons();

      if (!reasonResponse) {
        this.$router.push({ name: 'signIn' })
      }

      this.mainReasons = Object.keys(reasonResponse.data);
      this.combinedMainAndSubReasons = reasonResponse.data;
    },
    saveCustomerReasons() {
      if (this.isDataCompleted) {
        const reason = {
          'mainReason': this.selectedReason,
          'subReason': this.selectedAdditionalReason,
          'additionalReason': this.reasonDetail
        };
        this[types.SET_MAIN_AND_SUB_REASONS](reason);
        this.$router.push({ name: 'loanRefinancingForm' });
      }
    }
  }
};
</script>
<style scoped>
.main-body {
  margin-top: 70px;
}
.julo-card {
  height: 199px;
  background-color: #f3fcff;
  border-top: 3px solid #00acf0;
  margin-top: 9px;
  padding: 17px 13px 0px 26px;
  margin-bottom: 48px;
}
.main-header {
  color: #00acf0;
  margin-bottom: 8px;
}
.sub-header {
  color: #00acf0;
  margin-top: 24px;
  margin-bottom: 8px;
}
.content {
  font-size: 13px;
}
.active-save-btn {
  background-color: #00acf0 !important;
}
.inactive-save-btn {
  background-color: #5e5e5e !important;
}
ol,
ul {
  padding-left: 15px;
}
</style>
