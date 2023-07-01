import { Document } from "../../db/schemas/Document";
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
    await expect(
      repository.add({
        description: "This is a fake document",
        owner: "John Doe",
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
