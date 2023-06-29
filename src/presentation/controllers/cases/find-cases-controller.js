import { HttpResponse } from "../../helpers/httpReponse.js";

export class FindAllCasesController {
  constructor(findAllUseCase) {
    this.findAllUseCase = findAllUseCase;
  }
  async handle(httpRequest) {
    try {
      if (!httpRequest) {
        return HttpResponse.InternalError();
      }
      const cases = await this.findAllUseCase.find();
      return HttpResponse.ok(cases);
    } catch (error) {
      console.error(error);
      return HttpResponse.InternalError();
    }
  }
}
