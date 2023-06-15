import { WorkSpace } from "../db/schemas/Workspace.js";

export class DeleteWorkSpaceRespository {
  async deleteById(id) {
    try {
      const result = await WorkSpace.findByIdAndDelete(id);
      if (!result) {
        return {
          success: false,
          message: "Nenhum documento encontrado com o ID fornecido.",
        };
      }
      return {
        success: true,
        message: "Documento excluído com sucesso.",
      };
    } catch (err) {
      throw err;
    }
  }
}
