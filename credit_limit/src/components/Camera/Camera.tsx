import { useEffect, useState } from 'react';

import Dialog from 'components/Dialog';
import themeDefault from 'themes/Partner/default';
import { cx } from '@emotion/css';
import { background } from 'assets/css/stylesValue';
import { opacity } from 'assets/css/stylesValue';
import BackCamera from './BackCamera';
import FrontCamera from './FrontCamera';
import { h100 } from 'assets/css/stylesFix';

import iconBackWhite from 'assets/img/icon/ic-arrow_left_white.svg';
import { useWindowSize } from 'hooks';
import { overflowHidden } from 'assets/css/stylesFix';
import { CameraProps } from './types';

const Camera = (props: CameraProps) => {
  const {
    cameraPosition = 'front',
    dialogData,
    getShow,
    show = false,
    getImage,
  } = props;
  const themeColor = themeDefault?.colors;
  const [, windowHeight] = useWindowSize();
  const [barBackData, setBarBackData] = useState({
    title: dialogData?.title,
    image: iconBackWhite,
    color: themeColor?.white,
    backgroundColor: 'transparent',
  });

  useEffect(() => {
    setBarBackData({
      title: dialogData?.title,
      image: iconBackWhite,
      color: themeColor?.white,
      backgroundColor: 'transparent',
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

  const RenderCamera = () => {
    switch (cameraPosition) {
      case 'front':
        return (
          <FrontCamera
            dialogData={dialogData}
            windowHeight={windowHeight}
            onTakePhoto={handleTakePhoto}
            setImage={(e) => getImage(e)}
          />
        );
      case 'back':
        return (
          <BackCamera
            dialogData={dialogData}
            name={dialogData?.name}
            onTakePhoto={handleTakePhoto}
            setImage={(e) => getImage(e)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog
      fastClose
      type={'fade'}
      clickOutside={true}
      getShow={() => getShow && getShow(false)}
      show={show}
      hideBarback={false}
      dataBarBack={barBackData}
      maxWidth='100%'
      classBackdrop={cx(
        {
          [background(themeColor?.backdropCamera)]: cameraPosition === 'front',
          [background(themeColor?.backdropCamera)]: cameraPosition === 'back',
        },
        opacity('1!important'),
      )}
      classDialog={cx(h100, overflowHidden)}
      withoutTemplate
    >
      <RenderCamera />
    </Dialog>
  );
};

export default Camera;
