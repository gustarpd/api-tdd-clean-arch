import { HttpResponse } from "../../helpers/httpReponse.js";

export class DeleteCaseController {
  constructor(deleteCaseUseCase) {
    this.deleteCaseUseCase = deleteCaseUseCase;
  }
  async handle(httpRequest) {
    try {
      if (!httpRequest.id || httpRequest.id === "") {
        return HttpResponse.InternalError();
      }

      const deleteCase = await this.deleteCaseUseCase.execute(httpRequest.id);
      return HttpResponse.ok(deleteCase);
    } catch (error) {
      return HttpResponse.InternalError();
    }
  }
}
