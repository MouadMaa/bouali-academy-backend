import { verify } from "jsonwebtoken";

export default () => {
  return async (ctx, next) => {
    const authorization = ctx.request.header.authorization;

    try {
      const access_token = authorization.replace("Bearer ", "");

      const payload: any = verify(access_token, process.env.JWT_SECRET);

      ctx.request.userId = payload.id;
    } catch {}

    await next();
  };
};
