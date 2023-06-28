import { CreateNewCaseUseCase } from '../../domain/usecases/managecases/create-new-case-usecase.js'
import { CreateNewCaseController } from '../../presentation/controllers/cases/create-new-case-controller.js'
import { CreateNewCaseUseCaseRepository } from '../../infra/repositories/create-new-case-repository.js'

export class CreateNewCaseCompose {
  static compose() {
    const makeCaseRespository = new CreateNewCaseUseCaseRepository()
    const makeCaseUseCase = new CreateNewCaseUseCase(makeCaseRespository)
    return new CreateNewCaseController(makeCaseUseCase)
  }
}
