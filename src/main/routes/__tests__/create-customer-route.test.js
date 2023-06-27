import supertest from "supertest";
import app from "../../config/app";
import {
  connect,
  disconnect,
} from "../../../infra/helper/mongo-in-memory-server";

describe("GET Customer API", () => {
  const testRequest = supertest(app);

  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await disconnect();
  });

  test("should return 201 when valid credencials are provided", async () => {
    const response = await testRequest.post("/api/customer/").send({
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
    expect(response.status).toBe(201);
  });

  test("should return 400 MissingParams error if required fields are not provided", async () => {
    const requiredFields = [
      "name",
      "phone",
      "email",
      "address",
      "cpfCnpj",
      "dateOfBirth",
      "gender",
      "maritalStatus",
      "profession",
      "nationality",
      "observations",
    ];
    const response = await testRequest.post("/api/customer/").send({});

    for (const field of requiredFields) {
      expect(response.body).toHaveProperty("error");
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBeDefined();
    }
  });
});
