import { HttpResponse } from "../../../presentation/helpers/httpReponse";

export class EditCustomer {
  constructor(caseUseCaseRepository) {
    this.caseUseCaseRepository = caseUseCaseRepository;
  }

  async edit(data) {
    try {
      const editedUser = await this.caseUseCaseRepository.create(data);
      if (!editedUser) {
        return HttpResponse.InternalError();
      }

      return editedUser;
    } catch (error) {
      throw error;
    }
  }
}
