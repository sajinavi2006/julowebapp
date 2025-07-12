import Vue from "vue";
import Router from "vue-router";
import {
  Home,
  FormulirPengajuan,
  ReviewForm,
  DocumentUpload,
  Product,
  Verification,
  Signup,
  NewPassword,
  SignIn,
  ForgotPassword,
  LastStep,
  FormHead,
  Form1,
  Form2,
  Form3,
  Form4,
  WaitingCreditScore,
  Document,
  BFI,
  CheckEligibility,
  BankLogin,
  Success,
  LoanRefinancingForm,
  LoanRefinancingReason,
  LoanActivity,
  LoanRefinancingSuccess
} from "./views";
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
  history: true,
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    // {
    // 	path: '/',
    // 	name: 'home',
    // 	component: Home
    // },
    // {
    // 	path: '/form',
    // 	name: 'formulirPengajuan',
    // 	component: FormulirPengajuan
    // },
    // {
    // 	path: '/document',
    // 	name: 'documentUpload',
    // 	component: DocumentUpload
    // },
    {
      path: "/form/review",
      name: "reviewForm",
      component: ReviewForm
    },
    {
      path: "/product",
      name: "product",
      component: Product
    },
    {
      path: "/verification",
      name: "verification",
      component: Verification
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup
    },
    {
      path: "/signin",
      name: "signIn",
      component: SignIn
    },
    {
      path: "/newpassword",
      name: "newPassword",
      component: NewPassword
    },
    {
      path: "/forgotpassword",
      name: "forgotPassword",
      component: ForgotPassword
    },
    {
      path: "/laststep",
      name: "lastStep",
      component: LastStep
    },
    {
      path: "/formhead",
      name: "formHead",
      component: FormHead
    },
    {
      path: "/form1",
      name: "form1",
      component: Form1
    },
    {
      path: "/form2",
      name: "form2",
      component: Form2
    },
    {
      path: "/form3",
      name: "form3",
      component: Form3
    },
    {
      path: "/form4",
      name: "form4",
      component: Form4
    },
    {
      path: "/waiting",
      name: "waitingCreditScore",
      component: WaitingCreditScore
    },
    {
      path: "/documents",
      name: "document",
      component: Document
    },
    {
      path: "/bfi",
      name: "bfi",
      component: BFI
    },
    {
      path: "/loanrefinancing",
      name: "loanRefinancingForm",
      component: LoanRefinancingForm
    },
    {
      path: "/refinancingreason/:encryptedCustomerData",
      name: "loanRefinancingReason",
      component: LoanRefinancingReason
    },
    {
      path: "/refinancingrequestsuccess",
      name: "loanRefinancingSuccess",
      component: LoanRefinancingSuccess
    },
    {
      path: "/loanactivity",
      name: "loanActivity",
      component: LoanActivity
    },
    {
      path: "/restrukturisasi",
      name: "checkEligibility",
      component: CheckEligibility
    },
    {
      path: "/bank-login/:token/:appId",
      name: "bankLogin",
      component: BankLogin
    },
    {
      path: "/success",
      name: "success",
      component: Success
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
  if (
    !localStorage.getItem("token") &&
    to.name !== "signIn" &&
    to.name !== "newPassword" &&
    to.name !== "forgotPassword" &&
    to.name !== "signup" &&
    to.name !== "checkEligibility" &&
    to.name !== "bankLogin" &&
    to.name !== "success" &&
    to.name === "loanRefinancingReason" &&
    to.name === "loanRefinancingForm"
  ) {
    next({
      path: "/signin"
    });
  }
  if (to.name == null) {
    next({
      path: "/signin"
    });
  }
  next();
  if(to.name == "checkEligibility") {
    loadImage(offer1, offer2, offer3, offer4, slider1, slider2, slider3, slider4, footerImg);
  }
});
export default router;
