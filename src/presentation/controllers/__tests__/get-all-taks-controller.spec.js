import { GetAllTasksController } from "../workspace/get-all-tasks-workspace-controller";

const makeGetAllTasksUseCase = () => {
  class GetAllTasksUseCase {
    async getTasks() {
      return this.data;
    }
  }

  const getAllTasksUseCase = new GetAllTasksUseCase();
  getAllTasksUseCase.data = {
    statusCode: 200,
    body: [
      {
        id: "any_id",
        description: "any_description",
        owner: "any_owner",
        priority: "any_priority",
      },
      {
        id: "any_id",
        description: "any_description",
        owner: "any_owner",
        priority: "any_priority",
      },
    ],
  };
  return getAllTasksUseCase;
};

const makeGetAllTasksUseCaseWithError = () => {
  class GetAllTasksUseCase {
    async findAll() {
      throw new Error()
    }
  }

  const getAllTasksUseCase = new GetAllTasksUseCase();
  return getAllTasksUseCase;
};

const makeSut = () => {
  const getAllTaksUseCase = makeGetAllTasksUseCase();
  const sut = new GetAllTasksController(getAllTaksUseCase);

  return {
    sut,
    getAllTaksUseCase,
  };
};

describe("FindAllWorkspace controller", () => {
  test("should return HttpRequest if request succeeds", async () => {
    const { sut, getAllTaksUseCase } = makeSut();
    const request = await sut.handle();
    expect(await sut.handle()).toBeDefined();
    expect(request.statusCode).toBe(200);
    expect(request.body).toEqual(getAllTaksUseCase.data);
  });
  test("should throws an Error", async () => {
    const repository = makeGetAllTasksUseCaseWithError()
    const usecase = new GetAllTasksController(repository)
    expect(usecase.handle()).rejects.toThrow()
  });
});
