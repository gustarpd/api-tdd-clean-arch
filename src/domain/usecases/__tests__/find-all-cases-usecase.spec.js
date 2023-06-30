import { FindAllCasesUseCase } from "../managecases/find-all-case-usecase.js";

const makeFindAllCaseRepository = () => {
  class FindAllCasesUseCaseRepository {
    async findAll(data) {
      return data;
    }
  }

  const findCase = new FindAllCasesUseCaseRepository();
  findCase.data = {
    _id: "649cba113064d35fdf80d6ac",
    title: "edited",
    customer: "John Doe",
    awarded_amount: 5000,
    involved_parties: [
      {
        name: "John mayer",
        _id: "649cba113064d35fdf80d6ad",
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
        start_date: "2023-07-01T00:00:00.000Z",
        end_date: "2023-07-05T00:00:00.000Z",
        createdAt: "2023-06-28T08:00:00.000Z",
        _id: "649cba113064d35fdf80d6ae",
      },
      {
        title: "Second Event",
        owner: "Event Owner 2",
        start_date: "2023-07-10T00:00:00.000Z",
        end_date: "2023-07-15T00:00:00.000Z",
        createdAt: "2023-06-29T10:30:00.000Z",
        _id: "649cba113064d35fdf80d6af",
      },
    ],
    __v: 0,
  };
  return findCase;
};

const makeSut = () => {
  const findAllCasesRepository = makeFindAllCaseRepository();
  const sut = new FindAllCasesUseCase(findAllCasesRepository);
  return {
    sut,
    findAllCasesRepository,
  };
};

describe("EditCase UseCase", () => {
  test("should Find a case data with correctly data", async () => {
    const { sut, findAllCasesRepository } = makeSut();
    expect(
      await sut.find({
        _id: "649cba113064d35fdf80d6ac",
        title: "edited",
        customer: "John Doe",
        awarded_amount: 5000,
        involved_parties: [
          {
            name: "John mayer",
            _id: "649cba113064d35fdf80d6ad",
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
            start_date: "2023-07-01T00:00:00.000Z",
            end_date: "2023-07-05T00:00:00.000Z",
            createdAt: "2023-06-28T08:00:00.000Z",
            _id: "649cba113064d35fdf80d6ae",
          },
          {
            title: "Second Event",
            owner: "Event Owner 2",
            start_date: "2023-07-10T00:00:00.000Z",
            end_date: "2023-07-15T00:00:00.000Z",
            createdAt: "2023-06-29T10:30:00.000Z",
            _id: "649cba113064d35fdf80d6af",
          },
        ],
        __v: 0,
      })
    ).toEqual(findAllCasesRepository.data);
  });

  test("should throw an Error if data are no provided to findAll method", async () => {
    const newCaseRepositoryMock = {
      findAll: jest.fn().mockRejectedValue(new Error("Erro ao editar o caso")),
    };
    const sut = new FindAllCasesUseCase(newCaseRepositoryMock);
    await expect(sut.find()).rejects.toThrowError("Erro ao editar o caso");
  });
});
