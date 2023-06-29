import { FindAllCasesUseCase } from '../../domain/usecases/managecases/find-all-case-usecase.js'
import { FindAllCasesRepository } from '../../infra/repositories/find-all-cases-repository.js'
import { FindAllCasesController } from '../../presentation/controllers/cases/find-cases-controller.js'

export class FindAllCaseCompose {
  static compose() {
    const makeGetAllCasesRepository = new FindAllCasesRepository()
    const makeGetAllCasesUseCase = new FindAllCasesUseCase(makeGetAllCasesRepository)
    return new FindAllCasesController(makeGetAllCasesUseCase)
  }
}
