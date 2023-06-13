import { HttpResponse } from "../../helpers/httpReponse.js";

const makeEditWorkSpaceRepository = () => {
  class EditWorkspaceRepository {
    async edit({ taskId, description, owner, priority }) {
      return this.data;
    }
  }

  const editWorkSpace = new EditWorkspaceRepository();
  editWorkSpace.data = {
    taskId: "any_id",
    description: "any_description",
    owner: "any_owner",
    priority: "any_priority",
  };
  return editWorkSpace;
};

export class EditWorkSpaceController {
  constructor(editWorkspace) {
    this.editWorkspace = editWorkspace;
  }

  async handle(httpRequest) {
    try {
      if (!httpRequest || !httpRequest.body) {
        return HttpResponse.InternalError();
      }
      const { taskId, description, owner, priority } = httpRequest.body;

      const workspace = await this.editWorkspace.edit({
        taskId,
        description,
        owner,
        priority,
      });
      return HttpResponse.ok(workspace);
    } catch (error) {
      console.log(error);
      return HttpResponse.InternalError();
    }
  }
}

const makeSut = () => {
  const editWorkSpaceRepository = makeEditWorkSpaceRepository();
  const sut = new EditWorkSpaceController(editWorkSpaceRepository);

  return {
    sut,
    editWorkSpaceRepository,
  };
};

describe("", () => {
  test("should handle a valid HTTP request and return a successful response with the edited workspace data", async () => {
    const { sut, editWorkSpaceRepository } = makeSut();
    const request = await sut.handle({
      body: {
        taskId: "any_id",
        description: "any_description",
        owner: "any_owner",
        priority: "any_priority",
      },
    });

    expect(request.statusCode).toBe(200);
    expect(request.body).toEqual(editWorkSpaceRepository.data);
  });

  test("should throw InternalError if HttpRequest Body are no provided", async () => {
    const { sut } = makeSut();
    const request = await sut.handle({});

    expect(request.statusCode).toBe(500);
    expect(request.body).toEqual(HttpResponse.InternalError().body)
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
