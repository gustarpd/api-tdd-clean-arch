import { DeleteCustomerUseCase } from "../../domain/usecases/customer-office/delete-customer-usecase.js";
import { DeleteCustomerController } from "../../presentation/controllers/customers/delete-customer-controller.js";
import { DeleteCustomerRepository } from "../../infra/repositories/delete-customer-repository.js";

export class deleteCustomerCompose {
  static compose() {
    const makeDeleteCustomerRepository = new DeleteCustomerRepository();
    const makeDeleteCustomerUseCase = new DeleteCustomerUseCase(
      makeDeleteCustomerRepository
    );
    return new DeleteCustomerController(makeDeleteCustomerUseCase);
  }
}
