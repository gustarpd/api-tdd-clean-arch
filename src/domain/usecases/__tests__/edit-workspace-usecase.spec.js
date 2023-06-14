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

class EditWorkSpaceUseCase {
  constructor(editWorkSpaceRepository) {
    this.editWorkSpaceRepository = editWorkSpaceRepository;
  }

  async editWorkSpace({ taskId, description, owner, priority }) {
    try {
      const editWorkSpace = this.editWorkSpaceRepository.edit({
        taskId,
        description,
        owner,
        priority,
      });
      if (!editWorkSpace) {
        return null;
      }

      return editWorkSpace
    } catch (error) {
      throw new Error(`Internal Error ${error}`);
    }
  }
}

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
    console.log(editWorkspace)
    expect(editWorkspace).toEqual(editWorkSpaceRepository.data);
  });

  test("should return edited data when method edit is invoked correctly", async () => {
    const { sut } = makeSut();

    jest.spyOn(sut, "editWorkSpace").mockImplementationOnce(() => {
      throw new Error()
    });
    try {
      await sut.editWorkSpace();
    } catch (error) {
      console.log(error)
      expect(error).toEqual(new Error());
    }
  });
});
