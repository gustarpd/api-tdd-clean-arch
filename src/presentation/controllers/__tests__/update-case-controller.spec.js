import { JsonWebTokenError } from "jsonwebtoken";
import { HttpResponse } from "../../helpers/httpReponse";
import { UpdateCaseController } from '../cases/update-new-case-controller.js'

const makeUpdateCase = () => {
  class UpdateCaseUseCase {
    async update() {
      return this.data;
    }
  }

  const updateCaseUseCase = new UpdateCaseUseCase();
  updateCaseUseCase.data = {
    statusCode: 200,
    body: {
      id: "any_id",
      description: "any_description",
      owner: "any_owner",
      priority: "any_priority",
    },
  };
  return updateCaseUseCase;
};

const makeSut = () => {
  const updateCaseUseCase = makeUpdateCase();
  const sut = new UpdateCaseController(updateCaseUseCase);

  return {
    sut,
    updateCaseUseCase,
  };
};

describe("FindAllWorkspace controller", () => {
  test("should execute hande and return data correctly", async () => {
    const { sut, updateCaseUseCase } = makeSut();
    const httpRequest = {
      id: "id",
      title: "Edited Title",
      customer: "John Doe",
      action_type: "Legal Action",
      awarded_amount: 5000,
    };
    const request = await sut.handle(httpRequest);
    expect(request.body).toEqual(updateCaseUseCase.data);
    expect(request.statusCode).toEqual(200);
  });

  test("should return InternalError if HttpRequest Body are no provided", async () => {
    const { sut, updateCaseUseCase } = makeSut();
    const request = await sut.handle();
    expect(request).toEqual(HttpResponse.InternalError());
  });

  test("should return InternalError response if an error occurs", async () => {
    const updateCaseUseCaseMock = {
      update: jest.fn().mockRejectedValue(new Error("Update Case Error")),
    };
    const sut = new UpdateCaseController(updateCaseUseCaseMock);

    const httpRequestMock = {
      id: "id",
      title: "Edited Title",
      customer: "John Doe",
      action_type: "Legal Action",
      awarded_amount: 5000,
    };

    const response = await sut.handle(httpRequestMock);
    expect(response.statusCode).toEqual(500);
  });
});
