import { factories } from "@strapi/strapi";
import axios from "axios";

export default factories.createCoreService(
  "api::service-form.service-form",
  ({ strapi }) => ({
    async find(ctx) {
      // todo
    },
    async sendMailTest(event) {
      const { result } = event;
      console.log("SENDING EMAIL");
      await axios.post(
        "https://proto.co/email_contact",
        {
          full_name: event.full_name,
          phone: event.phone,
          category: event.category,
          company_name: event.company_name,
          email: event.email,
          message: event.message,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return event.body = 'SUCCESSS';
    },
    async verifyCaptcha(captcha) {
      //verify URL
      const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${captcha}`;

      //make request to verifyURL
      try {
        const { data, status } = await axios.post(verifyURL, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        return data.success;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("error message: ", error.message);
          return error.message;
        } else {
          console.log("unexpected error: ", error);
          return "An unexpected error occurred";
        }
      }
    },
  })
);
