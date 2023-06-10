import { MissingParamError } from "../../../utils/errors/missing-params-error.js";

class AddWorkSpace {
  constructor(addWorkSpaceRepository) {
    this.addWorkSpaceRepository = addWorkSpaceRepository;
  }
  async add({ description, owner, priority }) {
    if (!description) {
      throw new MissingParamError("description");
    }
    if (!owner) {
      throw new MissingParamError("owner");
    }
    if (!priority) {
      throw new MissingParamError("priority");
    }

    return this.addWorkSpaceRepository.save({ description, owner, priority });
  }
}

const AddWorkSpaceRepositorySpy = () => {
  class AddWorkSpaceRepository {
    async save({ description, owner, priority }) {
      this.descrption = description;
      this.owner = owner;
      this.priority = priority;
      return this.data;
    }
  }
  const addWorkSpaceRepository = new AddWorkSpaceRepository();
  return addWorkSpaceRepository;
};

const makeSut = () => {
  const addWorkSpaceRepository = AddWorkSpaceRepositorySpy();
  const AddWorkSpaceSpy = new AddWorkSpace(addWorkSpaceRepository);
  return {
    addWorkSpaceRepository,
    AddWorkSpaceSpy,
  };
};

describe("WorkSpace UseCase", () => {
  const workSpaceData = {
    description: "any_description",
    owner: "any_owner",
    priority: "any_priority",
  };
  test("should create a workspace data correctly if data are provided", async () => {
    const { AddWorkSpaceSpy, addWorkSpaceRepository } = makeSut();
    addWorkSpaceRepository.data = {
      description: "any_description",
      owner: "any_owner",
      priority: "any_priority",
    };
    const addWorkSpace = await AddWorkSpaceSpy.add(workSpaceData);
    expect(addWorkSpace).toEqual(workSpaceData);
  });
});
