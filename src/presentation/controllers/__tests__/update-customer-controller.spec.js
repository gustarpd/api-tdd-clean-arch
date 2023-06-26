import { MissingParamError } from "../../../utils/errors/missing-params-error";
import { HttpResponse } from "../../helpers/httpReponse";
import { AddWorkSpaceController, UpdateCustomerController } from "../customers/update-customer-controller.js";

const makeUpdateCustomerController = () => {
  class updateUseCase {
    async update() {
      return {
        sucess: true,
        message: "Agenda atualizada com sucesso.",
      };
    }
  }

  return new updateUseCase();
};

const makeUpdateCustomerControllerWithError = () => {
  class updateUseCase {
    async update() {
      throw new Error("some error at usecase")
    }
  }

  return new updateUseCase();
};

const makeUpdateCustomerControllerWithErrorMessage = () => {
  class updateUseCase {
    async update() {
      return {
        sucess: false,
        message: "Erro ao atualizar o cliente",
      };
    }
  }

  return new updateUseCase();
};


const makeSut = () => {
  const updateUseCase = makeUpdateCustomerController();
  const sut = new UpdateCustomerController(updateUseCase);
  return {
    sut,
  };
};

describe("Workspace controller", () => {
  test("should return 200 if HttpRequest body is provided", async () => {
    const { sut } = makeSut();
    const request = await sut.handle({
      id: 1,
      name: "John Doe Edited",
      phone: "1234567890",
    });
    expect(request.statusCode).toBe(200);
    expect(request.body.sucess).toBe(true);
  });

  test("should return 500 if id are no provided in HttpRequest", async () => {
    const { sut } = makeSut();
    const request = await sut.handle({
      name: "John Doe Edited",
      phone: "1234567890",
    });
    expect(request.statusCode).toBe(500);
  });

  test("should return 500 if HttpRequest body is no provided", async () => {
    const { sut } = makeSut();
    const request = await sut.handle();
    expect(request.statusCode).toBe(500);
    expect(request).toEqual(HttpResponse.InternalError());
    expect(request.statusCode).toEqual(500);
  });

  test("should return error message if error ocurrs in usecase is no provided", async () => {
    const repository = makeUpdateCustomerControllerWithErrorMessage();
    const sut = new UpdateCustomerController(repository);
    const request = await sut.handle({
        id: 1
    });
    expect(request.body.sucess).toBe(false)
    expect(request.body.message).toBe('Erro ao atualizar o cliente')
  });

  test("should throw an error if an error occurs in the use case", async () => {
    const repository = makeUpdateCustomerControllerWithError();
    const sut = new UpdateCustomerController(repository);
  
    expect(await sut.handle({ id: 1 })).toEqual(HttpResponse.InternalError());
  });
  
  test("should return an internal server error response if no updated user is returned", async () => {
    class updateCustomerUseCaseSpy {
      async update() {
        return null
      }
    };

    const sut = new UpdateCustomerController(updateCustomerUseCaseSpy);

    const httpRequest = {
     id: "any_id"
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(HttpResponse.InternalError());
  });

});
