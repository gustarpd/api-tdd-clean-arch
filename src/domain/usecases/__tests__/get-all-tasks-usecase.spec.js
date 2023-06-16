import { GetTasksWorkSpaceUseCase } from '../workspace/get-all-workspace-usecase'

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
  test("should throw an error if repository findAll() throws an error", async () => {
    const errorMock = new Error("Repository error");
    const getTasksWorkSpaceRepository = {
      async findAll() {
        throw errorMock;
      },
    };
    const usecase = new GetTasksWorkSpaceUseCase(getTasksWorkSpaceRepository);

    await expect(usecase.getTasks()).rejects.toThrow(errorMock);
  });

  test("should return an object with a message if no tasks are found", async () => {
    const emptyDataRepository = {
      async findAll() {
        return [];
      },
    };
    const usecase = new GetTasksWorkSpaceUseCase(emptyDataRepository);
    console.log(await usecase.getTasks())
    const result = await usecase.getTasks();

    expect(result).toEqual({
      message: "Nenhuma tarefa foi encontrada.",
    });
  });
});
