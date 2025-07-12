const labels = {
  MTL: "JULO Cicil",
  STL: "JULO Mini"
};
const productType = {
  STL: new Set([20, 21]),
  MTL: new Set([10, 11]),
  laku: new Set([90, 91]),
  ICare: new Set([92, 93]),
  pedeMtl: new Set([101, 102]),
  pedestl: new Set([103, 104]),
  axiata: new Set([94, 95])
};
export default status => {
  for (let i in productType) {
    if (productType[i].has(status)) {
      return {
        type: i,
        label: labels[i] || ""
      };
    }
  }
  return {
    type: "",
    label: ""
  };
};
