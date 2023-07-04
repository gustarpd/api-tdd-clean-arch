import { Document } from "../../db/schemas/Document.js";
import { Customer } from "../../db/schemas/Customer.js";
import { connect, disconnect } from "../../helper/mongo-in-memory-server.js";
import { GetAllDocumentsRepository } from "../get-all-document-repository.js";

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
    const customerId = await Customer.create({
        name: "John Doe",
        phone: "875.414.840-59",
        email: "john.example@mail.com",
        address: "123 Main Street",
        cpfCnpj: "875.414.840-59",
        dateOfBirth: "1990-01-01",
        gender: "Male",
        maritalStatus: "Single",
        profession: "Engineer",
        nationality: "Brazilian",
        observations: "Lorem ipsum dolor sit amet"
    })
    const expectedProperties = {
      description: "This is a fake document",
      owner: "John Doe",
      customerId: customerId,
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
