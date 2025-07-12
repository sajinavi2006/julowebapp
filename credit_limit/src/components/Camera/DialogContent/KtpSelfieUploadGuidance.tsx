import { cx } from '@emotion/css';

import { Div } from 'assets/css/styled';
import {
  background,
  borderBottom,
  color,
  fontSize,
  fontWeight,
  height,
  widthHeight,
} from 'assets/css/stylesValue';
import {
  mb3,
  mx3,
  my3,
  positionAbsolute,
  positionRelative,
  translateCenter,
  w100,
} from 'assets/css/stylesFix';

import imgGuidance from 'assets/img/selfie_guid.png';

const KtpUploadGuidance = () => {
  return (
    <>
      <Div className={cx(mb3, borderBottom('1px solid #e0e0e0'))}>
        <Div className={cx(height('25px'), positionRelative)}>
          <div
            className={`${positionAbsolute} ${translateCenter} ${widthHeight(
              '84px',
              '3px',
            )} ${background('#ddd')}`}
          />
        </Div>
        <Div
          className={cx(
            mb3,
            positionRelative,
            color('#5e5e5e'),
            fontSize(14),
            fontWeight('bold'),
          )}
        >
          Petunjuk ambil foto selfie
        </Div>
      </Div>
      <Div padding='0px 24px'>
        <Div className={cx(my3)}>
          <img className={cx(w100)} src={imgGuidance} />
        </Div>
        <Div textAlign='left' className={cx(mx3)}>
          <Div className={cx(mb3, color('#5e5e5e'), fontSize(12))}>
            1. Pastikan wajah dan KTP yang diunggah jelas dan sesuai dengan
            identitas kamu.
          </Div>
          <Div className={cx(mb3, color('#5e5e5e'), fontSize(12))}>
            2. Jangan sampai foto yang diunggah terpotong atau kurang jelas.
          </Div>
          <Div className={cx(mb3, color('#5e5e5e'), fontSize(12))}>
            3. Pastikan untuk pilih Allow, Izinkan atau Setuju pada pop up
            perizinan untuk melanjutkan proses aplikasi
          </Div>
        </Div>
      </Div>
    </>
  );
};

export default KtpUploadGuidance;
