import { connect, disconnect } from "../../helper/mongo-in-memory-server";
import { WorkSpace } from "../../db/schemas/Workspace";

class GetAllTasksRepository {
  async findAll() {
    try {
      const documents = await WorkSpace.find({});
      return documents;
    } catch (err) {
      throw err;
    }
  }
}

const makeSut = () => {
  const sut = new GetAllTasksRepository();
  return {
    sut,
  };
};

describe("LoadUserByEmail Repository", () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await disconnect();
  });

  beforeEach(async () => {
    await WorkSpace.deleteMany({});
  });

  test("should return a defined result when documents are present", async () => {
    const { sut } = makeSut();
    await WorkSpace.create({
      description: "any",
      owner: "any",
      priority: "any",
    });
    expect(await sut.findAll()).toBeDefined();
  });
  test("should throw an error when no document is found", async () => {
    const { sut } = makeSut();
    await WorkSpace.create();
    expect(sut.findAll()).rejects.toThrow();
  });
});
