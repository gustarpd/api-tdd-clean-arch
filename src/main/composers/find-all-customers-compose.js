import { GetAllCustomer } from '../../domain/usecases/customer-office/get-customers-usecase.js'
import { GetAllCustomerRepository } from '../../infra/repositories/find-all-customers-repository.js'
import { FindAllCustomerController } from '../../presentation/controllers/customers/get-all-customers-controller.js'

export class FindAllCustomerCustomerCompose {
  static compose() {
    const makeGetAllCustomerRepository = new GetAllCustomerRepository()
    const makeGetAllCustomerUseCase = new GetAllCustomer(makeGetAllCustomerRepository)
    return new FindAllCustomerController(makeGetAllCustomerUseCase)
  }
}
