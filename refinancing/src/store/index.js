import Vue from "vue";
import Vuex from "vuex";
//import createPersistedState from "vuex-persistedstate";
//import * as Cookies from "js-cookie";
import Bowser from "bowser";
//import * as modules from "./modules";
import enums from "../enums";
import $axios from "../config/axiosInstance";
import handleError from "../helper/handleError";
Vue.use(Vuex);
const { types, url } = enums;
export default new Vuex.Store({
  strict: true,
  state: {
    user: {},
    application: {id: localStorage.appId},
    accessToken: "",
    loading: false,
    nextStatusCode: 201,
    error: {},
    success: {}
  },
  getters: {
    nextStatusCode: state => {
      return state.nextStatusCode;
    },
    getStatusCode: state => {
      return state.application.status;
    }
  },
  mutations: {
    [types.SET_APPLICATION]: (state, payload) => {
      localStorage.appId = payload.id;
      state.application = payload;
    },
    [types.SET_ERROR]: (state, payload) => {
      state.error = payload;
    },
    [types.SET_SUCCESS]: (state, payload) => {
      state.success = payload;
    },
    [types.SET_USER]: (state, payload) => {
      localStorage.custId = payload.id;
      state.user = payload;
    },
    [types.SET_ACCESSTOKEN]: (state, payload) => {
      state.accessToken = payload;
      localStorage.token = payload;
    },
    [types.SET_STATUSCODE]: (state, payload) => {
      state.nextStatusCode = payload;
    },
    [types.ACTIVATE_LOADING]: state => {
      state.loading = true;
    },
    [types.DEACTIVATE_LOADING]: state => {
      state.loading = false;
    }
  },
  actions: {
    checkUserEligibility: async ({ commit, state }, payload) => {
      try {
        const browser = Bowser.parse(window.navigator.userAgent);
         const result = await $axios.post(url.checkUserEligibility, {
          mobile_phone: payload,
          browser_data: {
            data_trigger_location: 'collection_offer_eligibility_check',
            browser_name: browser.browser.name,
            browser_version: browser.browser.version,
            os_name: browser.os.name,
            os_version: browser.os.version,
            os_version_name: browser.os.versionName,
            platform_type: browser.platform.type,
            engine_version: browser.engine.version,
            engine_name: browser.engine.name
          }
        });
        return result;
      } catch (err) {
        const message = handleError(err);
        if (message == "error message: tidak valid" ||
          message == "error message: tidak memenuhi syarat" ||
          message == "error message: You are not eligible" ||
          message =="Mobile_phone Nomor telepon tidak valid") {
          const result = {status: 400, msg: message};
          return result;
        } else {
          commit(types.SET_ERROR, {message});
          return false;
        }
      }
    },
    checkUserEligibilityVerifyOtpCode: async ({commit}, payload) => {
      const { code, requestId } = payload;
      try {
        const result = await $axios.post(url.checkUserEligibilityVerifyOtp, {
          otp_token: code,
          request_id: requestId
        });
        return result;
      } catch (err) {
        const message = handleError(err);
        if (message == "error message: OTP tidak valid" ||
          message == "error message: Request id tidak valid" ||
          message == "error message: Time Expired" ||
          message == "Otp_token Otp tidak valid" ||
          message == "error message: OTP not found: "+code) {
          const result = {status: 400, msg: message};
          return result;
        } else {
          commit(types.SET_ERROR, {message});
          return false;
        }
      }
    }
  }/*,
  modules: modules,
  plugins: [
    createPersistedState({
      getItem: key => Cookies.get(key),
      setItem: (key, value) =>
        Cookies.set(key, value, {
          expires: 3,
          secure: false
        }),
      removeItem: key => Cookies.remove(key)
    })
  ]*/
});
