import { Customer } from "../../db/schemas/Customer.js";
import { connect, disconnect } from "../../helper/mongo-in-memory-server.js";
import { ValidationError } from "mongoose";
import { CreateCustomerOffice } from "../create-new-customer-repository.js";

describe("add-workspace-repository", () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await disconnect();
  });

  beforeEach(async () => {
    await Customer.deleteMany({});
  });

  test("should create a workspace correctly", async () => {
    const expectedProperties = {
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
    const customer = new CreateCustomerOffice();
    const result = await customer.create(expectedProperties);

    for (const prop in expectedProperties) {
      expect(result).toHaveProperty(prop);
    }
  });

  test("should throw An Error if any data are provided", async () => {
    const customer = new CreateCustomerOffice();
    const result = customer.create({});
    expect(result).rejects.toThrow();
  });
});
