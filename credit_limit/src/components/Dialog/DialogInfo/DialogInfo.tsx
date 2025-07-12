import { useEffect, useState } from 'react';
import { CSSObject } from '@emotion/css';

import { Button, Div } from 'assets/css/styled';

import {
  h100,
  mb3,
  mb4,
  mt4,
  textCenter,
  w100,
  dFlex,
} from 'assets/css/stylesFix';
import {
  color,
  fontSize,
  fontWeight,
  maxWidth,
  text,
} from 'assets/css/stylesValue';

import Dialog from '../index';
import LoaderText from 'components/LoaderText';

import { DialogInfoProp } from './types';

const DialogInfo = ({
  children,
  clickOutside = true,
  customMaxWidth,
  dialogData,
  handleClickDialogButton,
  handleShowDialogInfo,
  showDialogInfo,
}: DialogInfoProp) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(showDialogInfo);
    }, 250);

    return () => {
      clearTimeout(timeout);
    };
  }, [showDialogInfo]);

  return (
    <Dialog
      baseColor={`#000`}
      clickOutside={clickOutside}
      padding={`24px 24px`}
      getShow={handleShowDialogInfo}
      customMaxWidth={customMaxWidth}
      show={show}
    >
      <div className={`${textCenter}`}>
        {dialogData?.img && (
          <img
            src={dialogData?.img}
            className={`${mb4} ${maxWidth(120)} ${w100} ${h100}`}
          />
        )}
        <div
          className={`${mb3} ${color('#1ea7e9')} ${fontSize(16)} ${fontWeight(
            'bold',
          )}`}
        >
          {dialogData?.title?.text}
        </div>
        <div className={`${color('#5e5e5e')} ${fontSize(12)}`}>
          {dialogData?.message?.text}
        </div>
        {children}
        <Div
          className={dialogData?.buttonWrap ? dFlex : ''}
          gap={dialogData?.buttonWrap ? '20px' : ''}
        >
          {dialogData?.button?.map((item, index) => (
            <Div
              key={index}
              className={`${text({
                align: item?.position as CSSObject['textAlign'],
              })} ${dialogData.buttonWrap ? w100 : ''}`}
            >
              <Button
                fluid={item?.position ? false : true}
                backgroundColor={item?.bgColor}
                borderColor={item?.borderColor}
                color={item?.color}
                padding={`11px`}
                fontSize={item?.fontSize}
                className={`${mt4} ${fontSize(12)}`}
                onClick={() => {
                  if (handleClickDialogButton) {
                    handleClickDialogButton({
                      action: item?.action,
                      url: item?.url,
                      urlType: item?.urlType,
                      data: { ...item, index: index },
                    });
                  }
                }}
              >
                {item?.loading ? <LoaderText /> : item?.text}
              </Button>
            </Div>
          ))}
        </Div>
      </div>
    </Dialog>
  );
};

export default DialogInfo;
