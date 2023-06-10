import { HttpResponse } from "../../../presentation/helpers/httpReponse";
import { MissingParamError } from "../../../utils/errors/missing-params-error.js";
import { WorkSpace } from "../../entities/workspace";

class AddWorkSpace {
  constructor(addWorkSpaceRepository, loadUserByTokenRepository) {
    this.addWorkSpaceRepository = addWorkSpaceRepository;
    this.loadUserByTokenRepository = loadUserByTokenRepository;
  }
  async add({ description, owner, priority, accessToken }) {
    if (!description) {
      throw new MissingParamError("description");
    }
    if (!owner) {
      throw new MissingParamError("owner");
    }
    if (!priority) {
      throw new MissingParamError("priority");
    }
    const user = this.loadUserByTokenRepository.loadByToken(accessToken);
    if (user) {
      const workspace = new WorkSpace({ description, owner, priority });
      return this.addWorkSpaceRepository.save(workspace);
    }

    return HttpResponse.unauthorizeError();
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

class LoadUserByTokenRepository {
  async loadByToken(accessToken) {
    if (accessToken === "valid_token") {
      return true;
    }
    return false;
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
    addWorkSpaceRepository.data = {
      description: "any_description",
      owner: "any_owner",
      priority: "any_priority",
    };
    const addWorkSpace = await AddWorkSpaceSpy.add(workSpaceData);
    expect(addWorkSpace).toEqual({
      description: "any_description",
      owner: "any_owner",
      priority: "any_priority",
    });
  });

  test("should return null if data is no provided to repository", async () => {
    const { addWorkSpaceRepository } = makeSut();
    addWorkSpaceRepository.data = null;
    // addWorkSpaceRepository.
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
