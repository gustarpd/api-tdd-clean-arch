import { MissingParamError } from "../../../utils/errors/missing-params-error.js";
import { HttpResponse } from "../../helpers/httpReponse.js";
import { AddWorkSpaceController } from "../workspace/add-workspace-controller.js";

describe("AddWorkSpaceController", () => {
  const addWorkSpaceMock = {
    async add(workspaceData) {
      return { id: "1", ...workspaceData };
    },
  };

  const makeSut = () => {
    return new AddWorkSpaceController(addWorkSpaceMock);
  };

  it("should return 500 if no httpRequest is provided", async () => {
    const sut = makeSut();

    const httpResponse = await sut.handle();

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse).toEqual(HttpResponse.InternalError());
  });

  it("should return 400 if description is not provided", async () => {
    const sut = makeSut();

    const httpRequest = {
      owner: "John Doe",
      priority: 1,
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual({
      error: "Missing param: description",
    });
  });

  it("should return 400 if owner is not provided", async () => {
    const sut = makeSut();

    const httpRequest = {
      description: "Workspace description",
      priority: 1,
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual({ error: "Missing param: owner" });
  });

  it("should return 400 if priority is not provided", async () => {
    const sut = makeSut();

    const httpRequest = {
      description: "Workspace description",
      owner: "John Doe",
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual({ error: "Missing param: priority" });
  });

  it("should call addWorkSpace.add with correct data", async () => {
    const sut = makeSut();

    const addSpy = jest.spyOn(addWorkSpaceMock, "add");

    const httpRequest = {
      description: "Workspace description",
      owner: "John Doe",
      priority: 1,
    };

    await sut.handle(httpRequest);

    expect(addSpy).toHaveBeenCalledWith(httpRequest);
  });

  it("should return 201 with the created workspace", async () => {
    const sut = makeSut();

    const httpRequest = {
      description: "Workspace description",
      owner: "John Doe",
      priority: 1,
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(201);
    expect(httpResponse.body).toEqual({ id: "1", ...httpRequest });
  });

  it("should return 401 if an error occurs", async () => {
    const sut = makeSut();

    jest.spyOn(addWorkSpaceMock, "add").mockImplementationOnce(() => {
      throw new Error();
    });

    const httpRequest = {
      description: "Workspace description",
      owner: "John Doe",
      priority: 1,
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(401);
    expect(httpResponse.body).toEqual({ error: "unauthorized" });
  });
});
