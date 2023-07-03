import { GetDocumentsUseCase } from "../documents/get-all-documents-usecase";

const makeGetDocumentsRepositorySpy = () => {
  class GetDocumentsRepository {
    async find() {
      return this.data;
    }
  }

  const getDocuments = new GetDocumentsRepository();
  return getDocuments;
};

const makeSut = () => {
  const getDocumentsRepository = makeGetDocumentsRepositorySpy();
  const sut = new GetDocumentsUseCase(getDocumentsRepository);
  return {
    sut,
    getDocumentsRepository,
  };
};

describe("GetDocumentsUseCase", () => {
  test("should return an empty message when no documents are found", async () => {
    const { sut, getDocumentsRepository } = makeSut();
    getDocumentsRepository.data = [];
    const result = await sut.execute();
    expect(result).toEqual({ message: "Nenhum documento encontrado." });
  });

  test("should return the list of documents when documents are found", async () => {
    const { sut, getDocumentsRepository } = makeSut();
    getDocumentsRepository.data = [
      {
        owner: "John Doe",
        url: "https://www.youtube.com/watch?v=qa-4_A2uIOU",
        title: "Fake Document 1",
        id: "1",
      },
      {
        owner: "John Doe",
        url: "https://www.youtube.com/watch?v=qa-4_A2uIOU",
        title: "Fake Document 2",
        id: "2",
      },
    ];
    const result = await sut.execute();
    expect(result).toEqual(getDocumentsRepository.data);
  });
  test("should throw error if an error occurs in the repository", async () => {
    const repository = {
      find: jest.fn().mockRejectedValue(new Error("failed to fetch documents")),
    };
    const sut = new GetDocumentsUseCase(repository);

    await expect(sut.execute()).rejects.toThrow(
      new Error("failed to fetch documents")
    );
  });
});
