import { uploadIconCx } from './styles';
import { UploadIconProps } from './types';
import { PlusCircle } from 'new-components/shapes';

const UploadIcon = (props: UploadIconProps) => {
  const { isLoading, type } = props;

  return (
    <div css={uploadIconCx} className='upload-icon'>
      {isLoading ? (
        <p>Uploading...</p>
      ) : (
        <>
          <PlusCircle />
          <p>Upload {type === 'image' ? 'Gambar' : 'Dokumen'}</p>
        </>
      )}
    </div>
  );
};

export default UploadIcon;
