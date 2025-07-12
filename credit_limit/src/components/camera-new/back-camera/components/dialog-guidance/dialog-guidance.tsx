import { useState } from 'react';

import Dialog from 'components/Dialog';
import { KtpUploadGuidanceCx, SheetBody, SheetHeader } from './styles';

import imgGuidance from 'assets/img/ktp_guidance.png';
import icBottomSheetToggle from 'assets/img/icon/ic-bottom-sheet-toggle.svg';

const KtpUploadGuidance = () => {
  const [show, setShow] = useState(false);

  const handleClickCloseForm = () => {
    setShow(!show);
  };

  return (
    <Dialog
      floating
      name='dialogCamera'
      clickOutside={true}
      padding={`0px 0px 0px 0px`}
      margin={'0px'}
      position={'bottom'}
      getShow={setShow}
      show={show}
      type={'slideUp'}
    >
      <div onClick={() => handleClickCloseForm()}>
        <div className={KtpUploadGuidanceCx}>
          <div className={SheetHeader}>
            <img src={icBottomSheetToggle} className='toggleSheet' />
            <div className='titleSheet'>Petunjuk upload foto KTP</div>
          </div>
          <div className={SheetBody}>
            <img className='imageGuidance' src={imgGuidance} />
            <div className='sheetBodyContent'>
              <div>Petunjuk untuk upload foto KTP</div>
              <div>1. Foto harus jelas dan sesuai.</div>
              <div>2. Pastikan jangan sampai terpotong.</div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default KtpUploadGuidance;
