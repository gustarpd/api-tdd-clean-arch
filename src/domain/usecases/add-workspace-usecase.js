import { MissingParamError } from "../../utils/errors/missing-params-error";
import { WorkSpace } from "../entities/workspace";
import { HttpResponse } from "../../presentation/helpers/httpReponse";

export class AddWorkSpace {
  constructor(addWorkSpaceRepository) {
    this.addWorkSpaceRepository = addWorkSpaceRepository;
  }
  async add({ description, owner, priority, accessToken }) {
    if (!description) {
      throw new MissingParamError("description");
    }
    if (!owner) {
      throw new MissingParamError("owner");
    }
    if (!priority) {
      throw new MissingParamError("priority");
    }
    if (!accessToken) {
      throw new MissingParamError("accessToken");
    }

    const workspace = new WorkSpace({ description, owner, priority });
    const workspaceRepository = this.addWorkSpaceRepository.Add(workspace);
    if(workspaceRepository) return workspaceRepository
    return HttpResponse.unauthorizeError();
  }
}
