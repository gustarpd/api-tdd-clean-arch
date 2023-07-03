import { MissingParamError } from "../../../utils/errors/missing-params-error.js";
import { HttpResponse } from "../../helpers/httpReponse.js";

export class DeleteDocumentController {
  constructor(deleteDocumentById) {
    this.deleteDocumentById = deleteDocumentById;
  }

  async handle(httpRequest) {
    try {
      if (!httpRequest.id) {
        return HttpResponse.badRequest(new MissingParamError("id"));
      }
      if (!httpRequest) {
        return HttpResponse.InternalError();
      }
      const deleteDocument = await this.deleteDocumentById.execute(
        httpRequest.id
      );
      if (deleteDocument.success === false) {
        return HttpResponse.badRequest(deleteDocument);
      }
      console.log(HttpResponse.ok(deleteDocument))
      return HttpResponse.ok(deleteDocument);
    } catch (error) {
      console.log(error);
      return HttpResponse.InternalError();
    }
  }
}
