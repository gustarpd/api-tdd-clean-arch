import { HttpResponse } from "../helpers/httpReponse";
import { MissingParamError } from "../../utils/errors/missing-params-error";

class CreateNewCaseUseCaseController {
    constructor(createNewCaseUseCase) {
      this.createNewCaseUseCase = createNewCaseUseCase;
    }
  
    async handle(httpRequest) {
      try {
        if (!httpRequest) {
          return HttpResponse.InternalError();
        }
  
        const requiredFields = [
          "title",
          "customer",
          "action_type",
          "awarded_amount",
          "involved_parties",
          "status",
          "owner",
          "protocol",
          "casedata",
          "history",
        ];
  
        for (const field of requiredFields) {
          if (!httpRequest[field]) {
            return HttpResponse.badRequest(new MissingParamError(field));
          }
        }
  
        const newCase = await this.createNewCaseUseCase.execute(httpRequest);
        if (newCase) return HttpResponse.ok(newCase);
      } catch (error) {
        return HttpResponse.InternalError();
      }
    }
  }
  