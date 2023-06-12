import { MissingParamError } from "../../utils/errors/missing-params-error.js";
import { WorkSpace } from "../db/schemas/Workspace.js";

export class AddWorkSpaceRepository {
  async Add(workspace) {
    if (!workspace) {
      throw new MissingParamError("workspace");
    }

    const load = new WorkSpace({
      ...workspace
    });
    await load.save()

    return load;
  }
}
