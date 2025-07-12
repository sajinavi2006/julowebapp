import { createContext, useContext, useEffect, useState, useRef } from 'react';
import { ThemeProvider } from '@emotion/react';
import { useLocation } from 'react-router-dom';

import theme from '../../themes';
import utils from '../../utils';
import { homeScreenInfo } from '../../services/user';

import type {
  DataProps,
  HandleNotificationArgs,
  LoadingContextProps,
  NotificationContextProps,
  PartnerTheme,
  TransactionContextProps,
  UserContextProps,
  UserProviderProps,
} from './types';
import { BASE_DATA } from './constants';

const UserContext = createContext<UserContextProps>({
  datas: BASE_DATA,
  setDatas: () => {},
  fetchHomeScreen: async () => {},
  convertDataURLtoFile: () => '',
});
const LoadingContext = createContext<LoadingContextProps>({
  isLoadingOverlay: false,
  handleLoadingOverlay: () => {},
});

/* 
    transactionData object will be received from Create Loan API
   {
        "loan_id": 3000015224,
        "loan_status": 210,
        "loan_amount": 2400000,
        "disbursement_amount": 2000000,
        "loan_duration": 12,
        "installment_amount": 272000,
        "monthly_interest": 0.03,
        "loan_xid": 2475905840
    }

    preTransactionData object will be received on Konfirmasi Transaksi
    at Transaction page
   {
        "account_id": 4366,
        "loan_amount_request": 100000,
        "device_id": 2,
    }
    **/

const TransactionContext = createContext<TransactionContextProps>({
  transactionData: {},
  preTransactionData: {},
  savePreTransactionData: () => {},
  saveTransactionData: () => {},
  resetTransactionStorage: () => {},
});

const NotificationContext = createContext<NotificationContextProps>({
  isNotificationOpened: false,
  notificationMessage: '',
  notificationSeverity: false,
  handleNotification: () => {},
});

const UserProvider = ({ children }: UserProviderProps) => {
  const [datas, setDatas] = useState<DataProps>(BASE_DATA);
  const [transactionData, setTransactionData] = useState({});
  const [preTransactionData, setPreTransactionData] = useState({});
  const [isLoadingOverlay, setIsLoadingOverlay] = useState(false);
  const [notification, setNotification] = useState({
    isOpen: false,
    message: '',
    severity: false,
  });
  const [partnerTheme, setPartnerTheme] = useState<PartnerTheme>(
    theme.themeRentee,
  );
  const notificationTimeoutRef = useRef<NodeJS.Timeout>();

  const handleNotification = ({
    isOpen,
    message = '',
    severity = false,
  }: HandleNotificationArgs) => {
    if (notificationTimeoutRef.current)
      clearTimeout(notificationTimeoutRef.current);
    setNotification({ isOpen, message, severity });

    notificationTimeoutRef.current = setTimeout(() => {
      setNotification({ isOpen: false, message: '', severity: false });
    }, datas.notificationDuration);
  };

  const handleTheme = () => {
    switch (datas.partner) {
      case 'cermati':
        setPartnerTheme(theme.themeJ1);
        break;
      case 'rentee':
        setPartnerTheme(theme.themeRentee);
        break;
      case 'linkaja':
        setPartnerTheme(theme.themeLinkAja);
        break;
      case 'j1':
        setPartnerTheme(theme.themeJ1);
        break;
      case 'paylater':
        setPartnerTheme(theme.themePaylater);
        break;
      default:
        setPartnerTheme(theme.themeJ1);
        break;
    }
  };

  // to check wether user has already transactionData
  const checkTransactionData = () => {
    const data = utils.store.get('transactionData');
    if (data) {
      const parsedData = JSON.parse(data);
      setTransactionData(parsedData);
    }
    const preTransactData = utils.store.get('preTransactionData');
    if (preTransactData) {
      const parsedData = JSON.parse(preTransactData);
      setPreTransactionData(parsedData);
    }
  };

  const saveTransactionData = (data: Record<string, unknown>) => {
    if (data) {
      const parsedData = JSON.stringify(data);
      utils.store.set('transactionData', parsedData);
      setTransactionData(data);
    }
  };

  const savePreTransactionData = (data: Record<string, unknown>) => {
    if (data) {
      const parsedData = JSON.stringify(data);
      utils.store.set('preTransactionData', parsedData);
      setPreTransactionData(data);
    }
  };

  const handleLoadingOverlay = (value: boolean) => {
    setIsLoadingOverlay(value);
  };

  const fetchHomeScreen = async () => {
    const response = await homeScreenInfo();

    if (response.success) {
      const content = response?.content;
      return content;
    }
  };

  const resetTransactionStorage = () => {
    utils.store.removeItem('transactionData');
    utils.store.removeItem('loanXid');
    utils.store.removeItem('preTransactionData');
  };

  const convertDataURLtoFile = (dataurl: string, filename: string) => {
    if (!dataurl) return '';

    const sp = dataurl?.split(',');

    if (sp.length === 2) {
      if (sp[1] === '') {
        return '';
      } else {
        const arr = dataurl.split(','),
          mime = arr[0]?.match(/:(.*?);/)?.[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
      }
    } else {
      return '';
    }
  };

  //to close snackbar when change url
  const location = useLocation();
  useEffect(() => {
    handleNotification({
      isOpen: false,
    });
  }, [location.pathname]);

  useEffect(() => {
    handleTheme();
  }, [datas.partner]);

  // execute one time at did mount
  useEffect(() => {
    checkTransactionData();
  }, []);

  return (
    <UserContext.Provider
      value={{
        datas,
        setDatas,
        fetchHomeScreen,
        convertDataURLtoFile,
      }}
    >
      <LoadingContext.Provider
        value={{
          isLoadingOverlay,
          handleLoadingOverlay,
        }}
      >
        <NotificationContext.Provider
          value={{
            isNotificationOpened: notification.isOpen,
            notificationMessage: notification.message,
            notificationSeverity: notification.severity,
            handleNotification,
          }}
        >
          <TransactionContext.Provider
            value={{
              saveTransactionData,
              transactionData,
              preTransactionData,
              savePreTransactionData,
              resetTransactionStorage,
            }}
          >
            <ThemeProvider theme={partnerTheme}>{children}</ThemeProvider>
          </TransactionContext.Provider>
        </NotificationContext.Provider>
      </LoadingContext.Provider>
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  const userContext = useContext(UserContext);
  const loadingContext = useContext(LoadingContext);
  const notificationContext = useContext(NotificationContext);
  const transactionContext = useContext(TransactionContext);
  return {
    ...userContext,
    ...loadingContext,
    ...notificationContext,
    ...transactionContext,
  };
};

export { UserProvider, useUserContext, UserContext };
