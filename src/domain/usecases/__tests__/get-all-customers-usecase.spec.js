import { CustomerOffice } from "../../entities/clients-office.js";
import { GetAllCustomer } from '../customer-office/get-customers-usecase.js'

const makeGetAllCustomersRepository = () => {
  class GetAllCustomer {
    async getManyById() {
      return this.data;
    }
  }

  const getCustomer = new GetAllCustomer();
  getCustomer.data = {
    id: "any_id",
    name: "any_name",
  };
  return getCustomer;
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
  test("should found an customer when method execute is invked", async () => {
    const { sut, getCustomerRepository } = makeSut();
    expect(await sut.execute()).toEqual(getCustomerRepository.data);
  });
  test("should verify if customer name are equal", async () => {
    const { sut, getCustomerRepository } = makeSut();
    getCustomerRepository.data = {
      id: "any_id",
      name: "any_name_customer",
    };
    const usecase = await sut.execute();
    expect(usecase.name).toBe(getCustomerRepository.data.name);
  });

  test("should return an message customer not found when repository return null", async () => {
    const { sut, getCustomerRepository } = makeSut();
    getCustomerRepository.data = null;
    const usecase = await sut.execute();
    expect(usecase).toHaveProperty("message");
    expect(usecase.message).toBe("Nenhum cliente foi encontrado.");
  });

  test("should throw error if Error ocurrs to fail fetch customer", async () => {
    const GetAllCustomerRepositoryStub = {
      async getManyById() {
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
