import supertest from "supertest";
import app from "../../config/app";
import {
  connect,
  disconnect,
} from "../../../infra/helper/mongo-in-memory-server";
import { WorkSpace } from "../../../infra/db/schemas/Workspace";

describe("/PUT workspace/tasks", () => {
  const testRequest = supertest(app);

  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await disconnect();
  });

  test("should edit a Workspace task", async () => {
    const data = await WorkSpace.create({
      description: "any_description",
      owner: "any_owner",
      priority: "any_priority",
    });
    const response = await testRequest.put(`/api/edit/${data._id}`).send({
      description: "description edited",
      owner: "owner edited",
      priority: "priority edited",
    });
    expect(response.status).toBe(200);
  });
  // test("should return ServerError if no body request are provided", async () => {
  //   const response = await testRequest.put("/api/edit/4")
  //   console.log(response)
  //   expect(response.status).toBe(500);
  // });
});
