import { MissingParamError } from "../../utils/errors/missing-params-error.js";
import { HttpResponse } from "../helpers/httpReponse.js";

export class AddWorkSpaceController {
  constructor(addWorkSpace) {
    this.addWorkSpace = addWorkSpace;
  }
  async handle(httpRequest) {
    try {
      if (!httpRequest) {
        return HttpResponse.InternalError();
      }
      const { description, owner, priority } = httpRequest;

        if(!description) {
          return HttpResponse.badRequest(new MissingParamError("description"))
        }
        if(!owner) {
          return HttpResponse.badRequest(new MissingParamError("owner"))
        }
        if(!priority) {
          return HttpResponse.badRequest(new MissingParamError("priority"))
        }
      
      const workspace = await this.addWorkSpace.add({
        description,
        owner,
        priority,
      });
      return HttpResponse.created({ workspace });
    } catch (error) {
      return HttpResponse.unauthorizeError();
    }
  }
}