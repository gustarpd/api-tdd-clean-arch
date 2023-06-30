import { Case } from "../../db/schemas/Cases.js";
import { connect, disconnect } from "../../helper/mongo-in-memory-server.js";
import { DeleteCaseRepository } from "../delete-case-repository.js";

describe("UpdateCustomerRepository", () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await disconnect();
  });

  beforeEach(async () => {
    Case.deleteMany({});
  });

  test("should update the Customer with the provided data", async () => {
    const sut = new DeleteCaseRepository();

    const customer = await Case.create({
      title: "Sample Case",
      customer: "John Doe",
      action_type: "Legal Action",
      awarded_amount: 5000,
      involved_parties: [
        {
          name: "John mayer",
        },
      ],
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
          createdAt: "2023-06-28T08:00:00Z",
        },
        {
          title: "Second Event",
          owner: "Event Owner 2",
          start_date: "2023-07-10T00:00:00Z",
          end_date: "2023-07-15T00:00:00Z",
          createdAt: "2023-06-29T10:30:00Z",
        },
      ],
    });

    const result = await sut.deleteById(customer._id);
    expect(result.errors).toBeUndefined();
    expect(result.deletedCount).toBe(1)
  });

  test("should throw error when invalid id are provided", async () => {
    const sut = new DeleteCaseRepository();
    await expect(sut.deleteById("nonexistent_id")).rejects.toThrow();
  });
});
