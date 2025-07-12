import { useCallback, useState } from 'react';

const useCheckLimitFileSize = () => {
  const [fileSizeErrors, setFileSizeErrors] = useState<boolean[]>();

  const validateIsExceedLimitFileSize = useCallback(
    (files: File[], limitFileSize: number) => {
      const result: boolean[] = [];
      files.map((file) => {
        const fileSize = file.size;
        const roundedFileSize = Math.round(fileSize / 1024);
        result.push(roundedFileSize > limitFileSize);
        setFileSizeErrors(result);
      });

      return result;
    },
    [],
  );

  return { fileSizeErrors, validateIsExceedLimitFileSize };
};

export default useCheckLimitFileSize;
