import { HttpResponse } from "../helpers/httpReponse";
import { MissingParamError } from "../helpers/missing-param-error";

export class LoginRouter {
  constructor(authUseCase, emailValidator) {
    this.authUseCase = authUseCase;
    this.emailValidator = emailValidator
  }

  async route(httpRequest) {
    try {
      if (
        !httpRequest ||
        !httpRequest.body ||
        !this.authUseCase ||
        !this.authUseCase.auth
      ) {
        return HttpResponse.InternalError();
      }
      const { email, password } = httpRequest.body;
      if (!email) {
        return HttpResponse.badRequest(new MissingParamError('email'));
      }
      if (!this.emailValidator.isValid(email)) {
        return HttpResponse.badRequest(new MissingParamError('email'));
      }
      if (!password) {
        return HttpResponse.badRequest(new MissingParamError('password'));
      }

      const accessToken = this.authUseCase.auth(email, password);
      if (!accessToken) return HttpResponse.unauthorizeError();
      return HttpResponse.ok({ accessToken });
    } catch (error) {
      return HttpResponse.InternalError();
    }
  }
}
