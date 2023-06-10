import { MissingParamError } from "../../utils/errors/missing-params-error";
import { WorkSpace } from '../entities/workspace'
import { HttpResponse } from "../../presentation/helpers/httpReponse";

export class AddWorkSpace {
    constructor(addWorkSpaceRepository, loadUserByTokenRepository) {
      this.addWorkSpaceRepository = addWorkSpaceRepository;
      this.loadUserByTokenRepository = loadUserByTokenRepository;
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
      const user = await this.loadUserByTokenRepository.loadByToken(accessToken);
      if (user) {
        const workspace = new WorkSpace({ description, owner, priority });
        this.addWorkSpaceRepository.save(workspace);
        return workspace;
      }
  
      return HttpResponse.unauthorizeError();
    }
  }