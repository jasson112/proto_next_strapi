console.log("TEST");
export default ({ env }) => ({
  connection: {
    client: "mysql",
    connection: {
      host: env("DATABASE_HOST", "localhost"),
      port: env.int("DATABASE_PORT", 3306),
      database: env("DATABASE_NAME", "test"),
      user: env("DATABASE_USERNAME", "root"),
      password: env("DATABASE_PASSWORD", "12345"),
      ssl: env.bool("DATABASE_SSL", false),
    },
    debug: false,
  },
});
