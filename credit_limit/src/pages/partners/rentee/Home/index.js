import React, { useEffect, useState } from 'react';
import { useHistory, useParams, withRouter } from 'react-router-dom';

import utils from 'utils';
import { useUserContext } from 'providers/UserProvider';
import useGlobalState from 'actions';
import { creditInfo, homeScreenInfo, infoCard } from 'services/user';
import { fetchLoan } from 'services/partner/rentee/form';
import {
  CARD_STATUS_100,
  cardCase,
  MAX_WIDTH,
  MIN_WIDTH,
  NAVBAR_MENU,
} from 'constant';

import { Container, Main, Wrapper } from 'assets/css/styled';
import { py3 } from 'assets/css/stylesFix';
import { paddingTop } from 'assets/css/stylesValue';

import logoName from 'assets/img/logo/Rentee.svg';

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
  const { partner } = useParams();

  const handleRenderPopUp = (value) => {
    const shortFormSubmitted = 105;
    const { applicationStatus, creditScore } = value;

    if (
      applicationStatus == shortFormSubmitted &&
      creditScore &&
      creditScore !== 'C' &&
      creditScore !== '--'
    ) {
      const tempCardCase = cardCase('appl_docs');
      setDialogData(tempCardCase);
      setShowDialogInfo(true);
    } else if (transactionData.isTransactionSuccess) {
      const tempCardCase = cardCase('Rentee transaction success');
      setDialogData(tempCardCase);
      setShowDialogInfo(true);
    }
  };

  const storeData = (payload) => {
    const {
      loanInfo,
      responseCreditInfo,
      responseInfoCard,
      responseHomeScreen,
    } = payload;
    const homeScreen = responseHomeScreen;
    const application = responseHomeScreen?.applications?.[0];
    const tempData = {
      partner,
      fullname: homeScreen?.customers?.[0]?.fullname,
      accountId: responseCreditInfo?.account_id,
      appStatus: application?.status,
      loanStatus: loanInfo?.loan_status,
      loanXid: loanInfo?.loan_xid,
    };

    utils.store.set(tempData);
    setsUserActive(
      responseCreditInfo?.creditInfo?.account_state < 100 ? false : true,
    );
    setUserData(responseCreditInfo);
    setCardInfo(responseInfoCard);

    saveTransactionData({
      ...transactionData,
      loan_status: loanInfo?.loan_status,
      loan_xid: loanInfo?.loan_xid,
    });
    setDatas({
      ...datas,
      partner,
      homeScreenInfo: homeScreen,
      accountId: responseCreditInfo?.account_id,
      appStatus: application?.status,
      loanStatus: loanInfo?.loan_status,
      loanXid: loanInfo?.loan_xid,
    });

    handleRenderPopUp({
      applicationStatus: application.status,
      creditScore: responseCreditInfo?.creditInfo?.credit_score,
    });
    handleLoadingOverlay(false);
  };

  const fetchData = async () => {
    try {
      const loanInfo = await fetchLoan();
      const responseInfoCard = await infoCard();
      const responseCreditInfo = await creditInfo();
      const responseHomeScreen = await homeScreenInfo(partner);

      setIsAllApiFetched(true);

      if (
        responseInfoCard?.errors?.length === 0 &&
        responseCreditInfo?.errors?.length === 0 &&
        loanInfo?.errors?.length === 0
      ) {
        const params = {
          loanInfo: loanInfo?.data,
          responseCreditInfo: responseCreditInfo.data,
          responseInfoCard: responseInfoCard.data,
          responseHomeScreen: responseHomeScreen?.content,
        };

        const isEligible =
          responseHomeScreen?.content?.eligible_access?.is_eligible;
        const tempPartner =
          responseHomeScreen?.content?.applications?.[0]?.partner_name ?? 'j1';

        if (!isEligible) {
          history.push(`/${tempPartner}/home`);
          return;
        }

        storeData(params);
      } else {
        handleNotification({
          isOpen: true,
          message: responseInfoCard?.errors?.[0],
        });
      }
    } catch (error) {
      if (error) {
        handleLoadingOverlay(false);
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
      if (history.location.state?.app) {
        await fetchData();
        setCardInfo(CARD_STATUS_100);

        handleLoadingOverlay(false);
      } else {
        handleLoadingOverlay(false);
        history.push(`/${datas?.partner}/application/personal_identity`);
      }
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
      case 'Close Rentee transaction success':
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

  // will be executed every 30 minutes for auto refresh feature
  useInterval(() => {
    checkApplicationStatus();
  }, 30 * 60 * 1000);

  return (
    <Container>
      <Main>
        <NavBar menu={NAVBAR_MENU} logo={logoName} />
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
                <ProductInfo disabled={!isAllApiFetched} />
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
