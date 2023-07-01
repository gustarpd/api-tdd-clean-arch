import { HttpResponse } from "../../helpers/httpReponse.js";
import { MissingParamError } from "../../../utils/errors/missing-params-error.js";

export class AddDocumentController {
  constructor(addDocumentUseCase) {
    this.addDocumentUseCase = addDocumentUseCase;
  }
  async handle(httpRequest) {
    try {
      if (!httpRequest) {
        return HttpResponse.InternalError();
      }
      const requiredParams = ["description", "owner", "url", "title"];

      for (const param of requiredParams) {
        if (!httpRequest[param]) {
          return HttpResponse.badRequest(new MissingParamError(param));
        }
      }
      const document = await this.addDocumentUseCase.execute(httpRequest);
      return HttpResponse.created(document);
    } catch (error) {
      return HttpResponse.InternalError();
    }
  }
}
