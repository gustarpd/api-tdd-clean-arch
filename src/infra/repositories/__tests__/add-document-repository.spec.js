import { Document } from "../../db/schemas/Document";
import { Customer } from "../../db/schemas/Customer";
import { connect, disconnect } from "../../helper/mongo-in-memory-server.js";
import { AddDocumentRepository } from "../add-document-repository";

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

  test("should create a Document correctly", async () => {
    const repository = new AddDocumentRepository();
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
    await expect(
      repository.add({
        description: "This is a fake document",
        owner: "John Doe",
        customerId: customerId,
        url: "https://www.youtube.com/watch?v=qa-4_A2uIOU",
        title: "Fake Document",
      })
    ).resolves.toBeTruthy();
  });

  test("should throw an Error if data are no provided", async () => {
    const repository = new AddDocumentRepository();
    await expect(
      repository.add({})
    ).rejects.toThrow()
  });
});
