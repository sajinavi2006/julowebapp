/* eslint-disable no-console */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  getDropdownList,
  getSettings,
  getLongFormSettings,
} from 'services/form';

import { getPartnershipDropdowns } from 'services/partner/common/partnership';
import utils from 'utils';
import { useApplicationApiResolver, useCheckApplicationField } from '../hooks';

const settingFeatures = [
  'form_selfie',
  'mother_maiden_name',
  'set_birth_place_required',
  'boost',
];

const dropdownFeatures = [
  'home_statuses',
  'marital_statuses',
  'kin_relationships',
  'job_types',
  'last_educations',
  'loan_purposes',
  'job_industries',
  'companies',
  'birth_places',
];
const ApplicationDropdownContext = createContext({
  dropdownLists: {},
  getDropdownLists: () => {},
  getBankList: () => {},
});

const ApplicationSettingContext = createContext({
  settings: {},
  getAllSettings: () => {},
  settingsLoading: false,
});

const ApplicationDataContext = createContext({
  longFormData: {},
  isLoaded: false,
  setLongFormData: () => {},
});

const ApplicationProvider = ({ children }) => {
  const [dropdownLists, setDropdownLists] = useState({});
  const [longFormData, setLongFormData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [settings, setSettings] = useState({
    isSelfieActive: true,
    isMotherNameActive: true,
    isBirthPlaceActive: true,
    boost: {},
    longFormSetting: {},
  });

  const [settingsLoading, setSettingsLoading] = useState(false);
  const partner = useParams().partner || utils.store.get('partner');
  const { isFieldDisabled } = useCheckApplicationField(partner);
  const { banksResolver } = useApplicationApiResolver(partner);

  const checkLongFormDataFromStorage = () => {
    const sessionData = utils.store.get('longFormData');
    const isDataValid = sessionData && utils.commons.isJSON(sessionData);
    const longFormDatas = isDataValid ? JSON.parse(sessionData) : null;
    if (longFormDatas) {
      setLongFormData({
        ...longFormData,
        ...longFormDatas,
      });
    }

    setIsLoaded(true);
  };

  const handleSetLongFormData = (data) => {
    setLongFormData({
      ...longFormData,
      ...data,
    });

    const sessionData = utils.store.get('longFormData');
    const isDataValid = sessionData && utils.commons.isJSON(sessionData);
    const longFormDatas = isDataValid ? JSON.parse(sessionData) : {};

    const datas = {
      ...longFormDatas,
      ...data,
    };

    utils.store.set('longFormData', JSON.stringify(datas));
  };

  const jobsFilter = (jobs) => {
    return jobs.map((job) => {
      const splittedJob = job.split(',');

      return {
        jobIndustries: splittedJob[0],
        professions: splittedJob[1],
      };
    });
  };

  const getDropdownPartnership = async () => {
    try {
      let requests = [];
      dropdownFeatures.forEach((feature) => {
        requests.push(getPartnershipDropdowns({ data_selected: feature }));
      });

      let responses = await Promise.all(requests);
      setDropdownLists((prevState) => ({
        ...prevState,
        home_statuses: responses?.[0]?.data ?? {},
        marital_statuses: responses?.[1]?.data ?? {},
        kin_relationships: responses?.[2]?.data ?? {},
        job_types: responses?.[3]?.data ?? {},
        last_educations: responses?.[4]?.data ?? {},
        loan_purposes: responses?.[5]?.data ?? {},
        job_industries: responses?.[6]?.data ?? {},
        companies: responses?.[7]?.data ?? {},
        birth_places: responses?.[8]?.data ?? {},
      }));
    } catch (error) {
      console.log({ error });
    }
  };

  const getDropdownLists = async () => {
    if (partner === 'linkaja') {
      // if partner linkaja get dropdown from this function
      return getDropdownPartnership();
    }
    try {
      const response = await getDropdownList();
      let allJobs = {};

      if (response?.data?.job) {
        const jobs = response.data.job;
        allJobs.jobs = jobsFilter(jobs);
        allJobs.removedDuplicateJobs = utils.commons.removeDuplicateObjects(
          allJobs.jobs,
          'jobIndustries',
        );
      }

      setDropdownLists((prevState) => ({
        ...prevState,
        ...response?.data,
        allJobs,
      }));
    } catch (error) {
      console.log({ error });
    }
  };

  const getBankList = async () => {
    try {
      const response = await banksResolver();

      setDropdownLists((prevState) => ({
        ...prevState,
        banks: response || [],
      }));
    } catch (error) {
      console.log({ error });
    }
  };

  const getAllSettings = async () => {
    if (!isFieldDisabled('get_settings')) {
      setSettingsLoading(true);
      try {
        let requests = [];
        settingFeatures.forEach((feature) => {
          requests.push(getSettings(feature));
        });

        requests.push(getLongFormSettings());
        let responses = await Promise.all(requests);
        setSettings({
          isSelfieActive: responses?.[0]?.content?.active ?? true,
          isMotherNameActive: responses?.[1]?.content?.active ?? true,
          isBirthPlaceActive: responses?.[2]?.content?.active ?? true,
          boost: responses?.[3]?.content ?? {},
          longFormSetting: responses?.[4]?.data ?? {},
        });
        setSettingsLoading(false);
      } catch (error) {
        setSettingsLoading(false);
        // console.log('Get All Settings Error', error);
      }
    }
  };

  useEffect(() => {
    checkLongFormDataFromStorage();
  }, []);

  return (
    <ApplicationDropdownContext.Provider
      value={{
        dropdownLists,
        getDropdownLists,
        getBankList,
      }}
    >
      <ApplicationDataContext.Provider
        value={{
          longFormData,
          setLongFormData: handleSetLongFormData,
          isLoaded,
        }}
      >
        <ApplicationSettingContext.Provider
          value={{
            settings,
            getAllSettings,
            settingsLoading,
          }}
        >
          {children}
        </ApplicationSettingContext.Provider>
      </ApplicationDataContext.Provider>
    </ApplicationDropdownContext.Provider>
  );
};

const useApplicationContext = () => {
  const applicationDropdownContext = useContext(ApplicationDropdownContext);
  const applicationSettingContext = useContext(ApplicationSettingContext);
  const applicationDataContext = useContext(ApplicationDataContext);
  return {
    ...applicationDropdownContext,
    ...applicationSettingContext,
    ...applicationDataContext,
  };
};

ApplicationProvider.propTypes = {
  children: PropTypes.node,
};

export { ApplicationProvider, useApplicationContext };
