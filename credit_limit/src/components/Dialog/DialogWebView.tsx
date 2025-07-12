import React, { useEffect, useState, useRef } from 'react';

import { ButtonOutline } from '../../assets/css/styled';

import { dFlex, flexColumn, h100, mb3 } from '../../assets/css/stylesFix';

import loading from '../../assets/img/loading.gif';

import Dialog from './index';

interface Props {
  url?: string;
  handleShowDialogWebView?: (value: boolean) => void;
  showDialogWebView: boolean;
}

const DialogWebView: React.FC<Props> = ({
  url,
  handleShowDialogWebView,
  showDialogWebView,
}) => {
  const [frameKey, setFramekey] = useState(0);
  const [isBack, setIsBack] = useState(false);
  const iframe = useRef(null);

  useEffect(() => {
    setFramekey(frameKey + 1);
    setIsBack(false);
  }, [url]);

  const iframeElement = () => {
    const blobMe = URL['createObjectURL'](
      new Blob([''], { type: 'text/html' }),
    );
    const destinationUrl = url;
    const idIframe = 'iframeWebView';

    return React.createElement(
      'iframe',
      {
        ref: iframe,
        frameBorder: '0',
        width: '100%',
        height: '100%',
        src: blobMe,
        id: idIframe,
        onLoad: (e: React.ChangeEvent<HTMLIFrameElement>) => {
          if (e.target.contentDocument) {
            e.target.contentDocument.write(
              '<script type="text/javascript">location.href="' +
                destinationUrl +
                '"</script>',
            );
          }
        },
      },
      '',
    );
  };

  return url && !isBack ? (
    <Dialog
      fluid
      baseColor={`#000`}
      clickOutside={true}
      padding={`15px`}
      getShow={handleShowDialogWebView}
      show={showDialogWebView}
    >
      <div className={`${h100} ${dFlex} ${flexColumn}`}>
        <div className={`${mb3}`}>
          <ButtonOutline
            color={'#00acf0'}
            onClick={() => {
              if (handleShowDialogWebView) {
                handleShowDialogWebView(false);
              }
              setIsBack(true);
            }}
          >
            {isBack ? (
              <img src={loading} width='25px' height='25px' />
            ) : (
              'Kembali'
            )}
          </ButtonOutline>
        </div>

        <div id='wrapperIframeWebView' key={frameKey} className={`${h100}`}>
          {iframeElement()}
        </div>
      </div>
    </Dialog>
  ) : null;
};

export default DialogWebView;
