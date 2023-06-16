import { HttpResponse } from "../../helpers/httpReponse";

export class GetAllTasksController {
  constructor(getAllTasksUseCase) {
    this.getAllTaksUseCase = getAllTasksUseCase;
  }
  async handle(httpRequest = {}) {
    try {
      const tasks = await this.getAllTaksUseCase.findAll();
      return HttpResponse.ok(tasks);
    } catch (error) {
      throw error;
    }
  }
}
