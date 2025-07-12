import scrollNavlog from "@/helper/navlog/scrollNavlog.js";
test("check navlog already scrollNavlog in localstorage", () => {
  const data = {
    action: "Screen scrolled 52 of 180, 29%, screen height: 692",
    page_id: "FormSectionFragment"
  };
  scrollNavlog("formHead", 52.30769348144531, 872, 692);
  const navlogs = JSON.parse(localStorage.navlog);
  expect(navlogs[navlogs.length - 1]).toEqual(expect.objectContaining(data));
});
