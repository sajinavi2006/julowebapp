import { useCallback } from 'react';
import { FieldValues, UseFormSetValue } from 'react-hook-form';
import { QueryObserverBaseResult } from '@tanstack/react-query';

import { SubdistrictsResponse } from 'repositories/merchant/common';

import { resetRelatedFieldOnAddressOptionChange } from '../utils';

interface UseHandleAddressActionsProps {
  isErrorGetProvincies: boolean;
  isErrorGetRegencies: boolean;
  isErrorGetDistricts: boolean;
  isErrorGetSubDistricts: boolean;
  refetchGetProvincies: QueryObserverBaseResult['refetch'];
  refetchGetRegencies: QueryObserverBaseResult['refetch'];
  refetchGetDistricts: QueryObserverBaseResult['refetch'];
  refetchGetSubDistricts: QueryObserverBaseResult['refetch'];
  subDistrictsData?: SubdistrictsResponse;
  setValue: UseFormSetValue<FieldValues>;
}

function useHandleAddressActions(props: UseHandleAddressActionsProps) {
  const {
    isErrorGetProvincies,
    isErrorGetRegencies,
    isErrorGetDistricts,
    isErrorGetSubDistricts,
    refetchGetProvincies,
    refetchGetRegencies,
    refetchGetDistricts,
    refetchGetSubDistricts,
    subDistrictsData,
    setValue,
  } = props;

  const onProvinceChange = useCallback(() => {
    resetRelatedFieldOnAddressOptionChange(
      [
        'addressRegency',
        'addressDistrict',
        'addressSubdistrict',
        'addressZipcode',
      ],
      setValue,
    );
  }, [setValue]);

  const onProvinceFocus = useCallback(() => {
    isErrorGetProvincies && refetchGetProvincies();
  }, []);

  const onRegencyChange = useCallback(() => {
    resetRelatedFieldOnAddressOptionChange(
      ['addressDistrict', 'addressSubdistrict', 'addressZipcode'],
      setValue,
    );
  }, [setValue]);

  const onRegencyFocus = useCallback(() => {
    isErrorGetRegencies && refetchGetRegencies();
  }, []);

  const onDistrictChange = useCallback(() => {
    resetRelatedFieldOnAddressOptionChange(
      ['addressSubdistrict', 'addressZipcode'],
      setValue,
    );
  }, [setValue]);

  const onDistrictFocus = useCallback(() => {
    isErrorGetDistricts && refetchGetDistricts();
  }, []);

  const onSubDistrictFocus = useCallback(() => {
    isErrorGetSubDistricts && refetchGetSubDistricts();
  }, []);

  const subDistrictOptions = subDistrictsData?.map(({ subDistrict }) => ({
    label: subDistrict,
    value: subDistrict,
  }));

  return {
    onProvinceChange,
    onRegencyChange,
    onDistrictChange,
    onProvinceFocus,
    onRegencyFocus,
    onDistrictFocus,
    onSubDistrictFocus,
    subDistrictOptions,
  };
}

export default useHandleAddressActions;
