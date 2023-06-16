import { GetTasksWorkSpaceUseCase } from "../../domain/usecases/workspace/get-all-workspace-usecase";
import { GetAllTasksRepository } from "../../infra/repositories/get-all-tasks-repository";
import { GetAllTasksController } from "../../presentation/controllers/workspace/get-all-tasks-workspace-controller";

export class GetTaskWorkSpaceCompose {
  static compose() {
    const makeGetAllTasksRepository = new GetAllTasksRepository();
    const makeGetTasksWorkspace = new GetTasksWorkSpaceUseCase(makeGetAllTasksRepository);
    return new GetAllTasksController(makeGetTasksWorkspace);
  }
}
