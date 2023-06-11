import { WorkSpace } from "../../db/schemas/Workspace";
import {
  connect,
  disconnect,
} from "../../helper/mongo-in-memory-server";

describe("", () => {
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
});
