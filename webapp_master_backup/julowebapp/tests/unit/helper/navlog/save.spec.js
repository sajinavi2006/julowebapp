import save from "@/helper/navlog/save.js";
test("check navlog already save in localstorage", () => {
  const data = {
    action: "Screen opened",
    nav_log_ts: "2019-05-03T09:05:57.690Z",
    page_id: "FormBiodataFragment"
  };
  save(data);
  const navlogs = JSON.parse(localStorage.navlog);
  expect(navlogs[navlogs.length - 1]).toEqual(data);
});
