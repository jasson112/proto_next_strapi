/**
 * our-service service.
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreService("api::our-service.our-service", ({ strapi }) => ({
    async find(ctx) {
      // todo
    },
    async changeState(event) {
      const { result } = event;
      let entries = await strapi.entityService.findMany("api::our-service.our-service", {});
      entries = entries.filter((item: any) => item.id !== result.id);

      entries.forEach(async function (element: any) {
        if (element.publishedAt != null) {
          await strapi.entityService.update("api::our-service.our-service", element.id, {
              data: {
                publishedAt: null,
              },
            }
          );
        }
      });
    },
  })
);
