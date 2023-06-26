import { HttpResponse } from "../../helpers/httpReponse.js";
import { DeleteWorkSpaceController } from "../workspace/delete-workspace-controller.js";

const deleteWorkSpaceUseCase = () => {
  class deleteWorkSpaceUseCase {
    async delete(id) {
      return this.data;
    }
  }

  const deleteByIdUseCase = new deleteWorkSpaceUseCase();
  deleteByIdUseCase.data = {
    success: true,
    message: "Documento excluído com sucesso.",
  };
  return deleteByIdUseCase;
};

const deleteWorkSpaceUseCaseWithError = {
  async delete(taskId) {
    throw new Error();
  },
};

const makeSut = () => {
  const deleteByIdUseCase = deleteWorkSpaceUseCase();
  const sut = new DeleteWorkSpaceController(deleteByIdUseCase);

  return {
    sut,
    deleteByIdUseCase,
  };
};

describe("Delete workSpace controller", () => {
  test("should return a HttpRequest OK if taskId are provided from handle method", async () => {
    const { sut, deleteByIdUseCase } = makeSut();
    const request = await sut.handle({ taskId: "any_id" });
    expect(request.body).toEqual(deleteByIdUseCase.data);
  });
  test("should throw InternalError if HttpRequest are no provided from handle method", async () => {
    const { sut } = makeSut();
    const request = await sut.handle();
    expect(request.statusCode).toBe(500);
    expect(request).toEqual(HttpResponse.InternalError());
  });
  test("should return 401 if an error occurs", async () => {
    const sut = new DeleteWorkSpaceController(deleteWorkSpaceUseCaseWithError)


    const httpRequest = {
      taskId: "1",
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(401);
    expect(httpResponse.body).toEqual({ error: "unauthorized" });
  });
});

