/**
 * contact-email service.
 */

import { factories } from "@strapi/strapi";
import axios from "axios";

export default factories.createCoreService(
  "api::contact-email.contact-email",
  ({ strapi }) => ({
    async find(ctx) {
      // todo
    },
    async sendMailTest(event) {
      const { result } = event;
      console.log("SENDING EMAIL");
      // const nodemailer = require('nodemailer');
      // // create transporter object with smtp server details
      // const transporter = nodemailer.createTransport({
      //   host: "smtp.gmail.com",
      //   port: 465,
      //   auth: {
      //     user: "jasson142@gmail.com",
      //     pass: "password",
      //   },
      // });

      // await transporter.sendMail({
      //   from: "jasson142@gmail.com",
      //   to: "jasson142@gmail.com",
      //   subject: "You have a new message from proto website",
      //   html: `<p>Name: ${result.name} <br> Phone: ${result.phone} <br> Company name: ${result.company_name} <br> Email: ${result.email} <br> Message: ${result.message} </p>`,
      // });
    },
    async verifyCaptcha(captcha) {
      //verify URL
      const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY2}&response=${captcha}`;

      //make request to verifyURL
      try {
        // {
        //   "success": false,
        //   "error-codes": [
        //     "invalid-input-secret"
        //   ]
        // }
        const { data, status } = await axios.post(verifyURL, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("FORM CONTACT DATA")
        console.log(data)
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
