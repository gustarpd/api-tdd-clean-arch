import { EditCaseUseCase } from "../../domain/usecases/managecases/edit-case-usecase.js";
import { UpdateCaseRepository } from "../../infra/repositories/update-case-repository.js";
import { UpdateCasController } from "../../presentation/controllers/cases/update-new-case-controller.js";

export class UpdateCaseCompose {
  static compose() {
    const makeUpdadeCaseRepository = new UpdateCaseRepository();
    const makeUpdadeCaseUseCase = new EditCaseUseCase(makeUpdadeCaseRepository);
    return new UpdateCasController(makeUpdadeCaseUseCase);
  }
}
