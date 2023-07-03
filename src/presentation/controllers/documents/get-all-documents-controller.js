import { HttpResponse } from "../../helpers/httpReponse";

export class GetAllDocumentsController {
    constructor(getAllDocumentsUseCase) {
      this.getAllDocumentsUseCase = getAllDocumentsUseCase;
    }
  
    async handle(httpRequest) {
      try {
        if (!httpRequest) {
          return HttpResponse.InternalError();
        }
  
        const documents = await this.getAllDocumentsUseCase.execute();
        return HttpResponse.ok(documents);
      } catch (error) {
        console.error(error);
        throw new Error("some error in database", error);
      }
    }
  }
  