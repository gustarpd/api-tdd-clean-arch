import { WorkSpace } from "../db/schemas/Workspace.js";

export class EditWorkspaceRepository {
  async edit({ taskId, description, owner, priority }) {
    const user = await WorkSpace.updateOne(
      {
        _id: taskId,
      },
      {
        $set: {
          description,
          owner,
          priority,
        },
      }
    );
    return user;
  }
}
