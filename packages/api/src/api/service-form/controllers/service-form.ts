/**
 *  service-form controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController("api::service-form.service-form", ({ strapi }) => ({
    async submitDataServicesForm(ctx) {
      /* const { data, recaptchaValue } = ctx.request.body;
      try {
        interface Options {
          verifyCaptcha?: any;
          sendMailTest?: any;
        }
        const api: Options = strapi.service("api::service-form.service-form");
        if (await api.verifyCaptcha(recaptchaValue)) {
          await api.sendMailTest(data);
          ctx.body = 'SUCCESS';
        } else {
          console.log("invalid captcha");
          ctx.response.badRequest('invalid captcha');
        }
      } catch (err) {
        console.log("LifeCycle Error", err);
      }
      console.log(data, recaptchaValue); */
    },
  })
);
