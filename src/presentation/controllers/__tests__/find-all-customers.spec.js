import { HttpResponse } from "../../helpers/httpReponse";

class FindAllCustomerUseCase {
  constructor(findCustomerRepository) {
    this.findCustomerRepository = findCustomerRepository;
  }
  async execute() {
    try {
      const customer = await this.findCustomerRepository.findAll();
      return {
        statusCode: 200,
        body: customer,
      };
    } catch (error) {
      console.error(error);
      return HttpResponse.InternalError();
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
  const sut = new FindAllCustomerUseCase(getAllCustomerRepository);

  return {
    sut,
    getAllCustomerRepository,
  };
};

describe("FindAllCustomer controller", () => {
  test("should return HttpRequest if request succeeds", async () => {
    const { sut, getAllCustomerRepository } = makeSut();
    expect((await sut.execute()).statusCode).toBe(200);
    expect((await sut.execute()).body).toEqual(
      getAllCustomerRepository.customer
    );
  });

  test("should return message if customer are not found", async () => {
    const repository = makeFindAllCustomerRepositoryWithAnyUser();
    const sut = new FindAllCustomerUseCase(repository);
    expect((await sut.execute()).body.message).toBe(
      "Nenhum cliente foi encontrado."
    );
  });

  test("should return an internal error response when an error occurs'", async () => {
       const findCustomerRepositoryStub = {
        findAll: jest.fn().mockRejectedValue(new Error('Erro simulado')),
      };
  
      const useCase = new FindAllCustomerUseCase(findCustomerRepositoryStub);
      const response = await useCase.execute();

      expect(response.statusCode).toBe(500);
  });
});
