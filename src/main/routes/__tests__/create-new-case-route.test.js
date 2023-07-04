import supertest from "supertest";
import app from "../../config/app";
import {
  connect,
  disconnect,
} from "../../../infra/helper/mongo-in-memory-server";

describe("POST Customer API", () => {
  const testRequest = supertest(app);

  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await disconnect();
  });

  test("should return 201 when valid credencials are provided", async () => {
    const body = {
      title: "Sample Case",
      customer: "John Doe",
      customerId: "64a33ed4892b8e06ad80b429",
      action_type: "Legal Action",
      awarded_amount: 5000,
      involved_parties: [{
        name: "John mayer"
      }],
      status: "Pending",
      owner: "Jane Smith",
      protocol: "ABC123",
      casedata: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      event: [
        {
          title: "First Event",
          owner: "Event Owner 1",
          start_date: "2023-07-01T00:00:00Z",
          end_date: "2023-07-05T00:00:00Z",
          createdAt: "2023-06-28T08:00:00Z"
        },
        {
          title: "Second Event",
          owner: "Event Owner 2",
          start_date: "2023-07-10T00:00:00Z",
          end_date: "2023-07-15T00:00:00Z",
          createdAt: "2023-06-29T10:30:00Z"
        }
      ]
    }
    

    const response = await testRequest.post("/api/create/cases").send(body);
    expect(response.status).toBe(201);
  });

  test("should return 400 MissingParams error if required fields are not provided", async () => {
    const requiredFields = [
        "title",
        "customer",
        "action_type",
        "awarded_amount",
        "involved_parties",
        "status",
        "owner",
        "protocol",
        "casedata",
        "event",
      ];
    const response = await testRequest.post("/api/create/cases").send({});

    for (const field of requiredFields) {
      expect(response.body).toHaveProperty("error");
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBeDefined();
    }
  });
});
