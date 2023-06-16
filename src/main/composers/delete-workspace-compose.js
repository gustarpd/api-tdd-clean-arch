import { DeleteWorkSpaceRespository } from "../../infra/repositories/delete-workspace-repository.js";
import { DeleteWorkSpaceUseCase } from "../../domain/usecases/workspace/delete-workspace-usecase.js";
import { DeleteWorkSpaceController } from "../../presentation/controllers/delete-workspace-controller.js";

export class DeleteWorkSpaceCompose {
  static compose() {
    const loadUserByTokenlRepository = new DeleteWorkSpaceRespository();
    const deleteByIdUseCase = new DeleteWorkSpaceUseCase(loadUserByTokenlRepository)
    return new DeleteWorkSpaceController(deleteByIdUseCase);
  }
}
