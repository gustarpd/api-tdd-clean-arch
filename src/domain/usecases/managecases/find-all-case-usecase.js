export class FindAllCasesUseCase {
  constructor(findAllCasesRepository) {
    this.findAllCasesRepository = findAllCasesRepository;
  }

  async find(data) {
    try {
      return this.findAllCasesRepository.findAll(data);
    } catch (error) {
      throw new Error(error);
    }
  }
}
