import { HttpResponse } from "../../../presentation/helpers/httpReponse";

export class UpdateCustomerUseCase {
  constructor(caseUseCaseRepository) {
    this.caseUseCaseRepository = caseUseCaseRepository;
  }

  async edit(data) {
    try {
      const editedUser = await this.caseUseCaseRepository.create(data);
      if (!editedUser) {
        return HttpResponse.InternalError();
      }

      return {
        success: true,
        message: "Cliente atualizado com sucesso."
      }
    } catch (error) {
      console.error("Error occurred while editing:", error.message);
    }
  }
}
