import { MissingParamError } from "../../../utils/errors/missing-params-error";
import { HttpResponse } from "../../helpers/httpReponse";
import { CreateCustomerController } from "../customers/create-new-customer-controller";

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
      phone: "1234567890",
      email: "john@example.com",
      address: "123 Main Street",
      cpfCnpj: "123456789",
      dateOfBirth: "1990-01-01",
      gender: "Male",
      maritalStatus: "Single",
      profession: "Engineer",
      nationality: "Brazilian",
      observations: "Lorem ipsum dolor sit amet",
    });
    expect(request.body).toEqual(createCustomerRepository.data);
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
  test("should return an unauthorized error response when an error occurs", async () => {
    const createCustomerUseCaseSpy = {
      execute: jest.fn().mockImplementation(() => {
        throw new Error("Some error occurred");
      }),
    };
    const sut = new CreateCustomerController(createCustomerUseCaseSpy);

    const httpRequest = {
      name: "John Doe",
      phone: "123456789",
      email: "johndoe@example.com",
      address: "123 Main St",
      cpfCnpj: "123456789",
      dateOfBirth: "1990-01-01",
      gender: "Male",
      maritalStatus: "Single",
      profession: "Engineer",
      nationality: "US",
      observations: "Some observations",
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(HttpResponse.unauthorizeError());
  });
});
