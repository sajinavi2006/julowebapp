import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../../../assets/css/styled';

import { mb3, mb4, mt4, textCenter } from '../../../assets/css/stylesFix';
import { color, fontSize, fontWeight } from '../../../assets/css/stylesValue';

import Dialog from '../../../components/Dialog';

const DialogInfo = ({
  clickOutside,
  customMaxWidth,
  dialogData,
  handleClickDialogButton,
  handleShowDialogInfo,
  showDialogInfo,
}) => {
  return (
    <Dialog
      baseColor={`#000`}
      clickOutside={clickOutside}
      padding={`24px 24px`}
      getShow={handleShowDialogInfo}
      customMaxWidth={customMaxWidth}
      show={showDialogInfo}
    >
      <div className={`${textCenter}`}>
        {dialogData?.dialog?.img && (
          <img
            src={dialogData?.dialog?.img}
            className={`${mb4}`}
            width='120'
            height='55'
          />
        )}
        <div
          className={`${mb3} ${color('#1ea7e9')} ${fontSize(16)} ${fontWeight(
            'bold'
          )}`}
        >
          {dialogData?.dialog?.title?.text}
        </div>
        <div className={`${color('#5e5e5e')} ${fontSize(12)}`}>
          {dialogData?.dialog?.message?.text}
        </div>

        {dialogData?.dialog?.button?.text ? (
          <Button
            fluid
            backgroundColor={`#1ea7e9`}
            padding={`11px`}
            className={`${mt4} ${fontSize(12)}`}
            onClick={() =>
              handleClickDialogButton(
                dialogData?.dialog?.button?.action,
                dialogData?.dialog?.button?.url
              )
            }
          >
            {dialogData?.dialog?.button?.text}
          </Button>
        ) : null}
      </div>
    </Dialog>
  );
};

DialogInfo.propTypes = {
  clickOutside: PropTypes.bool,
  customMaxWidth: PropTypes.number,
  dialogData: PropTypes.object,
  handleClickDialogButton: PropTypes.func,
  handleShowDialogInfo: PropTypes.func,
  showDialogInfo: PropTypes.bool,
};

Dialog.defaultProps = {
  clickOutside: true,
  showDialogInfo: false,
};

export default DialogInfo;
