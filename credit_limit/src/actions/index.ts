import React from 'react';
import globalHook from 'use-global-hook';
import { initialState } from './constants';
import { GlobalActions, GlobalState, StoreActions } from './types';

const actions: StoreActions = {
  setState: (store, name: string, value: unknown) => {
    store.setState({ ...store.state, [name]: value });
  },
  openNotification: (
    store,
    isNotificationOpened,
    message,
    severity = false,
  ) => {
    store.setState({
      ...store.state,
      isNotificationOpened,
      notificationMessage: message,
      notificationSeverity: severity,
    });
  },
  closeNotification: (store, severity = false) => {
    store.setState({
      ...store.state,
      isNotificationOpened: false,
      notificationMessage: '',
      notificationSeverity: severity,
    });
  },
  openLoadingOverlay: (store) => {
    store.setState({
      ...store.state,
      isLoadingOverlayShown: true,
    });
  },
  closeLoadingOverlay: (store) => {
    store.setState({
      ...store.state,
      isLoadingOverlayShown: false,
    });
  },

  handleWindowSizeChange: (store) => {
    store.setState({ ...store.state, windowWidth: window.innerWidth });
    store.setState({ ...store.state, windowHeight: window.innerHeight });
  },
};

const useGlobalState = globalHook<GlobalState, GlobalActions>(
  React,
  initialState,
  actions,
);

export default useGlobalState;
