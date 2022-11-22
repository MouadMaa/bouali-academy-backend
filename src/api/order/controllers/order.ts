/**
 * order controller
 */

import { factories } from "@strapi/strapi";

// import stripe from "stripe";

export default factories.createCoreController(
  "api::order.order",
  ({ strapi }) => ({
    async find(ctx) {
      const { query } = ctx;

      const { userId } = ctx.request as any;
      if (!userId) throw new Error("You are not authenticated!");

      query.filters = {
        users_permissions_user: {
          id: userId,
        },
      } as any;

      const entity = await strapi.service("api::order.order").find(query);
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

      return this.transformResponse(sanitizedEntity);
    },
    async findOne(ctx) {
      const { id } = ctx.params;
      const { query } = ctx;

      const { userId } = ctx.request as any;
      if (!userId) throw new Error("You are not authenticated!");

      query.filters = {
        id,
        users_permissions_user: {
          id: userId,
        },
      } as any;

      const entity = await strapi.service("api::order.order").find(query);
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

      return this.transformResponse(sanitizedEntity);
    },
  })
);
