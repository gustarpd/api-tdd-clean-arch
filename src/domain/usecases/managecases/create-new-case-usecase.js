export class CreateNewCaseUseCase {
  constructor(newCaseRepository) {
    this.newCaseRepository = newCaseRepository;
  }

  async execute({
    title,
    customer,
    involved_parties,
    awarded_amount,
    status,
    owner,
    protocol,
    casedata,
    event,
  }) {
    if (
      !title ||
      !customer ||
      !status ||
      !owner ||
      !protocol ||
      !casedata ||
      !event
    ) {
      throw new Error("Dados de entrada incompletos");
    }

    try {
      const newCase = await this.newCaseRepository.save({
        title,
        customer,
        involved_parties,
        awarded_amount,
        status,
        owner,
        protocol,
        casedata,
        event,
      });

      return newCase;
    } catch (error) {
      console.error("Erro ao criar novo caso:", error);
      throw new Error("Erro ao criar novo caso");
    }
  }
}
