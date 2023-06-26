import { HttpResponse } from "../../helpers/httpReponse.js";
import { MissingParamError } from "../../../utils/errors/missing-params-error.js";

export class EditWorkSpaceController {
  constructor(editWorkspace) {
    this.editWorkspace = editWorkspace;
  }

  async handle(httpRequest) {
    try {
      if (!httpRequest) {
        return HttpResponse.InternalError();
      }
      const { taskId, description, owner, priority } = httpRequest

      if (!taskId) {
        return HttpResponse.badRequest(new MissingParamError("taskId"))
      }
      if (!description) {
        return HttpResponse.badRequest(new MissingParamError("description"))
      }
      if (!owner) {
        return HttpResponse.badRequest(new MissingParamError("owner"))
      }
      if (!priority) {
        return HttpResponse.badRequest(new MissingParamError("priority"))
      }
      const workspace = await this.editWorkspace.edit({
        taskId,
        description,
        owner,
        priority,
      });
      return HttpResponse.ok(workspace);
    } catch (error) {
      console.log(error);
      return HttpResponse.InternalError();
    }
  }
}
