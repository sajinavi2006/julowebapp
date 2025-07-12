import { Button } from 'assets/css/styled';

import { useState } from 'react';
import Dialog from 'components/Dialog';
import CameraNew from 'components/camera-new';
import { cx } from '@emotion/css';
import { h100, overflowHidden } from 'assets/css/stylesFix';
import { background, opacity } from 'assets/css/stylesValue';
import iconBack from 'assets/img/icon/ic-back-2.svg';
import themeDefault from 'themes/Partner/default';
import { livenessCam } from './styles';

const ActiveCamera = () => {
  const themeColor = themeDefault?.colors;
  const themeText = themeDefault?.text;
  const dialogData = {
    name: 'liveness',
    title: 'Liveness Check',
  };
  const [barBackData] = useState({
    title: dialogData?.title,
    image: iconBack,
    fontColor: themeText?.greyLight,
    backgroundColor: themeColor?.white,
  });
  // const [photoUrlNeutral, setPhotoUrlNeutral] = useState<string>();
  // const [photoUrlSmile, setPhotoUrlSmile] = useState<string>();

  // useEffect(() => {
  //   setBarBackData({
  //     title: dialogData?.title,
  //     image: iconBack,
  //     fontColor: themeText?.greyLight,
  //     backgroundColor: themeColor?.white,
  //   });
  // }, [dialogData]);

  const videoConstraints = {
    video: {
      width: 720,
      facingMode: navigator.userAgent.includes('Android' || 'iPhone')
        ? { exact: 'environment' }
        : 'user',
    },
  };

  const permissionCamera = () => {
    try {
      navigator.mediaDevices.getUserMedia(videoConstraints);
    } catch (err) {
      alert((err as Error).message);
    }
  };

  permissionCamera();

  return (
    <Dialog
      show={true}
      customMaxWidth={window.screen.width}
      minWidth={window.screen.width}
      withoutTemplate
      classDialog={cx(h100, overflowHidden, livenessCam)}
      dataBarBack={barBackData}
      classBackdrop={cx(background('rgb(34, 34, 34)'), opacity('1!important'))}
    >
      <CameraNew getImage={() => {}} show={true} liveness={true} />

      <Button fluid>Mengerti</Button>
    </Dialog>
  );
};

export default ActiveCamera;
