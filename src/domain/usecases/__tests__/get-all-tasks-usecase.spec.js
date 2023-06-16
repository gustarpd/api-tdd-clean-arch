class GetTasksWorkSpaceUseCase {
  constructor(getTasksWorkSpaceRepository) {
    this.getTasksWorkSpaceRepository = getTasksWorkSpaceRepository;
  }

  async getTasks() {
    return this.getTasksWorkSpaceRepository.findAll();
  }
}

const makeGetTasksWorkSpaceRepository = () => {
  class GetTasksWorkSpaceRepository {
    async findAll() {
      return this.data;
    }
  }
  const getTasksWorkSpaceRepository = new GetTasksWorkSpaceRepository();
  getTasksWorkSpaceRepository.data = {
    id: "any_id",
    decription: "any_description",
    owner: "any_owner",
    priority: "any_priority",
  };
  return getTasksWorkSpaceRepository;
};

const makeGetTasksWorkSpaceRepositoryWithUndefinedValue = () => {
  class GetTasksWorkSpaceRepository {
    async findAll() {
      this.data = this.data;
      if (this.data === undefined) {
        return {
          sucess: false,
          message: "Nenhuma tarefa foi encontrada.",
        };
      }
    }
  }
  const getTasksWorkSpaceRepository = new GetTasksWorkSpaceRepository();
  return getTasksWorkSpaceRepository;
};

const makeSut = () => {
  const getTasksWorkSpaceRepository = makeGetTasksWorkSpaceRepository();
  const getTasksWorkSpaceRepositoryWithUndefinedValue =
    makeGetTasksWorkSpaceRepositoryWithUndefinedValue();
  const sut = new GetTasksWorkSpaceUseCase(getTasksWorkSpaceRepository);

  return {
    sut,
    getTasksWorkSpaceRepository,
    getTasksWorkSpaceRepositoryWithUndefinedValue,
  };
};

describe("WorkSpace UseCase", () => {
  test("should return task data when FindAll Method are invoked", async () => {
    const { sut, getTasksWorkSpaceRepository } = makeSut();
    expect(await sut.getTasks()).toBeDefined();
    expect(await sut.getTasks()).toEqual(getTasksWorkSpaceRepository.data);
  });

  test("should return false success if there is no task in the workspace", async () => {
    const { getTasksWorkSpaceRepositoryWithUndefinedValue } = makeSut();
    const usecase = new GetTasksWorkSpaceUseCase(
      getTasksWorkSpaceRepositoryWithUndefinedValue
    );
    const repositoryResponse = await usecase.getTasks();
    expect(await usecase.getTasks()).toBeDefined();
    expect(await repositoryResponse.sucess).toBe(false);
    expect(await repositoryResponse.message).toBe(
      "Nenhuma tarefa foi encontrada."
    );
  });
});
