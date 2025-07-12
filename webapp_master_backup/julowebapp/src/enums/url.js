export const API_BASE = process.env.VUE_APP_BASE_URL;
export const ANA_API_BASE = process.env.VUE_APP_ANA_BASE_URL;

//post
export const login = "api/web/v1/login/";
export const register = "api/web/v1/registration/";

export const form = applicationId => `api/web/v1/application/${applicationId}/`;
export const uploadDoc = "api/v1/images/";
export const product = applicationId =>
  `api/v2/submit-product/${applicationId}/`;
export const collateral = "api/v1/collaterals/";

export const bankverification = "api/v1/applications/external-data-imports/";
export const notifyDocumentDone = applicationId =>
  `api/v2/submit-document-flag/${applicationId}/`;
export const sendOtp = "api/v2/application/otp/";
export const verifyOtp = "api/v2/application/validate-otp/";
export const reapply = "api/web/v1/reapply";
export const navlog = `${ANA_API_BASE}/api/etl/v1/nav_logs/`;
export const resetPassword = "api/v1/rest-auth/password/reset/";
export const browserData = "api/web/v1/scrap-data/";
export const instantExpire = applicationId =>
  `api/web/v1/applications/${applicationId}/expire/`;
export const checkUserEligibility = "api/loan_refinancing/v1/eligibility_check/";
export const checkUserEligibilityVerifyOtp = "api/loan_refinancing/v1/otp_confirmation/";
//get
// export const jobtypes = 'api/v2/jobtypes';
// export const jobfields = jobtypeId => `api/v2/jobfields/${jobtypeId}`;
// export const jobs = jobfieldId => `api/v2/jobs/${jobfieldId}`;
// export const regencies = provinceId => `api/v2/regencies/${provinceId}`;
// export const subdistricts = regencyId => `api/v2/subdistricts/${regencyId}`;
// export const villages = subdistrictId => `api/v2/villages/${subdistrictId}`;
// export const postalcode = villageId => `api/v2/postalcode/${villageId}`;

// export const domicileStatus = 'api/v2/domicilestatus';
// export const civilStatus = 'api/v2/civilstatus';
// export const ownerships = 'api/v2/ownerships';
// export const vehicles = 'api/v2/vehicles';

// export const bank = 'api/v2/bank';
// export const relations = 'api/v2/relations';

// export const companies = 'api/v2/companies';
// export const educations = 'api/v2/educations';
// export const colleges = 'api/v2/colleges';
// export const majors = 'api/v2/majors';

export const dropdown = "api/web/v1/dropdown_data/";
export const partnerLoan = applicationId =>
  `api/web/v1/partner-loan/${applicationId}/`;
//export const status = applicationId => `api/web/v1/application/${applicationId}/details/`;
//export const score = costumerId => `api/v2/score/${costumerId}`;
export const getproduct = applicationId =>
  `api/web/v1/credit-score/${applicationId}/`;
export const getdocument = applicationId =>
  `api/v1/applications/${applicationId}/images/?include_deleted=false`;
export const getloans = "api/v1/loans/";
export const getprivacytext = "api/v2/privacy/";
export const getfeatureSetting = "api/v2/mobile/feature-settings";
export const getPayslipSetting = applicationId =>
  `api/v2/mobile/check-payslip-mandatory/${applicationId}`;
export const eligibleInstantExpire = applicationId =>
  `api/web/v1/applications/${applicationId}/expire/`;


export const getLoanPaymentDetail = 'api/v2/popup/unpaid-payment-detail';
export const getPaymentMethod = loanId => `api/v1/payment_methods/?loan_id=${loanId}`;
export const getPayment = loanId => `api/v1/loans/${loanId}/payments/`;
export const getProductDetail = applicationId => `api/v2/homescreen/combined?application_id=${applicationId}`;
export const getMTLCashback = applicationId => `api/v2/cashback/bar?application_id=${applicationId}`;
export const userBankLogin = "api/v1/applications/external-data-imports/";
export const getBankScrapeDetails = jobId => `api/v1/applications/external-data-imports/${jobId}/`;

//loan refinancing api
const loanRefinancingApi = 'api/loan_refinancing/v1/';
export const loanRefinancingLogin = `${loanRefinancingApi}login/`;
export const loanRefinancingGetReasons = `${loanRefinancingApi}get_refinancing_reasons/`;
export const loanRefinancingGetRefinancingOffer = `${loanRefinancingApi}get_refinancing_offer/`;
export const loanRefinancingAcceptRefinancingOffer = `${loanRefinancingApi}accept_refinancing_offer/`;
