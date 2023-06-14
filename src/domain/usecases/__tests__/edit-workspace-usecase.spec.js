import { EditWorkSpaceUseCase } from '../edit-workspace-usecase.js'

const EditWorkSpaceRepositorySpy = () => {};

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
    const { sut, editWorkSpaceRepository } = makeSut();
    const editWorkspace = await sut.editWorkSpace({
      taskId: "any",
      description: "any",
      owner: "any",
      priority: "any",
    });
    console.log(editWorkspace);
    expect(editWorkspace).toEqual(editWorkSpaceRepository.data);
  });

  test("should return edited data when method edit is invoked correctly", async () => {
    const { sut } = makeSut();

    jest.spyOn(sut, "editWorkSpace").mockImplementationOnce(() => {
      throw new Error();
    });
    try {
      await sut.editWorkSpace();
    } catch (error) {
      expect(error).toEqual(new Error());
    }
  });
});
