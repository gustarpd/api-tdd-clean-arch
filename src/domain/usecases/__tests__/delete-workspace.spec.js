import { DeleteWorkSpaceUseCase } from "../workspace/delete-workspace-usecase.js";

const makeDeleteWorkSpaceRespositorySpy = () => {
  class DeleteWorkSpaceRespository {
    async deleteById(taskId) {
      return (this.taskId = taskId);
    }
  }

  const deleteWorkSpaceRespository = new DeleteWorkSpaceRespository();
  return deleteWorkSpaceRespository;
};

const makeDeleteWorkSpaceRespositoryWithErro = () => {
  class DeleteWorkSpaceRespository {
    async deleteById(taskId) {
      if (taskId === 'invalid_id') {
        throw new Error("Nenhum documento encontrado com o ID fornecido.")
      }
    }
  }

  const deleteWorkSpaceRespository = new DeleteWorkSpaceRespository();
  return deleteWorkSpaceRespository;
};

const makeSut = () => {
  const deleteWorkSpaceRespository = makeDeleteWorkSpaceRespositorySpy();
  const deleteWorkSpaceRespositoryWithErro = makeDeleteWorkSpaceRespositoryWithErro()
  const deleteWorkSpaceUseCase = new DeleteWorkSpaceUseCase(
    deleteWorkSpaceRespository
  );

  return {
    deleteWorkSpaceRespository,
    deleteWorkSpaceUseCase,
    deleteWorkSpaceRespositoryWithErro
  };
};

describe("DeleteWorkSpace UseCase", () => {
  test("should return a correct taskid when task is deleted", async () => {
    const { deleteWorkSpaceUseCase, deleteWorkSpaceRespository } = makeSut();
    const result = await deleteWorkSpaceUseCase.delete("any_id");
    expect(result).toEqual({
      message: "Documento excluído com sucesso.",
      success: true
    });
  });

  test("should throw an Error id any id are not provided", async () => {
    const { deleteWorkSpaceRespositoryWithErro } = makeSut()
    const usecase = new DeleteWorkSpaceUseCase(deleteWorkSpaceRespositoryWithErro)
    const result = usecase.delete("invalid_id");
    expect(result).rejects.toThrow();
  });
});
