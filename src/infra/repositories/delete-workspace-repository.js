import { WorkSpace } from "../db/schemas/Workspace.js";

export class DeleteWorkSpaceRespository {
  async deleteById(id) {
    try {
      const result = await WorkSpace.findByIdAndDelete(id);
      return result
    } catch (err) {
      throw err;
    }
  }
}
