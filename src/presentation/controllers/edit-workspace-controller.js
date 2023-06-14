import { HttpResponse } from "../../presentation/helpers/httpReponse.js";
import { MissingParamError } from "../../utils/errors/missing-params-error.js";

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
      console.log(httpRequest)
      if (!taskId) {
        throw new MissingParamError("taskId");
      }
      if (!description) {
        throw new MissingParamError("description");
      }
      if (!owner) {
        throw new MissingParamError("owner");
      }
      if (!priority) {
        throw new MissingParamError("priority");
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
