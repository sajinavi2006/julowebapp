import navlog from "./navlog";
export default (label, value, page) => {
  const action = `Typed in: "${label}", typed text: ${value}`;
  const obj = navlog.mappingObj(page, action);
  navlog.save(obj);
};
