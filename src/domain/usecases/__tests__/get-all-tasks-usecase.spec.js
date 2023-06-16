class GetTasksWorkSpaceUseCase {
  constructor(getTasksWorkSpaceRepository) {
    this.getTasksWorkSpaceRepository = getTasksWorkSpaceRepository;
  }

  async getTasks() {
    return this.getTasksWorkSpaceRepository.findAll()
  }
}

const makeGetTasksWorkSpaceRepository = () => {
  class GetTasksWorkSpaceRepository {
    async findAll() {
      return this.data
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

const makeSut = () => {
  const getTasksWorkSpaceRepository = makeGetTasksWorkSpaceRepository();
  const sut = new GetTasksWorkSpaceUseCase(getTasksWorkSpaceRepository);

  return {
    sut,
    getTasksWorkSpaceRepository
  };
};

describe("WorkSpace UseCase", () => {
  test("shold return task data when FindAll Method are invoked", async () => {
    const { sut, getTasksWorkSpaceRepository } = makeSut();
    expect(await sut.getTasks()).toBeDefined()
    expect(await sut.getTasks()).toEqual(getTasksWorkSpaceRepository.data)
  });
});
