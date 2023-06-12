import { WorkSpace } from "../../db/schemas/Workspace";
import { connect, disconnect } from "../../helper/mongo-in-memory-server";

describe("add-workspace-repository", () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await disconnect();
  });

  beforeEach(async () => {
    await WorkSpace.deleteMany({});
  });

  test("should create a workspace correctly", async () => {
    const workspace = new WorkSpace({
      description: "any",
      priority: "any",
      owner: "any",
    });

    expect(workspace).toBeDefined();
    expect(workspace.description).toBe("any");
    expect(workspace.priority).toBe("any");
    expect(workspace.owner).toBe("any");
  });

  test("should throw an error if required fields are missing", async () => {
    const workspace = new WorkSpace({});
    await expect(workspace.save()).rejects.toThrow();
  });

  test("should handle errors during workspace creation", async () => {
    jest.spyOn(WorkSpace.prototype, "save").mockImplementationOnce(() => {
      throw new Error("Database connection error");
    });

    const workspace = new WorkSpace({
      description: "any",
      priority: "any",
      owner: "any",
    });

    try {
      await workspace.save();
    } catch (error) {
      expect(error.message).toBe("Database connection error");
    }
  });
});
