import "@babel/polyfill";
import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import Vuetify from "vuetify";
//import VeeValidate, {Validator} from "vee-validate";
//import VeeValidateMessagesID from "vee-validate/dist/locale/id";
import * as Sentry from "@sentry/browser";
import "./components/shared";
import enums from "./enums";
Vue.config.productionTip = false;
/*Vue.use(VeeValidate, {
  locale: "id",
  dictionary: {
    id: {messages: VeeValidateMessagesID}
  }
});
Validator.localize("id", VeeValidateMessagesID);*/
if (isNaN(parseInt(process.env.VUE_APP_IS_LOCAL))) {
  Sentry.init({
    dsn: "https://4b74ba2a5d7f4f4287f3dff08b98ab7b@sentry.io/1419595",
    integrations: [
      new Sentry.Integrations.Vue({
        Vue,
        attachProps: true
      }),
      new Sentry.Integrations.ExtraErrorData({depth: 5})
    ],
    environment: process.env.NODE_ENV,
    release: enums.webVersion,
    debug: process.env.NODE_ENV == "production"
  });
}
Vue.router = router;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
