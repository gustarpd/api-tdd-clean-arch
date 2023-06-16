import { MissingParamError } from "../../../utils/errors/missing-params-error.js";
import { HttpResponse } from "../../helpers/httpReponse.js";

export class DeleteWorkSpaceController {
  constructor(deleteWorkSpaceUseCase) {
    this.deleteWorkSpaceUseCase = deleteWorkSpaceUseCase;
  }
  async handle(httpRequest) {
    try {
      if (!httpRequest) {
        return HttpResponse.InternalError();
      }
      const { taskId } = httpRequest;
      const workspace = await this.deleteWorkSpaceUseCase.delete(taskId);
      return HttpResponse.ok(workspace);
    } catch (error) {
      return HttpResponse.unauthorizeError();
    }
  }
}