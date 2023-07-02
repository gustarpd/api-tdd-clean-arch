import { HttpResponse } from "../../helpers/httpReponse.js";
import { DeleteDocumentController } from '../documents/delete-documente-controller.js'

const makeDeleteDocumentUseCase = () => {
  class DeleteDocumentUseCase {
    async execute(id) {
      return this.data;
    }
  }

  const deleteDocument = new DeleteDocumentUseCase();
  deleteDocument.data = {
    success: true,
    message: "Documento excluído com sucesso.",
  };
  return deleteDocument;
};


const makeSut = () => {
  const deleteDocumentById = makeDeleteDocumentUseCase();
  const sut = new DeleteDocumentController(deleteDocumentById);

  return {
    sut,
    deleteDocumentById,
  };
};

describe("Delete Document controller", () => {
  test("should return a HttpRequest OK if id are provided from handle method", async () => {
    const { sut, deleteDocumentById } = makeSut();
    const request = await sut.handle({ id: "any_id" });
    expect(request).toEqual(deleteDocumentById.data);
  });

  test("should return a HttpRequest 400 badRequest if id are no provided from handle method", async () => {
    const { sut } = makeSut();
    const request = await sut.handle({});
    expect(request.statusCode).toBe(400);
    expect(request.body).toEqual({ error: "Missing param: id" });
  });

  test("should return a HttpRequest 500 InternalError body are no provided", async () => {
    const { sut } = makeSut();
    const request = await sut.handle();
    expect(request.statusCode).toBe(500);
    expect(request).toEqual(HttpResponse.InternalError());
  });

  test("should throw error if error occurs", async () => {
    const deleteDocumentUseCaseStub = {
      execute: jest.fn().mockRejectedValue(new Error("Some error occurred")),
    };
    const sut = new DeleteDocumentController(deleteDocumentUseCaseStub);

    try {
      await sut.handle({ id: "any_id" });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("Some error occurred");
    }
  });

  test("should return a 400 hadRquest if ocurr error when invalid id are provided", async () => {
    const { sut, deleteDocumentById } = makeSut();
    const error = (deleteDocumentById.data = {
      success: false,
      message: "Não foi possivel excluír o documento com o ID fornecido.",
    });
    const request = await sut.handle({ id: "Invalid_id" });
    expect(request).toEqual(error);
  });
});
