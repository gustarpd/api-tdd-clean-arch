import { CustomerOffice } from "../clients-office.js";
import { Document } from "../document.js";

describe("Document Office", () => {
  test("should return Document object", () => {
    const fakeData = {
      description: "This is a fake document",
      owner: "John Doe",
      url: "https://example.com/fake-document",
      title: "Fake Document",
    };
    const document = Document.create(fakeData);
    for (const iterator in document) {
      expect(document).toHaveProperty(iterator);
    }
  });

  test("should throw ParamError if url is invalid", () => {
    const fakeData = {
      description: "This is a fake document",
      owner: "John Doe",
      url: "invalid-url",
      title: "Fake Document",
    };
    expect(() => Document.create(fakeData)).toThrowError("Invalid param: URL");
  });
});
