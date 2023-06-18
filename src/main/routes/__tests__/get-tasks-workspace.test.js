import supertest from "supertest";
import app from "../../config/app";
import { connect, disconnect } from "../../../infra/helper/mongo-in-memory-server";
import { WorkSpace } from "../../../infra/db/schemas/Workspace";

describe("/GET workspace/tasks", () => {
  const testRequest = supertest(app);

  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await disconnect();
  });

  test("should return message error when valid tasks are not found", async () => {
    const response = await testRequest.get("/api/workspace/tasks")
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Nenhuma tarefa foi encontrada.')
  });

  test("should return body with an array if tasks are found", async () => {
    await WorkSpace.create({
      description: "any_description",
      owner: "any_owner",
      priority: "any_priority"
    })
    const response = await testRequest.get("/api/workspace/tasks")
    expect(response.body).toBeDefined()
    expect(response.body).toBeInstanceOf(Array); 
  });
});
