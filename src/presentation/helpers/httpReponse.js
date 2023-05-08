import { MissingParamError } from "./missing-param-error";
import { UnauthorizeError } from "../helpers/unauthorize-error";
import { ServerError } from "../helpers/server-erro";
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
      body: new ServerError(),
    };
  }

  static unauthorizeError() {
    return {
      statusCode: 401,
      body: new UnauthorizeError(),
    };
  }

  static ok(data) {
    return {
      statusCode: 200,
      body: data
    }
  }
}
