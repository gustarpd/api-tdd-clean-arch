export class EditCaseUseCase {
  constructor(editCaseRepository) {
    this.editCaseRepository = editCaseRepository;
  }

  async update(data) {
    try {
      const edited = await this.editCaseRepository.editById(data);
      return edited;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
