export default data => {
  const currencyRegex = /^(([1-9]\d{0,2}(\.\d{3})*)|0)$/;
  if (typeof data === "string" && data.match(currencyRegex)) {
    data = parseInt(data.split(".").join(""));
  }
  return data;
};
