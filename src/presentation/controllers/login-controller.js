import { HttpResponse } from "../helpers/httpReponse.js";
import { MissingParamError } from "../../utils/errors/missing-params-error.js";
import { InvalidParamError } from '../../utils/errors/invalid-params-error.js'

export class LoginRouter {
  constructor({ authUseCase, emailValidator } = {}) {
    this.authUseCase = authUseCase;
    this.emailValidator = emailValidator
  }

  async handle(httpRequest) {
    try {
      if (
        !httpRequest
      ) {
        return HttpResponse.InternalError();
      }
      const { email, password } = httpRequest.body;
      if (!email) {
        return HttpResponse.badRequest(new MissingParamError('email'));
      }
      if (!this.emailValidator.isValid(email)) {
        return HttpResponse.badRequest(new InvalidParamError('email'));
      }
      if (!password) {
        return HttpResponse.badRequest(new MissingParamError('password'));
      }

      const accessToken = await this.authUseCase.auth(email, password);
      if (!accessToken) return HttpResponse.unauthorizeError();
      return HttpResponse.ok({ accessToken });
    } catch (error) {
      return HttpResponse.InternalError();
    }
  }
}
