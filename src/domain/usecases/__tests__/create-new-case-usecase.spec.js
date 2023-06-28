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

const makeCaseRepositoryWithError = () => {
  class CaseRepository {
    async save() {
      throw new Error('Erro ao salvar o caso');
    }
  }

  const caseRepository = new CaseRepository();
  return caseRepository;
};

class CreateNewCaseUseCase {
  constructor(newCaseRepository) {
    this.newCaseRepository = newCaseRepository;
  }

  async execute({
    title,
    customer,
    status,
    owner,
    protocol,
    casedata,
    history,
  }) {
    if (
      !title ||
      !customer ||
      !status ||
      !owner ||
      !protocol ||
      !casedata ||
      !history
    ) {
      throw new Error("Dados de entrada incompletos");
    }

    try {
      const newCase = await this.newCaseRepository.save({
        title,
        customer,
        status,
        owner,
        protocol,
        casedata,
        history,
      });

      return newCase;
    } catch (error) {
      console.error("Erro ao criar novo caso:", error);
      throw new Error("Erro ao criar novo caso");
    }
  }
}

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
      status: "any_status",
      owner: "any_owner",
      protocol: "any_protocol",
      casedata: [
        {
          title: "any_case_title",
        },
      ],
      history: "any_history",
    });
    expect(caseTest).toEqual(caseRepository.data);
  });

  test("should throw an Error if error ocurrs in database", async () => {
    const newCaseRepositoryStub = makeCaseRepositoryWithError()
    const usecase = new CreateNewCaseUseCase(newCaseRepositoryStub);
    const caseTest = usecase.execute({
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
    });
    expect(caseTest).rejects.toThrow()
  });

  test("should call execute method with correct values", async () => {
    const newCaseRepositoryStub = makeCaseRepositoryWithError()
    const usecase = new CreateNewCaseUseCase(newCaseRepositoryStub);
    const caseTest = usecase.execute({});
    expect(caseTest).rejects.toThrow()
  });
});
