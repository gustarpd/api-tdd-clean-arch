export class EditWorkSpaceUseCase {
  constructor(editWorkSpaceRepository) {
    this.editWorkSpaceRepository = editWorkSpaceRepository;
  }

  async edit({ taskId, description, owner, priority }) {
    try {
      const editedUser = await this.editWorkSpaceRepository.edit({
        taskId,
        description,
        owner,
        priority,
      });
      if (editedUser) {
        return {
          success: true,
          message: "Agenda atualizada com sucesso.",
        };
      }

      return { success: false, message: "Erro ao atualizar o cliente" };
    } catch (error) {
      return new Error(`${error}`);
    }
  }
}
