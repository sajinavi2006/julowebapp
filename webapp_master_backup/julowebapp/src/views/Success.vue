<template>
  <div class="overlay_login">
    <div class="helper_login"></div>
      <img src="../assets/success.gif">
      <br/>
    <div class="center txtBold">
      BERHASIL!
    </div>
    <div class="center txtNormal">
      Data Anda berhasil di proses. Silahkan klik Kembali untuk melanjutkan.
    </div>
    <div class="center">
      <v-btn rounded class="color8" dark @click="redirectToHome">   Kembali ke boost   </v-btn>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import moment from "moment";
export default {
  methods: {
    redirectToHome: function() {
      window.location.href = 'https://www.julo.co.id/';
    }
  },
  async beforeMount() {
    this.$emit("makeBgTransparent", false);
    this.$emit("makeIsBoostPage", {text: "Success"});
  }
};
</script>
<style scoped>
.helper_login {
    height:50%;
    width:100%;
    margin-bottom:-240px;
    min-height: 240px;
}
.overlay_login {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    cursor: pointer;
    background-color: #ffffff;
}
img {
    margin: 0 auto;
    max-width: 100%;
    max-height: 100%;
    display: block;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn {
  min-width: 300px;
}
.txtNormal {
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: 0.19px;
  text-align: center;
  color: #5e5e5e;
}
.txtBold {
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.29;
  letter-spacing: 0.23px;
  text-align: center;
  color: #00acf0;
}
</style>
