class GetTasksWorkSpaceUseCase {
  constructor(getTasksWorkSpaceRepository) {
    this.getTasksWorkSpaceRepository = getTasksWorkSpaceRepository;
  }

  async getTasks() {
    try {
      await this.getTasksWorkSpaceRepository.findAll();
    } catch (error) {
      throw error;
    }
  }
}
