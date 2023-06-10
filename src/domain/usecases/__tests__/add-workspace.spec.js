import { MissingParamError } from "../../../utils/errors/missing-params-error.js";
import { AddWorkSpace } from "../add-workspace-usecase";

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

class LoadUserByTokenRepository {
  async loadByToken(accessToken) {
    if (accessToken === "valid_token") {
      return true;
    }

    if (accessToken !== "valid_token") return undefined;
  }
}

const makeSut = () => {
  const addWorkSpaceRepository = AddWorkSpaceRepositorySpy();
  const loadUserByTokenlRepository = new LoadUserByTokenRepository();
  const AddWorkSpaceSpy = new AddWorkSpace(
    addWorkSpaceRepository,
    loadUserByTokenlRepository
  );
  return {
    loadUserByTokenlRepository,
    addWorkSpaceRepository,
    AddWorkSpaceSpy,
  };
};

describe("WorkSpace UseCase", () => {
  const workSpaceData = {
    description: "any_description",
    owner: "any_owner",
    priority: "any_priority",
    accessToken: "valid_token",
  };
  test("should create a workspace data correctly if data are provided", async () => {
    const { AddWorkSpaceSpy, addWorkSpaceRepository } = makeSut();
    const { description, owner, priority } = workSpaceData;
    const addWorkSpace = await AddWorkSpaceSpy.add(workSpaceData);
    expect(addWorkSpace).toEqual({ description, owner, priority });
  });

  test("should throws unauthorized if valid accessToken are no provided", async () => {
    const { AddWorkSpaceSpy, addWorkSpaceRepository } = makeSut();
    const workSpaceDataWithInvalidToken = {
      description: "any_description",
      owner: "any_owner",
      priority: "any_priority",
      accessToken: "invalid_token",
    };
    const addWorkSpace = await AddWorkSpaceSpy.add(
      workSpaceDataWithInvalidToken
    );
    expect(addWorkSpace.statusCode).toBe(401);
    expect(addWorkSpace.body.error).toBe("unauthorized");
  });

  test("should return null if data is no provided to repository", async () => {
    const { addWorkSpaceRepository } = makeSut();
    addWorkSpaceRepository.data = null;
    const addWorkSpacespy = await addWorkSpaceRepository.save({});
    expect(addWorkSpacespy).toBeNull();
  });

  test("should throws MissingParamsError if data is no provided to usecase", async () => {
    const { AddWorkSpaceSpy } = makeSut();
    try {
      await AddWorkSpaceSpy.add({});
    } catch (error) {
      expect(error).toBeInstanceOf(MissingParamError);
      expect(error.message).toBe("Missing param: description");
    }
  });
});
