import { Customer } from "../../db/schemas/Customer.js";
import { connect, disconnect } from "../../helper/mongo-in-memory-server";
import { UpdateCustomerRepository } from "../db-edit-customer-repository.js";

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
    const { updateCustomerRepository } = makeSut();

    const workspace = await Customer.create({
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
    
    const result = await updateCustomerRepository.edit({
      customerId: workspace._id,
      name: "John Doe Edited",
      phone: "1234567890",
    });

    expect(result).toHaveProperty("modifiedCount");
    expect(result.modifiedCount).toBe(1);
  });
});
