export class CreateNewCaseUseCase {
  constructor(newCaseRepository) {
    this.newCaseRepository = newCaseRepository;
  }

  async execute({
    title,
    customer,
    customerId,
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
      !customerId ||
      !awarded_amount ||
      !involved_parties ||
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
        customerId,
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
      throw new Error("Erro ao criar novo caso");
    }
  }
}
