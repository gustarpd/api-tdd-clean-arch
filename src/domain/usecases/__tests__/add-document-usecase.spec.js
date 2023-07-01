import { AddDocumentUseCase } from "../documents/create-document-usecase";

const makeAddDocumentRepositorySpy = () => {
  class AddDocumentRepository {
    async add(document) {
      return this.document;
    }
  }

  const addDocumentRepository = new AddDocumentRepository();
  addDocumentRepository.document = {
    description: "This is a fake document",
    owner: "John Doe",
    url: "https://www.youtube.com/watch?v=qa-4_A2uIOU",
    title: "Fake Document",
  };

  return addDocumentRepository;
};

const makeSut = () => {
  const addDocumentRepository = makeAddDocumentRepositorySpy();
  const sut = new AddDocumentUseCase(addDocumentRepository);
  return {
    sut,
    addDocumentRepository,
  };
};

describe("Add document UseCase", () => {
  test("should return object with property correctly", async () => {
    const { sut, addDocumentRepository } = makeSut();
    expect(await sut.execute({
      description: "This is a fake document",
      owner: "John Doe",
      url: "https://www.youtube.com/watch?v=qa-4_A2uIOU",
      title: "Fake Document",
    })).toEqual(addDocumentRepository.document)
  })
  test("should throw error for invalid URL", async () => {
    const { sut } = makeSut();
    await expect(sut.execute({
      description: "This is a fake document",
      owner: "John Doe",
      url: "invalid-url",
      title: "Fake Document",
    })).rejects.toThrowError('Invalid param: URL')
  })
});
