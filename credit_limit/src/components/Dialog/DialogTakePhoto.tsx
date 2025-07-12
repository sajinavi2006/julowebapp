import React from 'react';
import { IDialogTakePhoto } from './type';

import { MAX_WIDTH_2 } from '../../constant';

import {
  cursorPointer,
  dFlex,
  dInlineBlock,
  mb3,
  textCenter,
  w100,
} from '../../assets/css/stylesFix';

import retakePhotoIcon from '../../assets/img/icon/ic-camera_old.svg';
import viewPhotoIcon from '../../assets/img/icon/ic-see_photo.svg';

import Dialog from './index';

const DialogTakePhoto: React.FC<IDialogTakePhoto> = ({
  type,
  clickOutside,
  customMaxWidth,
  handleClickDialogButton,
  handleShowDialog,
  showDialog,
}) => {
  const handleClick = (value: string) => {
    if (value === 'photo') {
      handleClickDialogButton?.('photo');
    } else {
      handleClickDialogButton?.('camera');
    }
    handleShowDialog?.();
  };

  return (
    <Dialog
      baseColor={`#000`}
      clickOutside={clickOutside}
      padding={`24px 24px`}
      getShow={handleShowDialog}
      customMaxWidth={customMaxWidth}
      show={showDialog}
      margin='0px'
    >
      <div className={`${mb3}`}>Pilih Opsi</div>
      <div className={`${dFlex} ${textCenter}`}>
        <div className={`${w100}`}>
          <div
            className={`${cursorPointer} ${dInlineBlock}`}
            onClick={() => handleClick('photo')}
          >
            <div>
              <img src={viewPhotoIcon} alt='View Photo' />
            </div>
            <div>Lihat foto</div>
          </div>
        </div>
        <div className={`${w100}`}>
          <div
            className={`${cursorPointer} ${dInlineBlock}`}
            onClick={() => handleClick('camera')}
          >
            <div>
              <img src={retakePhotoIcon} alt='Retake Photo' />
            </div>
            <div>{type === 'front' ? 'Kamera Depan' : 'Kamera belakang'}</div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

DialogTakePhoto.defaultProps = {
  clickOutside: true,
  showDialog: false,
  customMaxWidth: MAX_WIDTH_2,
};

export default DialogTakePhoto;
