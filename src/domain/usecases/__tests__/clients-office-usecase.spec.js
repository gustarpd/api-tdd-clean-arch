import { CustomerOffice } from "../../entities/clients-office.js";

const makeCustomerOfficeRepository = () => {
  class CustomerOfficeRepository {
    async create({ ...data }) {
      return data;
    }
  }

  const customerData = new CustomerOfficeRepository();
  customerData.data = {
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
  return customerData;
};

const makeCustomerOfficeRepositoryWithError = () => {
  class CustomerOfficeRepositoryWithError {
    async create() {
      return null;
    }
  }

  const customerData = new CustomerOfficeRepositoryWithError();
  return customerData;
};

class CreateCustomerOffice {
  constructor(customerOfficeRepository) {
    this.customerOfficeRepository = customerOfficeRepository;
  }

  async execute({ ...customerData }) {
    const createNewCustomer = await this.customerOfficeRepository.create(
      CustomerOffice.create(customerData)
    );

    if (!createNewCustomer) {
      throw new Error("some error at Db");
    }

    return CustomerOffice.toData(createNewCustomer);
  }
}

const makeSut = () => {
  const customerOfficeRepository = makeCustomerOfficeRepository();
  const customerOfficeRepositoryWithError =
    makeCustomerOfficeRepositoryWithError();
  const sut = new CreateCustomerOffice(customerOfficeRepository);
  return {
    sut,
    customerOfficeRepository,
    customerOfficeRepositoryWithError,
  };
};

describe("Customer Office", () => {
  test("should execute usecase and return customer data if are created correctly", async () => {
    const { sut, customerOfficeRepository } = makeSut();
    const run = await sut.execute({
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
    expect(run).toEqual(customerOfficeRepository.data);
  });

  test("should throw an error if an error occurs in the database while creating a new customer", async () => {
    const repository = makeCustomerOfficeRepositoryWithError()
    const sut = new CreateCustomerOffice(repository)
    const run = sut.execute({});
    expect(run).rejects.toThrow(new Error("some error at Db"));
  });
});
