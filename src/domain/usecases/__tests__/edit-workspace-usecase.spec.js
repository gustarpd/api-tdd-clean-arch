import { EditWorkSpaceUseCase } from "../workspace/edit-workspace-usecase.js";

const makeEditWorkSpaceRepository = () => {
  class EditWorkSpaceRepositorySpy {
    async edit({ taskId, description, owner, priority }) {
      return this.data;
    }
  }

  const editWorkSpaceRepository = new EditWorkSpaceRepositorySpy();
  editWorkSpaceRepository.data = {
    _id: "any_id",
    description: "any_description",
    owner: "any_owner",
    priority: "any_priority",
  };

  return editWorkSpaceRepository;
};

const makeEditWorkSpaceRepositoryWithError = () => {
  class EditWorkSpaceRepository {
    async edit({ taskId, description, owner, priority }) {
      throw new Error("some erro at db");
    }
  }

  return new EditWorkSpaceRepository();
};

const makeSut = () => {
  const editWorkSpaceRepository = makeEditWorkSpaceRepository();
  const sut = new EditWorkSpaceUseCase(editWorkSpaceRepository);

  return {
    sut,
    editWorkSpaceRepository,
  };
};

describe("EditWorkSpaceUseCase", () => {
  test("should return success message when edit is invoked correctly", async () => {
    const { sut } = makeSut();

    const editWorkspace = await sut.edit({
      taskId: "any",
      description: "any",
      owner: "any",
      priority: "any",
    });

    expect(editWorkspace).toEqual({
      success: true,
      message: "Agenda atualizada com sucesso.",
    });
  });

  test("should return error message when edit fails", async () => {
    const { sut, editWorkSpaceRepository } = makeSut();

    editWorkSpaceRepository.data = null; // Simulando falha na edição

    const editWorkspace = await sut.edit({
      taskId: "any",
      description: "any",
      owner: "any",
      priority: "any",
    });

    expect(editWorkspace).toEqual({
      success: false,
      message: "Erro ao atualizar o cliente",
    });
  });

  test("should throw an error when an exception occurs", async () => {
    const repositoryWithError = makeEditWorkSpaceRepositoryWithError();
    const sut = new EditWorkSpaceUseCase(repositoryWithError);
    sut.edit({
      taskId: "any",
      description: "any",
      owner: "any",
      priority: "any",
    });
    await expect(sut.edit()).rejects.toThrow(Error);
  });
});
