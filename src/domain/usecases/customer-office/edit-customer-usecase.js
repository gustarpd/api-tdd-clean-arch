import { HttpResponse } from "../../../presentation/helpers/httpReponse.js";

export class UpdateCustomerUseCase {
  constructor(caseUseCaseRepository) {
    this.caseUseCaseRepository = caseUseCaseRepository;
  }

  async update(data) {
    const editedUser = await this.caseUseCaseRepository.edit(data);
    if (!data || !editedUser) {
      return HttpResponse.InternalError();
    }

    return {
      success: true,
      message: "Cliente atualizado com sucesso.",
    };
  }
}
