import { FC, useState } from 'react';
import {
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Typography,
} from '@material-ui/core';

import { _noop } from '@julofinance/web-helpers/dist/fn';

import { Button } from 'new-components/elements';
import { Arrow, Cross } from 'new-components/shapes';
import { useRGetMasterAgreement } from 'repositories/merchant/loan';
import { LOAN_INACTIVE } from 'pages/merchant/axiata/constants';
import OJK from 'assets/img/OJK.svg';

import { MasterAgreementModalProps } from './types';
import { actionCx, checkboxCx, contentCx, scrollerCx, titleCx } from './styles';
import SuccessModal from './SuccessModal';
import { useRSubmitAgreement } from 'repositories/merchant/loan/mutations';
import LoaderText from 'components/LoaderText';

const MasterAgreementModal: FC<MasterAgreementModalProps> = (props) => {
  const { loanData, onClose = _noop, open } = props;

  const [isBottom, setIsBottom] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { data } = useRGetMasterAgreement({
    loanXid: loanData.loanXid,
    enabled: loanData.loanStatus === LOAN_INACTIVE,
  });

  const { mutate, isLoading } = useRSubmitAgreement({
    onSuccess: () => {
      onClose();
      setIsSuccess(true);
    },
  });

  const masterAgreementData = data?.data ?? '';

  const toView = () => {
    document
      .getElementById('toBottomPrivacy')
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScroll = (element: React.UIEvent<HTMLDivElement>) => {
    if (
      element.currentTarget.scrollHeight - element.currentTarget.scrollTop <=
      element.currentTarget.clientHeight + 10
    ) {
      setIsBottom(true);
    } else {
      setIsBottom(false);
    }
  };

  const handleOnClose = () => {
    onClose();
    setIsChecked(false);
  };

  const handleOnSubmit = () => {
    mutate({
      variables: { isAgreeAgreement: true },
    });
  };

  return (
    <>
      <Dialog maxWidth={'sm'} open={open && !isSuccess}>
        <DialogTitle css={titleCx}>
          <Typography className='modal-title' variant='h6'>
            PERJANJIAN PEMBERIAN PENDANAAN
          </Typography>
          <IconButton onClick={handleOnClose} className='icon-button'>
            <Cross />
          </IconButton>
        </DialogTitle>
        <DialogContent css={contentCx} onScroll={handleScroll}>
          <div
            dangerouslySetInnerHTML={{
              __html: masterAgreementData + `<div id="toBottomPrivacy"></div>`,
            }}
          />
          <br />
          <div css={checkboxCx}>
            <FormControlLabel
              control={<Checkbox onChange={() => setIsChecked(!isChecked)} />}
              label='Saya telah membaca dan menyetujui surat perjanjian di atas'
            />
          </div>

          {!isBottom && (
            <a onClick={toView} css={scrollerCx}>
              <Arrow fill='#306CF7' width={15} height={15} className='arrow' />
              <div className='text-see'>Lihat ke Bawah</div>
            </a>
          )}
        </DialogContent>
        <DialogActions css={actionCx}>
          <Button
            onClick={handleOnSubmit}
            disabled={!isChecked || isLoading}
            fullWidth
          >
            {isLoading ? <LoaderText /> : 'Kirim'}
          </Button>
          <footer>
            <span>Berizin dan Diawasi oleh</span>
            <img src={OJK} />
          </footer>
        </DialogActions>
      </Dialog>

      <SuccessModal open={isSuccess} />
    </>
  );
};

export default MasterAgreementModal;
