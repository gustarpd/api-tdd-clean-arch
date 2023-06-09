export class GetDocumentsUseCase {
  constructor(getDocumentsRepository) {
    this.getDocumentsRepository = getDocumentsRepository;
  }

  async execute() {
    const documents = await this.getDocumentsRepository.getAll();
    if (documents.length === 0) {
      return { message: "Nenhum documento encontrado." };
    }
    return documents;
  }
}
