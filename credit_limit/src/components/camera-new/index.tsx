import React, { useEffect, useState } from 'react';

import Dialog from 'components/Dialog';
import themeDefault from 'themes/Partner/default';
import { cx } from '@emotion/css';
import { backgroundColor } from 'assets/css/stylesValue';
import { opacity } from 'assets/css/stylesValue';
import BackCamera from './back-camera/BackCamera';
import FrontCamera from './front-camera/FrontCamera';
import LivenessCamera from './liveness-camera';
import { h100 } from 'assets/css/stylesFix';

import iconBack from 'assets/img/icon/ic-back-2.svg';
import { overflowHidden } from 'assets/css/stylesFix';
import { CameraProps } from './types';
import ConfirmDialog from './confirm-dialog/ConfirmDialog';
import { livenessCam } from './style';

const CameraNew: React.FC<CameraProps> = ({
  cameraPosition = 'front',
  show = false,
  getImage,
  dialogData,
  getShow,
  liveness = false,
  checkLivenessStatus,
  onLivenessError,
  hideHeader = false,
  retryOnApplicationFailed = false,
}) => {
  const themeColor = themeDefault?.colors;
  const themeText = themeDefault?.text;
  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);
  const [camState, setCamState] = useState<boolean>(false);
  const [barBackData, setBarBackData] = useState({
    title: dialogData?.title,
    image: iconBack,
    fontColor: themeText?.greyLight,
    backgroundColor: themeColor?.white,
  });

  useEffect(() => {
    setBarBackData({
      title: dialogData?.title,
      image: iconBack,
      fontColor: themeText?.greyLight,
      backgroundColor: '#FFFFFFFF',
    });
  }, [dialogData]);

  const handleTakePhoto = (value: string) => {
    switch (value) {
      case 'close':
        if (getShow) {
          getShow(false);
        }
        break;

      default:
        break;
    }
  };

  const handleOnCamStateChange = (newCamState: boolean) => {
    setCamState(newCamState);
  };

  const handleOnCloseDialog = () => {
    getShow && getShow(false);
  };

  const handleShowConfirmDialog = () => {
    setShowConfirmDialog(true);
  };

  const handleOnCloseConfirmDialog = (value: boolean) => {
    setShowConfirmDialog(false);
    if (!value) {
      setCamState(false);
    }
    if (!camState) {
      handleOnCloseDialog();
    }
  };

  const handleGetShow = () => {
    if (liveness) {
      if (camState) {
        handleShowConfirmDialog();
      } else {
        handleOnCloseConfirmDialog(false);
      }
    } else {
      handleOnCloseDialog();
    }
  };


  const handleOnLivenessError = (error: Error) => {
    if (onLivenessError) {
      onLivenessError(error);
    }
  };

  const RenderCamera = () => {
    if (liveness) {
      return (
        <LivenessCamera
          onTakePhoto={() => handleTakePhoto}
          setImage={getImage}
          camState={camState}
          setCamState={handleOnCamStateChange}
          checkLivenessStatus={checkLivenessStatus}
          retryOnApplicationFailed={retryOnApplicationFailed}
          isConfirmDialogShowing={false}
          onLivenessError={handleOnLivenessError}
        />
      );
    } else {
      switch (cameraPosition) {
        case 'front':
          return (
            <FrontCamera
              onTakePhoto={() => handleTakePhoto}
              setImage={getImage}
            />
          );
        case 'back':
          return (
            <BackCamera
              onTakePhoto={() => handleTakePhoto}
              setImage={getImage}
            />
          );
        default:
          return null;
      }
    }
  };

  return (
    <>
      <Dialog
        fastClose
        clickOutside={false}
        getShow={handleGetShow}
        show={show}
        hideBarback={hideHeader}
        dataBarBack={barBackData}
        classBackdrop={cx(backgroundColor('white'), opacity('1!important'))}
        classDialog={cx(h100, overflowHidden, livenessCam)}
        withoutTemplate
      >
        {!showConfirmDialog ? <RenderCamera /> : null}
        <ConfirmDialog
          show={showConfirmDialog}
          onClose={handleOnCloseConfirmDialog}
        />
      </Dialog>
    </>
  );
};

export default CameraNew;
