import { useFormContext } from 'hooks/react-hook-form';

import {
  CurrencyInput,
  Input,
  Select,
  RadioInput,
  PhoneNumberVerificationInput,
} from 'new-components/elements';
import {
  useRGetDistricts,
  useRGetMaritalStatuses,
  useRGetProvinces,
  useRGetRegencies,
  useRGetSubdistricts,
} from 'repositories/merchant/common';
import { useOtp } from 'pages/merchant/application/hooks';

import { handleNumericalInput, removeSymbols } from './utils';
import {
  ACCEPT_FILE_DOCUMENT,
  ACCEPT_FILE_IMAGES,
  BUSSINESS_CATEGORY_OPTIONS,
  LAST_EDUCATION_OPTIONS,
  GENDER_OPTIONS,
  LIMIT_FILE_SIZE,
} from './constants';
import { InputFilePicker } from './components';
import {
  useHandleAutofillFields,
  useHandleRequestOtp,
  useHandleAddressActions,
} from './usecase';

const ApplicationFormField = () => {
  const {
    watch,
    fieldsRef,
    setValue,
    trigger,
    formState: { isSubmitting },
  } = useFormContext();

  const province = watch('addressProvince');
  const regencies = watch('addressRegency');
  const district = watch('addressDistrict');
  const primaryPhoneNumber = watch('primaryPhoneNumber');

  const { isOtpLoading, onRequest } = useHandleRequestOtp();
  const { isPhoneNumberVerified, setIsPhoneNumberVerified } = useOtp();

  const {
    data: maritalStatusData,
    refetch: refetchMaritalStatus,
    isError: isErrorMaritalStatus,
  } = useRGetMaritalStatuses();

  const {
    data: provinciesData,
    isError: isErrorGetProvincies,
    refetch: refetchGetProvincies,
    isInitialLoading: isLoadingGetProvincies,
  } = useRGetProvinces({ enabled: true });

  const {
    data: regenciesData,
    isError: isErrorGetRegencies,
    refetch: refetchGetRegencies,
    isInitialLoading: isLoadingGetRegencies,
  } = useRGetRegencies({ enabled: Boolean(province), province });

  const {
    data: districtsData,
    isError: isErrorGetDistricts,
    refetch: refetchGetDistricts,
    isInitialLoading: isLoadingGetDistricts,
  } = useRGetDistricts({
    enabled: Boolean(province) && Boolean(regencies),
    province,
    city: regencies,
  });

  const {
    data: subDistrictsData,
    isError: isErrorGetSubDistricts,
    refetch: refetchGetSubDistricts,
    isInitialLoading: isLoadingGetSubDistricts,
  } = useRGetSubdistricts({
    enabled: Boolean(province) && Boolean(regencies) && Boolean(district),
    province,
    city: regencies,
    district,
  });

  const {
    onProvinceChange,
    onRegencyChange,
    onDistrictChange,
    onProvinceFocus,
    onRegencyFocus,
    onDistrictFocus,
    onSubDistrictFocus,
    subDistrictOptions,
  } = useHandleAddressActions({
    isErrorGetProvincies,
    refetchGetProvincies,
    isErrorGetRegencies,
    isErrorGetDistricts,
    isErrorGetSubDistricts,
    refetchGetRegencies,
    refetchGetDistricts,
    refetchGetSubDistricts,
    subDistrictsData: subDistrictsData?.data,
    setValue,
  });

  useHandleAutofillFields();

  return (
    <>
      <CurrencyInput
        ref={(e) => (fieldsRef.current['limit'] = e)}
        name='limit'
        label='Limit yang Diajukan'
        placeholder='Masukkan limit'
        onChange={handleNumericalInput}
        disabled={isSubmitting}
        maxLength={11}
      />
      <Input
        ref={(e) => (fieldsRef.current['productLine'] = e)}
        name='productLine'
        label='Product Line'
        placeholder='Masukkan product line'
        disabled={isSubmitting}
      />
      <Input
        ref={(e) => (fieldsRef.current['fullname'] = e)}
        name='fullname'
        label='Nama Lengkap'
        placeholder='Masukkan nama lengkap'
        disabled={isSubmitting}
      />
      <Select
        ref={(e) => (fieldsRef.current['lastEducation'] = e)}
        name='lastEducation'
        label='Pendidikan'
        className='input-select'
        placeholder='Masukkan pendidikan'
        disabled={isSubmitting}
        options={LAST_EDUCATION_OPTIONS}
      />
      <Input
        ref={(e) => (fieldsRef.current['nik'] = e)}
        name='nik'
        label='NIK'
        placeholder='Masukkan NIK'
        maxLength={16}
        onChange={handleNumericalInput}
        disabled
      />
      <InputFilePicker
        filePickerRef={(e: HTMLDivElement) => (fieldsRef.current['ktp'] = e)}
        isSingle
        type='image'
        label='Foto KTP'
        name='ktp'
        mode='choose'
        accept={ACCEPT_FILE_IMAGES}
        limitFileSize={LIMIT_FILE_SIZE}
        disabled={isSubmitting}
      />
      <InputFilePicker
        filePickerRef={(e: HTMLDivElement) => (fieldsRef.current['selfie'] = e)}
        isSingle
        type='image'
        label='Foto Selfie + KTP'
        name='selfie'
        mode='choose'
        accept={ACCEPT_FILE_IMAGES}
        limitFileSize={LIMIT_FILE_SIZE}
        disabled={isSubmitting}
      />
      <Input
        ref={(e) => (fieldsRef.current['nib'] = e)}
        name='nib'
        label='NIB'
        placeholder='Masukkan nomor NIB'
        onChange={handleNumericalInput}
        maxLength={13}
        disabled={isSubmitting}
      />
      <InputFilePicker
        filePickerRef={(e: HTMLDivElement) => (fieldsRef.current['nibDocument'] = e)}
        isSingle
        type='image'
        label='Foto NIB'
        limitFileSize={LIMIT_FILE_SIZE}
        name='nibDocument'
        mode='all'
        accept={ACCEPT_FILE_IMAGES}
        disabled={isSubmitting}
      />
      <Input
        ref={(e) => (fieldsRef.current['companyName'] = e)}
        name='companyName'
        label='Nama Perusahaan'
        placeholder='Masukkan nama perusahaan'
        disabled={isSubmitting}
      />
      <Input
        ref={(e) => (fieldsRef.current['businessDuration'] = e)}
        name='businessDuration'
        label='Lama Bisnis Berjalan (Dalam Tahun)'
        placeholder='Masukkan lama bisnis berjalan'
        onChange={handleNumericalInput}
        disabled={isSubmitting}
      />
      <CurrencyInput
        ref={(e) => (fieldsRef.current['monthlyIncome'] = e)}
        name='monthlyIncome'
        label='Pendapatan Bulanan'
        placeholder='Masukkan pendapatan bulanan'
        onChange={handleNumericalInput}
        maxLength={9}
        disabled={isSubmitting}
      />
      <InputFilePicker
        filePickerRef={(e: HTMLDivElement) => (fieldsRef.current['companyPhoto'] = e)}
        type='image'
        mode='all'
        multiple
        name='companyPhoto'
        label='Foto Tempat Usaha'
        limitFileSize={LIMIT_FILE_SIZE}
        accept={ACCEPT_FILE_IMAGES}
        disabled={isSubmitting}
      />
      <InputFilePicker
        filePickerRef={(e: HTMLDivElement) => (fieldsRef.current['financialDocument'] = e)}
        mode='all'
        type='document'
        multiple
        name='financialDocument'
        accept={ACCEPT_FILE_DOCUMENT}
        limitFileSize={LIMIT_FILE_SIZE}
        label='Dokumen Keuangan'
        helperText='Format PDF, JPEG, PNG, CSV, XLS, DOC'
        disabled={isSubmitting}
      />
      <InputFilePicker
        filePickerRef={(e: HTMLDivElement) => (fieldsRef.current['cashflowReport'] = e)}
        mode='all'
        type='document'
        multiple
        name='cashflowReport'
        accept={ACCEPT_FILE_DOCUMENT}
        limitFileSize={LIMIT_FILE_SIZE}
        label='Laporan Arus Kas'
        helperText='Format PDF, JPEG, PNG, CSV, XLS, DOC'
        disabled={isSubmitting}
      />
      <InputFilePicker
        filePickerRef={(e: HTMLDivElement) => (fieldsRef.current['otherDocument'] = e)}
        mode='all'
        type='document'
        multiple
        name='otherDocument'
        accept={ACCEPT_FILE_DOCUMENT}
        limitFileSize={LIMIT_FILE_SIZE}
        label='Dokumen Lainnya'
        helperText='Format PDF, JPEG, PNG, CSV, XLS, DOC'
        disabled={isSubmitting}
      />
      <Select
        ref={(e) => (fieldsRef.current['businessCategory'] = e)}
        name='businessCategory'
        label='Kategori Bisnis'
        className='input-select'
        placeholder='Pilih'
        options={BUSSINESS_CATEGORY_OPTIONS}
        disabled={isSubmitting}
      />
      <PhoneNumberVerificationInput
        ref={(e) => (fieldsRef.current['primaryPhoneNumber'] = e)}
        name='primaryPhoneNumber'
        label='Nomor HP Utama'
        placeholder='Masukkan nomor Hp utama'
        autoComplete='off'
        isVerified={isPhoneNumberVerified}
        onVerifyClick={onRequest}
        type='tel'
        onChange={() => {
          trigger('primaryPhoneNumber');
          isPhoneNumberVerified && setIsPhoneNumberVerified(false);
        }}
        disabled={isSubmitting}
        buttonDisabled={!primaryPhoneNumber || isOtpLoading}
      />
      <Input
        ref={(e) => (fieldsRef.current['emailDirector'] = e)}
        name='emailDirector'
        label='Email Direktur'
        placeholder='Masukkan email direktur'
        disabled
      />
      <Input
        ref={(e) => (fieldsRef.current['dob'] = e)}
        name='dob'
        className='dob-datepicker'
        label='Tanggal Lahir'
        placeholder='Masukkan Tanggal Lahir'
        type='date'
        onKeyDown={(e) => {
          e.preventDefault();
        }}
        disabled={isSubmitting}
      />
      <Input
        ref={(e) => (fieldsRef.current['birthPlace'] = e)}
        name='birthPlace'
        label='Tempat Lahir'
        placeholder='Masukkan Tempat Lahir'
        disabled={isSubmitting}
      />
      <Select
        ref={(e) => (fieldsRef.current['maritalStatus'] = e)}
        name='maritalStatus'
        label='Status Perkawinan'
        className='input-select'
        placeholder='Pilih Status Perkawinan'
        onFocus={() =>
          (isErrorMaritalStatus || !maritalStatusData?.data) &&
          refetchMaritalStatus()
        }
        options={maritalStatusData?.data || []}
        disabled={isSubmitting}
      />
      <RadioInput
        ref={(e) => (fieldsRef.current['gender'] = e)}
        name='gender'
        className='radio-input'
        label='Jenis Kelamin'
        flexOrientation='row'
        radioButtonProps={{ color: 'primary' }}
        options={GENDER_OPTIONS}
        disabled={isSubmitting}
      />
      <Input
        ref={(e) => (fieldsRef.current['address'] = e)}
        name='address'
        label='Alamat Tempat Tinggal'
        placeholder='Masukkan alamat tempat tinggal'
        onChange={removeSymbols}
        disabled={isSubmitting}
      />
      <Select
        ref={(e) => (fieldsRef.current['addressProvince'] = e)}
        className='input-select'
        name='addressProvince'
        label='Provinsi'
        placeholder='Pilih'
        onFocus={onProvinceFocus}
        disabled={isLoadingGetProvincies || isSubmitting}
        options={provinciesData?.data}
        onChange={onProvinceChange}
      />
      <Select
        ref={(e) => (fieldsRef.current['addressRegency'] = e)}
        name='addressRegency'
        label='Kabupaten'
        placeholder='Pilih'
        className='input-select'
        onFocus={onRegencyFocus}
        disabled={isLoadingGetRegencies || isSubmitting}
        options={regenciesData?.data || []}
        onChange={onRegencyChange}
      />
      <Select
        ref={(e) => (fieldsRef.current['addressDistrict'] = e)}
        name='addressDistrict'
        label='Kecamatan'
        placeholder='Pilih'
        className='input-select'
        onFocus={onDistrictFocus}
        disabled={isLoadingGetDistricts || isSubmitting}
        options={districtsData?.data || []}
        onChange={onDistrictChange}
      />
      <Select
        ref={(e) => (fieldsRef.current['addressSubdistrict'] = e)}
        name='addressSubdistrict'
        label='Kelurahan'
        placeholder='Pilih'
        className='input-select'
        onFocus={onSubDistrictFocus}
        disabled={isLoadingGetSubDistricts || isSubmitting}
        options={subDistrictOptions || []}
        onChange={(e) => {
          setValue(
            'addressZipcode',
            subDistrictsData?.data.find(
              ({ subDistrict }) => subDistrict === e.target.value,
            )?.zipcode,
            { shouldValidate: true },
          );
        }}
      />
      <Input
        ref={(e) => (fieldsRef.current['addressZipcode'] = e)}
        disabled={isSubmitting}
        name='addressZipcode'
        label='Kode Pos'
        placeholder='Masukkan kode pos'
      />
    </>
  );
};

export default ApplicationFormField;
