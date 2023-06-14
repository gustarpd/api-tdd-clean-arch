export class EditWorkSpaceUseCase {
  constructor(editWorkSpaceRepository) {
    this.editWorkSpaceRepository = editWorkSpaceRepository;
  }

  async edit({ taskId, description, owner, priority }) {
    try {
      await this.editWorkSpaceRepository.edit({
        taskId,
        description,
        owner,
        priority,
      });

      return {}
    } catch (error) {
      console.error(`Internal Error ${error}`);
      return null;
    }
  }
}
