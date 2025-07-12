import navlogObj from "@/helper/navlog/navlogObj.js";
test("check navlog object", () => {
  var page_id = "PreSignupFragment";
  var action = "action";
  expect(navlogObj("signup", action)).toEqual(
    expect.objectContaining({ page_id, action })
  );
});
