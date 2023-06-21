import { HttpResponse } from "../../helpers/httpReponse.js";
import { MissingParamError } from "../../../utils/errors/missing-params-error.js";

export class CreateCustomerController {
  constructor(createCustomerUseCase) {
    this.createCustomerUseCase = createCustomerUseCase;
  }
  async handle(httpRequest) {
    try {
      if (!httpRequest) {
        return HttpResponse.InternalError();
      }

      const requiredParams = [
        "name",
        "phone",
        "email",
        "address",
        "cpfCnpj",
        "dateOfBirth",
        "gender",
        "maritalStatus",
        "profession",
        "nationality",
        "observations",
      ];

      for (const param of requiredParams) {
        if (!httpRequest[param]) {
          return HttpResponse.badRequest(new MissingParamError(param));
        }
      }
      const customer = await this.createCustomerUseCase.execute({
        ...httpRequest,
      });
      return HttpResponse.created(customer)
    } catch (error) {
      return HttpResponse.unauthorizeError();
    }
  }
}
