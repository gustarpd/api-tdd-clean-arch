import { DeleteCaseUseCase } from "../managecases/delete-case-usecase";

const makeDeleteCaseRepository = () => {
  class DeleteCaseRepository {
    async deleteById(id) {
      return this.deleteReponse;
    }
  }
  const deleteCaseRepository = new DeleteCaseRepository();
  deleteCaseRepository.deleteReponse = { deletedCount: 1 };
  return deleteCaseRepository;
};

const makeSut = () => {
  const deleteCaseRepository = makeDeleteCaseRepository();
  const sut = new DeleteCaseUseCase(deleteCaseRepository);
  return {
    sut,
    deleteCaseRepository,
  };
};

describe("DeleteCase UseCase", () => {
  test("should return message with success false if case does not deleted", async () => {
    const { sut, deleteCaseRepository } = makeSut();
    deleteCaseRepository.deleteReponse = { deleteCount: 0 };
    const response = await sut.execute("any_id");
    expect(response.success).toBe(false);
    expect(response.message).toBe("Processo não encontrado");
  });

  test("should return message and success true when customer are deleted", async () => {
    const { sut } = makeSut();
    const response = await sut.execute("any_id");
    expect(response.success).toBe(true);
    expect(response.message).toBe("Processo deletado com sucesso");
  });

  test("should return message and success true when customer are deleted", async () => {
    const deleteCaseRepositoryStub = {
      deleteById: jest
        .fn()
        .mockRejectedValue(new Error("Erro ao excluir caso")),
    };
    const sut = new DeleteCaseUseCase(deleteCaseRepositoryStub);
    expect(sut.execute()).rejects.toThrowError("Erro ao excluir caso");
  });
});
