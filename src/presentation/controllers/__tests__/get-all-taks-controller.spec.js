const makeGetAllTasksUseCase = () => {
  class GetAllTasksUseCase {
    async findAll() {
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

class GetAllTasksController {
  constructor(getAllTasksUseCase) {
    this.getAllTaksUseCase = getAllTasksUseCase;
  }
  async handle(httpRequest = {}) {
    try {
      return await this.getAllTaksUseCase.findAll();
    } catch (error) {
      throw error
    }
  }
}

const makeSut = () => {
  const getAllTaksUseCase = makeGetAllTasksUseCase();
  const sut = new GetAllTasksController(getAllTaksUseCase);

  return {
    sut,
    getAllTaksUseCase,
  };
};

describe("Delete workSpace controller", () => {
  test("should return HttpRequest if request succeeds", async () => {
    const { sut, getAllTaksUseCase } = makeSut();
    const request = await sut.handle();
    expect(await sut.handle()).toBeDefined();
    expect(request.statusCode).toBe(200);
    expect(request.body).toEqual(getAllTaksUseCase.data.body);
  });
  test("should throws an Error", async () => {
    const repository = makeGetAllTasksUseCaseWithError()
    const usecase = new GetAllTasksController(repository)
    expect(usecase.handle()).rejects.toThrow()
  });
});
