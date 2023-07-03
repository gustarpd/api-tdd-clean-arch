import { GetAllDocumentsController } from "../documents/get-all-documents-controller";

const makeGetAllDocumentRepository = () => {
  class GetAllDocumentsRepository {
    async getAll() {
      return this.data;
    }
  }

  const getAllDocument = new GetAllDocumentsRepository();
  return getAllDocument;
};

class GetAllDocumentsUseCase {
  constructor(getAllDocumentsRepository) {
    this.getAllDocumentsRepository = getAllDocumentsRepository;
  }

  async execute() {
    try {
      const document = await this.getAllDocumentsRepository.getAll();
      if (document.length === 0) {
        return { message: "No documents found" };
      }
      return document;
    } catch (error) {
      throw new Error("some error in database", error);
    }
  }
}
const makeSut = () => {
  const GetAllDocumentsRepository = makeGetAllDocumentRepository();
  const getAllDocumentsUseCase = new GetAllDocumentsUseCase(
    GetAllDocumentsRepository
  );
  const sut = new GetAllDocumentsController(getAllDocumentsUseCase);

  return {
    sut,
    getAllDocumentsUseCase,
    GetAllDocumentsRepository,
  };
};

describe("GetAllDocuments controller", () => {
  test("should return HttpRequest if request succeeds", async () => {
    const { sut, GetAllDocumentsRepository } = makeSut();
    GetAllDocumentsRepository.data = [
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
    const httpRequest = await sut.handle({});
    expect(httpRequest.body).toEqual(GetAllDocumentsRepository.data);
    expect(httpRequest.statusCode).toEqual(200);
  });

  test("should return 400 if no documents are not found", async () => {
    const { sut, GetAllDocumentsRepository } = makeSut();
    GetAllDocumentsRepository.data = [];
    const httpRequest = await sut.handle({});
    expect(httpRequest.body).toEqual({ message: "No documents found" });
  });

  test("should return 400 if no documents are not found", async () => {
    const repository = {
      execute: () => {
        throw new Error("No documents found");
      },
    };
    const sut = new GetAllDocumentsController(repository);
    expect(sut.handle({})).rejects.toThrow(new Error("some error in database"));
  });
});
