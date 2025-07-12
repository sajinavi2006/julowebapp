import { useCallback, useState } from 'react';

const useCheckLimitFile = () => {
  const [isErrorExceedLimitFile, setIsErrorExceedLimitFile] = useState(false);

  const validateIsExceedLimitFile = useCallback(
    (fileLength: number, limitFile: number) => {
      const result = fileLength > limitFile;
      setIsErrorExceedLimitFile(result);
      return result;
    },
    [],
  );

  return { isErrorExceedLimitFile, validateIsExceedLimitFile };
};

export default useCheckLimitFile;
