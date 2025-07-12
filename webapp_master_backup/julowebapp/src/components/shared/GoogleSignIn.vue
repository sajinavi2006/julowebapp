<template>
  <div>
    <!-- <j-btn block ref="signinBtn" :disabled="disabled"> <img src="../../assets/Google_logo@3x.png" style="max-width:20px; margin-right: 20px;" /> Daftar dengan Google</j-btn> -->
    <!-- <j-btn block ref="signinBtn" :disabled="disabled">
      <div ref="signinBtn">
        <img src="../../assets/Google_logo@3x.png" style="max-width:20px; margin-right: 20px;" />
        Daftar dengan Google
      </div>
    </j-btn>-->
    <div ref="signinBtn" class="btnGoogle" v-show="!disabled">
      <img
        src="../../assets/Google_logo@3x.png"
        style="max-width:20px; margin-right: 10px; margin-top:2px;"
      />
      <span style="vertical-align: super;">Daftar dengan Google</span>
    </div>

    <div class="disabled" v-show="disabled">
      <img
        src="../../assets/Google_logo@3x.png"
        style="max-width:20px; margin-right: 10px; margin-top:2px;"
      />
      <span style="vertical-align: super;">Daftar dengan Google</span>
    </div>
  </div>
</template>

<script>
import config from "../../config";
const { GOOGLE_CLIENT_ID } = config;

export default {
  data() {
    return { auth2: {} };
  },
  props: {
    disabled: {
      type: Boolean,
      required: true
    }
  },
  mounted() {
    window.gapi.load("auth2", () => {
      this.auth2 = window.gapi.auth2.init({
        client_id: process.env.VUE_APP_CLIENT_ID,
        //"895680187609-m65krlgiskr46tst8e3hjfkcj4dvl6ua.apps.googleusercontent.com",
        //"241517909084-fhp9bs8odjepmd8dknq472jp7fv22a1u.apps.googleusercontent.com",
        cookiepolicy: "single_host_origin",
        //scope: "https://www.googleapis.com/auth/gmail.readonly",
        fetch_basic_profile: true,
        response_type: "token"
      });
    });
    if (!this.disabled) {
      this.load();
    }
  },
  methods: {
    load: function() {
      this.auth2.attachClickHandler(
        this.$refs.signinBtn,
        {},
        googleUser => {
          const action = 'Button : "Daftar dengan Google" clicked';
          const obj = this.$navlog.mappingObj(this.$route.name, action);
          this.$navlog.save(obj);
          this.$emit("done", googleUser);
        },
        error => console.log(error)
      );
    },
    unload: function() {
      this.$refs.signinBtn.removeEventListener("click", this.load());
    }
  },
  watch: {
    disabled: function(val) {
      if (!val) {
        this.load();
      } else {
        this.unload();
      }
    }
  }
};
</script>

<style scoped>
.btnGoogle {
  padding: 5px;
  background-color: white;
  border-radius: 4px;
  cursor: pointer;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  box-shadow: 0 5px 0px 0 rgba(0, 0, 0, 0.12), 0 3px 0px 0 rgba(0, 0, 0, 0.12);
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.btnGoogle:hover {
  background-color: #e1f5fe;
}
.disabled {
  background-color: #90caf9 !important;
  color: grey !important;
  cursor: default !important;
  box-shadow: none !important;
  padding: 5px;
  border-radius: 4px;
  box-shadow: 0 5px 0px 0 rgba(0, 0, 0, 0.12), 0 3px 0px 0 rgba(0, 0, 0, 0.12);
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
