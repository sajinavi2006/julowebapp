import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useUserContext } from 'providers/UserProvider';
import useGlobalState from '../../../../../../actions';

import { cardCase, CARD_STATUS_100 } from '../../../../../../constant';

import CreditInfo from './CreditInfo';
import ProductInfo from './ProductInfo';
import CardInfo from './CardInfo';

import DialogForm131 from '../../../Form/DialogForm131';
import DialogForm105 from '../../../Form/DialogForm105';

import DialogInfo from '../../../../../../components/Dialog/DialogInfo';

import {
  creditInfo,
  homeScreenInfo,
  infoCard,
} from '../../../../../../services/user';

const Cermati = () => {
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

  const fetchData = async () => {
    try {
      const responseInfoCard = await infoCard();
      const responseCreditInfo = await creditInfo();
      const responseHomeScreen = await homeScreenInfo();

      if (
        responseInfoCard?.errors?.length === 0 &&
        responseCreditInfo?.errors?.length === 0
      ) {
        setsUserActive(
          responseCreditInfo?.data?.creditInfo?.account_state < 100
            ? false
            : true,
        );
        setUserData(responseCreditInfo?.data);
        setCardInfo(responseInfoCard.data);
        const homeScreen = responseHomeScreen?.content;
        const application = responseHomeScreen?.content?.applications[0];
        setDatas({
          ...datas,
          homeScreenInfo: homeScreen,
          appStatus: application.status,
        });

        if (
          application.status == 105 &&
          responseCreditInfo.data?.creditInfo?.credit_score &&
          responseCreditInfo.data?.creditInfo?.credit_score !== 'C' &&
          responseCreditInfo.data?.creditInfo?.credit_score !== '--'
        ) {
          const tempCardCase = cardCase('appl_docs');
          setDialogData(tempCardCase);
          setShowDialogInfo(true);
        } else if (application.status == 131) {
          const tempCardCase = cardCase('131');
          setDialogData(tempCardCase);
        }
        actions.closeLoadingOverlay();
      } else {
        handleNotification({
          isOpen:true,
          message: responseInfoCard?.errors[0],
        });
      }
    } catch (error) {
      if (error) {
        actions.closeLoadingOverlay();
        handleNotification({
          isOpen: true,
          message: error?.response?.data &&
          error?.response?.data?.errors &&
          error?.response?.data?.errors?.length > 0
          ? error?.response?.data?.errors[0]
          : error.message,
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
      actions.closeLoadingOverlay();
    } else {
      if (history.location.state?.app) {
        await fetchData();
        setCardInfo(CARD_STATUS_100);
        actions.closeLoadingOverlay();
      } else {
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
    const { action, url } = value;
    switch (action) {
      case 'form':
        setShowDialogInfo(false);
        setShowDialogForm(true);
        break;
      case 'url':
        window.location.assign(url);
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
    actions.openLoadingOverlay();
    if (!isMount) {
      checkApplicationStatus();
      setIsMount(true);
    } else {
      actions.closeLoadingOverlay();
    }
  }, [datas.appStatus]);

  return (
    isMount && (
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

        {
          <DialogInfo
            dialogData={dialogData.dialog}
            handleShowDialogInfo={handleShowDialogInfo}
            showDialogInfo={showDialogInfo}
            handleClickDialogButton={handleClickDialogButton}
          />
        }
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
    )
  );
};

export default Cermati;
