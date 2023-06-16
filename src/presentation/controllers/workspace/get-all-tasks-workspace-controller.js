export class GetAllTasksController {
  constructor(getAllTasksUseCase) {
    this.getAllTaksUseCase = getAllTasksUseCase;
  }
  async handle(httpRequest = {}) {
    try {
      return await this.getAllTaksUseCase.findAll();
    } catch (error) {
      throw error;
    }
  }
}
