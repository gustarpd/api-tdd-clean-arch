import { connect, disconnect } from "../../helper/mongo-in-memory-server";
import { WorkSpace } from "../../db/schemas/Workspace";
import { DeleteWorkSpaceRespository } from "../delete-workspace-repository";

describe("Testes de exclusão de documento", () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await disconnect();
  });

  test("Should delete By Id", async () => {
    const newDocument = new WorkSpace({
      description: "any_description",
      owner: "any_owner",
      priority: "any_priority",
    });
    const deleteByIdRepository = new DeleteWorkSpaceRespository();
    await newDocument.save();
    const deletedDocument = await deleteByIdRepository.deleteById(
      newDocument._id
    );
    expect(deletedDocument.errors).toBeUndefined();
  });

  test("Should throw Errror", async () => {
    try {
    const deleteByIdRepository = new DeleteWorkSpaceRespository();
    await deleteByIdRepository.deleteById();
    } catch (error) {
      expect(error).toBeUndefined()
      console.log(error)
    }
  });
});
