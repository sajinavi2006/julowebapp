import parseCurrencytoInt from "@/helper/parseCurrencytoInt.js";
test("parse string 10.090.500 to be int 10090500", () => {
  expect(parseCurrencytoInt("10.090.500")).toBe(10090500);
});
