import { HttpResponse } from "../../helpers/httpReponse.js";
import { MissingParamError } from "../../../utils/errors/missing-params-error.js";

export class CreateNewCaseController {
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
        "event",
      ];

      for (const field of requiredFields) {
        if (!httpRequest[field]) {
          return HttpResponse.badRequest(new MissingParamError(field));
        }
      }

      const newCase = await this.createNewCaseUseCase.execute(httpRequest);
      console.log(httpRequest);
      if (newCase) return HttpResponse.ok(newCase);
    } catch {
      return HttpResponse.InternalError();
    }
  }
}
