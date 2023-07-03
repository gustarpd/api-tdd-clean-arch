import { Document } from "../../db/schemas/Document.js";
import { connect, disconnect } from "../../helper/mongo-in-memory-server.js";
import { CreateCustomerOfficeRepository } from "../create-new-customer-repository.js";

class GetAllDocumentsRepository {
  async getAll() {
    try {
      const documents = await Document.find({});
      return documents;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

describe("add-workspace-repository", () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await disconnect();
  });

  beforeEach(async () => {
    await Document.deleteMany({});
  });

  test("should create a document correctly and return a list", async () => {
    const expectedProperties = {
      description: "This is a fake document",
      owner: "John Doe",
      url: "https://www.youtube.com/watch?v=qa-4_A2uIOU",
      title: "Fake Document",
    };
    await Document.create(expectedProperties);
    const resultDb = new GetAllDocumentsRepository();

    const result = await resultDb.getAll();
    expect(result.length).toBe(1);
  });

  test("should return a list empty if no has document saved", async () => {
    const resultDb = new GetAllDocumentsRepository();
    const result = await resultDb.getAll();
    console.log(result);
    expect(result.length).toBe(0);
  });

  test("should return a list empty if no has document saved", async () => {
    const mockError = new Error("Failed to fetch documents");
    const documentFindMock = jest
      .spyOn(Document, "find")
      .mockRejectedValue(mockError);
    const repository = new GetAllDocumentsRepository();

    await expect(repository.getAll()).rejects.toThrowError(mockError);

    expect(documentFindMock).toHaveBeenCalled();

    documentFindMock.mockRestore();
  });
});
