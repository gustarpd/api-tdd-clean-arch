class CreateNewCaseUseCase {
  constructor(newCaseRepository) {
    this.newCaseRepository = newCaseRepository;
  }

  async execute({
    title,
    customer,
    status,
    owner,
    protocol,
    casedata,
    history,
  }) {
    if (
      !title ||
      !customer ||
      !status ||
      !owner ||
      !protocol ||
      !casedata ||
      !history
    ) {
      throw new Error("Dados de entrada incompletos");
    }

    try {
      const newCase = await this.newCaseRepository.save({
        title,
        customer,
        status,
        owner,
        protocol,
        casedata,
        history,
      });

      return newCase;
    } catch (error) {
      console.error("Erro ao criar novo caso:", error);
      throw new Error("Erro ao criar novo caso");
    }
  }
}
