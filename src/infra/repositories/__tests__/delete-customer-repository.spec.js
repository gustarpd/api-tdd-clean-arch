import { Customer } from "../../db/schemas/Customer.js";
import { connect, disconnect } from "../../helper/mongo-in-memory-server.js";
import { DeleteCustomerRepository } from "../delete-customer-repository.js";

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

  test("should update the Customer with the provided data", async () => {
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
    expect(result.errors).toBeUndefined();
  });

  test("should throw error when invalid id are provided", async () => {
    const sut = new DeleteCustomerRepository()
    await expect(sut.deleteById("nonexistent_id")).rejects.toThrow();
  });
});
