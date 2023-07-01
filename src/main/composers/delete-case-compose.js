import { DeleteCaseUseCase } from '../../domain/usecases/managecases/delete-case-usecase.js'
import { DeleteCaseController } from '../../presentation/controllers/cases/delete-case-controller.js'
import { DeleteCaseRepository } from '../../infra/repositories/delete-case-repository.js'

export class DeleteCaseCompose {
  static compose() {
    const deleteCaseRepository = new DeleteCaseRepository()
    const deleteCaseUseCase = new DeleteCaseUseCase(deleteCaseRepository)
    return new DeleteCaseController(deleteCaseUseCase)
  }
}
