import { HttpResponse } from "../../helpers/httpReponse";
import { FindAllCustomerController } from "../customers/get-all-customers-controller";

class FindAllCustomerUseCase {
  constructor(findCustomerRepository) {
    this.findCustomerRepository = findCustomerRepository;
  }
  
  async execute() {
    try {
      const customer = await this.findCustomerRepository.findAll()
      return customer
    } catch (error) {
      throw new Error('some error')
    }
  }
}

const makeFindAllCustomerRepository = () => {
  class FindAllCustomerUseCase {
    async findAll() {
      return this.customer;
    }
  }

  const findCustomerRepository = new FindAllCustomerUseCase();
  findCustomerRepository.customer = {
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
  };
  return findCustomerRepository;
};

const makeFindAllCustomerRepositoryWithAnyUser = () => {
  class FindAllCustomerUseCase {
    async findAll() {
      return { message: "Nenhum cliente foi encontrado." };
    }
  }

  const findCustomerRepository = new FindAllCustomerUseCase();

  return findCustomerRepository;
};

const makeSut = () => {
  const getAllCustomerRepository = makeFindAllCustomerRepository();
  const findAllCustomerUseCase = new FindAllCustomerUseCase(getAllCustomerRepository);
  const sut = new FindAllCustomerController(findAllCustomerUseCase)
  
  return {
    sut,
    getAllCustomerRepository,
    findAllCustomerUseCase
  };
};

describe("FindAllCustomer controller", () => {
  test("should return HttpRequest if request succeeds", async () => {
    const { sut, getAllCustomerRepository } = makeSut();
    expect((await sut.handle({})).statusCode).toBe(200);
    expect((await sut.handle({})).body).toEqual(
      getAllCustomerRepository.customer
    );
  });

  test("should return message if customer are not found", async () => {
    const repository = makeFindAllCustomerRepositoryWithAnyUser();
    const usecase = new FindAllCustomerUseCase(repository);
    const sut =  new FindAllCustomerController(usecase)
    expect((await sut.handle({})).body.message).toBe(
      "Nenhum cliente foi encontrado."
    );
  });

  test("should return an internal error response when an error occurs'", async () => {
    const useCase = new FindAllCustomerController();
    const response = await useCase.handle();
    expect(response.statusCode).toBe(500);
  });

  test("should return an internal server error response if an error occurs", async () => {
    const createCustomerUseCaseSpy = {
      execute: jest.fn().mockRejectedValueOnce(HttpResponse.InternalError()),
    };
    const sut = new FindAllCustomerController(createCustomerUseCaseSpy);

    const httpRequest = {
      // httpRequest object
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(HttpResponse.InternalError());
  });
});
