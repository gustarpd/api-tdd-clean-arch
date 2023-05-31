import JWT from 'jsonwebtoken'
import { MissingParamError } from './errors/missing-params-error';
export class TokenGenerator {
  constructor(secret) {
    this.secret = secret;
  }
  async generate(id) {
    if (!this.secret){ 
      throw new MissingParamError("secret");
    }
    if (!id) { 
      throw new MissingParamError("id");
    }
    return JWT.sign(id, this.secret);
  }
}
