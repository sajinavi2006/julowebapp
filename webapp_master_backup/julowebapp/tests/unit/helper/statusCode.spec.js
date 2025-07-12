import statusCode from "@/helper/statusCode.js";

test("status code 106 there is in verification", () => {
  expect(statusCode(106)).toBe("verification");
});
