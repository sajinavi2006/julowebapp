import filterTypeByKey from "@/helper/navlog/filterTypeByKey.js";
test("check action for navlog", () => {
  expect(filterTypeByKey("companiesSearch", "julo")).toBe(
    'List : "company_name", clicked item: julo'
  );
});
