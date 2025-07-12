import { useEffect, useState } from 'react';
import { ControllerRenderProps, UseControllerReturn } from 'react-hook-form';

import { _noop } from '@julofinance/web-helpers/dist/fn';

import {
  ApplicationFile,
  useRDeleteSingleDocument,
} from 'repositories/merchant/application';
import { CrossCircle, DocumentIcon } from 'new-components/shapes';

import { InputFilePickerProps } from '../../../types';

interface UseHandleRenderFilesProps {
  controllerOnChange: UseControllerReturn['field']['onChange'];
  onChangeFile?: InputFilePickerProps['onChangeFile'];
  controllerValue: ControllerRenderProps['value'];
  type: InputFilePickerProps['type'];
}

const useHandleRenderFiles = (props: UseHandleRenderFilesProps) => {
  const {
    type,
    controllerValue,
    controllerOnChange,
    onChangeFile: onChangeFileProps = _noop,
  } = props;

  const [imageId, setImageId] = useState<number>();

  const { mutate, isLoading, isSuccess } = useRDeleteSingleDocument();

  useEffect(() => {
    if (!isSuccess) return;

    const filteredFiles = controllerValue.filter(
      (el: { id: number }) => el.id != imageId,
    );

    controllerOnChange(filteredFiles);
    onChangeFileProps(filteredFiles);
  }, [isSuccess]);

  const handleDeleteImages = (id: number) => {
    if (isLoading) return;
    mutate({ variables: { imageId: id } });
    setImageId(id);
  };

  const content = controllerValue?.map((data: ApplicationFile) => (
    <div key={data.id} className='image-upload-wrapper'>
      {type === 'image' ? (
        <img className='image-upload-file' src={data.url}></img>
      ) : (
          <>
            <div className='document-upload-file'>
              <DocumentIcon />
              <span className='document-upload-text'>{data.fileName}</span>
            </div>
          </>
        )}
      <CrossCircle
        onClick={() => handleDeleteImages(data.id)}
        className='icon-delete'
      />
    </div>
  ));

  return content;
};

export default useHandleRenderFiles;
