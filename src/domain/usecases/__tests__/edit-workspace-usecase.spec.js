import { EditWorkSpaceUseCase } from '../workspace/edit-workspace-usecase.js'

const makeEditWorkSpaceRespository = () => {
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

const makeSut = () => {
  const editWorkSpaceRepository = makeEditWorkSpaceRespository();
  const sut = new EditWorkSpaceUseCase(editWorkSpaceRepository);

  return {
    sut,
    editWorkSpaceRepository,
  };
};

describe("WorkSpace UseCase", () => {
  test("should return edited data when method edit is invoked correctly", async () => {
    const { sut } = makeSut();
    const editWorkspace = await sut.edit({
      taskId: "any",
      description: "any",
      owner: "any",
      priority: "any",
    });
    console.log(editWorkspace);
    expect(editWorkspace).toEqual({
      success: true,
      message: "Agenda atualizada com sucesso."
    });
  });

  test("should return edited data when method edit is invoked correctly", async () => {
    const { sut } = makeSut();

    jest.spyOn(sut, "edit").mockImplementationOnce(() => {
      throw new Error();
    });
    try {
      await sut.edit();
    } catch (error) {
      expect(error).toEqual(new Error());
    }
  });
});
