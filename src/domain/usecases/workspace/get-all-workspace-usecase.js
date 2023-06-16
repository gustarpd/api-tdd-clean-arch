export class GetTasksWorkSpaceUseCase {
  constructor(getTasksWorkSpaceRepository) {
    this.getTasksWorkSpaceRepository = getTasksWorkSpaceRepository;
  }

  async getTasks() {
    try {
      const allTasksFromRepository = await this.getTasksWorkSpaceRepository.findAll();
      if (allTasksFromRepository.length === 0) {
        return {
          message: "Nenhuma tarefa foi encontrada.",
        };
      }
      return allTasksFromRepository
    } catch (error) {
      throw error;
    }
  }
}
