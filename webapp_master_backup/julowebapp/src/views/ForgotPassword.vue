<template>
  <div class="bodyClass">
    <v-layout row class="subbodyClass">
      <v-flex xs12 sm8 md6 offset-xs0 offset-sm2 offset-md3 v-if="!done">
        <div class="header">
          <div style="color: #1F88D1; font-weight: bold;">Lupa kata Sandi</div>

          <div>
            <small>Masukan email yang terasosiasi dengan akun Anda</small>
          </div>
        </div>

        <v-text-field
          prepend-inner-icon="mail"
          autofocus
          outline
          v-model="email"
          class="textField"
          v-validate="'required|email'"
          :error-messages="errors.collect('email')"
          placeholder="Isi email Anda"
          data-vv-name="email"
          required
          color="#00acf0"
        ></v-text-field>
        <div class="error--text">
          <span>{{ errors.first("email") }}</span>
        </div>

        <div style="margin-top: 20px; text-align:center;">
          <j-btn style="width: 200px" class="color8" depressed dark @click="sendEmail">Lanjutkan</j-btn>
        </div>
      </v-flex>

      <v-flex xs12 sm8 md6 offset-xs0 offset-sm2 offset-md3 v-else>
        <div style="text-align:center; padding-top: 200px; ">
          <div style="color: #1F88D1; font-weight: bold; font-size: 16px;">Ubah Kata Sandi</div>
          <div style="margin-top:20px;">
            <div
              style="margin: auto; max-width: 75%;"
            >Periksa email Anda dan klik tautan untuk mengubah kata sandi akun JULO Anda. Lalu lanjutkan dengan kembali masuk ke akun Anda.</div>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>


<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      email: "",
      done: false
    };
  },
  methods: {
    ...mapActions(["resetPassword"]),
    sendEmail: async function() {
      const valid = await this.$validator.validateAll();
      if (valid) {
        const result = await this.resetPassword(this.email);
        if (result.success) {
          this.done = true;
        }
      }
    }
  },
  mounted() {
    this.$emit("makeBgTransparent", false);
  }
};
</script>

<style scoped>
.header {
  height: 175px;
  padding-top: 70px;
  text-align: center;
  font-size: 16px;
}
.buttonNext {
  margin-top: 20px;
  margin-bottom: 20px;
  color: black;
}
.bodyClass {
  background-image: url("../assets/background/bg_white@3x.jpg");
  background-repeat: repeat;
  background-size: cover;
  padding-bottom: 100px;
  min-height: 530px;
}
.subbodyClass {
  padding-top: 60px;
}
.textField {
  max-width: 90%;
  margin-left: 5%;
}
</style>
