import { HttpResponse } from "../../helpers/httpReponse.js";
import { DeleteCaseController } from "../cases/delete-case-controller.js";

class DeleteCustomerUseCaseMock {
  async execute(id) {
    if (id === "any_id") {
      return {
        success: true,
        message: "Caso excluído com sucesso.",
      };
    }

    throw new Error("Invalid ID");
  }
}

const makeSut = () => {
  const deleteCaseUseCase = new DeleteCustomerUseCaseMock();
  const deleteCaseController = new DeleteCaseController(deleteCaseUseCase);
  return { deleteCaseUseCase, deleteCaseController };
};

describe("DeleteCaseController", () => {
  test("should return a message success true if handle calls usecase correcly", async () => {
    const { deleteCaseController } = makeSut();
    expect(
      await deleteCaseController.handle({
        id: "any_id",
      })
    ).toEqual({ success: true, message: "Caso excluído com sucesso." });
  });

  test("should throw InternalError if erro ocurrs", async () => {
    const { deleteCaseController } = makeSut();
    const request = await deleteCaseController.handle({
      id: "invalid_id",
    });
    expect(request).toEqual(HttpResponse.InternalError());
  });

  test("should throw InternalError if id are no provided", async () => {
    const { deleteCaseController } = makeSut();
    const request = await deleteCaseController.handle({
      id: "",
    });
    expect(request).toEqual(HttpResponse.InternalError());
  });
});
