import { MissingParamError } from "../../../utils/errors/missing-params-error.js";
import { HttpResponse } from "../../helpers/httpReponse.js";

export class DeleteCustomerController {
  constructor(deleteCustomerUseCase) {
    this.deleteCustomerUseCase = deleteCustomerUseCase;
  }

  async handle(httpRequest) {
    try {
      if (!httpRequest) {
        return HttpResponse.InternalError();
      }

      const customer = await this.deleteCustomerUseCase.execute(httpRequest.id);
      console.log(httpRequest)
      if (!httpRequest.id) {
        return HttpResponse.badRequest(new MissingParamError("id"));
      }

      return HttpResponse.ok(customer);
    } catch (error) {
      console.error(error);
      return HttpResponse.unauthorizeError();
    }
  }
}

class DeleteCustomerUseCaseMock {
  async execute(id) {
    if (id === "any_id") {
      return {
        success: true,
        message: "Cliente excluído com sucesso.",
      };
    }

    throw new Error("Invalid ID");
  }
}

class DeleteCustomerRepositoryMock {
  async deleteById(id) {
    if (id === "any_id") {
      return {
        deleteCount: 1,
      };
    }

    throw new Error("Invalid ID");
  }
}

describe("DeleteCustomerController", () => {
  describe("handle", () => {
    test("should return Internal Server Error if httpRequest is null", async () => {
      const deleteCustomerUseCaseMock = new DeleteCustomerUseCaseMock();
      const deleteCustomerController = new DeleteCustomerController(
        deleteCustomerUseCaseMock
      );

      const response = await deleteCustomerController.handle(null);

      expect(response).toEqual(HttpResponse.InternalError());
    });

    test("should return 401 if id is missing in httpRequest", async () => {
      const deleteCustomerUseCaseMock = new DeleteCustomerUseCaseMock();
      const deleteCustomerController = new DeleteCustomerController(
        deleteCustomerUseCaseMock
      );
    
      const response = await deleteCustomerController.handle({});
    
      expect(response.statusCode).toBe(401);
      expect(response).toEqual(
        HttpResponse.unauthorizeError()
      );
    });
    

    test("should return 200 Ok when repository receives a valid id", async () => {
      const deleteCustomerUseCaseMock = new DeleteCustomerUseCaseMock();
      const deleteCustomerController = new DeleteCustomerController(
        deleteCustomerUseCaseMock
      );

      const httpRequest = {
        id: "any_id",
      };

      const response = await deleteCustomerController.handle(httpRequest);

      expect(response.statusCode).toBe(200);
      expect(response).toHaveProperty("body");
      expect(response.body).toEqual({
        success: true,
        message: "Cliente excluído com sucesso.",
      });
    });

    test("should return 500 Internal Server Error when repository receives an invalid id", async () => {
      const deleteCustomerUseCaseMock = new DeleteCustomerUseCaseMock();
      const deleteCustomerController = new DeleteCustomerController(
        deleteCustomerUseCaseMock
      );

      const httpRequest = {
        id: "invalid_id",
      };

      const response = await deleteCustomerController.handle(httpRequest);

      expect(response).toEqual(HttpResponse.unauthorizeError());
    });
  });
});
