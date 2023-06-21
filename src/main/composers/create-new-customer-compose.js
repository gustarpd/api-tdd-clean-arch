import { CreateCustomerOffice } from '../../domain/usecases/customer-office/create-new-customer.js'
import { CreateCustomerController } from '../../presentation/controllers/customers/create-new-customer-controller.js'
import { CreateCustomerOfficeRepository } from '../../infra/repositories/create-new-customer-repository.js'

export class CreateCustomerCompose {
  static compose() {
    const makeCreateCustomerRespository = new CreateCustomerOfficeRepository()
    const makeCreateCustomerUseCase = new CreateCustomerOffice(makeCreateCustomerRespository)
    return new CreateCustomerController(makeCreateCustomerUseCase)
  }
}
