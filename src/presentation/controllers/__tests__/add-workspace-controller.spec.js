import { HttpResponse } from "../../helpers/httpReponse";

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

export class AddWorkSpaceController {
  constructor(addWorkSpace) {
    this.addWorkSpace = addWorkSpace;
  }
  async handle(httpRequest) {
    try {
      if (!httpRequest || !httpRequest.body) {
        return HttpResponse.InternalError();
      }
      const { description, owner, priority, accessToken } = httpRequest.body;
      const workspace = await this.addWorkSpace.add({
        description,
        owner,
        priority,
        accessToken,
      });
      return HttpResponse.ok({ workspace });
    } catch (error) {
      return HttpResponse.unauthorizeError();
    }
  }
}

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
      body: {
        description: "any",
        owner: "any",
        priority: "any",
        accessToken: "any",
      },
    });
    expect(httpRequest.statusCode).toBe(200)
    expect(httpRequest.body.workspace).toEqual(addRepository.WorkSpace)
  });
});
