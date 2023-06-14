import { HttpResponse } from "../../helpers/httpReponse";
import { AddWorkSpaceController } from "../add-workspace-controller";

const makeAddWorkSpace = () => {
  class AddWorkSpace {
    async add({ description, owner, priority, accessToken }) {
      this.description = description;
      this.owner = owner;
      this.priority = priority;
      this.accessToken = accessToken;
      return this.WorkSpace;
    }
  }

  const addWorkSpace = new AddWorkSpace();
  addWorkSpace.WorkSpace = {
    description: "any_description",
    owner: "any_owner",
    priority: "any_priority",
  };
  return addWorkSpace;
};

const makeSut = () => {
  const addRepository = makeAddWorkSpace();
  const sut = new AddWorkSpaceController(addRepository);
  return {
    sut,
    addRepository,
  };
};

describe("Workspace controller", () => {
  test("should return data correctly if HttpRequest body id provided", async () => {
    const { sut, addRepository } = makeSut();
    const httpRequest = await sut.handle({
      description: "any",
      owner: "any",
      priority: "any",
      accessToken: "any",
    });
    expect(httpRequest.statusCode).toBe(200);
    expect(httpRequest.body.workspace).toEqual(addRepository.WorkSpace);
  });
  test("should throw InternaError if HttpRequest are no provided", async () => {
    const { sut } = makeSut();
    const httpRequest = await sut.handle();
    expect(httpRequest.statusCode).toBe(500);
    console.log(httpRequest);
    expect(httpRequest).toEqual(HttpResponse.InternalError());
  });

  test("should throw UnauthorizedError if an error occurs", async () => {
    const { sut } = makeSut();

    jest.spyOn(sut, "handle").mockImplementationOnce(() => {
      throw HttpResponse.unauthorizeError();
    });
    try {
      await sut.handle({
        body: {
          description: "any",
          owner: "any",
          priority: "any",
          accessToken: "any",
        },
      });
    } catch (error) {
      expect(error).toEqual(HttpResponse.unauthorizeError());
    }
  });
});
