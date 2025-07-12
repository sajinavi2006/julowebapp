import React, { useState } from 'react';
import { cx } from '@emotion/css';

import { BROWSER_NOT_SUPPORT_CAMERA } from 'constant';

import DialogTakePhoto from '../Dialog/DialogTakePhoto';
import DialogViewPhoto from '../Dialog/DialogViewPhoto';
import DialogInfo from 'components/Dialog/DialogInfo';

import iconCamera from 'assets/img/icon/ic-camera-blue.svg';
import loading from 'assets/img/loading.gif';

import { StyledFormTakePhoto } from './styles';
import { my4, h100, w100, dFlex, alignCenter } from 'assets/css/stylesFix';
import {
  borderRadiusAll,
  margin as marginValue,
  objectFit,
  widthHeight,
} from 'assets/css/stylesValue';
import { Div } from 'assets/css/styled';

interface Props {
  type?: string;
  isLoading?: boolean;
  image?: string;
  disabled?: boolean;
  onClick?: () => void;
  margin?: string;
  style?: React.CSSProperties;
  error?: string;
}

const FormTakePhoto: React.FC<Props> = ({
  type = 'back',
  image = '',
  isLoading = false,
  disabled,
  onClick,
  margin,
  style,
  error,
}) => {
  const [showDialogTakePhoto, setShowDialogTakePhoto] = useState(false);
  const [showDialogViewPhoto, setShowDialogViewPhoto] = useState(false);
  const [showDialogCameraPermissionError, setShowDialogCameraPermissionError] =
    useState(false);

  const checkPhoto = (type: string) => {
    if (type === 'photo') {
      setShowDialogViewPhoto(true);
    } else {
      if (onClick) {
        onClick();
      }
    }
  };

  const handleOnClick = () => {
    if (!disabled) {
      if (image) {
        setShowDialogTakePhoto(true);
        return;
      }
      if (onClick) {
        onClick();
      }
    }
  };

  const handleBackCameraPermissionError = () => {
    setShowDialogCameraPermissionError(false);
  };

  return (
    <>
      <StyledFormTakePhoto
        disabled={disabled}
        style={style}
        className={`${margin ? marginValue(margin) : my4}`}
        onClick={() => (!isLoading ? handleOnClick() : null)}
      >
        {isLoading ? (
          <div className={`${dFlex} ${alignCenter}`}>
            <img
              src={loading}
              alt='Loading Image'
              className={`${widthHeight('100px', '100px')}`}
            />
          </div>
        ) : (
          <img
            src={image ? image : iconCamera}
            alt='Photo Document'
            className={cx(
              {
                [w100]: !!image,
                [h100]: !!image,
                [objectFit('cover')]: !!image,
              },
              borderRadiusAll('inherit'),
            )}
          />
        )}
      </StyledFormTakePhoto>
      {error && (
        <Div color='#f44336' marginTop='2px' fontSize='16px'>
          {error}
        </Div>
      )}
      <DialogTakePhoto
        type={type}
        showDialog={showDialogTakePhoto}
        handleShowDialog={() => setShowDialogTakePhoto(false)}
        handleClickDialogButton={(value) => checkPhoto(value)}
      />

      <DialogViewPhoto
        photo={image}
        showDialog={showDialogViewPhoto}
        handleShowDialog={() => setShowDialogViewPhoto(false)}
      />

      <DialogInfo
        dialogData={BROWSER_NOT_SUPPORT_CAMERA}
        handleShowDialogInfo={setShowDialogCameraPermissionError}
        showDialogInfo={showDialogCameraPermissionError}
        handleClickDialogButton={handleBackCameraPermissionError}
      />
    </>
  );
};

export default FormTakePhoto;
