import { EditCaseUseCase } from "../managecases/edit-case-usecase";

const makeEditCaseUseCase = () => {
  class EditCaseUseCase {
    async editById(data) {
      return data;
    }
  }

  const editCaseRepository = new EditCaseUseCase();
  editCaseRepository.data = {
    id: "any_id",
    title: "Sample Case",
    customer: "John Doe",
    awarded_amount: 5000,
    involved_parties: [
      {
        name: "John Mayer",
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
  };

  return editCaseRepository;
};

const makeSut = () => {
  const editCaseRepository = makeEditCaseUseCase();
  const sut = new EditCaseUseCase(editCaseRepository);
  return {
    sut,
    editCaseRepository,
  };
};

describe("EditCase UseCase", () => {
  test("should Edit a case data with correctly data", async () => {
    const { sut, editCaseRepository } = makeSut();
    const editedCase = await sut.edit({
      id: "any_id",
      title: "Sample Case",
      customer: "John Doe",
      awarded_amount: 5000,
      involved_parties: [
        {
          name: "John Mayer",
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
    expect(editedCase).toEqual(editCaseRepository.data);
  });

  test("should throw an Error if data are no provided to edit method", async () => {
    const { sut } = makeSut();
    await expect(sut.edit({})).rejects.toThrowError(
      "Dados de entrada incompletos"
    );
  });

  test("should throw an Error if data are no provided to edit method", async () => {
    const newCaseRepositoryMock = {
      editById: jest.fn().mockRejectedValue(new Error("Erro ao editar o caso")),
    };
    const sut = new EditCaseUseCase(newCaseRepositoryMock);
    await expect(
      sut.edit({
        id: "any_id",
        title: "Sample Case",
        customer: "John Doe",
        awarded_amount: 5000,
        involved_parties: [
          {
            name: "John Mayer",
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
      })
    ).rejects.toThrowError("Erro ao editar o caso");
  });
});
