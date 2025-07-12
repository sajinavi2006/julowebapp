import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import component from "@/components/shared/NavigationBar";

describe("NavigationBar", function() {
  console.log(component);
  it("page loads", () => {
    expect(typeof component.created).to.equal("function");
  });
});
