import { HttpResponse } from "../../helpers/httpReponse.js";


export class UpdateCustomerController {
    constructor(updateCustomerUseCase) {
      this.updateCustomerUseCase = updateCustomerUseCase;
    }
  
    async handle(httpRequest) {
      try {
        if (!httpRequest) {
          return HttpResponse.InternalError()
        }
  
        if (!httpRequest.id) {
          return HttpResponse.badRequest(new MissingParamError("id"));
        }
  
        const updatedUser = await this.updateCustomerUseCase.update(httpRequest);
        if (!updatedUser) {
          return HttpResponse.InternalError();
        }
        console.log(httpRequest)
        return HttpResponse.ok(updatedUser);
      } catch (error) {
        return HttpResponse.InternalError()
      }
    }
  }
  