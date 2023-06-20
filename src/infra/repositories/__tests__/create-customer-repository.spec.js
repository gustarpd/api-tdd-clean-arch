import { Customer } from "../../db/schemas/Customer.js";
import { connect, disconnect } from "../../helper/mongo-in-memory-server.js";
import { AddWorkSpaceRepository } from "../add-workspace-repository";

class CreateCustomerOffice {
  async create(data) {
    const customer = await Customer.create({
      name: data.name,
      address: data.name,
      email: data.email,
      cpfCnpj: data.cpfCnpj,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      maritalStatus: data.maritalStatus,
      nationality: data.nationality,
      observations: data.observations,
      phone: data.phone,
      profession: data.profession,
    });

    if (!customer) {
      throw new Error("some erro at db");
    }

    return customer;
  }
}

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
    const workspace = new CreateCustomerOffice();
    const result = await workspace.create(expectedProperties);

    for (const prop in expectedProperties) {
      expect(result).toHaveProperty(prop);
    }
  });
});
