import supertest from "supertest";
import app from "../../config/app";
import {
  connect,
  disconnect,
} from "../../../infra/helper/mongo-in-memory-server";
import { Customer } from "../../../infra/db/schemas/Customer";

describe("PUT Customer API", () => {
  const testRequest = supertest(app);

  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await disconnect();
  });

  test("should return 200 when customers are edited", async () => {
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
      .put(`/api/customer/update/${customer.id}`)
      .send({
        name: "edited",
      });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: "Cliente atualizado com sucesso.",
    });
  });

  test("should return 500 when error ocurrs", async () => {
    const response = await testRequest
      .put(`/api/customer/update/invalid_id`)
      .send({
        name: "edited",
      });
    expect(response.status).toBe(500);
  });
});
