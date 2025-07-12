import getConstantByKey from "@/helper/navlog/getConstantByKey.js";
test("check ownership is mapped to vehicle_ownership_1 ", () => {
  expect(getConstantByKey("ownership")).toBe("vehicle_ownership_1");
});
