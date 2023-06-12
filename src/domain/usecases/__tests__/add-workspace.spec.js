import { MissingParamError } from "../../../utils/errors/missing-params-error.js";
import { AddWorkSpace } from "../add-workspace-usecase";
import { AddWorkSpaceRepository } from '../../../infra/repositories/add-workspace-repository.js'
import { HttpResponse } from "../../../presentation/helpers/httpReponse.js";

const AddWorkSpaceRepositorySpy = () => {
  class AddWorkSpaceRepository {
    async Add({ description, owner, priority }) {
      this.descrption = description;
      this.owner = owner;
      this.priority = priority;
      return this.data;
    }
  }
  const addWorkSpaceRepository = new AddWorkSpaceRepository();
  return addWorkSpaceRepository;
};

class AddWorkSpaceRepositoryWithErroSpy {
  async Add(data) {
    if (data.accessToken === "valid_token") {
      return true;
    }

    if (data.accessToken !== "valid_token") return undefined;
  }
}

const makeSut = () => {
  const addWorkSpaceRepository = AddWorkSpaceRepositorySpy();
  const AddWorkSpaceSpy = new AddWorkSpace(
    addWorkSpaceRepository,
  );
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
    accessToken: "valid_token",
  };
  test("should create a workspace data correctly if data are provided", async () => {
    const { AddWorkSpaceSpy, addWorkSpaceRepository } = makeSut();
    addWorkSpaceRepository.data = {
      description: "any_description",
      owner: "any_owner",
      priority: "any_priority",
      id: "any_id"
    };
    const addWorkSpace = await AddWorkSpaceSpy.add(workSpaceData);
    expect(addWorkSpace).toEqual({
      description: "any_description",
      owner: "any_owner",
      priority: "any_priority",
      id: "any_id"
    });
  });

  test("should throw unauthorized if valid accessToken is not provided", async () => {
    const addWorkSpaceRepositorySpy = new AddWorkSpaceRepositoryWithErroSpy();
    const AddWorkSpaceSpy = new AddWorkSpace(addWorkSpaceRepositorySpy);
    const workSpaceDataWithInvalidToken = {
      description: "any_description",
      owner: "any_owner",
      priority: "any_priority",
      accessToken: "invalid_token",
    };
    const addWorkSpace = await AddWorkSpaceSpy.add(workSpaceDataWithInvalidToken);
  
    expect(addWorkSpace).toEqual(HttpResponse.unauthorizeError());
  });

  test("should return null if data is no provided to repository", async () => {
    const { addWorkSpaceRepository } = makeSut();
    addWorkSpaceRepository.data = null;
    const addWorkSpacespy = await addWorkSpaceRepository.Add({});
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

  test("should throws MissingParamsError if description are no provided", async () => {
    const { AddWorkSpaceSpy } = makeSut();
    const { accessToken, owner, priority } = workSpaceData;
    const addWorkSpaceSpy = AddWorkSpaceSpy.add({
      accessToken,
      owner,
      priority,
    });
    expect(addWorkSpaceSpy).rejects.toThrow(
      new MissingParamError("description")
    );
  });

  test("should throws MissingParamsError if owner are no provided", async () => {
    const { AddWorkSpaceSpy } = makeSut();
    const { accessToken, description, priority } = workSpaceData;
    const addWorkSpaceSpy = AddWorkSpaceSpy.add({
      accessToken,
      description,
      priority,
    });
    expect(addWorkSpaceSpy).rejects.toThrow(
      new MissingParamError("owner")
    );
  });

  test("should throws MissingParamsError if priority are no provided", async () => {
    const { AddWorkSpaceSpy } = makeSut();
    const { accessToken, description, owner } = workSpaceData;
    const addWorkSpaceSpy = AddWorkSpaceSpy.add({
      accessToken,
      description,
      owner
    });
    expect(addWorkSpaceSpy).rejects.toThrow(
      new MissingParamError("priority")
    );
  });

  test("should throws MissingParamsError if accessToken are no provided", async () => {
    const { AddWorkSpaceSpy } = makeSut();
    const { priority, description, owner } = workSpaceData;
    const addWorkSpaceSpy = AddWorkSpaceSpy.add({
      priority,
      description,
      owner
    });
    expect(addWorkSpaceSpy).rejects.toThrow(
      new MissingParamError("accessToken")
    );
  });
});
