<template>
  <div class="textHeader">
    <v-container grid-list-xl>
      <v-layout row>
        <v-flex xs12 sm8 md6 offset-xs0 offset-sm2 offset-md3>
          <div class="center">
            <div class="relative">
              <lottie
                :options="defaultOptions"
                :height="180"
                :width="180"
                v-on:animCreated="handleAnimation"
                style="margin-left:10px !important; margin-right:10px !important;"
              />

              <div id="circle">...</div>
            </div>

            <div
              style="font-size:16px;margin-bottom:20px;text-align:center;"
            >Mohon tunggu, kami sedang menghitung Skor JULO Anda</div>
            <v-divider></v-divider>
            <div
              style="margin-top:20px;text-align:center;"
            >Hasil Skor JULO menentukan produk yang dapat Anda pilih</div>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import Lottie from "vue-lottie";
import _ from "lodash";
import animationData from "../assets/lottie/default_score.json";
import enums from "../enums";
const { types } = enums;

export default {
  computed: { ...mapState(["productNScore"]) },
  components: { Lottie },
  data() {
    return {
      countTry: 0,
      limitTry: 10,
      anim: "",
      defaultOptions: {
        animationData: animationData,
        loop: true,
        autoplay: true
      }
    };
  },
  methods: {
    ...mapState(["application"]),
    ...mapActions(["getProductAndCreditScore"]),
    ...mapMutations([types.SET_PRODUCT_CREDITSCORE]),
    handleAnimation: function(anim) {
      this.anim = anim;
    },
    gotoProduct: function(productNScore) {
      //save in vuex
      this[types.SET_PRODUCT_CREDITSCORE](productNScore);
      this.$router.push({ name: "product" });
    },
    getProduct: async function() {
      setTimeout(async () => {
        try {
          this.countTry++;
          if (this.countTry <= this.limitTry) {
            const result = await this.getProductAndCreditScore();
            this.gotoProduct(result);
          }
        } catch (err) {
          this.getProduct();
        }
      }, 3000);
    }
  },
  async mounted() {
    if (this.application().product_line) {
      this.$router.push({ name: "product" });
    } else {
      this.getProduct();
    }
  }
};
</script>

<style scoped>
.relative {
  padding-top: 70px;
  padding-bottom: 50px;

  margin: auto;
  position: relative;
  height: 300px;
  width: 200px;
}
#circle {
  position: absolute;
  top: 168px;
  right: 15px;
  padding-left: 30px;
  font-size: 40px;
  background: white;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
}
</style>
