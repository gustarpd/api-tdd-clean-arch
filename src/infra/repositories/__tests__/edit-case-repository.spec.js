import { Case } from "../../db/schemas/Cases.js";
import { connect, disconnect } from "../../helper/mongo-in-memory-server";
import { UpdateCaseRepository } from "../update-case-repository.js";



const makeSut = () => {
  const updateCaseRepository = new UpdateCaseRepository();
  return {
    updateCaseRepository,
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
    const { updateCaseRepository } = makeSut();
    const createdUser = await Case.create({
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
    const updatedData = {
       id: createdUser._id,
        title: "Edited Title",
        customer: "John Doe",
        action_type: "Legal Action",
        awarded_amount: 5000,
    }
    expect(await updateCaseRepository.editById(updatedData)).toBeDefined();
  });

  test('should throw an error if an error occurs', async () => {
    const findOneAndUpdateMock = jest.fn().mockRejectedValue(new Error('Database Error'));
    const caseModelMock = {
      findOneAndUpdate: findOneAndUpdateMock,
    };
    const updateCaseRepository = new UpdateCaseRepository(caseModelMock);

    const data = {
      _id: 'any_id',
    };

    await expect(updateCaseRepository.editById(data)).rejects.toThrow();
  });
});
