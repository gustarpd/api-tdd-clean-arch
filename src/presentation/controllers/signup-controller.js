import { HttpResponse } from "../helpers/httpReponse.js";
import { MissingParamError } from "../../utils/errors/missing-params-error.js";
import { InvalidParamError } from '../../utils/errors/invalid-params-error.js'

export class SignUpController {
  constructor({ addAccount, emailValidator } = {}) {
    this.addAccount = addAccount;
    this.emailValidator = emailValidator
  }

  async handle(httpRequest) {
    try {
      if (
        !httpRequest ||
        !httpRequest.body
      ) {
        return HttpResponse.InternalError();
      }
      const { name, email, password } = httpRequest.body;
      if (!email) {
        return HttpResponse.badRequest(new MissingParamError('email'));
      }
      if (!name) {
        return HttpResponse.badRequest(new MissingParamError('name'));
      }
      if (!this.emailValidator.isValid(email)) {
        return HttpResponse.badRequest(new InvalidParamError('email'));
      }
      if (!password) {
        return HttpResponse.badRequest(new MissingParamError('password'));
      }
      
      const accessToken = await this.addAccount.add(name, email, password);
      return HttpResponse.ok({ accessToken });
    } catch (error) {
      return HttpResponse.unauthorizeError();
    }
  }
}
