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
});
