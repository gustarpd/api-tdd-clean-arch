export class DeleteDocumentUseCase {
  constructor(deleteDocumentRepository) {
    this.deleteDocumentRepository = deleteDocumentRepository;
  }

  async execute(id) {
    try {
      const deleteDocumentById = await this.deleteDocumentRepository.deleteById(
        id
      );
      if (deleteDocumentById.deletedCount === 1) {
        return { success: true, message: "Documento excluído com sucesso." };
      }
      return {
        success: false,
        message: "Não foi possivel excluír o documento com o ID fornecido.",
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
