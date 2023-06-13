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
      if (!workspace) return HttpResponse.unauthorizeError();
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
  test("", async () => {
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
});
