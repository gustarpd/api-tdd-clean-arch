export class DeleteCaseUseCase {
  constructor(deleteCaseRepository) {
    this.deleteCaseRepository = deleteCaseRepository;
  }
  async execute(id) {
    try {
      const deleteCase = await this.deleteCaseRepository.deleteById(id);
      if (deleteCase.deleteCount === 1) {
        return { success: true, message: "Processo deletado com sucesso" };
      }
      return { success: false, message: "Processo não encontrado" };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
