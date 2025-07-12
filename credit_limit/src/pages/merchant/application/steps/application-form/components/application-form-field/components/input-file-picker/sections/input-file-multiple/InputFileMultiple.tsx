import { forwardRef } from 'react';

import { cx } from '@emotion/css';
import { callAllFn } from '@julofinance/web-helpers/dist/fn';

import { FilePicker } from 'new-components/elements';

import { UploadIcon } from '../../components';
import { useHandleRenderFiles } from './usecase';
import { dragDropMultipleListCx } from './styles';
import { InputFileMultipleProps } from './types';

const InputFileMultiple = forwardRef<HTMLDivElement, InputFileMultipleProps>(
  (props, ref) => {
    const {
      onChangeFile,
      onDropFile: onDropFileProps,
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

    const multipleFilesElement = useHandleRenderFiles({
      type,
      controllerValue: value,
      onChangeFile,
      controllerOnChange,
    });

    return (
      <div css={dragDropMultipleListCx} className='input-file-multiple-wrapper'>
        <div className='file-picker-wrapper'>
          <FilePicker
            {...resProps}
            className={cx(
              'drag-drop-cx input-file-multiple',
              isError && 'drag-drop-error',
            )}
            accept={accept}
            disabled={isLoading}
            mode={mode}
            ref={ref}
            onDropFile={callAllFn(onChangeFile, onDropFileProps)}
            onChooseFile={callAllFn(onChangeFile, onChooseFileProps)}
          >
            <UploadIcon type={type} isLoading={isLoading} />
          </FilePicker>
        </div>
        {multipleFilesElement}
      </div>
    );
  },
);

export default InputFileMultiple;
