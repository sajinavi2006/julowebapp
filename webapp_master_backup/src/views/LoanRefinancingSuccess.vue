<template>
  <div style="margin-top: 50px;">
    <v-container fluid>
      <v-layout row>
        <v-flex xs12 sm8 md6 offset-xs0 offset-sm2 offset-md3>
          <div class="text-xs-center" style="margin-bottom: 30px;">
            <v-icon color="#2FCC71" size="140">check_circle</v-icon>
          </div>
          <p class="display-1 font-weight-bold text-xs-center">Submit berhasil!</p>
          <p class="subheading font-weight-bold text-xs-center" style="color:#182940; opacity: 0.65;">Terima kasih atas kepercayaan Anda untuk memilih JULO sebagai solusi keuangan Anda. Silahkan cek email untuk mengetahui status pengajuan Refinancing Anda!</p>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
export default {
  mounted() {
    this.$emit("makeBgTransparent", false);
  }
};
</script>
