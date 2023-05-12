import { MissingParamError } from "../../utils/errors/missing-params-error";
import { InvalidParamError } from "../../utils/errors/invalid-params-error";

export class AuthUseCase {
    constructor(loadUserByEmailRepository) {
      this.loadUserByEmailRepository = loadUserByEmailRepository
    }
    async auth(email, password) {
      if (!email) {
        throw new MissingParamError("email");
      }
      if (!password) {
        throw new MissingParamError("password");
      }
      if (!this.loadUserByEmailRepository) {
        throw new MissingParamError("loadUserByEmailRepository");
      }
      if (!this.loadUserByEmailRepository.load) {
        throw new InvalidParamError("loadUserByEmailRepository");
      }
      const user = await this.loadUserByEmailRepository.load(email)
      if(!user) {
        return null
      }
    }
  }