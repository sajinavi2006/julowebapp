import {
  getDropdownList,
  getSettings,
  getLongFormSettings,
  getBanks,
  postAddressInfo,
  getAddressProvinces,
  postAddressCities,
  postAddressDistricts,
  postAddressSubDistricts,
  uploadKtp,
  uploadSelfie,
  getDataImages,
  submitLongForm,
} from 'services/form';

import {
  submitPartnershipLongForm,
  uploadPartnershipImage,
  getPartnershipAddresses,
  getPartnershipDropdowns,
  getPartnershipImages,
} from 'services/partner/common/partnership';

const linkAja = 'linkaja';

const useApplicationApiResolver = (partner) => {
  const dropdownResolver = (payload) => {
    if (partner === linkAja) {
      // call All DropdownAPI
      return;
    }
    return getDropdownList(payload);
  };

  const banksResolver = async (payload) => {
    if (partner === linkAja) {
      const response = await getPartnershipDropdowns({
        data_selected: 'banks',
      });
      return response?.data;
    }
    return getBanks(payload);
  };

  const provinceResolver = () => {
    if (partner === linkAja) {
      return getPartnershipAddresses({ address_type: 'province' });
    }
    return getAddressProvinces();
  };

  const citiesResolver = (payload) => {
    if (partner === linkAja) {
      return getPartnershipAddresses({ address_type: 'city', ...payload });
    }
    return postAddressCities(payload);
  };

  const districtsResolver = (payload) => {
    if (partner === linkAja) {
      return getPartnershipAddresses({ address_type: 'district', ...payload });
    }
    return postAddressDistricts(payload);
  };

  const subDistrictsResolver = (payload) => {
    if (partner === linkAja) {
      return getPartnershipAddresses({
        address_type: 'sub_district',
        ...payload,
      });
    }
    return postAddressSubDistricts(payload);
  };

  const ktpResolver = (payload) => {
    if (partner === linkAja) {
      return uploadPartnershipImage(payload, 'ktp_self_partnership');
    }
    return uploadKtp(payload);
  };

  const selfieResolverLinkAja = async (payload) => {
    const cropSelfie = await uploadPartnershipImage(payload, 'crop_selfie_partnership');
    const selfie = await uploadPartnershipImage(payload, 'selfie_partnership');

    return {
      cropSelfie,
      selfie
    };
  };

  const selfieResolver = (payload) => {
    if (partner === linkAja) {
      return selfieResolverLinkAja(payload);
    }
    return uploadSelfie(payload);
  };

  const submitLongFormResolver = (payload, applicationId) => {
    if (partner === linkAja) {
      return submitPartnershipLongForm(payload);
    }

    return submitLongForm(applicationId, payload);
  };

  const dataImagesResolver = async () => {
    if (partner === linkAja) {
      const response = await getPartnershipImages();
      const filter = response.data.filter(
        (item) => item?.image_status === 0 && item?.image_url_api,
      );
      const convertToObject = filter.reduce(
        (prev, item) => ({ ...prev, [item?.image_type]: item?.image_url_api }),
        {},
      );
      return convertToObject;
    }

    const response = await getDataImages();
    const filter = response.results.filter(
      (item) =>
        item?.image_status === 0 &&
        (item.image_type === 'ktp_self' || item.image_type === 'selfie'),
    );
    const imageObject = filter.reduce(
      (prev, item) => ({ ...prev, [item?.image_type]: item?.image_url_api }),
      {},
    );
    return imageObject;
  };

  // pending
  const addressInfoResolver = (payload) => {
    if (partner === linkAja) {
      return;
    }
    return postAddressInfo(payload);
  };
  const settingsResolver = (payload) => {
    if (partner === linkAja) {
      return;
    }
    return getSettings(payload);
  };

  const longFormSettingsResolver = (payload) => {
    if (partner === linkAja) {
      return;
    }
    return getLongFormSettings(payload);
  };

  return {
    addressInfoResolver,
    banksResolver,
    citiesResolver,
    dataImagesResolver,
    districtsResolver,
    dropdownResolver,
    ktpResolver,
    longFormSettingsResolver,
    provinceResolver,
    selfieResolver,
    settingsResolver,
    subDistrictsResolver,
    submitLongFormResolver,
  };
};

export default useApplicationApiResolver;
