import { MissingParamError } from "../../utils/errors/missing-params-error.js";

export class AuthUseCase {
  constructor(
    loadUserByEmailRepository,
    encripter,
    tokenGenerator,
    updateAccessTokenRepositorySpy
  ) {
    this.loadUserByEmailRepository = loadUserByEmailRepository;
    this.updateAccessTokenRepositorySpy = updateAccessTokenRepositorySpy;
    this.tokenGenerator = tokenGenerator;
    this.encripter = encripter;
  }
  async auth(email, password) {
    if (!email) {
      throw new MissingParamError("email");
    }
    if (!password) {
      throw new MissingParamError("password");
    }

    const user = await this.loadUserByEmailRepository.load(email);
    console.log(email)
    console.log(password)
    if (user && this.encripter.compare(password, user.email)) {
      const access_token = await this.tokenGenerator.generate(user.id);
      await this.updateAccessTokenRepositorySpy.update(user.id, access_token);
      return access_token;
    }

    return null;
  }
}
