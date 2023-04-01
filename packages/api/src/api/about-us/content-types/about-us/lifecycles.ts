export default {
  async afterCreate(event) {
    /* const { result, params } = event;
    interface Options {
      nextCompile?: any
    }
    const api: Options = strapi.service('api::home.home');
    await api.nextCompile(); */
  },
  async beforeUpdate(event) {
    /* const { result, params } = event;
    interface Options {
      nextCompile?: any
    }
    const api: Options = strapi.service('api::home.home');
    await api.nextCompile(); */
  },
  async afterUpdate(event) {
    /* const { result } = event;

    if (result.publishedAt != null) {
      try {
        interface Options {
          changeState?: any;
        }
        const api: Options = strapi.service("api::about-us.about-us");
        await api.changeState(event);
      } catch (err) {
        console.log("LifeCycle Error", err);
      }
    } */
  },
};
