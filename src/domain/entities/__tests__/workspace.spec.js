import { WorkSpace } from "../workspace.js";

describe("WorkSpace", () => {
  const workSpaceData = {
    description: "any_description",
    owner: "any_owner",
    priority: "any_priority",
  };
  test("should create workspace data", () => {
    const workspace = new WorkSpace(workSpaceData);
    expect(workspace).toEqual({
      description: "any_description",
      owner: "any_owner",
      priority: "any_priority",
    });
  });
});
