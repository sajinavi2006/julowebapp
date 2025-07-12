import navlog from "./index";
export default (page, scrolledPixel, maxPixel, clientHeight) => {
  const action = `Screen scrolled ${parseInt(scrolledPixel)} of ${maxPixel -
    clientHeight}, ${parseInt(
    (scrolledPixel / (maxPixel - clientHeight)) * 100
  )}%, screen height: ${clientHeight}`;
  const obj = navlog.mappingObj(page, action);
  navlog.save(obj);
};
