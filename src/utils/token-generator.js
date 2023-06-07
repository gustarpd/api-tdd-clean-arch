import JWT from 'jsonwebtoken'
import { MissingParamError } from './errors/missing-params-error.js';

export class JtwAdapter {
  constructor(secret) {
    this.secret = secret;
  }
  async encrypt(id) {
    if (!this.secret){ 
      throw new MissingParamError("secret");
    }
    if (!id) { 
      throw new MissingParamError("id");
    }
    return JWT.sign(id, this.secret);
  }

  async decrypt(hash) {
    return JWT.verify(hash, this.secret)
  }
}
