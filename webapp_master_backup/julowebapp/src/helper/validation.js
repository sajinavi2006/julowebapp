export const required = (data, name) => {
  if (!data) {
    return `${name} is required`;
  }
  return true;
};
