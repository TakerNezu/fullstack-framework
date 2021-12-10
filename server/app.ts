import {config} from "dotenv";
config()

import fastify from "fastify";

const { debug } = require("./routes/debug");
const { auth } = require("./routes/auth");
const { me } = require("./routes/me");

export const build = (options: Parameters<typeof fastify>[0]) => {
  const app = fastify(options);

  app.register(debug);
  app.register(me, { prefix: "/v2/me" });
  app.register(auth, { prefix: "/v2/auth" });

  return app;
};
