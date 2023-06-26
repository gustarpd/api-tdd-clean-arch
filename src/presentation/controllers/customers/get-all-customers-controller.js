import { HttpResponse } from "../../helpers/httpReponse.js";

export class FindAllCustomerController {
  constructor(createCustomerUseCase) {
    this.createCustomerUseCase = createCustomerUseCase;
  }
  async handle(httpRequest) {
    try {
      if (!httpRequest) {
        return HttpResponse.InternalError();
      }
   
      const customer = await this.createCustomerUseCase.execute();

      return HttpResponse.ok(customer)
    } catch (error) {
      return HttpResponse.InternalError();
    }
  }
}
