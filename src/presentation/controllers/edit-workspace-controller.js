import { HttpResponse } from "../../presentation/helpers/httpReponse.js";


export class EditWorkSpaceController {
  constructor(editWorkspace) {
    this.editWorkspace = editWorkspace;
  }

  async handle(httpRequest) {
    try {
      if (!httpRequest) {
        return HttpResponse.InternalError();
      }
      const { taskId, description, owner, priority } = httpRequest.body;

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
