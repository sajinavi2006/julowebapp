import { useEffect, useState } from 'react';
import {
  useHistory,
  useLocation,
  useParams,
  withRouter,
} from 'react-router-dom';

import utils from 'utils';
import { useUserContext } from 'providers/UserProvider';
import useGlobalState from 'actions';
import {
  cancelLoan,
  creditInfo,
  homeScreenInfo,
  infoCard,
} from 'services/partner/common/partnership';
import {
  cardCase,
  CARD_STATUS_100,
  CARD_STATUS_100_LINKAJA,
  MAX_WIDTH,
  MIN_WIDTH,
  NAVBAR_MENU,
} from 'constant';

import { Container, Main, Wrapper } from 'assets/css/styled';
import { py3 } from 'assets/css/stylesFix';
import { paddingTop } from 'assets/css/stylesValue';

import DialogForm105 from 'components/Dialog/DialogForm/DialogForm105';
import DialogForm131 from 'components/Dialog/DialogForm/DialogForm131';
import DialogInfo from 'components/Dialog/DialogInfo';
import NavBar from 'components/NavBar';

import CreditInfo from './CreditInfo';
import ProductInfo from './ProductInfo';
import CardInfo from './CardInfo';

import { useInterval } from 'hooks';

const Home = () => {
  const {
    datas,
    setDatas,
    handleNotification,
    handleLoadingOverlay,
    transactionData,
    saveTransactionData,
  } = useUserContext();
  const [, actions] = useGlobalState();
  const [isMount, setIsMount] = useState(false);
  const [isAllApiFetched, setIsAllApiFetched] = useState(false);
  const [isUserActive, setsUserActive] = useState(false);
  const [userData, setUserData] = useState({});
  const [cardInfo, setCardInfo] = useState({});
  const [dialogData, setDialogData] = useState({});
  const [showDialogInfo, setShowDialogInfo] = useState(false);
  const [showDialogForm, setShowDialogForm] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const { partner } = useParams();

  const handleRenderPopUp = (value) => {
    const shortFormSubmitted = 105;
    const { applicationStatus, creditScore, isApplDocsActive } = value;

    if (
      applicationStatus == shortFormSubmitted &&
      creditScore &&
      creditScore !== 'C' &&
      creditScore !== '--' &&
      isApplDocsActive
    ) {
      const tempCardCase = cardCase('appl_docs');
      setDialogData(tempCardCase);
      setShowDialogInfo(true);
    } else if (transactionData.isTransactionSuccess) {
      const tempCardCase = cardCase('Transaction success');
      setDialogData(tempCardCase);
      setShowDialogInfo(true);

      saveTransactionData({});
    }
  };

  const storeData = (payload) => {
    const { responseCreditInfo, responseInfoCard, responseHomeScreen } =
      payload;
    const homeScreen = responseHomeScreen;
    const application = responseHomeScreen?.applications?.[0];
    const tempData = {
      partner,
      fullname: homeScreen?.customers?.[0]?.fullname,
      accountId: responseCreditInfo?.account_id,
      appStatus: application?.status,
      applicationXid: homeScreen?.applications?.[0]?.application_xid,
      applicationId: homeScreen?.applications?.[0]?.id,
    };
    const isApplDocsActive =
      responseInfoCard?.cards?.filter(
        (item) => item?.button?.[0]?.destination === 'appl_docs',
      ).length > 0;

    utils.store.set(tempData);
    setsUserActive(
      responseCreditInfo?.creditInfo?.account_state < 100 ? false : true,
    );
    setUserData(responseCreditInfo);
    setCardInfo(responseInfoCard);

    setDatas({
      ...datas,
      partner,
      homeScreenInfo: homeScreen,
      accountId: responseCreditInfo?.account_id,
      appStatus: application?.status,
    });

    handleRenderPopUp({
      applicationStatus: application.status,
      creditScore: responseCreditInfo?.creditInfo?.credit_score,
      isApplDocsActive,
    });

    if (!responseCreditInfo?.loan_agreement_xid) {
      utils.store.removeItem('loanXid');
      utils.store.removeItem('preTransactionData');
      utils.store.removeItem('transactionData');
      utils.store.removeItem('loanStatus');
      saveTransactionData({});
    } else {
      utils.store.set('loanXid', responseCreditInfo?.loan_agreement_xid);
    }

    handleLoadingOverlay(false);
  };

  const fetchData = async () => {
    const cancelingLoan = async (loanXid) => {
      try {
        const responseCancel = await cancelLoan(loanXid);

        //loan status 216 / successfully cancelled
        if (responseCancel?.success && responseCancel?.data.status === 216) {
          handleLoadingOverlay(true);
          fetchData();
          return;
        }
      } catch (error) {
        if (error) {
          handleLoadingOverlay(false);
          const authorizeError = error.response?.status === 401;
          if (authorizeError) {
            //if 401 prevent error message to be shown
            return;
          }
          handleNotification({
            isOpen: true,
            message: error?.response?.data?.errors?.[0] ?? error.message,
          });
        }
      }
    };

    try {
      const responseInfoCard = await infoCard();
      const responseCreditInfo = await creditInfo();
      const responseHomeScreen = await homeScreenInfo(partner);

      setIsAllApiFetched(true);
      if (
        responseInfoCard?.errors?.length === 0 &&
        responseCreditInfo?.errors?.length === 0
      ) {
        const params = {
          responseCreditInfo: responseCreditInfo.data,
          responseInfoCard: responseInfoCard.data,
          responseHomeScreen: responseHomeScreen?.content,
        };

        const isEligible =
          responseHomeScreen?.content?.eligible_access?.is_eligible;

        //if loan comes from j1 then cancel the loan
        if (
          responseCreditInfo?.data?.is_j1_loan &&
          responseCreditInfo?.data?.loan_agreement_xid
        ) {
          cancelingLoan(responseCreditInfo?.data?.loan_agreement_xid);
        } else {
          storeData(params);
        }

        if (!isEligible) {
          history.push('/linkaja/home');
          return;
        }
      } else {
        handleNotification({
          isOpen: true,
          message: responseInfoCard?.errors?.[0],
        });
      }
    } catch (error) {
      if (error) {
        handleLoadingOverlay(false);
        const authorizeError = error.response?.status === 401;
        if (authorizeError) {
          //if 401 prevent error message to be shown
          return;
        }
        handleNotification({
          isOpen: true,
          message: error?.response?.data?.errors?.[0] ?? error.message,
        });
      }
    }
  };

  const checkApplicationStatus = async () => {
    const status = datas.appStatus;
    if (status > 100) {
      await fetchData();
      if (localStorage.getItem('fntcam') === 'yes') {
        setShowDialogForm(true);
        actions.setState('isSelfiePhotoDialogShown', true);
      } else if (localStorage.getItem('bkcam') === 'yes') {
        setShowDialogForm(true);
        actions.setState('isPhotoDialogShown', true);
      }

      handleLoadingOverlay(false);
    } else {
      await fetchData();
      if (location?.state?.submitForm) {
        // Card for waiting API after submit
        setCardInfo(CARD_STATUS_100_LINKAJA);
      } else {
        // Card for skinny page
        setCardInfo(CARD_STATUS_100);
      }

      handleLoadingOverlay(false);
    }
  };

  const handleShowDialogInfo = (value) => {
    setShowDialogInfo(value);
  };

  const handleShowDialogForm = (value) => {
    setShowDialogForm(value);
  };

  const handleSentDialogForm = (value) => {
    if (value) {
      fetchData();
    }
  };

  const handleClickDialogButton = (value) => {
    const { action, url, urlType } = value;
    switch (action) {
      case 'form':
        setShowDialogInfo(false);
        setShowDialogForm(true);
        break;
      case 'url':
        switch (urlType) {
          case 'windowOpen':
            window.open(url);
            break;
          default:
            window.location.assign(url);
            break;
        }
        break;
      case 'Close transaction success':
        saveTransactionData({
          ...transactionData,
          isTransactionSuccess: false,
        });
        setShowDialogInfo(false);
        setShowDialogForm(false);
        break;
      case '':
        setShowDialogInfo(false);
        setShowDialogForm(false);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    handleLoadingOverlay(true);
    if (!isMount) {
      checkApplicationStatus();
      setIsMount(true);
    } else {
      handleLoadingOverlay(false);
    }
  }, [datas.appStatus]);

  useEffect(() => {
    // prevent user to go back
    return () => {
      if (history.action === 'POP') {
        history.go(1);
      }
    };
  }, [history]);

  // will be executed every 30 minutes for auto refresh feature
  useInterval(() => {
    checkApplicationStatus();
  }, 30 * 60 * 1000);

  return (
    <Container>
      <Main>
        <NavBar menu={NAVBAR_MENU} />
        <Container>
          <Wrapper
            height={'100%'}
            minHeight={'100vh'}
            maxWidth={MAX_WIDTH}
            minWidth={MIN_WIDTH}
            backgroundColor='#fff'
            className={`${py3} ${paddingTop('80px!important')}`}
          >
            {isMount && (
              <>
                <CreditInfo isUserActive={isUserActive} userData={userData} />
                <ProductInfo
                  disabled={!isAllApiFetched}
                  userData={userData}
                  showDialogInfo={showDialogInfo}
                  setDialogData={(value) => setDialogData(value)}
                  setShowDialogInfo={setShowDialogInfo}
                />
                <CardInfo
                  cardInfo={cardInfo}
                  setDialogData={(value) => setDialogData(value)}
                  setShowDialogInfo={setShowDialogInfo}
                />

                <DialogInfo
                  dialogData={dialogData.dialog}
                  handleShowDialogInfo={handleShowDialogInfo}
                  showDialogInfo={showDialogInfo}
                  handleClickDialogButton={handleClickDialogButton}
                />

                {datas.appStatus == '131' ? (
                  <DialogForm131
                    dialogData={dialogData}
                    setDialogData={setDialogData}
                    handleShowDialogForm={handleShowDialogForm}
                    handleSentDialogForm={handleSentDialogForm}
                    setShowDialogInfo={setShowDialogInfo}
                    showDialogForm={showDialogForm}
                  />
                ) : (
                  <DialogForm105
                    dialogData={dialogData}
                    setDialogData={setDialogData}
                    handleShowDialogForm={handleShowDialogForm}
                    handleSentDialogForm={handleSentDialogForm}
                    setShowDialogInfo={setShowDialogInfo}
                    showDialogForm={showDialogForm}
                  />
                )}
              </>
            )}
          </Wrapper>
        </Container>
      </Main>
    </Container>
  );
};

export default withRouter(Home);
