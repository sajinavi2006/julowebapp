import { ChangeEvent, useState } from 'react';

interface UseFileChangeProps {
  onChange: (data?: File) => void;
  onChangeController: (...event: File[]) => void;
}

const useFileChange = ({
  onChange,
  onChangeController,
}: UseFileChangeProps) => {
  const [selectedName, setSelectedName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File>();

  const handleOnFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      const file = files[0];

      setSelectedFile(file);
      setSelectedName(file.name);

      onChangeController(file);
      onChange(file);
    }
  };

  const handleOnFileRemove = () => {
    setSelectedFile(undefined);
    setSelectedName('');

    onChangeController();
    onChange();
  };

  return {
    handleOnFileChange,
    handleOnFileRemove,
    selectedName,
    selectedFile,
  };
};

export default useFileChange;
