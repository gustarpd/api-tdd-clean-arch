export default class ExpressRouterAdapter {
  static adapt(middleware) {
    return async (req, res, next) => {
      const httpRequest = {
        accessToken: req.headers?.["x-access-token"],

        ...(req.headers || {}),
      };
      const httpResponse = await middleware.handle(httpRequest);
      if(httpRequest) {
        return next()
      }
      res.status(httpResponse.statusCode).json(httpResponse.body);
    };
  }
}
