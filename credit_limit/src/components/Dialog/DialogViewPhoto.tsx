import React from 'react';
import { cx } from '@emotion/css';

import Dialog from './index';

import close from 'assets/img/close.png';

import { cursorPointer, positionAbsolute, w100 } from 'assets/css/stylesFix';
import { bottom, right } from 'assets/css/stylesValue';

interface Props {
  clickOutside?: boolean;
  handleShowDialog: (value: boolean) => void;
  showDialog?: boolean;
  photo?: string;
  type?: string;
}

const DialogViewPhoto: React.FC<Props> = ({
  clickOutside = true,
  handleShowDialog,
  showDialog = false,
  photo,
  type,
}) => {
  let imgStyle;
  if (type === 'front') {
    imgStyle = {
      style: {
        transform: 'scaleX(-1)',
        filter: 'FlipH',
      },
    };
  }
  return (
    <Dialog
      withoutTemplate
      baseColor={`#000`}
      clickOutside={clickOutside}
      padding={`24px 24px`}
      getShow={handleShowDialog}
      show={showDialog}
    >
      <div style={{ position: 'relative', left: 0, top: 0 }}>
        <img
          src={photo}
          className={`${w100} previewImg`}
          alt='Preview Image'
          {...imgStyle}
        />
        <img
          src={close}
          width='30'
          height='30'
          className={cx(
            positionAbsolute,
            cursorPointer,
            bottom('0'),
            right('0'),
          )}
          onClick={() => handleShowDialog(false)}
        />
      </div>
    </Dialog>
  );
};

export default DialogViewPhoto;
