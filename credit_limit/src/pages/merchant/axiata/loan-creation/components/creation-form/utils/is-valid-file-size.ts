const isValidFileSize = ({
  file,
  maxSize,
}: {
  file: File;
  maxSize: number;
}): boolean => file && file.size <= maxSize;

export default isValidFileSize;
