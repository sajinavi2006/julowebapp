import { FC, useState } from 'react';
import { useHistory, } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent } from '@material-ui/core';

import { Button } from 'new-components/elements';
import { LoanSuccess } from 'new-components/shapes';

import { TitleText, DescriptionText } from '../loan-detail-texts';

import { SuccessModalProps } from './types';
import { successContentCx } from './styles';

const SuccessModal: FC<SuccessModalProps> = ({ open }) => {
    const [isButtonClicked , setIsButtonClicked] = useState(false);
  const history = useHistory();

  const handleOnButtonClick = () => {
    setIsButtonClicked(true);

    history.go(0);
  };

  return (
    <Dialog maxWidth={'md'} open={open && !isButtonClicked}>
      <DialogContent css={successContentCx}>
        <LoanSuccess />
        <TitleText>Surat Perjanjian Berhasil Dikirim</TitleText>
        <DescriptionText>
          Surat perjanjianmu akan diverifikasi dulu <br/> oleh tim JULO, ya.
        </DescriptionText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOnButtonClick} fullWidth>
          Lanjut
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SuccessModal;
