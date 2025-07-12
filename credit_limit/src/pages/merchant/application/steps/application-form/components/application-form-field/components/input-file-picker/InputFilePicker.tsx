import { forwardRef } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { cx } from '@emotion/css';

import { callAllFn, mergeRefs } from '@julofinance/web-helpers/dist/fn';

import { FieldGroup } from 'new-components/elements';

import useHandleChangeFile from './usecase/use-handle-change-file';
import { InputFilePickerProps } from './types';
import { InputFileMultiple, InputFileSingle } from './sections';
import { inputFilePickerCx } from './styles';

const InputFilePicker = forwardRef<HTMLDivElement, InputFilePickerProps>(
  (props, ref) => {
    const {
      accept,
      isSingle,
      type,
      className,
      error: errorProps,
      filePickerRef = null,
      helperText,
      isInvalid,
      label,
      limitFile,
      limitFileSize,
      mode,
      name,
      onChangeFile: onChangeFileProps,
      onChooseFile: onChooseFileProps,
      onDropFile: onDropFileProps,
      ...resProps
    } = props;

    const { control, setError, clearErrors } = useFormContext();

    const {
      fieldState: { error, invalid },
      field: {
        ref: controllerRef,
        onChange: controllerOnChange,
        value: controllerValue,
        ...resFieldProps
      },
    } = useController({
      name,
      control,
    });

    const { isUploadLoading, onChangeFile } = useHandleChangeFile({
      controllerOnChange,
      isSingle,
      accept,
      limitFile,
      limitFileSize,
      onChangeFile: onChangeFileProps,
      name,
      prevFile: controllerValue,
      setError,
      clearErrors
    });

    const inputFileProps = {
      accept,
      type,
      mode,
      controllerOnChange,
      onChangeFile: onChangeFileProps,
      onChooseFile: callAllFn(onChangeFile, onChooseFileProps),
      value: controllerValue,
      ...resProps,
    };

    const hasError = Boolean(error) || Boolean(errorProps);

    return (
      <FieldGroup
        ref={ref}
        invalid={invalid || isInvalid || hasError}
        error={error || errorProps}
        helperText={helperText}
        className={cx(className, 'dropfile-field-group')}
        label={label}
        css={inputFilePickerCx}
        name={name}
      >
        <div className='input-file-picker-wrapper'>
          {isSingle ? (
            <InputFileSingle
              {...inputFileProps}
              isError={Boolean(errorProps?.message) || Boolean(error?.message)}
              isLoading={isUploadLoading}
              ref={mergeRefs(ref, filePickerRef, controllerRef)}
              {...resFieldProps}
            />
          ) : (
              <InputFileMultiple
                {...inputFileProps}
                isError={Boolean(errorProps?.message) || Boolean(error?.message)}
                isLoading={isUploadLoading}
                onDropFile={callAllFn(onChangeFile, onDropFileProps)}
                ref={mergeRefs(ref, filePickerRef, controllerRef)}
                {...resFieldProps}
              />
            )}
        </div>
      </FieldGroup>
    );
  },
);

export default InputFilePicker;
