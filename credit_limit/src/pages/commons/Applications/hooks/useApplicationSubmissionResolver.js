import { useUserContext } from 'providers/UserProvider';
import { useHistory } from 'react-router-dom';
import utils from 'utils';
import { useApplicationApiResolver } from '.';
import { useApplicationContext } from '../providers/ApplicationProvider';

const useApplicationSubmissionResolver = (partner) => {
  const history = useHistory();
  const { submitLongFormResolver } = useApplicationApiResolver(partner);
  const { longFormData } = useApplicationContext();

  const { datas, setDatas, handleNotification, handleLoadingOverlay } =
    useUserContext();

  const isHideCompanyFields =
    longFormData.job_type === 'Staf rumah tangga' ||
    longFormData.job_type === 'Ibu rumah tangga' ||
    longFormData.job_type === 'Tidak bekerja' ||
    longFormData.job_type === 'Mahasiswa';

  const applicationId = utils.store.get('applicationId');

  const handleRedirect = (response) => {
    const token =
      response.data?.expiry_token || response.data?.data?.expiry_token;
    const status = response?.data?.status || response.data?.data?.status;
    const redirectToPage =
      response.data?.redirect_to_page || response.data?.data?.redirect_to_page;

    handleLoadingOverlay(false);

    switch (partner) {
      case 'linkaja':
        if (redirectToPage === 'j1_verification_page') {
          return history.push('/linkaja/pin-verification');
        }

        if (redirectToPage === 'registration_page') {
          handleNotification({
            isOpen: true,
            message: 'Email yang digunakan sudah terdaftar',
          });
          return history.push({
            pathname: '/linkaja/register',
            state: { from: 'review' },
          });
        }

        if (token) {
          utils.store.set('token', token);
        }

        history.replace({
          pathname: '/linkaja/home',
          state: { submitForm: true },
        });
        break;

      default:
        if (status) {
          utils.store.set('appStatus', status);
          setDatas({ ...datas, appStatus: status });
          history.push(`/${partner}/home`);
        }
        break;
    }
  };

  const submitForm = async (props) => {
    handleLoadingOverlay(true);
    const payload = {
      // additional
      web_version: '0.0.1',
      product_line_code: null,
      mantri_id: null,
      can_show_status: true,
      loc_id: null,
      have_facebook_data: false,
      validated_qr_code: false,
      marketing_source: null,
      loan_amount_request: null,
      loan_duration_request: null,
      is_own_phone: '',
      new_mobile_phone: null,
      has_whatsapp_1: '',
      has_whatsapp_2: '',
      bbm_pin: '',
      twitter_username: null,
      instagram_username: null,
      spouse_dob: null,
      spouse_has_whatsapp: null,
      job_function: null,
      income_1: null,
      income_2: null,
      income_3: null,
      college: null,
      major: null,
      graduation_year: null,
      gpa: null,
      has_other_income: false,
      other_income_amount: null,
      other_income_source: null,
      kin_dob: null,
      kin_gender: '',
      work_kodepos: null,
      vehicle_type_1: null,
      vehicle_ownership_1: null,
      bank_branch: null,
      name_in_bank: null,
      is_document_submitted: null,
      is_sphp_signed: null,
      sphp_exp_date: null,
      application_number: 1,
      gmail_scraped_status: 'Not scraped',
      is_courtesy_call: false,
      hrd_name: null,
      company_address: null,
      number_of_employees: null,
      position_employees: null,
      employment_status: null,
      billing_office: null,
      mutation: null,
      dialect: null,
      teaser_loan_amount: null,
      is_deleted: null,
      status_path_locked: null,
      additional_contact_1_name: null,
      additional_contact_1_number: null,
      additional_contact_2_name: null,
      additional_contact_2_number: null,
      loan_purpose_description_expanded: null,
      is_fdc_risky: null,
      address_same_as_ktp: null,
      is_address_suspicious: null,
      landlord_mobile_phone: null,

      customer: utils.store.get('customerId'),
      partner_name: partner,
      email: utils.store.get('email'),

      // page 1
      ktp: longFormData.ktp,
      fullname: longFormData.fullname,
      birth_place: longFormData.birth_place,
      dob: longFormData.dob,
      gender: longFormData.gender,
      address_street_num: longFormData.address_street_num,
      address_provinsi: longFormData.address_provinsi,
      address_kabupaten: longFormData.address_kabupaten,
      address_kecamatan: longFormData.address_kecamatan,
      address_kelurahan: longFormData.address_kelurahan,
      address_kodepos: longFormData.address_kodepos,
      occupied_since: longFormData.occupied_since,
      home_status: longFormData.home_status,
      mobile_phone_1: longFormData.mobile_phone_1,
      mobile_phone_2: longFormData.mobile_phone_2
        ? longFormData.mobile_phone_2
        : undefined,
      marital_status: longFormData.marital_status,
      dependent: longFormData.dependent,

      // page 2
      close_kin_name:
        longFormData.marital_status !== 'Menikah'
          ? longFormData.close_kin_name
          : '',
      close_kin_mobile_phone:
        longFormData.marital_status !== 'Menikah'
          ? longFormData.close_kin_mobile_phone
          : '',
      close_kin_relationship: null,
      kin_relationship: longFormData.kin_relationship,
      kin_name: longFormData.kin_name,
      kin_mobile_phone: longFormData.kin_mobile_phone,
      spouse_name:
        longFormData.marital_status === 'Menikah'
          ? longFormData.spouse_name
          : '',
      spouse_mobile_phone:
        longFormData.marital_status === 'Menikah'
          ? longFormData.spouse_mobile_phone
          : '',

      // page 3
      job_type: longFormData.job_type,
      job_industry: !isHideCompanyFields
        ? longFormData.job_industry
        : undefined,
      job_description: !isHideCompanyFields
        ? longFormData.profession
        : undefined,
      company_name: !isHideCompanyFields
        ? longFormData.company_name
        : undefined,
      company_phone_number: !isHideCompanyFields
        ? longFormData.company_phone_number
        : undefined,
      job_start: longFormData.job_start === '' ? null : longFormData.job_start,
      payday: longFormData.payday === '' ? 1 : longFormData.payday,
      last_education: longFormData.last_education,

      // page 4
      loan_purpose: longFormData.loan_purpose,
      loan_purpose_desc: longFormData.loan_purpose_desc,
      referral_code: longFormData.referral_code,
      monthly_income: longFormData.monthly_income,
      monthly_housing_cost: longFormData.monthly_housing_cost,
      monthly_expenses: longFormData.monthly_expenses,
      total_current_debt: longFormData.total_current_debt,
      bank_name: longFormData.bank_name,
      bank_account_number: longFormData.bank_account_number,

      // page review
      is_term_accepted: true,
      is_verification_agreed: true,
    };

    switch (partner) {
      case 'linkaja':
        payload['address_same_as_ktp'] = false;
        payload['mother_maiden_name'] =
          longFormData.customer_mother_maiden_name;
        break;
      case 'klop':
        payload['longitude'] = props?.longitude;
        payload['latitude'] = props?.latitude;
        payload['customer_mother_maiden_name'] =
          longFormData.customer_mother_maiden_name;
        break;
      default:
        payload['customer_mother_maiden_name'] =
          longFormData.customer_mother_maiden_name;
        break;
    }

    if (props?.pin) {
      payload['pin'] = props.pin;
    }
    try {
      const response = await submitLongFormResolver(payload, applicationId);
      handleRedirect(response);
      handleLoadingOverlay(false);
    } catch (error) {
      handleNotification({
        isOpen: true,
        message:
          error?.response?.data?.errors?.[0] ??
          'Terjadi kesalahan ketika kirim formulir',
      });
      handleLoadingOverlay(false);
    }
  };

  return {
    submitForm,
  };
};

export default useApplicationSubmissionResolver;
