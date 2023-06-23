import { Customer } from "../../db/schemas/Customer.js";
import { connect, disconnect } from "../../helper/mongo-in-memory-server";
import { GetAllCustomerRepository } from "../../repositories/find-all-customers-repository.js";

describe("FindAllUser Repository", () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await disconnect();
  });

  beforeEach(async () => {
    Customer.deleteMany({});
  });

  test("should update the workspace with the provided data", async () => {
    const sut = new GetAllCustomerRepository();
    await Customer.create({
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

    const user = await sut.findAllUsers();
    expect(user).toBeDefined();
  });

  test("should update the workspace with the provided data", async () => {
    const sut = new GetAllCustomerRepository();
    const errorMock = new Error("Erro na consulta");
    jest.spyOn(Customer, "find").mockRejectedValue(errorMock);
    const user = sut.findAllUsers();
    expect(user).rejects.toThrow(
      new Error("Error: Failed to fetch customers.")
    );
  });
});
