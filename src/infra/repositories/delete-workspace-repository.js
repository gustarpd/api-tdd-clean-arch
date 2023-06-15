import { WorkSpace } from "../db/schemas/Workspace";

export class DeleteWorkSpaceRespository {
  async deleteById(id) {
    try {
      return await WorkSpace.findByIdAndDelete(id);
    } catch (err) {
      console.log(err);
    }
  }
}
