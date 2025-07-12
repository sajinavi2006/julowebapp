const isObjectEmpty = (value: Record<string, unknown>): boolean => {
  for (const prop in value) {
    if (value.hasOwnProperty(prop)) {
      return false;
    }
  }
  return true;
};

export default isObjectEmpty;
