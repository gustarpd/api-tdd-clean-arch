import supertest from "supertest";
import app from "../../config/app";
import {
  connect,
  disconnect,
} from "../../../infra/helper/mongo-in-memory-server";
import { Customer } from "../../../infra/db/schemas/Customer";

describe("GET Customer API", () => {
  const testRequest = supertest(app);

  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await disconnect();
  });

  test("should return 200 with fail message if error ocurrs", async () => {
    const response = await testRequest
      .delete("/api/delete/customer/64974f90020364c179931a14")
      .send({});
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: false,
      message: "Falha ao excluír o cliente.",
    });
  });

  test("should return 200 with message if when customer are deleted", async () => {
    const customer = await Customer.create({
      name: "John Doe",
      phone: "875.414.840-59",
      email: "john.example.com",
      address: "123 Main Street",
      cpfCnpj: "875.414.840-59",
      dateOfBirth: "1990-01-01",
      gender: "Male",
      maritalStatus: "Single",
      profession: "Engineer",
      nationality: "Brazilian",
      observations: "Lorem ipsum dolor sit amet",
    });
    const response = await testRequest
      .delete(`/api/delete/customer/${customer._id}`)
      .send({});
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: "Cliente deletado com sucesso.",
    });
  });
});
