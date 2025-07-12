/* eslint-disable no-console */
import { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import MapIcon from '@material-ui/icons/Map';

import useGlobalState from 'actions';

import { blacklistedPartnerLiveness, whitelistedPartnerCropImageSelfie } from 'constant';

import { useApplicationContext } from '../providers/ApplicationProvider';
import { useUserContext } from 'providers/UserProvider';
import ApplicationLayout from '../components/ApplicationLayout';
import OtpVerificationDialog from '../components/OtpVerificationDialog';

import Input from 'components/Input';
import DatePicker from 'components/DatePicker';
import PhoneFormatCustom from 'components/forms/phone-format-custom';
import RadioInput from 'components/RadioInput';
import InputAutocomplete from 'components/InputAutocomplete';
import SelectOption from 'components/SelectOption';
import CameraNew from 'components/camera-new';

import zoom from 'assets/img/icon/ic-verify-check.svg';
import IconVerified from 'assets/img/icon/ic-verified.svg';
import { Button, Col, Div, Row } from 'assets/css/styled';
import { IdentityInfo, Subtitle } from '../styles';
import { schemaPersonalIdentity } from '../validator';
import { postAddressInfo, verifyPhoneNumber } from 'services/form';
import { photoGuide } from './styles';

import Maps from '../Maps';
import FormTakePhoto from 'components/FormTakePhoto';
import NotesDialog from 'components/Dialog/NotesDialog';
import utils from 'utils';
import Analytics from 'utils/Analytics';
import {
  useCheckApplicationField,
  useApplicationApiResolver,
} from 'pages/commons/Applications/hooks';
import NumberFormat from 'components/forms/NumberFormat';
import {
  livenessStatusCheck,
  uploadLivenessImagePreActiveCheck,
  uploadLivenessImagePreCheck,
} from 'services/partner/common/partnership';

const PersonalIdentity = ({ isReview }) => {
  // need to be refactored
  const [, actions] = useGlobalState();

  const { partner } = useParams();
  const history = useHistory();

  const {
    dropdownLists,
    settings,
    setLongFormData,
    longFormData,
    settingsLoading,
    isLoaded,
  } = useApplicationContext();

  /**
   * Check wether field is disabled or hidden based on partner
   */
  const { isFieldDisabled, isFieldHidden } = useCheckApplicationField(partner);

  /**
   * Api resolver based on partner
   */
  const {
    provinceResolver,
    citiesResolver,
    districtsResolver,
    subDistrictsResolver,
    ktpResolver,
    selfieResolver,
    dataImagesResolver,
  } = useApplicationApiResolver(partner);

  const appId = utils.store.get('applicationId');
  const {
    datas,
    handleNotification,
    convertDataURLtoFile,
    handleLoadingOverlay,
  } = useUserContext();
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [cameraState, setCameraState] = useState({
    show: false,
    position: 'front',
    dialogData: {
      name: 'ktp',
      title: 'KTP Selfie',
    },
    liveness: false,
  });
  const [otpResendTime, setOtpResendTime] = useState(0);
  const [dataPhoto, setDataPhoto] = useState({});
  const [selfiePhoto, setSelfiePhoto] = useState('');
  const [ktpPhoto, setKtpPhoto] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [isShowOtpVerificationDialog, setIsShowOtpVerificationDialog] =
    useState(false);
  const [isPhotoLoading, setIsPhotoLoading] = useState({});
  const [locationOptions, setLocationOptions] = useState({
    provinces: [],
    cities: [],
    districts: [],
    subDistricts: [],
  });
  const {
    handleSubmit,
    setValue,
    reset,
    control,
    getValues,
    trigger,
    formState: { isValid, errors },
  } = useForm({
    resolver: yupResolver(schemaPersonalIdentity),
    // context is using on yup schema object
    context: {
      birth_place: settings?.isBirthPlaceActive,
      customer_mother_maiden_name: settings?.isMotherNameActive,
      address_kodepos: !isFieldHidden('address_kodepos'),
    },
    //mode 'all' to validate error onChange and onSubmit
    mode: 'all',
  });

  const mobilePhone1Value = useWatch({
    control,
    name: 'mobile_phone_1',
  });

  const isKlopPartner = partner === 'klop';

  const isShowFieldsJ1 =
    (dataPhoto.selfie || dataPhoto.selfie_partnership) &&
    (dataPhoto.ktp_self || dataPhoto.ktp_self_partnership);

  const isShowFieldsLinkaja =
    (dataPhoto.selfie || dataPhoto.selfie_partnership) &&
    (dataPhoto.ktp_self || dataPhoto.ktp_self_partnership) &&
    dataPhoto.crop_selfie_partnership;

  const isShowFields =
    partner === 'linkaja' ? isShowFieldsLinkaja : isShowFieldsJ1;

  // currently used for partner KLOP
  const savedPhoneNumber = utils.store.get('phone') || datas.phone;

  const fetchDataImages = async () => {
    try {
      setIsPhotoLoading({
        frontCamera: true,
        backCamera: true,
      });

      const imageObject = await dataImagesResolver();

      setDataPhoto(imageObject);
      setIsPhotoLoading({
        frontCamera: false,
        backCamera: false,
      });
    } catch (error) {
      if (error) {
        setIsPhotoLoading({
          frontCamera: false,
          backCamera: false,
        });
      }
    }
  };

  const savePhoneVerified = () => {
    utils.store.set('isPhoneVerified', true);
    setIsPhoneVerified(true);
  };

  const handleVerifyPhoneNumber = async () => {
    Analytics.logEvent({
      title: 'identitas_diri_app_form',
      eventName: 'verify_phone_number_click',
    });
    const phoneNumber = getValues('mobile_phone_1');
    try {
      const verifyResult = await verifyPhoneNumber(phoneNumber);
      if (verifyResult.success) {
        if (verifyResult.content.active) {
          setOtpResendTime(verifyResult.content.parameters?.otp_resend_time);
          setIsShowOtpVerificationDialog(true);
          return;
        }
        savePhoneVerified(true);
        setLongFormData({
          ...longFormData,
          mobile_phone_1: getValues('mobile_phone_1'),
        });
      }
    } catch (error) {
      console.log('verif phone number error', error);
    }
  };

  const onSubmit = (data) => {
    Analytics.logEvent({
      title: 'identitas_diri_app_form',
      eventName: 'identitas_diri_continue_click',
    });
    setLongFormData(data);
    if (isPhoneVerified) {
      history.push(`/${partner}/application/family_information`);
    }
  };

  const onError = (error) => {
    console.log({ error });
  };

  const fetchLocations = async ({ type, payload = {} }) => {
    //there are 2-3 steps for each: request -> setState => set form value
    let response;

    switch (type) {
      case 'provinces':
        response = await provinceResolver();
        setLocationOptions((prevState) => ({
          ...prevState,
          provinces: response.data,
        }));
        break;
      case 'cities':
        response = await citiesResolver({ province: payload.province });
        setLocationOptions((prevState) => ({
          ...prevState,
          cities: payload.province ? response.data : [],
          districts: [],
          subDistricts: [],
        }));
        setValue('address_kabupaten', undefined, {
          shouldValidate: !!getValues('address_kabupaten'),
        });
        setValue('address_kecamatan', undefined, {
          shouldValidate: !!getValues('address_kecamatan'),
        });
        setValue('address_kelurahan', undefined, {
          shouldValidate: !!getValues('address_kelurahan'),
        });
        break;
      case 'districts':
        response = await districtsResolver({
          province: payload.province,
          city: payload.city,
        });
        setLocationOptions((prevState) => ({
          ...prevState,
          districts: payload.city ? response.data : [],
          subDistricts: [],
        }));
        setValue('address_kecamatan', undefined, {
          shouldValidate: !!getValues('address_kecamatan'),
        });
        setValue('address_kelurahan', undefined, {
          shouldValidate: !!getValues('address_kelurahan'),
        });
        break;
      case 'subDistricts':
        response = await subDistrictsResolver({
          province: payload.province,
          city: payload.city,
          district: payload.district,
        });
        setLocationOptions((prevState) => ({
          ...prevState,
          subDistricts: payload.district
            ? response.data.map((el) => el.subDistrict)
            : [],
        }));
        setValue('address_kelurahan', undefined, {
          shouldValidate: !!getValues('address_kelurahan'),
        });
        break;
      default:
        break;
    }

    return response;
  };

  const handleOnSetMapData = async (data) => {
    const addressComponent = data.address_components;
    const shortAddress = addressComponent.filter((item) =>
      item.types.includes('route'),
    );
    const streetNumber = addressComponent.filter((item) =>
      item.types.includes('street_number'),
    );
    const subdistrict = addressComponent.filter((item) =>
      item.types.includes('administrative_area_level_4'),
    )[0]?.long_name;
    const zipcode = addressComponent.filter((item) =>
      item.types.includes('postal_code'),
    )[0]?.long_name;
    const fullAddress = `${
      shortAddress[0]?.short_name ? `${shortAddress[0]?.short_name} ` : ''
    }${shortAddress[1]?.short_name ? `${shortAddress[1]?.short_name} ` : ''}${
      streetNumber[0]?.short_name ? streetNumber[0]?.short_name : ''
    }`;

    // SET STREET ADDRESS
    setValue('address_street_num', fullAddress, { shouldValidate: true });
    try {
      const addressResponse = await postAddressInfo({ subdistrict, zipcode });
      const addressData = addressResponse.data || {};
      const province = addressData.province;
      const city = addressData.city;
      const district = addressData.district;
      const subDistrict = addressData.subDistrict;
      setValue('address_provinsi', province, { shouldValidate: true });

      await fetchLocations({ type: 'cities', payload: { province } });
      setValue('address_kabupaten', city, { shouldValidate: true });

      await fetchLocations({ type: 'districts', payload: { province, city } });
      setValue('address_kecamatan', district, { shouldValidate: true });

      await fetchLocations({
        type: 'subDistricts',
        payload: {
          province,
          city,
          district,
        },
      });
      setValue('address_kelurahan', subDistrict, { shouldValidate: true });
    } catch (error) {
      // console.log('Get Address Error', error);
    }
  };

  const handleOnOtpVerifDialogClose = (isSuccess) => {
    if (isSuccess) {
      savePhoneVerified();
      setLongFormData({
        ...longFormData,
        mobile_phone_1: getValues('mobile_phone_1'),
      });
    }
    setIsShowOtpVerificationDialog(false);
  };

  const uploadSelfieImage = async (img) => {
    setIsPhotoLoading((prev) => ({
      ...prev,
      frontCamera: true,
    }));
    const convertedFile = convertDataURLtoFile(img, `${Math.random(10)}.jpg`);
    try {
      const uploadResponse = await selfieResolver(convertedFile);
      
      setIsPhotoLoading((prev) => ({
        ...prev,
        frontCamera: false,
      }));

      if (
          (uploadResponse?.success) || 
          (uploadResponse?.cropSelfie.success && uploadResponse?.selfie.success)
        ) {
        if (whitelistedPartnerCropImageSelfie.includes(partner)) {
          setDataPhoto((prev) => ({
            ...prev,
            crop_selfie_partnership: img,
            selfie: img,
          }));
          return;
        }
        setDataPhoto((prev) => ({
          ...prev,
          selfie: img,
        }));
        return;
      }
    } catch (error) {
      setIsPhotoLoading((prev) => ({
        ...prev,
        frontCamera: false,
      }));
      handleNotification({
        isOpen: true,
        message: 'Terjadi kesalahan pada unggahan selfie.',
      });
    }
  };

  const uploadKtpImage = async (img) => {
    setIsPhotoLoading((prev) => ({
      ...prev,
      backCamera: true,
    }));
    const convertedFile = convertDataURLtoFile(img, `${Math.random(10)}.jpg`);
    try {
      const uploadResponse = await ktpResolver(convertedFile);

      setIsPhotoLoading((prev) => ({
        ...prev,
        backCamera: false,
      }));

      if (uploadResponse.data && uploadResponse.success) {
        setDataPhoto((prev) => ({
          ...prev,
          ktp_self: img,
        }));
        return;
      }
    } catch (error) {
      setIsPhotoLoading((prev) => ({
        ...prev,
        backCamera: false,
      }));
      handleNotification({
        isOpen: true,
        message: 'Terjadi kesalahan pada unggahan ktp.',
      });
    }
  };

  const checkLivenessStatus = async () => {
    const livenessStatusResponse = await livenessStatusCheck();

    if (livenessStatusResponse.success) {
      const passiveData =
        livenessStatusResponse.data?.passive_liveness_detection;
      const activeData = livenessStatusResponse.data?.active_liveness_detection;

      if (passiveData === null && activeData === null) {
        //never submit liveness
        return null;
      } else {
        if (
          (passiveData !== null && passiveData.status === 'failed') ||
          passiveData.attempt >= passiveData.max_attempt
        ) {
          //failed passive
          return false;
        }

        if (
          (activeData !== null && activeData.status === 'failed') ||
          activeData.attempt >= activeData.max_attempt
        ) {
          //failed active
          return false;
        }

        //all liveness passed
        return true;
      }
    }
  };

  const initializeLiveness = async () => {
    const livenessStatus = await checkLivenessStatus();

    if (livenessStatus === false) return false;

    //only run this once for the first time
    if (livenessStatus === null) {
      const preCheckResponse = await uploadLivenessImagePreCheck();
      if (
        preCheckResponse.data?.active_liveness === false &&
        preCheckResponse.data?.passive_liveness === false
      ) {
        // skip liveness if feature is off
        return false;
      }
      await uploadLivenessImagePreActiveCheck();
    }

    return true;
  };

  const openCamera = (camera) => {
    if (!isPhotoLoading.backCamera && !isPhotoLoading.frontCamera) {
      if (camera === 'front') {
        setCameraState({
          show: true,
          position: 'front',
          dialogData: {
            name: 'selfie',
            title: 'Foto Selfie',
          },
          liveness: false,
        });
      } else if (camera === 'back') {
        setCameraState({
          show: true,
          position: 'back',
          dialogData: {
            name: 'ktp',
            title: 'Foto KTP',
          },
          liveness: false,
        });
      } else if (camera === 'liveness') {
        setCameraState({
          show: true,
          position: 'front',
          dialogData: {
            name: 'liveness',
            title: 'Liveness Check',
          },
          liveness: true,
        });
      }
    } else {
      handleNotification({
        isOpen: true,
        message: 'Mohon tunggu hingga proses upload foto selesai.',
      });
    }
  };

  useEffect(() => {
    fetchDataImages();
    fetchLocations({ type: 'provinces', payload: {} });
    // check wether phone is already verified from session storage
    if (utils.store.get('isPhoneVerified') === 'true') {
      savePhoneVerified();
    }

    if (!blacklistedPartnerLiveness.includes(partner)) {
      checkLivenessStatus();
    }

    actions.closeLoadingOverlay();
  }, [appId]);

  useEffect(() => {
    if (!settingsLoading) {
      actions.setState('isNotesDialog', true);
    }
  }, [settingsLoading]);

  useEffect(() => {
    if (isKlopPartner && savedPhoneNumber) {
      setValue('mobile_phone_1', savedPhoneNumber);
    }
  }, [isKlopPartner, savedPhoneNumber]);

  useEffect(() => {
    if (isLoaded) {
      if (longFormData.fullname) {
        reset({ ...longFormData });
        trigger();
      }
      // condition utils.store.get('phone') is for linkaja
      const phone = longFormData.mobile_phone_1 || utils.store.get('phone');
      if (phone) {
        setValue('mobile_phone_1', phone, {
          shouldValidate: true,
        });
      }
    }
    // SET DEFAULT VALUE FROM LONGFROM CONTEXT
    setValue('ktp', utils.store.get('nik') || datas.nik);
  }, [longFormData, isLoaded, datas]);

  const handleGetImage = async (img) => {
    handleLoadingOverlay(true);
    setCameraState({ ...cameraState, show: false });

    switch (cameraState.position) {
      case 'back':
        if (
          dataPhoto?.selfie === undefined &&
          dataPhoto?.selfie_partnership === undefined
        ) {
          //only continuous if selfie is never taken, else just retake ktp
          setKtpPhoto(img);
          openCamera('front');
        } else {
          uploadKtpImage(img);
        }
        break;

      case 'front':
        if (cameraState.liveness === false) {
          if (
            dataPhoto?.selfie === undefined &&
            dataPhoto?.selfie_partnership === undefined &&
            !blacklistedPartnerLiveness.includes(partner)
          ) {
            const initLiveness = await initializeLiveness();
            if (initLiveness) {
              setSelfiePhoto(img);
              openCamera('liveness');
            } else {
              uploadSelfieImage(img);
              uploadKtpImage(ktpPhoto);
            }
          } else {
            if (
              dataPhoto?.ktp_self === undefined &&
              dataPhoto?.ktp_self_partnership === undefined
            ) {
              uploadSelfieImage(img);
              uploadKtpImage(ktpPhoto);
            } else {
              uploadSelfieImage(img);
            }
          }
        } else {
          uploadSelfieImage(selfiePhoto);
          uploadKtpImage(ktpPhoto);
        }
        break;
      default:
        break;
    }
    handleLoadingOverlay(false);
  };

  return (
    <ApplicationLayout
      isShowHeader={!isReview}
      title={'Identitas Diri'}
      step={1}
    >
      {!dataPhoto?.ktp_self ? (
        <Div className={photoGuide}>
          Kami membutuhkan KTP dan Selfie kamu untuk proses verifikasi. Mohon
          siapkan KTP dan pastikan tidak ada orang lain di sekitar kamu.
        </Div>
      ) : null}
      {!isFieldHidden('ktp') && (
        <Div marginBottom='30px' data-testid='ktp-photo'>
          <label style={{ color: '#5e5e5e' }}>Foto KTP</label>

          <Row display='flex' justifyContent='center'>
            <Col xs='12' md='10'>
              <FormTakePhoto
                margin={'0px'}
                type='back'
                image={dataPhoto?.ktp_self || dataPhoto?.ktp_self_partnership}
                disabled={isReview || isFieldDisabled('ktp')}
                isLoading={isPhotoLoading.backCamera}
                onClick={() => openCamera('back')}
                style={{
                  borderRadius: '10px',
                }}
              />
            </Col>
          </Row>
        </Div>
      )}

      {!isFieldHidden('selfie') && (dataPhoto?.ktp_self || dataPhoto?.ktp_self_partnership) && (
        <Div marginBottom='30px' data-testid='selfie-photo'>
          <label style={{ color: '#5e5e5e' }}>Foto Selfie</label>

          <Row display='flex' justifyContent='center'>
            <Col xs='12' md='10'>
              <FormTakePhoto
                margin={'0px'}
                type='front'
                image={
                  // on linkaja case both crop_selfie_partnership and selfie_partnership should be uploaded
                  partner === 'linkaja' && !dataPhoto?.crop_selfie_partnership
                    ? undefined
                    : dataPhoto?.selfie || dataPhoto?.selfie_partnership
                }
                disabled={isReview || isFieldDisabled('selfie')}
                isLoading={isPhotoLoading.frontCamera}
                onClick={() => openCamera('front')}
                style={{
                  borderRadius: '10px',
                }}
              />
            </Col>
          </Row>
        </Div>
      )}

      {isShowFields && (
        <Fragment>
          <Controller
            control={control}
            name='ktp'
            render={({ field: { onChange, value, name } }) =>
              !isFieldHidden(name) && (
                <Input
                  name={name}
                  label='Nomor KTP'
                  disabled
                  value={value}
                  onChange={onChange}
                />
              )
            }
          />
          <IdentityInfo>
            <img src={zoom} alt='' className='icon' />
            <span>
              Pastikan informasi yang Anda masukkan sesuai dengan Informasi yang
              tertera pada KTP Anda.
            </span>
          </IdentityInfo>

          <Controller
            control={control}
            name='fullname'
            render={({
              field: { onChange, value, name },
              fieldState: { error },
            }) =>
              !isFieldHidden(name) && (
                <Input
                  disabled={isReview || isFieldDisabled(name)}
                  errorMessage={error?.message}
                  name={name}
                  label='Nama Lengkap'
                  value={value}
                  onChange={onChange}
                />
              )
            }
          />
          {settings?.isBirthPlaceActive && (
            <Controller
              control={control}
              name='birth_place'
              render={({
                field: { onChange, value, name },
                fieldState: { error },
              }) =>
                !isFieldHidden(name) && (
                  <InputAutocomplete
                    name={name}
                    disabled={isReview || isFieldDisabled(name)}
                    options={dropdownLists.birth_places}
                    label='Tempat Lahir'
                    allowInput={true}
                    value={value}
                    onChange={onChange}
                    errorMessage={error?.message}
                  />
                )
              }
            />
          )}

          <Controller
            control={control}
            name='dob'
            defaultValue='1990-01-01'
            render={({
              field: { onChange, value, name },
              fieldState: { error },
            }) =>
              !isFieldHidden(name) && (
                <DatePicker
                  disabled={isReview || isFieldDisabled(name)}
                  config={{
                    label: 'Tanggal Lahir',
                    maxDate: new Date(),
                  }}
                  errorMessage={error?.message}
                  date={value}
                  name={name}
                  onChange={onChange}
                />
              )
            }
          />

          <Controller
            control={control}
            name='gender'
            render={({
              field: { onChange, value, name },
              fieldState: { error },
            }) =>
              !isFieldHidden(name) && (
                <RadioInput
                  disabled={isReview || isFieldDisabled(name)}
                  errorMessage={error?.message}
                  name={name}
                  value={value}
                  label='Jenis Kelamin'
                  options={[
                    { label: 'Pria', value: 'Pria' },
                    { label: 'Wanita', value: 'Wanita' },
                  ]}
                  onChange={onChange}
                />
              )
            }
          />

          {settings?.isMotherNameActive && !settingsLoading && (
            <Controller
              control={control}
              name='customer_mother_maiden_name'
              render={({
                field: { onChange, value, name },
                fieldState: { error },
              }) =>
                !isFieldHidden(name) && (
                  <Input
                    disabled={isReview || isFieldDisabled(name)}
                    errorMessage={error?.message}
                    name={name}
                    label='Nama Lengkap Ibu Kandung'
                    value={value}
                    onChange={onChange}
                  />
                )
              }
            />
          )}

          <Subtitle>Informasi Domisili</Subtitle>

          <Controller
            control={control}
            name='address_street_num'
            render={({
              field: { onChange, value, name },
              fieldState: { error },
            }) =>
              !isFieldHidden(name) && (
                <Input
                  name={name}
                  disabled={isReview || isFieldDisabled(name)}
                  label='Alamat Tempat Tinggal Saat Ini'
                  value={value}
                  onChange={onChange}
                  errorMessage={error?.message}
                  inputPropsMui={{
                    endAdornment: isFieldHidden('gmaps') ? null : (
                      <InputAdornment position='end'>
                        <IconButton
                          onClick={() => !isReview && setShowMap(true)}
                        >
                          <MapIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )
            }
          />

          <Controller
            control={control}
            name='address_provinsi'
            render={({
              field: { onChange, value, name },
              fieldState: { error },
            }) =>
              !isFieldHidden(name) && (
                <InputAutocomplete
                  name={name}
                  disabled={isReview || isFieldDisabled(name)}
                  options={locationOptions.provinces}
                  label='Provinsi'
                  allowInput={false}
                  value={value}
                  onSelect={(value) => {
                    fetchLocations({
                      type: 'cities',
                      payload: { province: value },
                    });
                  }}
                  onChange={onChange}
                  errorMessage={error?.message}
                />
              )
            }
          />

          <Controller
            control={control}
            name='address_kabupaten'
            render={({
              field: { onChange, value, name },
              fieldState: { error },
            }) =>
              !isFieldHidden(name) && (
                <InputAutocomplete
                  name={name}
                  disabled={isReview || isFieldDisabled(name)}
                  options={locationOptions.cities}
                  label='Kabupaten / Kota'
                  allowInput={false}
                  value={value}
                  onSelect={(value) => {
                    fetchLocations({
                      type: 'districts',
                      payload: {
                        province: getValues('address_provinsi'),
                        city: value,
                      },
                    });
                  }}
                  onChange={onChange}
                  errorMessage={error?.message}
                />
              )
            }
          />

          <Controller
            control={control}
            name='address_kecamatan'
            render={({
              field: { onChange, value, name },
              fieldState: { error },
            }) =>
              !isFieldHidden(name) && (
                <InputAutocomplete
                  name={name}
                  disabled={isReview || isFieldDisabled(name)}
                  options={locationOptions.districts}
                  label='Kecamatan'
                  onSelect={(value) => {
                    fetchLocations({
                      type: 'subDistricts',
                      payload: {
                        province: getValues('address_provinsi'),
                        city: getValues('address_kabupaten'),
                        district: value,
                      },
                    });
                  }}
                  allowInput={true}
                  value={value}
                  onChange={onChange}
                  errorMessage={error?.message}
                />
              )
            }
          />

          <Controller
            control={control}
            name='address_kelurahan'
            render={({
              field: { onChange, value, name },
              fieldState: { error },
            }) =>
              !isFieldHidden(name) && (
                <InputAutocomplete
                  name={name}
                  disabled={isReview || isFieldDisabled(name)}
                  options={locationOptions.subDistricts}
                  label='Kelurahan'
                  allowInput={true}
                  value={value}
                  onChange={onChange}
                  errorMessage={error?.message}
                />
              )
            }
          />

          {!isFieldHidden('address_kodepos') && (
            <Controller
              control={control}
              name='address_kodepos'
              render={({
                field: { onChange, value, name },
                fieldState: { error },
              }) => (
                <Input
                  disabled={isReview || isFieldDisabled(name)}
                  errorMessage={error?.message}
                  name={name}
                  label='Kodepos'
                  inputProps={{
                    maxLength: 5,
                  }}
                  inputPropsMui={{
                    inputComponent: NumberFormat,
                  }}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          )}

          <Row>
            <Col md='6' xs='12'>
              <Controller
                control={control}
                name='occupied_since'
                defaultValue='1990-01-01'
                render={({
                  field: { onChange, value, name },
                  fieldState: { error },
                }) =>
                  !isFieldHidden(name) && (
                    <DatePicker
                      disabled={isReview || isFieldDisabled(name)}
                      config={{
                        label: 'Ditempati Sejak',
                        maxDate: new Date(),
                      }}
                      errorMessage={error?.message}
                      date={value}
                      name={name}
                      onChange={onChange}
                    />
                  )
                }
              />
            </Col>

            <Col md='6' xs='12'>
              <Controller
                control={control}
                name='home_status'
                render={({
                  field: { onChange, value, name },
                  fieldState: { error },
                }) =>
                  !isFieldHidden(name) && (
                    <SelectOption
                      disabled={isReview || isFieldDisabled(name)}
                      name={name}
                      options={dropdownLists?.home_statuses ?? []}
                      label='Status Domisili'
                      value={value}
                      onChange={onChange}
                      errorMessage={error?.message}
                    />
                  )
                }
              />
            </Col>
          </Row>

          <Row>
            <Col md='6' xs='12'>
              <Controller
                control={control}
                name='marital_status'
                render={({
                  field: { onChange, value, name },
                  fieldState: { error },
                }) =>
                  !isFieldHidden(name) && (
                    <SelectOption
                      disabled={isReview || isFieldDisabled(name)}
                      name={name}
                      options={dropdownLists?.marital_statuses ?? []}
                      label='Status Sipil'
                      value={value}
                      onChange={onChange}
                      errorMessage={error?.message}
                    />
                  )
                }
              />
            </Col>

            <Col md='6' xs='12'>
              <Controller
                control={control}
                name='dependent'
                render={({
                  field: { onChange, value, name },
                  fieldState: { error },
                }) =>
                  !isFieldHidden(name) && (
                    <SelectOption
                      disabled={isReview || isFieldDisabled(name)}
                      name={name}
                      options={[...Array(10).keys()].map(String)}
                      label='Jumlah Tanggungan'
                      value={value}
                      onChange={onChange}
                      errorMessage={error?.message}
                    />
                  )
                }
              />
            </Col>
          </Row>
          <Subtitle>Informasi Kontak Pribadi</Subtitle>

          <Row marginBottom='27px'>
            <Col xs={isFieldDisabled('mobile_phone_1') ? '12' : '7'}>
              {!isFieldHidden('mobile_phone_1') && (
                <Controller
                  control={control}
                  name='mobile_phone_1'
                  render={({
                    field: { onChange, value, name },
                    fieldState: { error },
                  }) => (
                    <Input
                      style={{ marginBottom: 0, width: '100%' }}
                      errorMessage={
                        error?.message ||
                        (value && !isPhoneVerified
                          ? 'Mohon verifikasi Nomor HP Utama'
                          : '')
                      }
                      disabled={
                        !!(
                          isPhoneVerified ||
                          isReview ||
                          isFieldDisabled(name) ||
                          (isKlopPartner && savedPhoneNumber)
                        )
                      }
                      name={name}
                      placeholder='08xxxxxxxxx'
                      label='Nomor HP Utama'
                      value={value}
                      onChange={onChange}
                      inputPropsMui={{
                        inputComponent: PhoneFormatCustom,
                      }}
                      inputProps={{
                        onFocus: () => {
                          Analytics.logEvent({
                            title: 'identitas_diri_app_form',
                            eventName: 'phone_number_entered',
                          });
                        },
                      }}
                    />
                  )}
                />
              )}
            </Col>

            {!isFieldDisabled('mobile_phone_1') && (
              <Col xs='5' alignSelf='center'>
                <Button
                  onClick={handleVerifyPhoneNumber}
                  disabled={
                    !!(
                      isPhoneVerified ||
                      !mobilePhone1Value ||
                      errors.mobile_phone_1
                    )
                  }
                  fluid
                >
                  <Row placeContent='center'>
                    {isPhoneVerified && (
                      <img className='mr-1' src={IconVerified} />
                    )}
                    {isPhoneVerified ? 'Terverifikasi' : 'Verifikasi'}
                  </Row>
                </Button>
              </Col>
            )}
          </Row>

          {(isPhoneVerified || isFieldDisabled('mobile_phone_1')) && (
            <Controller
              control={control}
              name='mobile_phone_2'
              render={({
                field: { onChange, value, name },
                fieldState: { error },
              }) =>
                !isFieldHidden(name) && (
                  <Input
                    errorMessage={error?.message}
                    name={name}
                    disabled={isReview || isFieldDisabled(name)}
                    placeholder='08xxxxxxxxx'
                    label='Nomor HP lainnya (Tidak Wajib)'
                    value={value}
                    onChange={onChange}
                    inputPropsMui={{
                      inputComponent: PhoneFormatCustom,
                    }}
                  />
                )
              }
            />
          )}

          {!isReview && (
            <Button disabled={!isValid || !isPhoneVerified} fluid>
              <Div width='100%' onClick={handleSubmit(onSubmit, onError)}>
                Lanjut
              </Div>
            </Button>
          )}
        </Fragment>
      )}

      {isShowOtpVerificationDialog && (
        <OtpVerificationDialog
          show={true}
          phoneNumber={getValues('mobile_phone_1')}
          onClose={handleOnOtpVerifDialogClose}
          otpResendTime={otpResendTime}
        />
      )}

      {!utils.store.get('approveNote') && (
        <NotesDialog settingLongForm={settings.longFormSetting} />
      )}

      <Maps
        open={showMap}
        setIsLoad={() => {}}
        setOpen={setShowMap}
        setData={handleOnSetMapData}
      />

      <CameraNew
        cameraPosition={cameraState.position}
        getImage={handleGetImage}
        getShow={() => setCameraState((prev) => ({ ...prev, show: false }))}
        show={cameraState.show}
        dialogData={cameraState?.dialogData}
        liveness={cameraState?.liveness}
        checkLivenessStatus={checkLivenessStatus}
      />
    </ApplicationLayout>
  );
};

PersonalIdentity.propTypes = {
  isReview: PropTypes.bool,
};

export default PersonalIdentity;
