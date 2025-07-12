import 'es6-promise/auto'
import "@babel/polyfill";
import Vue from "vue";
import "./plugins/vuetify";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import App from "./App.vue";
import money from "v-money";
import router from "./router";
import store from "./store";
import Clipboard from "vue-clipboard2";
// import Vuetify from "vuetify";
import VeeValidate, {
  Validator
} from "vee-validate";
import VeeValidateMessagesID from "vee-validate/dist/locale/id";

// import VueAxios from 'vue-axios'
// import VueAuth from '@websanova/vue-auth'
import moment from "moment";
import Vue2Filters from "vue2-filters";

// import $axios from './config/axiosInstance'
// import vueAuthConfig from './config/vueAuth'
import * as Sentry from "@sentry/browser";
// import Raven from "raven-js";
// import RavenVue from "raven-js/plugins/vue";
// import VueRaven from "vue-raven";

import navlog from "./helper/navlog";

import "./registerServiceWorker";
import "./components/shared";
import enums from "./enums";
const navlogPlugin = {
  install() {
    Vue.navlog = navlog;
    Vue.prototype.$navlog = navlog;
  }
};

Vue.use(navlogPlugin);

Vue.config.productionTip = false;
Vue.prototype.moment = moment;

Vue.use(Vue2Filters);
//Vue.use(Vuetify, { theme: { error: "#d52b2b" } });

Vue.use(VeeValidate, {
  locale: "id",
  dictionary: {
    id: {
      messages: VeeValidateMessagesID
    }
  }
});
Validator.localize("id", VeeValidateMessagesID);

Validator.extend("phoneNumberDistict", {
  getMessage: field => `${field} tidak boleh sama`,
  validate: (value, args) => {
    for (let i in args) {
      if (value === args[i]) {
        return false;
      }
    }
    return true;
  }
});

Vue.use(money, {
  precision: 4
});
Vue.use(Clipboard);
// Vue.use(VueAxios, $axios)
// Vue.use(VueAuth, vueAuthConfig)
if (isNaN(parseInt(process.env.VUE_APP_IS_LOCAL))) {
  //ini yang bener
  Sentry.init({
    dsn: "https://4b74ba2a5d7f4f4287f3dff08b98ab7b@sentry.io/1419595",
    integrations: [
      new Sentry.Integrations.Vue({
        Vue,
        attachProps: true
      }),
      new Sentry.Integrations.ExtraErrorData({
        depth: 5
      })
    ],
    environment: process.env.NODE_ENV,
    release: enums.webVersion,
    debug: process.env.NODE_ENV == "production"
  });
}

//ini yang bener

// Raven.config('https://4b74ba2a5d7f4f4287f3dff08b98ab7b@sentry.io/1419595', {
// 	environment: process.env.NODE_ENV || 'dev',
// 	release: enums.webVersion,
// 	debug: true,
// 	maxMessageLength: 1000,
// 	allowDuplicates: true,
// 	instrument: {
// 		tryCatch: true // Instruments timers and event targets
// 	}
// })
// 	.addPlugin(RavenVue, Vue)
// 	.install();

// Vue.use(VueRaven, {
// 	dsn: 'https://4b74ba2a5d7f4f4287f3dff08b98ab7b@sentry.io/1419595'
// 	// environment: process.env.NODE_ENV || 'dev',
// 	// release: enums.webVersion,
// 	// debug: true
// });

Vue.router = router;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
