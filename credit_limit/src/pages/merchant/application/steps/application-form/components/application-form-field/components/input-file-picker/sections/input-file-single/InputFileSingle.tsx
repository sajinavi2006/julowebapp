import { forwardRef } from 'react';

import { callAllFn } from '@julofinance/web-helpers/dist/fn';
import { cx } from '@emotion/css';

import { FilePicker } from 'new-components/elements';
import { CrossCircle } from 'new-components/shapes';
import { useRDeleteSingleDocument } from 'repositories/merchant/application';

import { UploadIcon } from '../../components';
import { dragDropSingleListCx } from './styles';
import { InputFileSingleProps } from './types';

const InputFileSingle = forwardRef<HTMLDivElement, InputFileSingleProps>(
  (props, ref) => {
    const {
      onChangeFile,
      onChooseFile: onChooseFileProps,
      controllerOnChange,
      type,
      value,
      mode,
      accept,
      isError,
      isLoading,
      ...resProps
    } = props;

    const { isLoading: isDeleteDocumentLoading, mutate } = useRDeleteSingleDocument({
      onSuccess: () => {
        controllerOnChange();
      },
    });

    const handleDelete = () => {
      if (isDeleteDocumentLoading) return;
      mutate({ variables: { imageId: value.id } });
    };

    return (
      <div css={dragDropSingleListCx} className='input-file-single'>
        {value && Boolean(value.url) ? (
          type === 'image' ? (
            <div className='input-image-show'>
              <img className='input-single-image-preview' src={value.url} />
              <CrossCircle
                onClick={handleDelete}
                className='icon-delete'
              />
            </div>
          ) : (
              <></>
            )
        ) : (
            <FilePicker
              {...resProps}
              className={cx('drag-drop-cx', isError && 'drag-drop-error')}
              accept={accept}
              mode={mode}
              disabled={isLoading}
              ref={ref}
              onChooseFile={callAllFn(onChangeFile, onChooseFileProps)}
            >
              <UploadIcon type={type} isLoading={isLoading} />
            </FilePicker>
          )}
      </div>
    );
  },
);

export default InputFileSingle;
