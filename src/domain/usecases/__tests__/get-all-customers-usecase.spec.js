import { CustomerOffice } from "../../entities/clients-office.js";
import { GetAllCustomer } from "../customer-office/get-customers-usecase.js";

const makeGetAllCustomersRepository = () => {
  class GetAllCustomerRepository {
    async findAllUsers() {
      return this.data;
    }
  }

  const getCustomerRepository = new GetAllCustomerRepository();
  getCustomerRepository.data = {
    id: "any_id",
    name: "any_name",
  };
  return getCustomerRepository;
};

const makeSut = () => {
  const getCustomerRepository = makeGetAllCustomersRepository();
  const sut = new GetAllCustomer(getCustomerRepository);
  return {
    sut,
    getCustomerRepository,
  };
};

describe("Customer UseCase", () => {
  test("should find a customer when the execute method is invoked", async () => {
    const { sut, getCustomerRepository } = makeSut();
    expect(await sut.execute()).toEqual(getCustomerRepository.data);
  });

  test("should verify if the customer names are equal", async () => {
    const { sut, getCustomerRepository } = makeSut();
    getCustomerRepository.data = {
      id: "any_id",
      name: "any_name_customer",
    };
    const usecase = await sut.execute();
    expect(usecase.name).toBe(getCustomerRepository.data.name);
  });

  test("should return a message 'customer not found' when the repository returns null", async () => {
    const { sut, getCustomerRepository } = makeSut();
    getCustomerRepository.data = null;
    const usecase = await sut.execute();
    expect(usecase).toHaveProperty("message");
    expect(usecase.message).toBe("Nenhum cliente foi encontrado.");
  });

  test("should throw an error if an error occurs while fetching the customer", async () => {
    const GetAllCustomerRepositoryStub = {
      async findAllUsers() {
        throw new Error("Error: Failed to fetch customers.");
      },
    };
    const getAllCustomer = new GetAllCustomer(GetAllCustomerRepositoryStub);

    try {
      await getAllCustomer.execute();
      expect(true).toBe(false);
    } catch (error) {
      expect(error.message).toBe("Error: Failed to fetch customers.");
    }
  });
});
