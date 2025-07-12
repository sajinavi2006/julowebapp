import React from 'react';
import Lazyload from 'components/Lazyload';
import { Props } from './type';

const NotesDialogLazy = React.lazy(
  () =>
    import(/* webpackChunkName: "notes-dialog-component" */ './NotesDialog'),
);

const NotesDialog: React.FC<Props> = (props) => {
  return <Lazyload component={NotesDialogLazy} animationLoading {...props} />;
};

export default NotesDialog;
