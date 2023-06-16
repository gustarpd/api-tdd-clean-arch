export class DeleteWorkSpaceUseCase {
  constructor(deleteWorkSpaceRespository) {
    this.deleteWorkSpaceRespository = deleteWorkSpaceRespository;
  }
  async delete(taskId) {
    try {
      const getTasksByIdFromRepository =
        await this.deleteWorkSpaceRespository.deleteById(taskId);
      if (!getTasksByIdFromRepository) {
        return {
          success: false,
          message: "Nenhum documento encontrado com o ID fornecido.",
        };
      }
      return {
        success: true,
        message: "Documento excluído com sucesso.",
      };
    } catch (error) {
      throw error;
    }
  }
}
