import { HttpResponse } from "../../../presentation/helpers/httpReponse.js";

export class UpdateCustomerUseCase {
  constructor(caseUseCaseRepository) {
    this.caseUseCaseRepository = caseUseCaseRepository;
  }

  async update(data) {
    try {
      const editedUser = await this.caseUseCaseRepository.edit(data);
      if(!data) {
        return HttpResponse.InternalError()
      }
      if (!editedUser) {
        return HttpResponse.InternalError();
      }

      return editedUser
    } catch (error) {
      console.error("Error occurred while editing:", error.message);
    }
  }
}
