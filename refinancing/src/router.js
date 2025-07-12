import Vue from "vue";
import Router from "vue-router";
import CheckEligibility from "./views/CheckEligibility.vue";
import offer1 from './assets/offer1.png';
import offer2 from './assets/offer2.png';
import offer3 from './assets/offer3.png';
import offer4 from './assets/offer4.png';
import slider1 from './assets/slider1.png';
import slider2 from './assets/slider2.png';
import slider3 from './assets/slider3.png';
import slider4 from './assets/slider4.png';
import footerImg from './assets/footer_mobile.png';

import { loadImage } from "./helper/loadImages";
Vue.use(Router);

let router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/restrukturisasi",
      name: "checkEligibility",
      component: CheckEligibility
    }
  ],
   scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash
      };
    } else if (savedPosition) {
      return savedPosition;
    } else {
      return {
        x: 0,
        y: 0
      };
    }
  }
});

router.beforeEach((to, from, next) => {
  if (to.name == null) {
    next({
      path: "/restrukturisasi"
    });
  }
  next();
  if(to.name == "checkEligibility") {
    loadImage(offer1, offer2, offer3, offer4, slider1, slider2, slider3, slider4, footerImg);
  }
});
export default router;
