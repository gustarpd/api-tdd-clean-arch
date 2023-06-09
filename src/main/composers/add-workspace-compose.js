import { AddWorkSpace } from '../../domain/usecases/workspace/add-workspace-usecase.js'
import { AddWorkSpaceController } from '../../presentation/controllers/workspace/add-workspace-controller.js'
import { AddWorkSpaceRepository } from '../../infra/repositories/add-workspace-repository.js'

export class AddWorkSpaceCompose {
  static compose() {
    const makeAddAccountRespository = new AddWorkSpaceRepository()
    const makeAddWorkSpace = new AddWorkSpace(makeAddAccountRespository)
    return new AddWorkSpaceController(makeAddWorkSpace)
  }
}
