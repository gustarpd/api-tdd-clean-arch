import { MissingParamError } from "./missing-param-error";
import { UnauthorizeError } from '../helpers/unauthorize-error'
export class HttpResponse {
  static badRequest(paramName) {
    return {
      statusCode: 400,
      body: new MissingParamError(paramName),
    };
  }

  static InternalError() {
    return {
      statusCode: 500,
    };
  }

  static unauthorizeError() {
    return {
      statusCode: 401,
      body: new UnauthorizeError()
    };
  }
}
