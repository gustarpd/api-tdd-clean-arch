import { HttpResponse } from "../../helpers/httpReponse";

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
      return deleteDocument;
    } catch (error) {
      return HttpResponse.InternalError();
    }
  }
}
