import { Customer } from "../../db/schemas/Customer.js";
import { connect, disconnect } from "../../helper/mongo-in-memory-server.js";
// import { UpdateCustomerRepository } from "../db-delete-customer-repository.js";

export class DeleteCustomerRepository {
  async deleteById(id) {
    if (id)
      return {
        deleteCount: 1,
      };
  }
}

const makeSut = () => {
  const updateCustomerRepository = new UpdateCustomerRepository();
  return {
    updateCustomerRepository,
  };
};

describe("UpdateCustomerRepository", () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await disconnect();
  });

  beforeEach(async () => {
    Customer.deleteMany({});
  });

  it("should update the Customer with the provided data", async () => {
    const sut = new DeleteCustomerRepository()

    const customer = await Customer.create({
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

    const result = await sut.deleteById(customer._id);
    expect(result).toHaveProperty("deleteCount");
    expect(result.deleteCount).toBe(1);
  });
});
