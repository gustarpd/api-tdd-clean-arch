class DeleteWorkSpaceUseCase {
  constructor(deleteWorkSpaceRespository) {
    this.deleteWorkSpaceRespository = deleteWorkSpaceRespository;
  }

  async delete(taskId) {
    return await this.deleteWorkSpaceRespository.deleteById(taskId);
  }
}
