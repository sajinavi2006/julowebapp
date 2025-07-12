const isValidFileType = ({
  file,
  allowExtension = [],
}: {
  file: File;
  allowExtension: string[];
}): boolean => {
  const fileName = file?.name?.toLowerCase() ?? '';

  return (
    !!fileName &&
    allowExtension.indexOf(fileName.split('.').pop() as string) > -1
  );
};

export default isValidFileType;
