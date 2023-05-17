import { MissingParamError } from "../../utils/errors/missing-params-error";

export class AuthUseCase {
  constructor(loadUserByEmailRepository, encripter, tokenGenerator) {
    this.loadUserByEmailRepository = loadUserByEmailRepository;
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
    if (user && this.encripter.compare(password, user.password)) {
      const access_token = await this.tokenGenerator.generate(user.id);
      return access_token;
    }

    return null;
  }
}
