import { TokenGenerator } from "../../utils/token-generator.js";
import env from "../config/env.js";
import { LoadUserByTokenlRepository } from "../../infra/repositories/load-account-by-token.js";
import { DbLoadAccountByToken } from "../../domain/usecases/dbload-account-by-token.js";

export class DbLoadByToken {
  static compose() {
    const jwt = new TokenGenerator(env.tokenSecret);
    const loadUserByTokenlRepository = new LoadUserByTokenlRepository();
    return new DbLoadAccountByToken(loadUserByTokenlRepository, jwt);
  }
}
