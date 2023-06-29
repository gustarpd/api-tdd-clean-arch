export class EditCaseUseCase {
    constructor(editCaseRepository) {
      this.editCaseRepository = editCaseRepository;
    }
  
    async edit({
      id,
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
      const edited = await this.editCaseRepository.editById({
        id,
        title,
        customer,
        involved_parties,
        event,
        protocol,
        casedata,
        awarded_amount,
        status,
        owner,
      });
  
      return edited;
    }
  }
  