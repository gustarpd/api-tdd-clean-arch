export class DeleteWorkSpaceUseCase {
  constructor(deleteWorkSpaceRespository) {
    this.deleteWorkSpaceRespository = deleteWorkSpaceRespository;
  }
  async delete(taskId) {
    try {
      return await this.deleteWorkSpaceRespository.deleteById(taskId);
    } catch (error) {
      throw error;
    }
  }
}
