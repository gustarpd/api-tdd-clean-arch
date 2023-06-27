import { HttpResponse } from "../../../presentation/helpers/httpReponse";
import { UpdateCustomerUseCase } from "../customer-office/edit-customer-usecase.js";

const makeCasesUseCaseRepositorySpy = () => {
  class CasesUseCase {
    async edit(data) {
      return {
        success: true,
        message: "Cliente atualizado com sucesso.",
      }
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
    async edit(data) {
      return HttpResponse.InternalError();
    }
  }

  const caseUseCaseRepository = new CasesUseCase();
  return caseUseCaseRepository;
};

const makeSut = () => {
  const caseUseCaseRepository = makeCasesUseCaseRepositorySpy();
  const sut = new UpdateCustomerUseCase(caseUseCaseRepository);
  return {
    sut,
    caseUseCaseRepository,
  };
};

describe("Customer Office", () => {
  test("should execute use case and return customer data if created correctly", async () => {
    const { sut } = makeSut();
    const inputData = {
      id: 2,
      name: "John Doe",
      phone: "1234567890",
      email: "john@example.com",
    };

    const createdData = await sut.update(inputData);
    console.log(createdData)
    expect(createdData).toEqual({
      success: true,
      message: "Cliente atualizado com sucesso.",
    });
  });

  test("should catch an error in the catch block", async () => {
    const repository = makeCasesUseCaseRepositoryNullSpy();
    const sut = new UpdateCustomerUseCase(repository);
    expect(await sut.update()).toEqual(HttpResponse.InternalError());
  });

  test("should catch Error", async () => {
    const { sut } = makeSut();
    try {
      await sut.update({});
      fail("The test should have failed here");
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});
