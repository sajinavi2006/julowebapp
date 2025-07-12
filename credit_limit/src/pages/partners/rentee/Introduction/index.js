import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTheme } from '@emotion/react';

import { content } from './styles';
import { Button, Card, Divider } from 'assets/css/styled';
import {
  borderNone,
  cursorPointer,
  dFlex,
  flexColumn,
  fontWeight600,
  justifyCenter,
  my3,
  pl3,
  positionAbsolute,
  textUnderline,
  w100,
} from 'assets/css/stylesFix';
import {
  bottom,
  color,
  fontSize,
  minHeight,
  padding,
  zIndex,
} from 'assets/css/stylesValue';

import IconGadget from 'assets/img/icon/ic-rentee_gadget.png';
import IconSales from 'assets/img/icon/ic-rentee_sales.png';
import IconStore from 'assets/img/icon/ic-rentee_store.png';

import Layout from 'components/Layout';
import { Div } from 'assets/css/styled';

const DATA_INTRO = [
  {
    image: IconStore,
    title: 'Mendatangi Gerai Erafone Terdaftar',
    description: 'Silakan mendatang	di gerai erafone terdekat Anda.',
  },
  {
    image: IconSales,
    title: 'Cari Sales Erafone',
    description: 'Cari sales Erafone untuk membantu transaksi Anda.',
  },
  {
    image: IconGadget,
    title: 'Pilih Gadget',
    description: 'Pilih gadget yang Anda inginkan.',
  },
];

const Introduction = () => {
  const theme = useTheme();
  const themeColors = theme?.colors;
  const themeCardPrimary = theme?.cardPrimary;
  const themeText = theme?.text;
  const history = useHistory();

  return (
    <Layout
      barBackType='secondary'
      barBackTitle='Rentee - Ganti HP Kapanpun'
      layoutContainer={{
        padding: '0px',
        height: 'inherit',
        background: themeColors?.backgroundColorPrimaryGradient,
      }}
    >
      <Div height='100%'>
        <div className={`${content}`}>
          <Card
            boxShadow={themeCardPrimary?.boxShadow}
            paddingValue={'24px'}
            styles={{
              borderRadius: '12px',
            }}
          >
            <div
              className={`${fontWeight600} ${fontSize(16)} ${color(
                themeText?.primary
              )}`}
            >
              Syarat melakukan transaksi Rentee dengan JULO
            </div>
            {DATA_INTRO.map((item, index) => (
              <div key={index} className={`${dFlex} ${my3}`}>
                <div>
                  <img
                    src={item.image}
                    alt='Rentee Icon'
                    width='60'
                    height='60'
                  />
                </div>
                <div
                  className={`${dFlex} ${flexColumn} ${justifyCenter} ${pl3} ${color(
                    themeText?.primary
                  )}`}
                >
                  <div className={`${fontWeight600} ${fontSize(14)}`}>
                    {item.title}
                  </div>
                  <div className={`${fontSize(12)}`}>{item.description}</div>
                </div>
              </div>
            ))}
            <div>
              <Button
                fluid
                types='secondary'
                borderColor={theme.buttonOutlinePrimary.borderColor}
                padding={'11px 30px'}
              >
                <div
                  className={`${fontSize(14)} ${fontWeight600}`}
                  onClick={() => history.push("/rentee/store-list", { from: "home" })}
                >
                  Lihat daftar lokasi Erafone
                </div>
              </Button>
            </div>
            <Divider/>
            <div
              className={`${color('#5e5e5e')} ${fontSize(12)} ${fontWeight600}`}
            >
              Dengan klik lanjutkan, Anda telah setuju dengan{' '}
              <span
                onClick={() => history.push("/rentee/rentee-tnc", { from: "home" })}
                className={`${cursorPointer} ${color(
                  theme.colors.link
                )} ${fontSize(12)} ${textUnderline}`}
              >
                Syarat & Ketentuan berikut
              </span>
            </div>
          </Card>
        </div>
        <div
          className={`${w100} ${positionAbsolute} ${dFlex} ${justifyCenter} ${bottom(
            '0px'
          )} ${zIndex(2)} ${padding('24px 15px')}`}
        >
          <Button
            fluid
            className={`${borderNone} ${padding('11px')} ${minHeight(
              48
            )} ${fontSize(16)}`}
            onClick={() => history.push('transaction', { from: 'home' })}
          >
            Lanjutkan
          </Button>
        </div>
      </Div>
    </Layout>
  );
};

export default Introduction;
