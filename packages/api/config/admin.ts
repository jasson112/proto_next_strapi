export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'edba3ce34e25ac8200b4b5a6be15347c'),
  },
});
