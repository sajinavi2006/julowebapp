import { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import MapIcon from '@material-ui/icons/Map';

import useGlobalState from 'actions';

import { useApplicationContext } from 'pages/commons/Applications/providers/ApplicationProvider';
import { useUserContext } from 'providers/UserProvider';
import ApplicationLayout from 'pages/commons/Applications/components/ApplicationLayout';
import OtpVerificationDialog from 'pages/commons/Applications/components/OtpVerificationDialog';

import Input from 'components/Input';
import DatePicker from 'components/DatePicker';
import PhoneFormatCustom from 'components/forms/phone-format-custom';
import RadioInput from 'components/RadioInput';
import InputAutocomplete from 'components/InputAutocomplete';
import SelectOption from 'components/SelectOption';
import Camera from 'components/Camera';
import BackCameraUniversal from 'components/BackCameraUniversal';

import zoom from 'assets/img/icon/ic-verify-check.svg';
import { Button, Col, Div, Row } from 'assets/css/styled';
import { IdentityInfo, Subtitle } from 'pages/commons/Applications/styles';
import { schemaPersonalIdentity } from 'pages/commons/Applications/validator';
import { postAddressInfo } from 'services/form';

import Maps from 'pages/commons/Applications/Maps';
import FormTakePhoto from 'components/FormTakePhoto';
import NotesDialog from 'components/Dialog/NotesDialog';
import utils from 'utils';
import {
  KtpSelfieUploadGuidance,
  KtpUploadGuidance,
} from 'components/Camera/DialogContent';
import FrontCameraUniversal from 'components/FrontCameraUniversal';
import Analytics from 'utils/Analytics';
import {
  useCheckApplicationField,
  useApplicationApiResolver,
} from 'pages/commons/Applications/hooks';
import CropImage from 'components/CropImage';
import NumberFormat from 'components/forms/NumberFormat';

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

  const { handleLoadingOverlay, handleNotification, convertDataURLtoFile } =
    useUserContext();
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [cameraState, setCameraState] = useState({});
  const [photoToCrop, setPhotoToCrop] = useState('');
  const [otpResendTime] = useState(0);
  const [dataPhoto, setDataPhoto] = useState({});
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
    formState: { isValid },
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

  const isShowFieldsJ1 =
    (dataPhoto?.selfie || dataPhoto?.selfie_partnership) &&
    (dataPhoto?.ktp_self || dataPhoto?.ktp_self_partnership);

  const isShowFieldsLinkaja =
    (dataPhoto?.selfie || dataPhoto?.selfie_partnership) &&
    (dataPhoto?.ktp_self || dataPhoto?.ktp_self_partnership) &&
    dataPhoto?.crop_selfie_partnership;

  const isShowFields =
    partner === 'linkaja' ? isShowFieldsLinkaja : isShowFieldsJ1;

  const checkCameraState = () => {
    const frontCameraState = utils.store.get('isFrontCamOpen');
    const backCameraState = utils.store.get('isBackCamOpen');

    if (frontCameraState) {
      handleLoadingOverlay(true);
      setCameraState({
        show: true,
        position: 'front',
        dialogData: {
          title: 'KTP Selfie',
          content: <KtpSelfieUploadGuidance />,
        },
      });
    } else if (backCameraState) {
      handleLoadingOverlay(true);
      setCameraState({
        show: true,
        position: 'back',
        dialogData: {
          name: 'ktp',
          title: 'KTP',
          content: <KtpUploadGuidance />,
        },
      });
    }

    utils.store.removeItem('isFrontCamOpen');
    utils.store.removeItem('isBackCamOpen');
  };

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
    console.error({ error });
  };

  const fetchLocations = async ({ type, payload = {} }) => {
    //there are 2-3 steps for each: request -> setState => set form value
    let response;

    switch (type) {
      case 'provinces':
        response = await provinceResolver();
        setLocationOptions((prevState) => ({
          ...prevState,
          provinces: response?.data,
        }));
        break;
      case 'cities':
        response = await citiesResolver({ province: payload.province });
        setLocationOptions((prevState) => ({
          ...prevState,
          cities: payload.province ? response?.data : [],
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
          districts: payload.city ? response?.data : [],
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
            ? response?.data.map((el) => el.subDistrict)
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
      const province = addressResponse?.data?.province;
      const city = addressResponse?.data?.city;
      const district = addressResponse?.data?.district;
      const subDistrict = addressResponse?.data?.subDistrict;
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

      if (uploadResponse?.data && uploadResponse?.success) {
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

  const uploadSelfieImage = async (img, isCropImage) => {
    // prevent another partner to upload cropped image
    if (isCropImage && partner !== 'linkaja') {
      return;
    }

    setIsPhotoLoading((prev) => ({
      ...prev,
      frontCamera: true,
      frontCameraCropped: isCropImage,
    }));
    const convertedFile = convertDataURLtoFile(img, `${Math.random(10)}.jpg`);
    try {
      const uploadResponse = await selfieResolver(convertedFile, isCropImage);

      setIsPhotoLoading((prev) => ({
        ...prev,
        frontCamera: false,
        frontCameraCropped: isCropImage ? false : prev.frontCameraCropped,
      }));

      if (uploadResponse?.data && uploadResponse?.success) {
        if (isCropImage) {
          setDataPhoto((prev) => ({
            ...prev,
            crop_selfie_partnership: img,
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
        frontCameraCropped: isCropImage ? false : prev.frontCameraCropped,
      }));
      handleNotification({
        isOpen: true,
        message: 'Terjadi kesalahan pada unggahan selfie.',
      });
    }
  };

  const handleGetImage = (img) => {
    setCameraState({ ...cameraState, show: false });
    if (cameraState.position === 'back') {
      uploadKtpImage(img);
    } else {
      uploadSelfieImage(img);
    }
  };

  // for old component camera
  const handleImageSubmit = (value) => {
    const { image, type } = value;
    if (type === 'ktp') {
      uploadKtpImage(image);
    } else if (type === 'selfie') {
      if (partner === 'linkaja') {
        // set state to upload cropped image
        setPhotoToCrop(image);
      }
      uploadSelfieImage(image);
    }
  };

  const refreshPage = (cameraPosition) => {
    if (!isPhotoLoading.backCamera && !isPhotoLoading.frontCamera) {
      if (cameraPosition === 'front') {
        // for old component camera
        actions.setState('isSelfiePhotoDialogShown', true);
        setCameraState({
          show: false, // set default false for back camera, because using old component
          position: 'front',
          dialogData: {
            name: 'selfie',
            title: 'KTP Selfie',
            content: <KtpSelfieUploadGuidance />,
          },
        });
      }
      if (cameraPosition === 'back') {
        // for old component camera
        actions.setState('isPhotoDialogShown', true);

        setCameraState({
          show: false, // set default false for back camera, because using old component
          position: 'front',
          dialogData: {
            name: 'selfie',
            title: 'KTP Selfie',
            content: <KtpSelfieUploadGuidance />,
          },
        });
      }
    } else {
      handleNotification({
        isOpen: true,
        message: 'Mohon tunggu hingga proses upload foto selesai.',
      });
    }
  };

  const handleCancelCamera = (state) => {
    switch (state) {
      case 'selfie':
        actions.setState('isSelfiePhotoDialogShown', false);
        break;
      case 'ktp':
        actions.setState('isPhotoDialogShown', false);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    checkCameraState();
    fetchDataImages();
    fetchLocations({ type: 'provinces', payload: {} });
    // check wether phone is already verified from session storage
    if (utils.store.get('isPhoneVerified') === 'true') {
      savePhoneVerified();
    }

    actions.closeLoadingOverlay();
  }, []);

  useEffect(() => {
    if (!settingsLoading) {
      actions.setState('isNotesDialog', true);
    }
  }, [settingsLoading]);

  useEffect(() => {
    // SET DEFAULT VALUE FROM LONGFROM CONTEXT
    setValue('ktp', utils.store.get('nik'));
    if (isLoaded) {
      if (longFormData.fullname) {
        reset({ ...longFormData });
        trigger();
      }
      // condition utils.store.get('phone') is for linkaja
      const phone = longFormData.mobile_phone_1 || utils.store.get('phone');
      if (phone) {
        setValue('mobile_phone_1', phone, {
          shouldValidate: false,
        });
      }
    }
    // SET DEFAULT VALUE FROM LONGFROM CONTEXT
    setValue('ktp', utils.store.get('nik'));
  }, [longFormData, isLoaded]);

  return (
    <ApplicationLayout
      isShowHeader={!isReview}
      title={'Identitas Diri'}
      step={1}
    >
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
                onClick={() => refreshPage('back')}
                style={{
                  borderRadius: '10px',
                }}
              />
            </Col>
          </Row>
          <BackCameraUniversal
            name='KTP'
            type='ktp'
            dialogData={cameraState?.dialogData}
            onCancel={() => handleCancelCamera('ktp')}
            onImageSubmitted={(value) =>
              handleImageSubmit({ image: value, type: 'ktp' })
            }
          />
        </Div>
      )}

      {!isFieldHidden('selfie') && (
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
                isLoading={
                  isPhotoLoading.frontCamera ||
                  isPhotoLoading.frontCameraCropped
                }
                onClick={() => refreshPage('front')}
                style={{
                  borderRadius: '10px',
                }}
              />
            </Col>
          </Row>
          <FrontCameraUniversal
            name='Selfie'
            type='selfie'
            dialogData={cameraState?.dialogData}
            onCancel={() => handleCancelCamera('selfie')}
            onImageSubmitted={(value) =>
              handleImageSubmit({ image: value, type: 'selfie' })
            }
          />
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
                    format: 'dd-MM-yyyy',
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
                        format: 'dd-MM-yyyy',
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

          <Row marginBottom='24px'>
            <Col xs={12}>
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
            </Col>
          </Row>
          {!isReview && (
            <Button disabled={!isValid} fluid>
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

      <Camera
        cameraPosition={cameraState.position}
        getImage={handleGetImage}
        getShow={() => setCameraState((prev) => ({ ...prev, show: false }))}
        show={cameraState.show}
        dialogData={cameraState?.dialogData}
      />
      <CropImage
        image={photoToCrop}
        setImage={(value) => uploadSelfieImage(value, true)}
      />
    </ApplicationLayout>
  );
};

PersonalIdentity.propTypes = {
  isReview: PropTypes.bool,
};

export default PersonalIdentity;
