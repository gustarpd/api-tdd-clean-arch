import { HttpResponse } from "../helpers/httpReponse.js";

export class AuthMiddleware {
  constructor(loadAccountByToken) {
    this.loadAccountByToken = loadAccountByToken;
  }

  async handle(request) {
    const { accessToken } = request;
    if (!accessToken) {
      return HttpResponse.unauthorizeError();
    }
    const account = await this.loadAccountByToken.loadUser(accessToken);
    if (account) {
      return HttpResponse.ok({ accountId: account.id });
    }

    return HttpResponse.unauthorizeError();
  }
}
