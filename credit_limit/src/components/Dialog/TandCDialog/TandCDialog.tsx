import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../index.scss';
import ButtonForm from '../../forms/ApplicationButtonForm';
import useGlobalState from 'actions';
import utils from 'utils';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import { Button } from 'assets/css/styled';

interface Props {
  onCancel?: () => void;
}

const TandCDialog: React.FC<Props> = ({ onCancel }) => {
  const [state, actions] = useGlobalState();
  const [enable, setEnable] = useState(true);
  const isMounted = useRef(true);

  const handleClose = () => {
    actions.setState('isTandCDialogOpen', false);
    actions.setState('isReadTerm', false);
    utils.store.set('isTandCDialogOpen', false);
    utils.store.set('isReadTerm', false);
  };

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop <=
      e.currentTarget.clientHeight + 5
    ) {
      if (isMounted.current) {
        setEnable(false);
      }
    }
  };

  const toBottom = () => {
    if (isMounted.current) {
      setEnable(false);
      document
        .getElementById('toBottomTNC')
        ?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Dialog
      open={state.isTandCDialogOpen}
      onClose={handleClose}
      scroll='paper'
      id='tnc-dialog'
    >
      <DialogTitle id='tnc-dialog-title'>
        Mohon baca & scroll kebawah syarat & ketentuan ini hingga selesai agar
        dapat lanjut
      </DialogTitle>
      <DialogContent id='tandc-dialog' onScroll={handleScroll}>
        <div>
          <div
            id='content-scroller'
            style={{ height: '80%', overflowY: 'scroll' }}
            className='tnc-1'
            dangerouslySetInnerHTML={{
              __html: utils.store.get('terms') + '<div id="toBottomTNC"></div>',
            }}
          />
          <a
            className='d-flex align-items-center justify-content-center'
            onClick={toBottom}
            style={{
              position: 'absolute',
              bottom: 60,
              right: 30,
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#00acf0',
              cursor: 'pointer',
            }}
          >
            <ArrowDownwardIcon style={{ color: '#ffffff' }} />
          </a>
        </div>
      </DialogContent>
      <DialogActions>
        <ButtonForm
          color='secondary'
          className='mr-2'
          small={true}
          onClick={() => {
            localStorage.setItem('isReadTerm', 'false');
            actions.setState('isReadTerm', false);
            utils.store.set('isTandCDialogOpen', false);
            utils.store.set('isReadTerm', false);
            setEnable(true);
            actions.setState('isTandCDialogOpen', false);
            if (onCancel) {
              onCancel();
            }
          }}
        >
          &nbsp;&nbsp;&nbsp;&nbsp;Batal&nbsp;&nbsp;&nbsp;&nbsp;
        </ButtonForm>
        <Button
          disabled={enable}
          onClick={() => {
            actions.setState('isReadTerm', true);
            actions.setState('isTandCDialogOpen', false);
          }}
        >
          <div className='w-100'>Lanjutkan</div>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

TandCDialog.propTypes = {
  onCancel: PropTypes.func,
};

export default TandCDialog;
