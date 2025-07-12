import React from 'react';
import Lazyload from 'components/Lazyload';

interface Props {
    onCancel?: () => void;
  }

const TandCDialogLazy = React.lazy(() =>
  import(
    /* webpackChunkName: "tandCdialog-component" */ './TandCDialog'
  )
);

const TandCDialog: React.FC<Props> = (props) => {
  return (
    <Lazyload component={TandCDialogLazy} animationLoading {...props} />
  );
};

export default TandCDialog;