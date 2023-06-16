import { MissingParamError } from "../../../utils/errors/missing-params-error.js";
import { HttpResponse } from "../../../presentation/helpers/httpReponse.js";

export class AddAccount {
  constructor(AddAccountRepository, hasher, tokenGenerator) {
    (this.AddAccountRepository = AddAccountRepository),
      (this.hasher = hasher),
      (this.tokenGenerator = tokenGenerator);
  }
  async add(name, email, password) {
    if (!email || !password) {
      throw new MissingParamError("missing values");
    }

    const hashPassword = await this.hasher.hash(password, 12);
    if (!hashPassword) {
      throw HttpResponse.InternalError();
    }

    const user = await this.AddAccountRepository.add({
      name,
      email,
      hashPassword,
    });
    
    if (!user) {
      return null;
    }
    const access_token = await this.tokenGenerator.generate(user.id);
    return access_token;
  }
}
