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

  test("should return 201 when valid credencials are provided", async () => {
    const response = await testRequest.post("/api/tasks").send({
      description: "any_description",
      owner: "any_owner",
      priority: "any_priority",
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("workspace");
  });

  test("should return MissingParams description if description are no provided", async () => {
    const response = await testRequest
      .post("/api/tasks")
      .send({
        owner: "any_owner",
        priority: "any_priority",
      })
      .expect(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Missing param: description");
  });

  test("should return MissingParams owner if owner are no provided", async () => {
    const response = await testRequest
      .post("/api/tasks")
      .send({
        description: "ant_description",
        priority: "any_priority",
      })
      .expect(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Missing param: owner");
  });

  test("should return MissingParams priority if priority are no provided", async () => {
    const response = await testRequest
      .post("/api/tasks")
      .send({
        description: "any_description",
        owner: "any_owner",
      })
      .expect(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Missing param: priority");
  });
});
