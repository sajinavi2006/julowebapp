import deleteErrorBagManual from "@/helper/deleteErrorBagManual.js";
test("delete error bag in $error manually", () => {
  var field = "nama lengkap";
  var scope = "personalDataForm";
  var leftover = { field: "tanggal lahir", scope };
  var errors = [{ field, scope }, leftover];

  expect(deleteErrorBagManual(field, scope, errors)).toEqual([leftover]);
});
