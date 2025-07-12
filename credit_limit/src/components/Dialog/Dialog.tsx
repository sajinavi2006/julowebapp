import React, { useEffect, useState } from 'react';
import { cx } from '@emotion/css';

import { MAX_WIDTH, Z_INDEX_DIALOG } from 'constant';

import { DialogBackground, StyledDialog } from './styles';
import { Card, Div, Wrapper } from 'assets/css/styled';
import {
  borderRadiusAll,
  color,
  height,
  left,
  top,
  zIndex as zIndexValue,
} from 'assets/css/stylesValue';
import {
  borderNone,
  dNone,
  h100,
  h90,
  mx3,
  overflowHidden,
  positionFixed,
  positionRelative,
  px0,
  w100,
} from 'assets/css/stylesFix';

import BarBack from 'components/BarBack';
import { MIN_WIDTH } from 'constant';
import { cursorPointer } from 'assets/css/stylesFix';
import { Props } from './type';
import { useHistory } from 'react-router-dom';

const Dialog: React.FC<Props> = ({
  type = 'default',
  baseColor = '#fff',
  children,
  classDialog,
  clickOutside = true,
  customMaxWidth,
  dataBarBack,
  fastClose = false,
  fluid,
  floating = false,
  getShow,
  hideBarback = true,
  margin,
  maxWidth = `${MAX_WIDTH}px`,
  minWidth = MIN_WIDTH,
  name,
  padding,
  position = 'center',
  show = false,
  withoutTemplate = false,
  stylesDialog,
  classWrapperContent,
  classBackdrop,
  redirectURL,
}) => {
  //const {datas, setDatas} = useUserContext()
  const [isOpen, setIsOpen] = useState(false);
  const [isHideBarBack, setIsHideBarBack] = useState<boolean>(true);
  const [isOpenAnimation, setIsOpenAnimation] = useState<boolean>(false);
  const staticZIndex = Z_INDEX_DIALOG;
  const history = useHistory();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (floating) {
      if (hideBarback !== undefined) {
        setIsHideBarBack(hideBarback);
      }
      timeoutId = setTimeout(() => {
        setIsOpenAnimation(show);
      }, 200);
      setIsOpen(true);
    } else {
      if (show) {
        if (hideBarback !== undefined) {
          setIsHideBarBack(hideBarback);
        }
        timeoutId = setTimeout(() => {
          setIsOpenAnimation(true);
        }, 200);
        setIsOpen(true);
      } else {
        if (fastClose) {
          setIsOpen(show);
        } else {
          timeoutId = setTimeout(() => {
            setIsOpen(show);
          }, 200);
        }
        setIsOpenAnimation(show);
      }
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [show]);

  const handleClick = () => {
    if (clickOutside) {
      if (show) {
        if (getShow) getShow(false);
        setIsOpen(show);
      }
      if (redirectURL) {
        history.replace(redirectURL);
      }
      setIsOpenAnimation(false);
    }
  };

  return (
    <div>
      {isOpen ? (
        <>
          {!floating ? (
            <DialogBackground
              className={cx(classBackdrop, borderNone, cursorPointer)}
              isOpen={isOpenAnimation}
              zIndex={staticZIndex - 1}
              onClick={() => handleClick()}
            />
          ) : null}
          <StyledDialog
            data-testid='dialog'
            maxWidth={maxWidth}
            minWidth={minWidth}
            name={name}
            isOpen={isOpen}
            isOpenAnimation={isOpenAnimation}
            position={position}
            type={type}
            zIndex={staticZIndex}
            styles={stylesDialog}
            className={cx(classDialog)}
          >
            <Div className={cx(h100, w100)} display='flex'>
              {!isHideBarBack && (
                <BarBack
                  img={dataBarBack?.image}
                  color={dataBarBack?.color}
                  backgroundColor={dataBarBack?.backgroundColor}
                  borderBottom='0'
                  classBarBack={cx(
                    w100,
                    positionFixed,
                    zIndexValue(`${staticZIndex + 1}`),
                    top('0'),
                    left('0'),
                  )}
                  handleClickBackMenu={() => getShow && getShow(false)}
                  customBack
                  title={dataBarBack?.title}
                />
              )}
              {withoutTemplate ? (
                <Div className={cx(classWrapperContent, w100, h100)}>
                  {children}
                </Div>
              ) : (
                <Wrapper
                  maxWidth={
                    !fluid ? (customMaxWidth ? customMaxWidth : MAX_WIDTH) : ''
                  }
                  className={cx(
                    {
                      [h90]: fluid,
                      [dNone]: !isOpen && type !== 'form' && type !== 'slideUp',
                      ['margin']: !!margin,
                      [mx3]: !margin,
                    },
                    color(baseColor),
                    zIndexValue(`${staticZIndex}`),
                    overflowHidden,
                    px0,
                  )}
                >
                  <Card
                    rounded
                    paddingValue={`${padding}`}
                    className={cx(
                      {
                        [h100]: fluid,
                        [height('90vh')]: type === 'form',
                        [borderRadiusAll('25px 25px 0px 0px')]:
                          type === 'form' || type === 'slideUp',
                      },
                      color('inherit'),
                    )}
                  >
                    <div
                      className={`${h100} ${positionRelative} ${overflowHidden}`}
                    >
                      {children}
                    </div>
                  </Card>
                </Wrapper>
              )}
            </Div>
          </StyledDialog>
        </>
      ) : (
        <span />
      )}
    </div>
  );
};

export default Dialog;
