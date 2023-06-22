import { UpdateCustomerUseCase } from "../../domain/usecases/customer-office/edit-customer-usecase.js";
import { UpdateCustomerRepository } from "../../infra/repositories/db-edit-customer-repository.js";
import { UpdateCustomerController } from "../../presentation/controllers/customers/update-customer-controller.js";

export class UpdateCustomerCompose {
  static compose() {
    const makeCustomerRepository = new UpdateCustomerRepository();
    const makeCustomerUseCase = new UpdateCustomerUseCase(makeCustomerRepository);
    return new UpdateCustomerController(makeCustomerUseCase);
  }
}
