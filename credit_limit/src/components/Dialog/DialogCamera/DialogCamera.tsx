import React, { useState } from 'react';

import { cursorPointer, textCenter } from 'assets/css/stylesFix';
import Dialog from '..';

interface Props {
  data?: {
    content?: React.ReactNode;
  };
}

const DialogCamera: React.FC<Props> = ({ data }) => {
  const [show, setShow] = useState(false);

  const handleClickCloseForm = () => {
    setShow(!show);
  };

  return (
    <Dialog
      floating
      name='dialogCamera'
      baseColor={`#000`}
      clickOutside={true}
      padding={`0px 0px 24px 0px`}
      margin={'0px'}
      position={'bottom'}
      getShow={setShow}
      show={show}
      type={'slideUp'}
    >
      <div
        className={`${textCenter} ${cursorPointer}`}
        onClick={() => handleClickCloseForm()}
      >
        {data?.content}
      </div>
    </Dialog>
  );
};

export default DialogCamera;
