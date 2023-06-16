import { EditWorkSpaceUseCase } from '../../domain/usecases//workspace/edit-workspace-usecase.js'
import { EditWorkspaceRepository } from '../../infra/repositories/edit-workspace-repository.js'
import { EditWorkSpaceController } from '../../presentation/controllers/edit-workspace-controller.js'

export class EditWorkSpacelewareRouterCompose {
  static compose() {
    const makeEditWorkspace = new EditWorkspaceRepository()
    const makeEditWorkSpaceUseCase = new EditWorkSpaceUseCase(makeEditWorkspace)
    return new EditWorkSpaceController(makeEditWorkSpaceUseCase)
  }
}
