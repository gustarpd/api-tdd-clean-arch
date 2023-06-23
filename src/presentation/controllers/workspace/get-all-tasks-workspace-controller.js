import { HttpResponse } from "../../helpers/httpReponse.js";

export class GetAllTasksController {
  constructor(getAllTasksUseCase) {
    this.getAllTaksUseCase = getAllTasksUseCase;
  }
  async handle(httpRequest = {}) {
    try {
      const tasks = await this.getAllTaksUseCase.getTasks();
      return HttpResponse.ok(tasks);
    } catch (error) {
      throw error;
    }
  }
}
