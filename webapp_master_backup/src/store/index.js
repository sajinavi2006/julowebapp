import Vue from "vue";
import Vuex from "vuex";
import https from "https";
import http from "http";
import createPersistedState from "vuex-persistedstate";
import * as Cookies from "js-cookie";
import _ from "lodash";
import jsonexport from "jsonexport";
import {promisify} from "es6-promisify";
import DeviceDetector from "device-detector-js";
import MobileDetect from "mobile-detect";
import Bowser from "bowser";

import * as modules from "./modules";
import enums from "../enums";
import $axios from "../config/axiosInstance";
import handleError from "../helper/handleError";
import filterActiveApplication from "../helper/activeApplication";
import {bank} from "../enums/url";

import parseCurrencyToInt from "../helper/parseCurrencytoInt";
//f6f6f6

import jsonpack from "jsonpack";

import LZString from "lz-string";

Vue.use(Vuex);

const { types, url } = enums;
const jsontocsv = promisify(jsonexport);
const deviceDetector = new DeviceDetector();

export default new Vuex.Store({
  strict: true,
  state: {
    user: {},
    application: {id: localStorage.appId},
    applicationNumber: 0,
    loan: {},
    accessToken: "",
    loading: false,
    nextStatusCode: 201,
    productNScore: {},
    error: {},
    success: {},
    loanRefinancingReason: {},
    encryptedCustomerData: ""
  },
  getters: {
    nextStatusCode: state => {
      return state.nextStatusCode;
    },
    productNScore: state => {
      return state.productNScore;
    },
    getStatusCode: state => {
      return state.application.status;
    },
    getReApply: state => {
      return state.user.can_reapply;
    },
    getMainRefinancingReason: state => {
      return state.loanRefinancingReason.mainReason
    },
    getSubRefinancingReason: state => {
      return state.loanRefinancingReason.subReason
    },
    getAdditionalReason: state => {
      return state.loanRefinancingReason.additionalReason
    }
  },
  mutations: {
    [types.SET_APPLICATION]: (state, payload) => {
      localStorage.appId = payload.id;
      // localStorage.webv = payload.web_version;
      state.application = payload;
    },
    [types.SET_APPLICATION_NUMBER]: (state, payload) => {
      state.applicationNumber = payload;
    },
    [types.SET_LOAN]: (state, payload) => {
      state.loan = payload;
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
      //$axios.defaults.headers.common['Authorization'] = `Token ${state.accessToken}`;
    },
    [types.SET_STATUSCODE]: (state, payload) => {
      state.nextStatusCode = payload;
    },
    [types.SET_PRODUCT_CREDITSCORE]: (state, payload) => {
      state.productNScore = payload;
    },
    [types.ACTIVATE_LOADING]: state => {
      state.loading = true;
    },
    [types.DEACTIVATE_LOADING]: state => {
      state.loading = false;
    },
    [types.LOGOUT]: state => {
      state.application = {};
      state.user = {};
      state.accessToken = "";
      state.productNScore = {};
      state.error = {};

      //save navlog
      const navlog = localStorage.navlog ? JSON.parse(localStorage.navlog) : [];

      //save prevapp
      let prevapp = localStorage.prevapp;
      //save form data
      let checkData = false;
      const result = {};
      let form = false;
      for (let i = 1; i <= 4; i++) {
        if (localStorage.getItem(`form${i}`)) {
          checkData = true;
          result[`form${i}`] = JSON.parse(localStorage.getItem(`form${i}`));
        }
        if (localStorage.getItem(`form${i}Valid`)) {
          checkData = true;
          result[`form${i}Valid`] = JSON.parse(
            localStorage.getItem(`form${i}Valid`)
          );
        }
      }
      // if (localStorage.fotoKtp) {
      // 	checkData = true;
      // 	result.fotoKtp = JSON.parse(LZString.decompress(localStorage.fotoKtp));
      // 	//result.fotoKtp = JSON.parse(localStorage.fotoKtp);
      // 	//result.fotoKtp = jsonpack.unpack(localStorage.fotoKtp);
      // }
      result.formHead = localStorage.formHead;
      if (state.application.id) {
        result.appId = state.application.id;
      } else if (localStorage) {
        result.appId = localStorage.appId;
      }
      if (checkData) {
        form = LZString.compress(JSON.stringify(result));
      }

      //clear
      localStorage.clear();
      localStorage.navlog = JSON.stringify(navlog);
      if (form) {
        localStorage.prevapp = form;
      } else if (prevapp) {
        localStorage.prevapp = prevapp;
      }
    },
    [types.RESTORE_LOCALSTORAGE_FORM]: state => {
      if (localStorage.prevapp === undefined) return;
      if (localStorage.prevapp) {
        const form = JSON.parse(LZString.decompress(localStorage.prevapp));
        if (parseInt(state.application.id) == parseInt(form.appId)) {
          localStorage.formHead = form.formHead;
          localStorage.appId = form.appId;
          //localStorage.fotoKtp = LZString.compress(JSON.stringify(form.fotoKtp));
          //localStorage.fotoKtp = JSON.stringify(form.fotoKtp);
          //localStorage.fotoKtp = jsonpack.pack(form.fotoKtp);

          delete form.formHead;
          delete form.appId;
          delete form.fotoKtp;
          for (let i in form) {
            localStorage[i] = JSON.stringify(form[i]);
          }
        }
      }
    },
    [types.REMOVE_LOCALSTORAGE_FORM]: () => {
      //delete localstorage form
      for (let i = 1; i <= 4; i++) {
        localStorage.removeItem(`form${i}`);
        localStorage.removeItem(`form${i}Valid`);
      }
      localStorage.removeItem("fotoKtp");
      localStorage.removeItem("formHead");
      localStorage.removeItem("dropdown");
    },
    [types.SET_MAIN_AND_SUB_REASONS]: (state, payload) => {
      state.loanRefinancingReason = payload;
    },
    [types.SET_ENCRYPTED_CUSTOMER_DATA]: (state, payload) =>{
      localStorage.encryptedCustomerData = payload;
      state.encryptedCustomerData = payload;
    }
  },
  actions: {
    login: async ({commit}, payload) => {
      try {
        let result = await $axios.post(url.login, payload);
        commit(types.SET_USER, result.data.customer);
        commit(types.SET_ACCESSTOKEN, result.data.token);
        //apus
        //result.data.applications[1].status = 105;
        //
        let application = {};
        if (result.data.applications.length == 1) {
          application = result.data.applications[0];
        } else if (result.data.applications.length > 1) {
          //search the latest application
          application = _.sortBy(
            result.data.applications,
            o => new Date(o.cdate) * -1
          )[0];
          // application = filterActiveApplication(result.data.applications);
          // if (!application) {
          //   //search the latest application
          //   application = _.sortBy(
          //     result.data.applications,
          //     o => o.cdate * -1
          //   )[0];
          // }
        }
        commit(types.SET_APPLICATION_NUMBER, result.data.applications.length);
        commit(types.SET_APPLICATION, application);
        commit(types.RESTORE_LOCALSTORAGE_FORM);
        return application;
      } catch (err) {
        const message = handleError(err);
        commit(types.SET_ERROR, {message});
        return false;
      }
    },
    register: async ({commit}, payload) => {
      try {
        const result = await $axios.post(url.register, payload);
        commit(types.SET_USER, result.data.customer);
        commit(types.SET_ACCESSTOKEN, result.data.token);
        commit(types.SET_APPLICATION_NUMBER, 1);
        const application = result.data.applications[0];
        commit(types.SET_APPLICATION, application);

        return application.status;
      } catch (err) {
        const message = handleError(err);
        commit(types.SET_ERROR, {message});
        return false;
      }
    },
    saveForm: async ({ commit, state }, payload) => {
      try {
        const {
          form1: personalData,
          form2: supportingData,
          form3: jobEducationData,
          form4: financialData
        } = payload;

        const sortedIncome = _.sortBy(
          financialData.netMonthlyIncome,
          o => o.text * -1
        );
        const income = {};
        for (let i = 0; i < sortedIncome.length; i++) {
          income[`income_${i + 1}`] = parseCurrencyToInt(sortedIncome[i].value);
        }

        const gender = parseInt(personalData.sex || 0) == 1 ? "Pria" : "Wanita";
        const body = {
          ...income,
          application_status: state.application.status,
          application_number: state.applicationNumber,
          address_street_num: personalData.alamat,
          address_provinsi: personalData.province,
          address_kabupaten: personalData.regency,
          address_kecamatan: personalData.village,
          address_kelurahan: personalData.subdistrict,
          address_kodepos: personalData.postalcode,
          bank_name: financialData.bankName,
          bank_branch: financialData.bankBranch,
          bank_account_number: financialData.accNum,
          //birth_place: personalData.birthPlace,
          close_kin_name: supportingData.parentsName,
          close_kin_mobile_phone: supportingData.parentsNo,
          // close_kin_relationship: ,
          company_name: jobEducationData.companyName,
          company_phone_number: jobEducationData.companyNo,
          // company_address: ,
          college: jobEducationData.college,
          dob: personalData.dob,
          // device: ,
          //dialect: personalData.language,
          dependent: personalData.dependencyNum,
          email: state.user.email,
          fullname: personalData.name,
          gender,
          gpa: jobEducationData.gpa,
          graduation_year: supportingData.graduationYear,
          // has_whatsapp_2: ,
          // has_whatsapp_1: ,
          home_status: personalData.domicileStatus,
          // income_1: ,
          // income_2: ,
          // income_3: ,
          is_own_phone: parseInt(personalData.isPersonalPhone || 0) === 0,
          job_start: jobEducationData.startWorkingDate,
          job_type: jobEducationData.jobType,
          job_industry: jobEducationData.jobField,
          job_description: jobEducationData.job,
          ktp: state.user.ktp,
          kin_name: supportingData.nameOfKin,
          kin_mobile_phone: supportingData.kinNo,
          kin_relationship: supportingData.relation,
          // loan_amount_request: ,
          // loan_duration_request: ,
          loan_purpose: financialData.loanPurposeCategory,
          loan_purpose_desc: financialData.loanPurposeDescription,
          last_education: jobEducationData.lastEducation,
          major: jobEducationData.majors,
          marketing_source: financialData.knowJULOfrom,
          mobile_phone_1: personalData.hpnum,
          mobile_phone_2: personalData.hpnum2,
          monthly_income: financialData.totalMonthlyIncome,
          monthly_expenses: financialData.totalMonthlySpending,
          monthly_housing_cost: financialData.totalHouseRentPerMonth,
          marital_status: personalData.civilStatus,
          name_in_bank: financialData.accName,
          occupied_since: personalData.occupiedSince,
          payday: jobEducationData.payrollDate || 1,
          // product_line: ,
          referral_code: financialData.referralCode,
          spouse_name: supportingData.spouseName,
          spouse_dob: supportingData.dobSpouse,
          spouse_mobile_phone: supportingData.spouseNo,
          total_current_debt: financialData.totalMonthlyDebt,
          vehicle_type_1: financialData.vehicle,
          vehicle_ownership_1: financialData.ownership
          // work_kodepos:
        };
        const result = await $axios.patch(url.form(state.application.id), body);
        //commit(types.SET_APPLICATION, result);
        return result.data.status;
      } catch (err) {
        const message = handleError(err);
        commit(types.SET_ERROR, {message});
        return false;
      }
    },
    saveDoc: async ({ commit, state }, payload) => {
      try {
        const formData = new FormData();
        formData.append("image_source", state.application.id);
        formData.append("image_type", payload.key);
        formData.append("upload", payload.file);

        const result = await $axios.post(url.uploadDoc, formData);
        return payload.key;
      } catch (err) {
        const message = handleError(err);
        commit(types.SET_ERROR, {message});
        return false;
      }
    },
    saveProduct: async ({ commit, state }, payload) => {
      try {
        const result = await $axios.put(url.product(state.application.id), {
          product_line_code: payload.product,
          loan_amount_request: payload.loanAmount || 0,
          loan_duration_request: payload.loanDuration || 0
        });
        return true;
      } catch (err) {
        const message = handleError(err);
        commit(types.SET_ERROR, {message});
        return false;
      }
    },
    collateral: async ({ commit, state }, payload) => {
      try {
        let type = "";
        if (payload.key === "motorcycle") {
          type = "Motor";
        } else if (payload.key === "car") {
          type = "Mobil";
        } else if (payload.key === "sertificate") {
          type = "Sertifikat";
        }

        const result = await $axios.post(url.collateral, {
          collateral_type: type,
          collateral_name: payload.model,
          collateral_year: payload.year ? payload.year.toString() : "0",
          application_id: state.application.id
        });
        return true;
      } catch (err) {
        const message = handleError(err);
        commit(types.SET_ERROR, {message});
        return false;
      }
    },
    bankverification: async ({ commit, state }, payload) => {
      try {
        const { userID, pin, bankcode } = payload;
        const result = await $axios.post(url.bankverification, {
          application_id: state.application.id,
          data_type: bankcode,
          credentials: {
            username: userID,
            password: pin
          }
        });
        return true;
      } catch (err) {
        const message = handleError(err);
        commit(types.SET_ERROR, {message});
        return false;
      }
    },
    notifyDocumentDone: async ({ commit, state }) => {
      try {
        const result = await $axios.put(
          url.notifyDocumentDone(state.application.id),
          {is_document_submitted: true}
        );
        commit(types.SET_APPLICATION, result.data.content.application);
        return result.data.content.application.status;
      } catch (err) {
        const message = handleError(err);
        commit(types.SET_ERROR, {message});
        return false;
      }
    },
    otp: async ({commit}, payload) => {
      try {
        const result = await $axios.post(url.sendOtp, {
          phone: payload,
          request_id: "1"
        });
        return result.data.content.parameters.wait_time_seconds;
      } catch (err) {
        const message = handleError(err);
        commit(types.SET_ERROR, {message});
        return false;
      }
    },
    verifyotp: async ({commit}, payload) => {
      try {
        const result = await $axios.post(url.verifyOtp, {
          otp_token: payload,
          request_id: "1"
        });
        return result.data.success;
      } catch (err) {
        const message = handleError(err);
        commit(types.SET_ERROR, {message});
        return false;
      }
    },
    reapply: async ({ commit, state }, payload) => {
      try {
        const result = await $axios.post(url.reapply, {
          ...payload,
          web_version: enums.webVersion
        });
        if (result.data.error_message) {
          commit(types.SET_ERROR, {message: result.data.error_message});
          return false;
        } else {
          commit(types.SET_APPLICATION, result.data.content);
          return result.data.content.status;
        }
      } catch (err) {
        const message = handleError(err);
        commit(types.SET_ERROR, {message});
        return false;
      }
    },
    resetPassword: async ({commit}, payload) => {
      try {
        const result = await $axios.post(url.resetPassword, {email: payload});
        return result.data;
      } catch (err) {
        const message = handleError(err);
        commit(types.SET_ERROR, {message});
        return false;
      }
    },
    browserData: async ({ commit, state }, payload) => {
      try {
        let device = false;
        let dataTrigger = payload;
        if (
          payload == "update_application" &&
          state.application.application_number > 1
        ) {
          dataTrigger = "reapply_application";
        }
        const browser = Bowser.parse(window.navigator.userAgent);
        try {
          device = deviceDetector.parse(window.navigator.userAgent);
        } catch (e) {
          handleError(e, window.navigator.userAgent);
          device = {device: {}};
        }

        const {bot} = device;
        const result = await $axios.post(url.browserData, {
          customer_id: state.user.id,
          data_trigger_location: dataTrigger,
          application_id: state.application.id,
          browser_name: browser.browser.name,
          browser_version: browser.browser.version,
          os_name: browser.os.name,
          os_version: browser.os.version,
          os_version_name: browser.os.versionName,
          platform_type: browser.platform.type,
          engine_version: browser.engine.version,
          engine_name: browser.engine.name,
          device_model:
            device.device.brand || device.device.model
              ? `${device.device.brand} | ${device.device.model}`
              : "",
          bot
        });
        return result.data;
      } catch (err) {
        const message = handleError(err);
        commit(types.SET_ERROR, {message});
        return false;
      }
    },
    sendNavlog: async ({ commit, state }, payload) => {
      try {
        if (!state.user.id || !state.application.id) {
          return false;
        }

        //get device brand
        let device = false;
        try {
          device = deviceDetector.parse(window.navigator.userAgent);
        } catch (e) {
          //handleError(e, window.navigator.userAgent);
          device = {device: {}};
        }
        const md = new MobileDetect(window.navigator.userAgent);
        let isMobile = "desktop_web";
        if (md.mobile() || md.tablet()) {
          isMobile = "mobile_web";
        }
        //loop data
        for (let i in payload) {
          payload[i].type = isMobile;
          payload[i]["customer_id"] = state.user.id;
          payload[i]["application_id"] = state.application.id;
          payload[i]["app_version"] = state.application["web_version"];
          payload[i]["device_model_name"] =
            device.device.brand || device.device.model
              ? `${device.device.brand} | ${device.device.model}`
              : "";
        }

        const data = JSON.parse(JSON.stringify(payload));
        const csv = await jsontocsv(data);
        var file = new File([csv], "filename.csv", {
          type: "text/csv",
          lastModified: new Date(),
          endings: "native"
        });
        // var file2 = new Blob([csv], { type: 'text/csv', endings: 'native' });
        const formData = new FormData();
        formData.append("navlog_file", file);
        const result = await $axios({
          method: "post",
          url: url.navlog,
          data: formData,
          headers: {Authorization: `Token ${process.env.VUE_APP_TOKEN_ANA}`},
          httpsAgent: new https.Agent({rejectUnauthorized: false}),
          httpAgent: new http.Agent({rejectUnauthorized: false})
        });
        if (result) {
          localStorage.navlog = JSON.stringify([]);
        }
      } catch (err) {
        const message = handleError(err);
        commit(types.SET_ERROR, {message});
        return false;
      }
    },
    instantExpire: async ({ commit, state }) => {
      try {
        const result = await $axios.post(
          url.instantExpire(state.application.id)
        );
        return result.data;
      } catch (err) {
        const message = handleError(err);
        commit(types.SET_ERROR, {message});
        return false;
      }
    },
    eligibleInstantExpire: async ({ commit, state }) => {
      try {
        const result = await $axios.get(
          url.eligibleInstantExpire(state.application.id)
        );
        return result.data.allow_instant_expire;
      } catch (err) {
        const message = handleError(err);
        return false;
      }
    },
    getStatusCode: async ({ commit, state }) => {
      try {
        const result = await $axios.get(url.status(state.application.id));
        return result.data.status;
      } catch (err) {
        const message = handleError(err);
        commit(types.SET_ERROR, {message});
        return false;
      }
    },
    partnerLoan: async ({ commit, state }) => {
      try {
        const result = await $axios.get(url.partnerLoan(state.application.id));
        return result.data.content;
      } catch (err) {
        const message = handleError(err);
        commit(types.SET_ERROR, {message});
        return false;
      }
    },
    getLoan: async ({ commit, state }) => {
      try {
        const result = await $axios.get(url.getloans);
        const loan = result.data.results.find(
          x => x.application == localStorage.appId
        );
        commit(types.SET_LOAN, loan);
        return loan;
      } catch (err) {
        const message = handleError(err);
        commit(types.SET_ERROR, {message});
        return false;
      }
    },
    dropdown: async ({commit}) => {
      try {
        if (localStorage.dropdown) {
          return JSON.parse(LZString.decompress(localStorage.dropdown));
        }
        const result = await $axios.get(url.dropdown);
        const dropdownContent = result.data;

        localStorage.dropdown = LZString.compress(
          JSON.stringify(dropdownContent)
        );
        return dropdownContent;
      } catch (err) {
        const message = handleError(err);
        commit(types.SET_ERROR, {message});
        return false;
      }
    },
    getProductAndCreditScore: async ({ commit, state }) => {
      try {
        // const productNScore = {
        //   score: "B+",
        //   message: "manual edit via QA API",
        //   products: [
        //     //
        //     10,
        //     20,
        //     81,
        //     82,
        //     83,
        //     84,
        //     90,
        //     91,
        //     92,
        //     93
        //   ],
        //   loc: { status: "inactive", can_apply: false, limit: 300000 },
        //   product_lines: [
        //     {
        //       product_line_code: 30,
        //       weekly_installment: null,
        //       origination_fee_rate: 0.0,
        //       cdate: "2018-06-25T09:12:33.456518Z",
        //       udate: "2018-06-25T09:14:10.571991Z",
        //       product_line_type: "CTL1",
        //       min_amount: 0,
        //       max_amount: 0,
        //       min_duration: 0,
        //       max_duration: 0,
        //       min_interest_rate: 0.0,
        //       max_interest_rate: 0.0,
        //       payment_frequency: "Monthly",
        //       handler: null,
        //       product_profile: 5,
        //       default_workflow: null
        //     },
        //     {
        //       product_line_code: 40,
        //       weekly_installment: null,
        //       origination_fee_rate: 0.0,
        //       cdate: "2018-06-25T09:12:33.459758Z",
        //       udate: "2018-06-25T09:14:10.583352Z",
        //       product_line_type: "BRI1",
        //       min_amount: 500000,
        //       max_amount: 5000000,
        //       min_duration: 3,
        //       max_duration: 6,
        //       min_interest_rate: 0.04,
        //       max_interest_rate: 0.04,
        //       payment_frequency: "Monthly",
        //       handler: null,
        //       product_profile: 7,
        //       default_workflow: null
        //     },
        //     {
        //       product_line_code: 50,
        //       weekly_installment: null,
        //       origination_fee_rate: 0.08,
        //       cdate: "2018-06-25T09:12:33.463311Z",
        //       udate: "2018-06-25T09:14:10.600428Z",
        //       product_line_type: "GRAB1",
        //       min_amount: 1000000,
        //       max_amount: 2000000,
        //       min_duration: 20,
        //       max_duration: 25,
        //       min_interest_rate: 0.0,
        //       max_interest_rate: 0.0,
        //       payment_frequency: "Daily",
        //       handler: null,
        //       product_profile: 9,
        //       default_workflow: null
        //     },
        //     {
        //       product_line_code: 70,
        //       weekly_installment: [
        //         { loan_amount: 2000000, loan_duration: 4, installment: 520000 },
        //         { loan_amount: 2000000, loan_duration: 6, installment: 360000 },
        //         {
        //           loan_amount: 5000000,
        //           loan_duration: 4,
        //           installment: 1290000
        //         },
        //         { loan_amount: 5000000, loan_duration: 6, installment: 885000 }
        //       ],
        //       origination_fee_rate: 0.05,
        //       cdate: "2018-06-25T09:14:16.530317Z",
        //       udate: "2018-06-26T07:08:44.323378Z",
        //       product_line_type: "GRABF1",
        //       min_amount: 2000000,
        //       max_amount: 5000000,
        //       min_duration: 4,
        //       max_duration: 6,
        //       min_interest_rate: 0.032,
        //       max_interest_rate: 0.08,
        //       payment_frequency: "Weekly",
        //       handler: null,
        //       product_profile: 12,
        //       default_workflow: null
        //     },
        //     {
        //       product_line_code: 60,
        //       weekly_installment: null,
        //       origination_fee_rate: 0.0,
        //       cdate: "2018-06-25T09:14:12.058365Z",
        //       udate: "2018-07-02T09:04:21.893900Z",
        //       product_line_type: "LOC",
        //       min_amount: 300000,
        //       max_amount: 300000,
        //       min_duration: 1,
        //       max_duration: 1,
        //       min_interest_rate: 0.0,
        //       max_interest_rate: 0.0,
        //       payment_frequency: "Monthly",
        //       handler: null,
        //       product_profile: 11,
        //       default_workflow: 4
        //     },
        //     {
        //       product_line_code: 20,
        //       weekly_installment: null,
        //       origination_fee_rate: 0.05,
        //       cdate: "2018-06-25T09:12:33.453216Z",
        //       udate: "2018-07-12T11:18:41.689429Z",
        //       product_line_type: "STL1",
        //       min_amount: 1000000,
        //       max_amount: 1000000,
        //       min_duration: 1,
        //       max_duration: 1,
        //       min_interest_rate: 0.1,
        //       max_interest_rate: 0.1,
        //       payment_frequency: "Monthly",
        //       handler: null,
        //       product_profile: 3,
        //       default_workflow: null
        //     },
        //     {
        //       product_line_code: 10,
        //       weekly_installment: null,
        //       origination_fee_rate: 0.05,
        //       cdate: "2018-06-25T09:12:33.449646Z",
        //       udate: "2018-12-20T10:07:14.843713Z",
        //       product_line_type: "MTL1",
        //       min_amount: 2000000,
        //       max_amount: 6000000,
        //       min_duration: 3,
        //       max_duration: 5,
        //       min_interest_rate: 0.05,
        //       max_interest_rate: 0.05,
        //       payment_frequency: "Monthly",
        //       handler: null,
        //       product_profile: 1,
        //       default_workflow: null
        //     },
        //     {
        //       product_line_code: 81,
        //       weekly_installment: null,
        //       origination_fee_rate: 0.05,
        //       cdate: "2019-02-26T13:16:16.245384Z",
        //       udate: "2019-02-26T13:16:16.245429Z",
        //       product_line_type: "SILVER",
        //       min_amount: 1000000,
        //       max_amount: 3000000,
        //       min_duration: 12,
        //       max_duration: 12,
        //       min_interest_rate: 0.24,
        //       max_interest_rate: 0.48,
        //       payment_frequency: "Monthly",
        //       handler: null,
        //       product_profile: 14,
        //       default_workflow: null
        //     },
        //     {
        //       product_line_code: 82,
        //       weekly_installment: null,
        //       origination_fee_rate: 0.05,
        //       cdate: "2019-02-26T13:16:16.253143Z",
        //       udate: "2019-02-26T13:16:16.253171Z",
        //       product_line_type: "GOLDEN",
        //       min_amount: 3000000,
        //       max_amount: 4000000,
        //       min_duration: 12,
        //       max_duration: 12,
        //       min_interest_rate: 0.24,
        //       max_interest_rate: 0.48,
        //       payment_frequency: "Monthly",
        //       handler: null,
        //       product_profile: 15,
        //       default_workflow: null
        //     },
        //     {
        //       product_line_code: 83,
        //       weekly_installment: null,
        //       origination_fee_rate: 0.05,
        //       cdate: "2019-02-26T13:16:16.259367Z",
        //       udate: "2019-02-26T13:16:16.259394Z",
        //       product_line_type: "PLATINUM",
        //       min_amount: 4000000,
        //       max_amount: 6000000,
        //       min_duration: 12,
        //       max_duration: 12,
        //       min_interest_rate: 0.24,
        //       max_interest_rate: 0.48,
        //       payment_frequency: "Monthly",
        //       handler: null,
        //       product_profile: 16,
        //       default_workflow: null
        //     },
        //     {
        //       product_line_code: 84,
        //       weekly_installment: null,
        //       origination_fee_rate: 0.05,
        //       cdate: "2019-02-26T13:16:16.265396Z",
        //       udate: "2019-02-26T13:16:16.265422Z",
        //       product_line_type: "DIAMOND",
        //       min_amount: 6000000,
        //       max_amount: 8000000,
        //       min_duration: 12,
        //       max_duration: 12,
        //       min_interest_rate: 0.24,
        //       max_interest_rate: 0.48,
        //       payment_frequency: "Monthly",
        //       handler: null,
        //       product_profile: 17,
        //       default_workflow: null
        //     },
        //     {
        //       product_line_code: 90,
        //       weekly_installment: null,
        //       origination_fee_rate: 0.05,
        //       cdate: "2019-03-06T04:19:47.614539Z",
        //       udate: "2019-03-06T04:19:47.614566Z",
        //       product_line_type: "LAKU1",
        //       min_amount: 1000000,
        //       max_amount: 8000000,
        //       min_duration: 12,
        //       max_duration: 12,
        //       min_interest_rate: 0.24,
        //       max_interest_rate: 0.48,
        //       payment_frequency: "Monthly",
        //       handler: null,
        //       product_profile: 19,
        //       default_workflow: null
        //     },
        //     {
        //       product_line_code: 92,
        //       weekly_installment: null,
        //       origination_fee_rate: 0.0,
        //       cdate: "2019-03-25T06:19:03.985230Z",
        //       udate: "2019-03-25T06:19:03.985254Z",
        //       product_line_type: "ICARE1",
        //       min_amount: 2000000,
        //       max_amount: 8000000,
        //       min_duration: 3,
        //       max_duration: 6,
        //       min_interest_rate: 0.3,
        //       max_interest_rate: 0.3,
        //       payment_frequency: "Monthly",
        //       handler: null,
        //       product_profile: 21,
        //       default_workflow: 7
        //     },
        //     {
        //       product_line_code: 94,
        //       weekly_installment: null,
        //       origination_fee_rate: 0.02,
        //       cdate: "2019-03-28T04:12:41.819032Z",
        //       udate: "2019-03-28T04:12:41.819051Z",
        //       product_line_type: "AXIATA1",
        //       min_amount: 1000000,
        //       max_amount: 10000000,
        //       min_duration: 1,
        //       max_duration: 1,
        //       min_interest_rate: 0.0,
        //       max_interest_rate: 0.0,
        //       payment_frequency: "Monthly",
        //       handler: null,
        //       product_profile: 23,
        //       default_workflow: 7
        //     }
        //   ]
        // };
        // const rand = Math.floor(Math.random() * 2);
        // if (rand) {
        //   productNScore.products = [30];
        //   productNScore.score = "C";
        // }
        // return productNScore;

        const result = await $axios.get(url.getproduct(state.application.id));
        return result.data;
      } catch (err) {
        //const message = handleError(err);
        //commit(types.SET_ERROR, { message });
        throw err;
        //return false;
      }
    },
    getDocuments: async ({ commit, state }) => {
      try {
        const response = await $axios.get(
          url.getdocument(state.application.id)
        );
        response.data.results.forEach(r => {
          r.image_url_api = r.image_url_api
            .split("?")
            .map((str, index) => (index === 0 ? decodeURIComponent(str) : str))
            .join("?");
          r.thumbnail_url_api = r.thumbnail_url_api
            .split("?")
            .map((str, index) => (index === 0 ? decodeURIComponent(str) : str))
            .join("?");
        });
        return response.data.results;
      } catch (err) {
        const message = handleError(err);
        commit(types.SET_ERROR, {message});
        return false;
      }
    },
    getOtpSetting: async ({commit}) => {
      try {
        if (localStorage.otpActive || localStorage.otpActive === false) {
          return localStorage.otpActive;
        }
        const result = await $axios.get(
          url.getfeatureSetting + "?feature_name=mobile_phone_1_otp"
        );
        localStorage.otpActive = result.data.content.active;
        return localStorage.otpActive;
      } catch (err) {
        const message = handleError(err);
        commit(types.SET_ERROR, {message});
        return false;
      }
    },
    getprivacytext: async ({commit}) => {
      try {
        if (localStorage.privacyText) {
          return JSON.parse(LZString.decompress(localStorage.privacyText));
        }
        const result = await $axios.get(url.getprivacytext);
        localStorage.privacyText = LZString.compress(
          JSON.stringify(result.data)
        );
        return result.data;
      } catch (err) {
        const message = handleError(err);
        commit(types.SET_ERROR, {message});
        return false;
      }
    },
    getPayslipSetting: async ({ commit, state }) => {
      try {
        if (localStorage.payslipSetting) {
          return localStorage.payslipSetting;
        }
        const result = await $axios.get(
          url.getPayslipSetting(state.application.id)
        );
        localStorage.payslipSetting = result.data.is_mandatory;
        return result.data.is_mandatory;
      } catch (err) {
        const message = handleError(err);
        commit(types.SET_ERROR, {message});
        return false;
      }
    },
    getPaymentMethod: async ({ commit, state }) => {
      try {
        const result = await $axios.get(url.getPaymentMethod(state.loan.id));
        return result.data.results;
      } catch (err) {
        const message = handleError(err);
        commit(types.SET_ERROR, {message});
        return false;
      }
    },
    getPayments: async ({ commit, state }) => {
      try {
        const result = await $axios.get(url.getPayment(state.loan.id));
        return result.data;
      } catch (err) {
        const message = handleError(err);
        commit(types.SET_ERROR, {message});
        return false;
      }
    },
    getMTLCashback: async ({ commit, state }) => {
      try {
        const result = await $axios.get(
          url.getMTLCashback(state.application.id)
        );
        return result.data.content;
      } catch (err) {
        const message = handleError(err);
        commit(types.SET_ERROR, {message});
        return false;
      }
    },
    getProductDetail: async ({ commit, state }) => {
      try {
        const result = await $axios.get(
          url.getProductDetail(state.application.id)
        );
        return result.data;
      } catch (err) {
        const message = handleError(err);
        commit(types.SET_ERROR, {message});
        return false;
      }
    },
    userBankLogin: async ({ commit, state }, payload) => {
      try {
        const { username, password, data_type, appId } = payload;
        const result = await $axios.post(url.userBankLogin, {
          application_id: appId,
          data_type: data_type,
          credentials: {
            username: username,
            password: password
          }
        });
        return result.data;
      } catch (err) {
        const message = handleError(err);
        commit(types.SET_ERROR, {message});
        return false;
      }
    },
    bankScrapeDetails: async ({commit}, payload) => {
      try {
        const result = await $axios.get(url.getBankScrapeDetails(payload));
        return result.data;
      } catch (err) {
        const message = handleError(err);
        commit(types.SET_ERROR, {message});
        return false;
      }
    },
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
    },
    bulkGet: async ({commit}, payload) => {
      try {
        const getArr = payload.map(x => {
          return $axios.get(x.url);
        });
        const result = await Promise.all(getArr);
        const modifiedResult = result.map((x, i) => {
          return {
            ...payload[i],
            data: x
          };
        });
        return modifiedResult;
      } catch (err) {
        const message = handleError(err);
        commit(types.SET_ERROR, {message});
        return false;
      }
    },
    autoLogin: async ({ commit }, payload) => {
      try {
        const { data } = await $axios.get(url.loanRefinancingLogin + payload.encryptedCustomerData );
        commit(types.SET_USER, data.data.customer);
        commit(types.SET_ACCESSTOKEN, data.data.token);
        commit(types.SET_APPLICATION, data.data.application);
        commit(
          types.SET_ENCRYPTED_CUSTOMER_DATA,
          payload.encryptedCustomerData);

        return true;

      } catch (err) {
        const message = handleError(err);
        commit(types.SET_ERROR, {message});

        return false;
      }
    },
    getLoanRefinancingReasons: async({ state, commit }) => {
      try {
        const { data } = await $axios.get(url.loanRefinancingGetReasons + state.encryptedCustomerData);

        return data;
      } catch (err) {
        const message = handleError(err);
        commit(types.SET_ERROR, {message});

        return false;
      }
    },
    getTenureProbabilities: async({ commit, state }) => {
      try {
        let encryptedData = ''
        if (state.encryptedCustomerData === '') {
          encryptedData = localStorage.getItem('encryptedCustomerData')
        } else {
          encryptedData = state.encryptedCustomerData
        }
        const { data } = await $axios.get(url.loanRefinancingGetRefinancingOffer + encryptedData);

        return data;
      } catch (err) {
        const message = handleError(err);
        commit(types.SET_ERROR, {message});

        return false;
      }
    },
    submitLoanRefinancingOffer: async ({ commit }, payload) => {
      try {
        await $axios.post(url.loanRefinancingAcceptRefinancingOffer, payload);
        commit(types.LOGOUT);

        return true;
      } catch (err) {
        const message = handleError(err);
        commit(types.SET_ERROR, {message});

        return false;
      }
    }
  },
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

    // domain: `.${window.location.hostname}`
  ]
});
