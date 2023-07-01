import { Document } from "../../db/schemas/Document.js";
import { connect, disconnect } from "../../helper/mongo-in-memory-server.js";
import { DeleteDocumentRepository } from "../delete-document-repository.js";

describe("Delete Document Repository", () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await disconnect();
  });

  beforeEach(async () => {
    Document.deleteMany({});
  });

  test("should update the Document with the provided data", async () => {
    const sut = new DeleteDocumentRepository();

    const document = await Document.create({
      description: "This is a fake document",
      owner: "John Doe",
      url: "https://www.youtube.com/watch?v=qa-4_A2uIOU",
      title: "Fake Document",
    });

    const result = await sut.deleteById(document._id);
    expect(result.errors).toBeUndefined();
  });

  test("should throw error when invalid id are provided", async () => {
    const sut = new DeleteDocumentRepository();
    await expect(sut.deleteById("nonexistent_id")).rejects.toThrow();
  });
});
