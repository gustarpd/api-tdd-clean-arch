import { Case } from "../../db/schemas/Cases.js";
import { connect, disconnect } from "../../helper/mongo-in-memory-server.js";
import { CreateNewCaseUseCaseRepository } from "../../repositories/create-new-case-repository.js";

describe("add-workspace-repository", () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await disconnect();
  });

  beforeEach(async () => {
    await Case.deleteMany({});
  });

  test("should create a case correctly", async () => {
    const client = new CreateNewCaseUseCaseRepository();
    const newCase = await client.save({
      title: "Sample Case",
      customer: "John Doe",
      action_type: "Civil",
      awarded_amount: 5000,
      involved_parties: [{
        name: "John Doe",
      }],
      status: "Pending",
      owner: "Jane Smith",
      protocol: "ABC123",
      casedata: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      event_date: [
        {
          titulo: "First Event",
          onwer: "John Doe Junior",
          start_date: new Date(),
          end_date: new Date(),
          createdAt: "2023-06-01",
        },
        {
          titulo: "First Event",
          onwer: "John Doe Junior",
          start_date: new Date(),
          end_date: new Date(),
          createdAt: "2023-06-01",
        },
      ],
    });
    console.log(newCase)
    expect(newCase).toBeDefined();
    expect(newCase.title).toBe("Sample Case");
    expect(newCase.customer).toBe("John Doe");
  });

  test("should throw An Error if any data are provided", async () => {
    const client = new CreateNewCaseUseCaseRepository();
    const newCase = client.save({});
    expect(newCase).rejects.toThrow();
  });

  test("should throw an Error if required fields does not provided", async () => {
    const client = new CreateNewCaseUseCaseRepository();
    const newCase = client.save({
      // title: "Sample Case",
      customer: "John Doe",
      action_type: "Civil",
      awarded_amount: 5000,
      involved_parties: ["Party A", "Party B"],
      status: "Pending",
      // owner: "Jane Smith",
      protocol: "ABC123",
      casedata: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      event_date: [
        {
          titulo: "First Event",
          onwer: "John Doe Junior",
          start_date: new Date(),
          end_date: new Date(),
          createdAt: "2023-06-01",
        },
        {
          titulo: "First Event",
          onwer: "John Doe Junior",
          start_date: new Date(),
          end_date: new Date(),
          createdAt: "2023-06-01",
        },
      ],
    });
    expect(newCase).rejects.toThrow();
  });
});
