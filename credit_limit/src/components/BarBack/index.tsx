import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { cx } from '@emotion/css';
import { useTheme } from '@emotion/react';
import { useOuterClick } from 'hooks';

import themeDefault from 'themes/Partner/default';
import { BarBackStyled } from './styles';
import { ml3 } from 'assets/css/stylesFix';
import {
  background,
  borderBottom as borderBottomValue,
  color as colorText,
  fontSize,
  fontWeight,
  padding,
} from 'assets/css/stylesValue';
import { Div } from 'assets/css/styled';

import listMenuIcon from 'assets/img/icon/ic-menu_3_dots.webp';
import { cursorPointer } from 'assets/css/stylesFix';
import { text } from 'assets/css/stylesValue';
import { Divider } from 'assets/css/styled';

import { ActionsMenu, BarBackProps } from './types';

const BarBack = ({
  classBarBack,
  customBack = false,
  title,
  goTo,
  color = themeDefault.helperBar.color,
  backgroundColor = themeDefault.helperBar.backgroundColor,
  img = themeDefault.helperBar.iconBack,
  listMenuImage = listMenuIcon,
  borderBottom = themeDefault.helperBar.borderColor,
  withNavbar = true,
  disableRedirect,
  hideImage,
  type,
  actions,
  handleClickBackMenu,
  handleClickActionsMenu,
}: BarBackProps) => {
  const history = useHistory();
  const theme = useTheme();
  const themeBarPrimary = theme.helperBarPrimary;
  const themeBarSecondary = theme?.helperBarSecondary;
  const themeColors = theme?.colors;
  const themeText = theme?.text;
  const [image, setImage] = useState(img);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    switch (type) {
      case 'primary':
        setImage(themeBarPrimary?.iconBack);
        break;
      case 'secondary':
        setImage(themeBarSecondary?.iconBack);
        break;
      default:
        setImage(img);
        break;
    }
  }, [type, theme, actions, img]);

  // dropdownRef will be called if user click outside dropdown
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const menuRef: any = useOuterClick(() => {
    setIsShow(false);
  });

  const handleClick = () => {
    if (customBack) {
      if (handleClickBackMenu) {
        handleClickBackMenu();
      }
    } else {
      if (goTo) {
        return history.push(goTo);
      } else if (history.length > 2) {
        return history.goBack();
      }
    }
  };

  const handleClickMenu = (value: ActionsMenu) => {
    if (handleClickActionsMenu) {
      handleClickActionsMenu(value);
    }
    setIsShow((prev) => !prev);
  };

  const renderMenu = () => {
    switch (actions?.type) {
      case 'list':
        return (
          <Div ref={menuRef}>
            <img
              className={`${cursorPointer}`}
              src={listMenuImage}
              onClick={() => setIsShow((prev) => !prev)}
            />
            {isShow ? (
              <Div
                rounded
                position='fixed'
                right='20px'
                boxShadow={themeColors?.boxShadow}
                background={themeColors?.white}
                className={`${text({ size: 12, color: themeText?.primary })}`}
                style={actions?.menuStyle}
              >
                {actions?.menu.map((item: ActionsMenu, index: number) => (
                  <Div key={index} margin='0px 8px'>
                    {index % 2 ? <Divider margin='0px' /> : null}
                    <Div
                      padding='5px 0px'
                      cursor='pointer'
                      onClick={() => handleClickMenu(item)}
                    >
                      {item.text}
                    </Div>
                  </Div>
                ))}
              </Div>
            ) : null}
          </Div>
        );
      case 'button':
        return actions?.menu.map((item, index) => (
          <Div key={index} margin='0px 8px'>
            <Div cursor='pointer' onClick={() => handleClickMenu(item)}>
              {item.text}
            </Div>
          </Div>
        ));
      default:
        return null;
    }
  };

  return (
    <div
      className={cx(
        {
          [padding('0px')]: !withNavbar,
        },
        classBarBack,
        'barback-container',
      )}
    >
      <BarBackStyled
        className={cx(
          background(backgroundColor),
          {
            [background(themeBarPrimary?.backgroundColor)]: type === 'primary',
            [borderBottomValue(`1px solid ${themeBarPrimary?.borderColor}`)]:
              type === 'primary',
            [background(themeBarSecondary?.backgroundColor)]:
              type === 'secondary',
            [borderBottomValue(`1px solid ${themeBarSecondary?.borderColor}`)]:
              type === 'secondary',
          },
          borderBottomValue(`1px solid ${borderBottom}`),
        )}
      >
        <Div
          fluid
          display='flex'
          alignItems='center'
          justifyContent='space-between'
        >
          <Div
            display='flex'
            alignItems='center'
            cursor={!disableRedirect ? 'pointer' : ''}
            onClick={() => !disableRedirect && handleClick()}
          >
            {!hideImage ? (
              <div>
                <img src={image} alt='Back Button' width='14' height='15' />
              </div>
            ) : null}
            <div
              className={`${cx(
                {
                  [colorText(themeBarPrimary?.color)]: type === 'primary',
                  [colorText(themeBarSecondary?.color)]: type === 'secondary',
                  [colorText(color)]: !type,
                },
                `${ml3} ${fontWeight('bold')}`,
              )} ${fontSize(14, 'fixed')}`}
            >
              {title}
            </div>
          </Div>
          <Div>{renderMenu()}</Div>
        </Div>
      </BarBackStyled>
    </div>
  );
};

export default BarBack;
