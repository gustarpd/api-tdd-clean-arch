import { WorkSpace } from "../db/schemas/Workspace.js";

export class GetAllTasksRepository {
  async findAll() {
    try {
      const documents = await WorkSpace.find({});
      return documents;
    } catch (err) {
      throw err;
    }
  }
}
