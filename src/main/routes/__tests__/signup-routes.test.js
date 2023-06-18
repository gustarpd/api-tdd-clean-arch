

import supertest from "supertest";
import app from "../../config/app";
import { connect, disconnect } from "../../../infra/helper/mongo-in-memory-server";

describe("Login Routes", () => {
  const testRequest = supertest(app);

  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await disconnect();
  });

  test("should return 200 when valid credencials are provided", async () => {
    const response = await testRequest
      .post("/api/signup")
      .send({
        name: "any_name",
        email: "valid_email@mail.com",
        password: "any_password",
      })
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty("accessToken")
  });

  test("should return 400 when ivalid credencials are provided", async () => {
    const response = await testRequest
      .post("/api/signup")
      .send({
        name: "name",
        password: "hashed_password",
      })
      .expect(400)
      expect(response.body).toHaveProperty("error")
      expect(response.body.error).toBe("Missing param: email")
  });
});
