/**
 *  contact-email controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::contact-email.contact-email', ({ strapi }) => ({
    async submitDataHomeForm(ctx) {
      const { data, recaptchaValue } = ctx.request.body;
      try {
        interface Options {
          verifyCaptcha?: any;
          sendMailTest?: any;
        }
        const api: Options = strapi.service("api::contact-email.contact-email");
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
      console.log(data, recaptchaValue);
    },
  }));
