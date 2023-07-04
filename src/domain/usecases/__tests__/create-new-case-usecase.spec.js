import { CreateNewCaseUseCase } from "../managecases/create-new-case-usecase";

const makeCaseRepository = () => {
  class CaseRepository {
    async save({
      title,
      customer,
      status,
      owner,
      protocol,
      casedata,
      history,
    }) {
      return this.data;
    }
  }

  const caseRepository = new CaseRepository();
  caseRepository.data = {
    title: "any_title",
    customer: "any_customer",
    status: "any_status",
    owner: "any_owner",
    protocol: "any_protocol",
    casedata: [
      {
        title: "any_case_title",
      },
    ],
    history: "any_history",
  };
  return caseRepository;
};

const newCaseRepositoryMock = {
  save: jest.fn().mockRejectedValue(new Error("Erro ao salvar o caso")),
};
const makeSut = () => {
  const caseRepository = makeCaseRepository();
  const sut = new CreateNewCaseUseCase(caseRepository);
  return {
    sut,
    caseRepository,
  };
};

describe("CaseUseCase", () => {
  test("should call execute method with correct values", async () => {
    const { sut, caseRepository } = makeSut();
    const caseTest = await sut.execute({
      title: "any_title",
      customer: "any_customer",
      customerId: "any_custom",
      status: "any_status",
      awarded_amount: 5000,
      owner: "any_owner",
      involved_parties: [
        {
          name: "John mayer",
        },
      ],
      protocol: "any_protocol",
      casedata: "any_casedata",
      event: [],
    });
    expect(caseTest).toEqual(caseRepository.data);
  });

  test("should throw an Error if error occurs in the database", async () => {
    const  sut = new CreateNewCaseUseCase(newCaseRepositoryMock)
    await expect(
      sut.execute({
        title: "Sample Case",
        customer: "John Doe",
        customerId: "any_custom",
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
      })
    ).rejects.toThrowError("Erro ao criar novo caso");
  });

  test("should throw an Error if input data is incomplete", async () => {
    const sut = new CreateNewCaseUseCase(newCaseRepositoryMock);
    const params = {
      title: "Sample Case",
      customer: "John Doe",
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

    await expect(sut.execute(params)).rejects.toThrowError(
      "Dados de entrada incompletos"
    );
  });
});
