import { HttpResponse } from "../../helpers/httpReponse.js";

export class UpdateCasController {
  constructor(updateCaseUseCase) {
    this.updateCaseUseCase = updateCaseUseCase;
  }

  async handle(httpRequest) {
    try {
      if (!httpRequest) {
        return HttpResponse.InternalError();
      }

      const updateCase = await this.updateCaseUseCase.update(httpRequest);
      console.log(updateCase);
      return HttpResponse.ok(updateCase);
    } catch (error) {
      console.error(error);
      return HttpResponse.InternalError();
    }
  }
}
