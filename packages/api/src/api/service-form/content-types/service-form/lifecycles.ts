module.exports = {
  async afterCreate(event) {
    const { result } = event;

    try {
      interface Options {
        sendMailTest?: any;
      }
      const api: Options = strapi.service("api::service-form.service-form");
      await api.sendMailTest(event);
    } catch (err) {
      console.log("LifeCycle Error", err);
    }
  },
};
