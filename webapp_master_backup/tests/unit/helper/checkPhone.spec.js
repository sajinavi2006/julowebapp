"";
import checkPhone from "@/helper/checkPhone.js";

test("check 0214806289 is valid phone number", () => {
  expect(checkPhone("0214806289")).toBe(true);
});
test("check 075111111 is valid phone number", () => {
  expect(checkPhone("075111111")).toBe(true);
});

test("check 1234567 is not valid phone number", () => {
  expect(checkPhone("1234567")).toBe(false);
});
