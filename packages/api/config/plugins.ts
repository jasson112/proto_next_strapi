module.exports = ({ env }) => ({
  email: {
    provider: "nodemailer",
    providerOptions: {
      host: "mail.dinamic.co", //SMTP Host
      port: 465, //SMTP Port
      secure: true,
      debug:true,
      logger: true,
      auth: {
        user: "proto@proto.co",
        pass: "164^NYeQbSjV",
      },
    },
    settings: {
      from: "proto@proto.co",
      replyTo: "proto@proto.co",
    },
  },
});
