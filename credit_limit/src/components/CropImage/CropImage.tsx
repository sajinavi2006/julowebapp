import React, { useRef, useState } from 'react';
import ReactCrop from 'react-image-crop';
import { Props } from './type';

const CropImage: React.FC<Props> = ({ setImage }) => {
  const [finishResizeCrop, setFinishResizeCrop] = useState(false);
  const [crop, setCrop] = useState<ReactCrop.Crop>({
    unit: '%',
    width: 100,
    height: 70,
    aspect: 16 / 9,
  });
  const imgRef = useRef(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const submitPhoto = async () => {
    const ctx = previewCanvasRef.current;
    const result = ctx && ctx.toDataURL('image/png', 1);

    setImage(result || '');
    setFinishResizeCrop(false);
  };

  const getResizedCanvas = (e: ReactCrop.Crop) => {
    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    setCrop(e);

    if (image && canvas) {
      const scaleX = image['naturalWidth'] / image['width'];
      const scaleY = image['naturalHeight'] / image['height'];
      const ctx = canvas.getContext('2d');
      const pixelRatio = window.devicePixelRatio;

      canvas.width = crop.width || 100 * pixelRatio;
      canvas.height = crop.height || 70 * pixelRatio;

      if (ctx) {
        ctx?.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(
          image,
          crop.x || 0 * scaleX,
          crop.y || 0 * scaleY,
          crop.width || 100 * scaleX,
          crop.height || 70 * scaleY,
          0,
          0,
          crop.width || 0,
          crop.height || 0,
        );
      }
    }

    setFinishResizeCrop(true);
    submitPhoto();
  };

  return (
    <>
      <canvas
        style={{
          opacity: 0,
          position: 'absolute',
          zIndex: -999,
          bottom: '100%',
        }}
        ref={previewCanvasRef}
      />
      {!finishResizeCrop && (
        <ReactCrop
          style={{
            opacity: 0,
            position: 'absolute',
            zIndex: 0,
            bottom: '100%',
          }}
          disabled
          onChange={(c: ReactCrop.Crop) => setCrop(c)}
          onComplete={(c) => getResizedCanvas(c)}
          src=''
        />
      )}
    </>
  );
};

export default CropImage;
