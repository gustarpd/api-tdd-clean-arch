import { DeleteCustomerUseCase } from '../customer-office/delete-customer-usecase.js'

const makeDeleteCustomerRepository = () => {
  class DeleteCustomerRepository {
    async delete() {
      return {};
    }
  }

  return new DeleteCustomerRepository();
};

const makeDeleteCustomerRepositoryNull = () => {
  class DeleteCustomerRepository {
    async delete() {
      return null;
    }
  }

  return new DeleteCustomerRepository();
};

const makeSut = () => {
  const makeDeleteCustomeRepository = makeDeleteCustomerRepository();
  const sut = new DeleteCustomerUseCase(makeDeleteCustomeRepository);
  return {
    sut,
  };
};

describe("DeleteCustomer UseCase", () => {
  test("should return message and success true when customer are deleted", async () => {
    const { sut } = makeSut();
    expect((await sut.execute("any_id")).message).toBe(
      "Cliente deletado com sucesso."
    );
  });

  test("should return message and success false when customer are not deleted", async () => {
    const repositoryWithValueNull = makeDeleteCustomerRepositoryNull();
    const sut = new DeleteCustomerUseCase(repositoryWithValueNull);
    expect((await sut.execute("any_id")).message).toBe(
      "Falha ao excluír o cliente."
    );
    expect((await sut.execute("any_id")).success).toBe(false);
  });
});