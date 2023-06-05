import { UnauthorizeError } from "./errors/unauthorize-error.js";
import { ServerError } from "./errors/server-erro.js";
export class HttpResponse {
  static badRequest(error) {
    return {
      statusCode: 400,
      body: error
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
