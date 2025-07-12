import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import useGlobalState from 'actions';
import utils from 'utils';
import { Button } from 'assets/css/styled';
import { mt3 } from 'assets/css/stylesFix';
import { DialogBackground, StyledDialogTnC } from '../styles';
import { Card, Wrapper } from 'assets/css/styled';
import { zIndex as zIndexValue } from 'assets/css/stylesValue';
import { MAX_WIDTH, MIN_WIDTH, Z_INDEX_DIALOG } from 'constant';
import logoNoteFirstLoad from 'assets/img/il_fraud_1.svg';
import {
  h100,
  h90,
  mx3,
  overflowHidden,
  positionRelative,
  px0,
} from 'assets/css/stylesFix';
import Analytics from 'utils/Analytics/Analytics';

import { Props } from './type';

const NotesDialog: React.FC<Props> = ({ settingLongForm }) => {
  const [state, actions] = useGlobalState();
  const [isMounted, setIsMounted] = useState(false);
  const staticZIndex = Z_INDEX_DIALOG;
  const showNotesDialog = state.isNotesDialog;

  React.useEffect(() => {
    const hitAnalytics = () => {
      if (showNotesDialog) {
        Analytics.logEvent({
          title: 'identity_popup',
          eventName: 'permission_popup_shown',
        });
      }
    };
    if (isMounted) {
      hitAnalytics();
    }
  }, [isMounted]);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Dialog
      open={showNotesDialog || false}
      onClose={() => actions.setState('isNotesDialog', false)}
    >
      <div>
        <DialogBackground
          style={{ borderRadius: '0px!important' }}
          zIndex={staticZIndex - 1}
        />
        <StyledDialogTnC
          maxWidth={MAX_WIDTH}
          minWidth={MIN_WIDTH}
          position='center'
          type={'default'}
          zIndex={staticZIndex}
        >
          <Wrapper
            maxWidth={MAX_WIDTH}
            className={`${overflowHidden} ${h90} ${px0} ${mx3} ${zIndexValue(
              staticZIndex,
            )}`}
          >
            <Card rounded paddingValue='0px 0px' className={`${h100}}`}>
              <div className={`${h100} ${positionRelative} ${overflowHidden}`}>
                <div className='d-flex align-items-center justify-content-center flex-column p-5'>
                  <img src={logoNoteFirstLoad} alt='Image Note' />

                  <h4 className={`blueColor ${mt3}`}>
                    {settingLongForm?.guidancePopup?.title ?? 'Perhatian'}
                  </h4>
                  <span>
                    {settingLongForm?.guidancePopup?.message ??
                      'Pastikan Anda sudah berusia 21+ tahun, tinggal di Indonesia, dan memiliki penghasilan minimum Rp 2.000.000'}
                  </span>
                  <Button
                    className='mt-3'
                    fluid
                    onClick={() => {
                      Analytics.logEvent({
                        title: 'identity_popup',
                        eventName: 'permission_popup_button_clicked',
                      });

                      utils.store.set('approveNote', true);
                      actions.setState('isNotesDialog', false);
                    }}
                  >
                    <div className='w-100'>Lanjutkan</div>
                  </Button>
                </div>
              </div>
            </Card>
          </Wrapper>
        </StyledDialogTnC>
      </div>
    </Dialog>
  );
};

export default NotesDialog;
