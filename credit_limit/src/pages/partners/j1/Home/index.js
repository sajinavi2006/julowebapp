import { useEffect, useState } from 'react';
import { useHistory, useParams, withRouter } from 'react-router-dom';

import { useUserContext } from 'providers/UserProvider';
import useGlobalState from 'actions';

import {
  cardCase,
  CARD_STATUS_100,
  MAX_WIDTH,
  MIN_WIDTH,
  NAVBAR_MENU,
  whitelistedPartner,
} from 'constant';

import { Container, Main, Wrapper } from 'assets/css/styled';
import { py3 } from 'assets/css/stylesFix';
import { paddingTop } from 'assets/css/stylesValue';

import logoName from 'assets/img/logo-horizontal.svg';

import DialogForm105 from 'components/Dialog/DialogForm/DialogForm105';
import DialogForm131 from 'components/Dialog/DialogForm/DialogForm131';

import CreditInfo from './CreditInfo';
import ProductInfo from './ProductInfo';
import CardInfo from './CardInfo';

import NavBar from 'components/NavBar';
import DialogInfo from 'components/Dialog/DialogInfo';
import { useInterval } from 'hooks';

import { creditInfo, homeScreenInfo, infoCard } from 'services/user';
import utils from 'utils';

const Home = () => {
  const { datas, setDatas, handleNotification } = useUserContext();
  const [, actions] = useGlobalState();
  const [isMount, setIsMount] = useState(false);
  const [isUserActive, setsUserActive] = useState(false);
  const [userData, setUserData] = useState({});
  const [cardInfo, setCardInfo] = useState({});
  const [dialogData, setDialogData] = useState({});
  const [showDialogInfo, setShowDialogInfo] = useState(false);
  const [showDialogForm, setShowDialogForm] = useState(false);
  const history = useHistory();
  const { partner } = useParams();

  const storeData = (payload) => {
    const {
      responseCreditInfo,
      responseInfoCard,
      responseHomeScreen,
      tempPartner,
    } = payload;
    const homeScreen = responseHomeScreen;
    const application = responseHomeScreen?.applications[0];
    const tempData = {
      partner: tempPartner,
      appStatus: application.status,
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
      homeScreenInfo: homeScreen,
      appStatus: application.status,
    });

    if (
      application.status == 105 &&
      responseCreditInfo?.creditInfo?.credit_score &&
      responseCreditInfo?.creditInfo?.credit_score !== 'C' &&
      responseCreditInfo?.creditInfo?.credit_score !== '--' &&
      isApplDocsActive
    ) {
      const tempCardCase = cardCase('appl_docs');
      setDialogData(tempCardCase);
      if (
        !(
          localStorage.getItem('fntcam') === 'yes' ||
          localStorage.getItem('bkcam') === 'yes'
        )
      ) {
        setShowDialogInfo(true);
      }
    } else {
      setShowDialogInfo(false);
    }
  };

  const fetchData = async () => {
    try {
      const responseInfoCard = await infoCard();
      const responseCreditInfo = await creditInfo();
      const responseHomeScreen = await homeScreenInfo();

      if (
        responseInfoCard?.errors?.length === 0 &&
        responseCreditInfo?.errors?.length === 0
      ) {
        const tempPartner =
          responseHomeScreen?.content?.applications[0].partner_name;
        const params = {
          responseCreditInfo: responseCreditInfo.data,
          responseInfoCard: responseInfoCard.data,
          responseHomeScreen: responseHomeScreen?.content,
          tempPartner: tempPartner,
        };

        if (tempPartner) {
          const isPartnerValid = whitelistedPartner.includes(tempPartner);
          if (!isPartnerValid) {
            history.push(`/j1/home`);
            storeData(params);
          } else if (tempPartner == partner) {
            storeData(params);
          } else {
            history.push(`/${tempPartner}/home`);
            storeData(params);
          }
        } else {
          if (partner == 'j1') {
            storeData(params);
          } else {
            history.push('/j1/home');
            storeData(params);
          }
        }
        actions.closeLoadingOverlay();
      } else {
        handleNotification({
          isOpen: true,
          message: responseInfoCard?.errors[0],
        });
      }
    } catch (error) {
      if (error) {
        actions.closeLoadingOverlay();
        handleNotification({
          isOpen: true,
          message: 'Muat ulang halaman',
        });
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
      case '':
        setShowDialogInfo(false);
        setShowDialogForm(false);
        break;
      default:
        break;
    }
  };

  const checkApplicationStatus = async () => {
    const status = datas.appStatus;
    if (status > 100) {
      await fetchData();
      if (localStorage.getItem('fntcam') === 'yes') {
        actions.setState('isSelfiePhotoDialogShown', true);
        setShowDialogForm(true);
      } else if (localStorage.getItem('bkcam') === 'yes') {
        actions.setState('isPhotoDialogShown', true);
        setShowDialogForm(true);
      }

      actions.closeLoadingOverlay();
    } else {
      if (history.location.state?.app) {
        await fetchData();
        setCardInfo(CARD_STATUS_100);
        actions.closeLoadingOverlay();
      } else {
        if (localStorage.getItem('passback_params')) {
          let str = localStorage.getItem('passback_params').split('_');
          if (str.length == 4) {
            if (str[3] == 'financial') {
              history.push(`/${datas?.partner}/application/financial`);
            } else if (str[3] == 'review') {
              history.push(`/${datas?.partner}/application/review`);
            }
          } else {
            history.push(`/${datas?.partner}/application/personal_identity`);
          }
        } else {
          history.push(`/${datas?.partner}/application/personal_identity`);
        }
      }
    }
  };

  useEffect(() => {
    actions.openLoadingOverlay();
    if (!isMount) {
      checkApplicationStatus();
      setIsMount(true);
    } else {
      actions.closeLoadingOverlay();
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
                <ProductInfo
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
