import { trusted } from "mongoose";
import { DeleteCustomerUseCase } from "../customer-office/delete-customer-usecase.js";

const makeDeleteDocumentRepository = () => {
  class DeleteDocumentRepository {
    async deleteById(id) {
      return this.deletedDocument;
    }
  }

  const deletedDocument = new DeleteDocumentRepository();
  deletedDocument.deletedDocument = { deletedCount: 1 };
  return deletedDocument;
};

class DeleteDocumentUseCase {
  constructor(deleteDocumentRepository) {
    this.deleteDocumentRepository = deleteDocumentRepository;
  }

  async execute(id) {
    try {
      const deleteDocumentById = await this.deleteDocumentRepository.deleteById(
        id
      );
      if (deleteDocumentById.deletedCount === 1) {
        return { success: true, message: "Documento excluído com sucesso." };
      }
      return { success: false, message: "falha ao excluír o documento." };
    } catch (error) {
      throw new Error(error);
    }
  }
}

const makeSut = () => {
  const deleteDocumentRepository = makeDeleteDocumentRepository();
  const sut = new DeleteDocumentUseCase(deleteDocumentRepository);
  return {
    sut,
    deleteDocumentRepository,
  };
};

describe("Delete Documente UseCase", () => {
  test("should return message and success true when document are deleted", async () => {
    const { sut } = makeSut();
    expect(await sut.execute("any_id")).toEqual({
      success: true,
      message: "Documento excluído com sucesso.",
    });
  });

  test("should return message and success:false when document does not are deleted", async () => {
    const { sut, deleteDocumentRepository } = makeSut();
    deleteDocumentRepository.deletedDocument = { deletedCount: 0 };
    expect(await sut.execute("any_id")).toEqual({
      success: false,
      message: "falha ao excluír o documento.",
    });
  });

  test("should throw an Error if error ocurrs", async () => {
    const deleteDocumentRepositoryError = {
      deleteById: jest.fn().mockImplementation(() => {
        throw new Error('Some error message');
      }),
    }
    const sut = new DeleteDocumentUseCase(deleteDocumentRepositoryError)
    expect(sut.execute("any_id")).rejects.toThrowError('Error: Some error message');
  });
});
