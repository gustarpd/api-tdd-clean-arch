import { HttpResponse } from "../helpers/httpReponse";

export class LoginRouter {
  constructor(authUseCase) {
    this.authUseCase = authUseCase;
  }

  route(httpRequest) {
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
        return HttpResponse.badRequest("email");
      }
      if (!password) {
        return HttpResponse.badRequest("password");
      }

      const accessToken = this.authUseCase.auth(email, password);
      if (!accessToken) return HttpResponse.unauthorizeError();
      return HttpResponse.ok({ accessToken });
    } catch (error) {
      return HttpResponse.InternalError();
    }
  }
}
