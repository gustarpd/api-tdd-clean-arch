import { HttpResponse } from "../../../presentation/helpers/httpReponse";
import { CasesCustomerUseCase } from "../customer-office/edit-customer";

const makeCasesUseCaseRepositorySpy = () => {
  class CasesUseCase {
    async create(data) {
      return this.data;
    }
  }

  const caseUseCaseRepository = new CasesUseCase();
  caseUseCaseRepository.data = {
    name: "John Doe",
    phone: "1234567890",
    email: "john@example.com",
  };
  return caseUseCaseRepository;
};

const makeCasesUseCaseRepositoryNullSpy = () => {
  class CasesUseCase {
    async create(data) {
      return null;
    }
  }

  const caseUseCaseRepository = new CasesUseCase();
  return caseUseCaseRepository;
};

const makeSut = () => {
  const caseUseCaseRepository = makeCasesUseCaseRepositorySpy();
  const sut = new CasesCustomerUseCase(caseUseCaseRepository);
  return {
    sut,
    caseUseCaseRepository,
  };
};

describe("Customer Office", () => {
  test("should execute use case and return customer data if created correctly", async () => {
    const { sut } = makeSut();
    const inputData = {
      name: "John Doe",
      phone: "1234567890",
      email: "john@example.com",
    };

    const createdData = await sut.edit(inputData);
    expect(createdData).toEqual(inputData);
  });

  test("should catch an error in the catch block", async () => {
    const repository = makeCasesUseCaseRepositoryNullSpy();
    const sut = new CasesCustomerUseCase(repository);
    const createdData = await sut.edit({});
    expect(createdData).toEqual(HttpResponse.InternalError());
  });

  test("should catch Error", async () => {
    const { sut } = makeSut();
    try {
      await sut.edit({});
      fail("The test should have failed here");
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});
