import { WorkSpace } from "../../db/schemas/Workspace";
import { connect, disconnect } from "../../helper/mongo-in-memory-server";
import { EditWorkspaceRepository } from "../edit-workspace-repository";

const makeSut = () => {
  const updateAccessTokenRepository = new EditWorkspaceRepository();
  return {
    updateAccessTokenRepository,
  };
};

describe("UpdateAccessToken Repository", () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await disconnect();
  });

  beforeEach(async () => {
    WorkSpace.deleteMany({});
  });

  it("should update the workspace with the provided data", async () => {
    const { updateAccessTokenRepository } = makeSut();

    const workspace = await WorkSpace.create({
      description: "any_description",
      owner: "any_owner",
      priority: "any_priority",
    });

    const result = await updateAccessTokenRepository.edit({
      taskId: workspace.id,
      description: "New description",
      owner: "New owner",
      priority: "New priority",
    });
    
    expect(result).toHaveProperty("modifiedCount");
    expect(result.modifiedCount).toBe(1);
  });
});
