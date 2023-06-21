import { MissingParamError } from "../../../utils/errors/missing-params-error";
import { HttpResponse } from "../../helpers/httpReponse";

const makeCreateCustomerControllerRepositorySpy = () => {
  class CreateCustomerRepository {
    async create(data) {
      return this.data;
    }
  }
  const createCustomerRepository = new CreateCustomerRepository();
  createCustomerRepository.data = {
    name: "John Doe",
    phone: "1234567890",
    email: "john@example.com",
    address: "123 Main Street",
  };
  return createCustomerRepository;
};

class CreateCustomerUseCase {
  constructor(createCustomerRepository) {
    this.createCustomerRepository = createCustomerRepository;
  }
  async execute(data) {
    if (data) {
      return await this.createCustomerRepository.create(data);
    }
    throw new Error("Internal Error");
  }
}

class CreateCustomerController {
  constructor(createCustomerUseCase) {
    this.createCustomerUseCase = createCustomerUseCase;
  }
  async handle(httpRequest) {
    try {
      if (!httpRequest) {
        return HttpResponse.InternalError();
      }

      const requiredParams = [
        "name",
        "phone",
        "email",
        "address",
        // "cpfCnpj",
        // "dateOfBirth",
        // "gender",
        // "maritalStatus",
        // "profession",
        // "nationality",
        // "observations",
      ];

      for (const param of requiredParams) {
        if (!httpRequest[param]) {
          return HttpResponse.badRequest(new MissingParamError(param));
        }
      }
      const customer = await this.createCustomerUseCase.execute({
        ...httpRequest,
      });
      return customer;
    } catch (error) {}
  }
}

const makeSut = () => {
  const createCustomerRepository = makeCreateCustomerControllerRepositorySpy();
  const createCustomerUseCase = new CreateCustomerUseCase(
    createCustomerRepository
  );
  const sut = new CreateCustomerController(createCustomerUseCase);
  return {
    createCustomerRepository,
    sut,
    createCustomerUseCase,
  };
};

describe("Workspace controller", () => {
  test("should return an data object if handle are invoked correcly", async () => {
    const { sut, createCustomerRepository } = makeSut();
    const request = await sut.handle({
      name: "John Doe",
      phone: "123dad4567890",
      email: "john@example.com",
      address: "123 Main Street",
    });
    expect(request).toEqual(createCustomerRepository.data);
  });

  test("should throw an 500 InternalError if HttpRequest are no provided", async () => {
    const { sut } = makeSut();
    const request = await sut.handle();
    expect(request.statusCode).toEqual(HttpResponse.InternalError().statusCode);
    expect(request.body).toEqual(HttpResponse.InternalError().body);
  });

  test("should throw a 400 MissingParam error", async () => {
    const { sut } = makeSut();

    const requests = [
      {
        // no name
        phone: "1234567890",
        email: "john@example.com",
        address: "123 Main Street",
      },
      {
        // no phone
        name: "John Doe",
        email: "john@example.com",
        address: "123 Main Street",
      },
      {
        // no email
        name: "John Doe",
        phone: "1234567890",
        address: "123 Main Street",
      },
      {
        // no address
        name: "John Doe",
        phone: "1234567890",
        email: "john@example.com",
      },
    ];

    for (const request of requests) {
      const response = await sut.handle(request);
      expect(response.statusCode).toEqual(400);
      expect(response.body.error).toBeDefined();
    }
  });
});
