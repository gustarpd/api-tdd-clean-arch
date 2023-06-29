import { HttpResponse } from "../../helpers/httpReponse";

class FindAllCasesController {
  constructor(findAllUseCase) {
    this.findAllUseCase = findAllUseCase;
  }
  async handle(httpRequest) {
    try {
      if (!httpRequest) {
        return HttpResponse.InternalError();
      }
      const cases = await this.findAllUseCase.find();
      return cases;
    } catch (error) {
      console.error(error);
      return HttpResponse.InternalError();
    }
  }
}
