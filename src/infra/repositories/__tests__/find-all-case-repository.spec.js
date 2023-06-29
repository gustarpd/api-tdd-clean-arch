import { Case } from "../../db/schemas/Cases.js";
import { connect, disconnect } from "../../helper/mongo-in-memory-server";
import { UpdateCaseRepository } from "../update-case-repository.js";

export class FindAllCasesRepository {
  async findAll() {
    try {
      const cases = await Case.find({});
      return cases;
    } catch (error) {
      throw Error("Failed to find cases: " + error);
    }
  }
}

const makeSut = () => {
  const findAllCasesRepository = new FindAllCasesRepository();
  return {
    findAllCasesRepository,
  };
};

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
    const { findAllCasesRepository } = makeSut();
    await Case.create({
      title: "Edited Title",
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
    const getAllCases = await findAllCasesRepository.findAll()
    expect(getAllCases).toBeDefined();

  });

  test("should throw an error if an error occurs", async () => {
    const findAllMock = jest
      .fn()
      .mockRejectedValue(new Error("Database Error"));
    const caseModelMock = {
      findAll: findAllMock,
    };
    const updateCaseRepository = new UpdateCaseRepository(caseModelMock);

    const data = {
      _id: "any_id",
    };

    await expect(updateCaseRepository.editById(data)).rejects.toThrow();
  });
});
