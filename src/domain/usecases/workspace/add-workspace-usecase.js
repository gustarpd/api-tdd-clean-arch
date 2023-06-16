import { MissingParamError } from "../../../utils/errors/missing-params-error.js";
import { WorkSpace } from "../../entities/workspace.js";
import { HttpResponse } from "../../../presentation/helpers/httpReponse.js";

export class AddWorkSpace {
  constructor(addWorkSpaceRepository) {
    this.addWorkSpaceRepository = addWorkSpaceRepository;
  }
  async add({ description, owner, priority }) {
    if (!description) {
      throw new MissingParamError("description");
    }
    if (!owner) {
      throw new MissingParamError("owner");
    }
    if (!priority) {
      throw new MissingParamError("priority");
    }

    const workspace = new WorkSpace({ description, owner, priority });
    const workspaceRepository = await this.addWorkSpaceRepository.Add(workspace);
    if(workspaceRepository) return workspaceRepository
    return HttpResponse.unauthorizeError();
  }
}
