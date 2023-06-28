import { Case } from "../../db/schemas/Case.js";
import { connect, disconnect } from "../../helper/mongo-in-memory-server.js";

class CreateNewCaseUseCaseRepository {
  async save(properties) {
    return Case.create(properties);
  }
}

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
      involved_parties: ["Party A", "Party B"],
      status: "Pending",
      owner: "Jane Smith",
      protocol: "ABC123",
      casedata: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      history: [
        {
          titulo: "First Event",
          valor_causa: 1000,
          valor_condenacao: 500,
          data_criada: "2023-06-01",
        },
        {
          titulo: "Second Event",
          valor_causa: 2000,
          valor_condenacao: 1500,
          data_criada: "2023-06-15",
        },
      ],
    });
    expect(newCase).toBeDefined();
    expect(newCase.title).toBe("Sample Case");
    expect(newCase.customer).toBe("John Doe");
  });

  test("should throw An Error if any data are provided", async () => {
    const client = new CreateNewCaseUseCaseRepository();
    const newCase = client.save({});
    expect(newCase).rejects.toThrow()
  });

  test("should throw an Error if required fields does not provided", async () => {
    const client = new CreateNewCaseUseCaseRepository();
    const newCase = client.save({
        // no title
        customer: "John Doe",
        action_type: "Civil",
        awarded_amount: 5000,
        involved_parties: ["Party A", "Party B"],
        status: "Pending",
        // no owner
        protocol: "ABC123",
        casedata: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        history: [
          {
            titulo: "First Event",
            valor_causa: 1000,
            valor_condenacao: 500,
            data_criada: "2023-06-01",
          },
          {
            titulo: "Second Event",
            valor_causa: 2000,
            valor_condenacao: 1500,
            data_criada: "2023-06-15",
          },
        ],
      });
    expect(newCase).rejects.toThrow()
  });
});
