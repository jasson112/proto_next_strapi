/**
 * about-us service.
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreService("api::about-us.about-us",({ strapi }) => ({
    async find(ctx) {
      // todo
    },
    async changeState(event) {
      const { result } = event;
      let entries = await strapi.entityService.findMany("api::about-us.about-us", {});
      entries = entries.filter((item: any) => item.id !== result.id);

      entries.forEach(async function (element: any) {
        if (element.publishedAt != null) {
          await strapi.entityService.update("api::about-us.about-us", element.id, {
            data: {
              publishedAt: null,
            },
          });
        }
      });
    },
  })
);
