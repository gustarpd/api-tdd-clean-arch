import { MissingParamError } from "../../../utils/errors/missing-params-error.js";
import { HttpResponse } from "../../helpers/httpReponse.js";
import { EditWorkSpaceController } from "../workspace/edit-workspace-controller.js";

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
      taskId: "any_id",
      description: "any_description",
      owner: "any_owner",
      priority: "any_priority",
    });

    expect(request.statusCode).toBe(200);
    expect(request.body).toEqual(editWorkSpaceRepository.data);
  });

  test("should throw InternalError if HttpRequest Body are no provided", async () => {
    const { sut } = makeSut();
    const request = await sut.handle(null);

    expect(request.statusCode).toBe(500);
    expect(request.body).toEqual(HttpResponse.InternalError().body);
  });

  test("should throw MissingParam Error if taskId are no provided", async () => {
    const { sut } = makeSut();
    const request = await sut.handle({
      body: {
        description: "any_description",
        owner: "any_owner",
        priority: "any_priority",
      },
    });

    expect(request.statusCode).toBe(400);
    expect(request.body.error).toBe(new MissingParamError("taskId").message);
  });

  test("should throw MissingParam Error if description are no provided", async () => {
    const { sut } = makeSut();
    const request = await sut.handle({
      taskId: "any_id",
      owner: "any_owner",
      priority: "any_priority",
    });

    expect(request.statusCode).toBe(400);
    expect(request.body.error).toBe(
      new MissingParamError("description").message
    );
  });

  test("should throw MissingParam Error if owner are no provided", async () => {
    const { sut } = makeSut();
    const request = await sut.handle({
      taskId: "any_id",
      description: "any_description",
      priority: "any_priority",
    });

    expect(request.statusCode).toBe(400);
    console.log(request);
    expect(request.body.error).toBe(new MissingParamError("owner").message);
  });

  test("should throw MissingParam Error if priority are no provided", async () => {
    const { sut } = makeSut();
    const request = await sut.handle({
      // {
      taskId: "any_id",
      description: "any_description",
      owner: "any_owner",
      // },
    });

    expect(request.statusCode).toBe(400);
    expect(request.body.error).toBe(new MissingParamError("priority").message);
  });

  test("should throw InternalError if an error occurs", async () => {
    const { sut } = makeSut();

    jest.spyOn(sut, "handle").mockImplementationOnce(() => {
      throw HttpResponse.InternalError();
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
      expect(error).toEqual(HttpResponse.InternalError());
    }
  });
});
