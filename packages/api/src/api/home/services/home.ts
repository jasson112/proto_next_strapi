/**
 * home service.
 */

"use strict";

import { factories } from "@strapi/strapi";
import { exec } from "child_process";

export default factories.createCoreService("api::home.home", ({ strapi }) => ({
  async find(ctx) {
    // todo
  },
  async nextCompile(){
    console.log("NEXT COMPILE")
    exec("yarn workspace proto-front launch", (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    });
  },
  async changeState(event) {
    const { result } = event;
    let entries = await strapi.entityService.findMany("api::home.home", {});
    entries = entries.filter((item: any) => item.id !== result.id);
    
    entries.forEach(async function (element: any) {
      if (element.publishedAt != null) {
        await strapi.entityService.update("api::home.home", element.id, {
          data: {
            publishedAt: null,
          },
        });
      }
    });
  },
}));
